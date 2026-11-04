#!/usr/bin/env node
/**
 * One-shot integration setup for Fikir Coffee.
 *
 * What this script does (each step is idempotent — safe to re-run):
 *   1. Brevo: ensure a "Newsletter Fikir" list exists; print its ID.
 *   2. Brevo: ensure a "Fikir Welcome 5%" transactional template exists
 *      using email-templates/welcome.html; print its ID.
 *   3. Shopify Storefront: query products by handle (etiopia, kenia,
 *      pack-degustacion, suscripcion) and print their variant GIDs.
 *   4. Patch .env.local with BREVO_NEWSLETTER_LIST_ID + BREVO_WELCOME_TEMPLATE_ID
 *      if they're missing or empty.
 *
 * It does NOT auto-modify src/data/products.ts — it prints the suggested
 * patch so you can review variant titles before pasting.
 *
 * Usage:
 *   node scripts/setup-integrations.mjs
 *
 * Reads from .env.local:
 *   BREVO_API_KEY, NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_ACCESS_TOKEN
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ---- env loading ----------------------------------------------------------

function loadEnv(file) {
  if (!existsSync(file)) return {};
  const raw = readFileSync(file, "utf8");
  const env = {};
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return env;
}

const envPath = resolve(ROOT, ".env.local");
const env = { ...loadEnv(envPath), ...process.env };

const BREVO_API_KEY = env.BREVO_API_KEY;
const SHOPIFY_DOMAIN = env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// ---- helpers --------------------------------------------------------------

const c = {
  ok: (s) => `\x1b[32m${s}\x1b[0m`,
  warn: (s) => `\x1b[33m${s}\x1b[0m`,
  err: (s) => `\x1b[31m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

async function brevoFetch(path, init = {}) {
  const res = await fetch(`https://api.brevo.com/v3${path}`, {
    ...init,
    headers: {
      "api-key": BREVO_API_KEY,
      "Content-Type": "application/json",
      accept: "application/json",
      ...(init.headers || {}),
    },
  });
  let data = null;
  const text = await res.text();
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  return { status: res.status, data };
}

async function shopifyFetch(query, variables = {}) {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-10/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

// ---- step 1: Brevo list ---------------------------------------------------

async function ensureBrevoList() {
  console.log(c.bold("\n▸ Brevo: Newsletter list"));
  const { status, data } = await brevoFetch("/contacts/lists?limit=50");
  if (status !== 200) {
    console.log(c.err(`  list failed (${status}): ${JSON.stringify(data)}`));
    return null;
  }
  const existing = data.lists?.find((l) => l.name === "Newsletter Fikir");
  if (existing) {
    console.log(c.ok(`  ✓ already exists`), c.dim(`(id ${existing.id})`));
    return existing.id;
  }
  const created = await brevoFetch("/contacts/lists", {
    method: "POST",
    body: JSON.stringify({ name: "Newsletter Fikir", folderId: 1 }),
  });
  if (created.status === 201 && created.data?.id) {
    console.log(c.ok(`  ✓ created`), c.dim(`(id ${created.data.id})`));
    return created.data.id;
  }
  console.log(c.err(`  create failed: ${JSON.stringify(created.data)}`));
  return null;
}

// ---- step 2: Brevo welcome template --------------------------------------

async function ensureBrevoTemplate() {
  console.log(c.bold("\n▸ Brevo: Welcome email template"));
  const { status, data } = await brevoFetch("/smtp/templates?limit=200");
  if (status !== 200) {
    console.log(c.err(`  list failed (${status}): ${JSON.stringify(data)}`));
    return null;
  }

  const htmlPath = resolve(ROOT, "email-templates/welcome.html");
  if (!existsSync(htmlPath)) {
    console.log(c.err(`  email-templates/welcome.html not found`));
    return null;
  }
  const htmlContent = readFileSync(htmlPath, "utf8");

  const payload = {
    templateName: "Fikir Welcome 5%",
    subject: "¡Bienvenido/a a Fikir! Aquí tienes tu 5% de descuento",
    sender: { name: "Fikir Coffee", email: "hola@fikircafe.com" },
    htmlContent,
    isActive: true,
    replyTo: "hola@fikircafe.com",
    tag: "newsletter-welcome",
  };

  const existing = data.templates?.find((t) => t.name === "Fikir Welcome 5%");
  if (existing) {
    const upd = await brevoFetch(`/smtp/templates/${existing.id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    if (upd.status === 204) {
      console.log(c.ok(`  ✓ updated`), c.dim(`(id ${existing.id})`));
      return existing.id;
    }
    console.log(c.warn(`  update returned ${upd.status}: ${JSON.stringify(upd.data)}`));
    return existing.id;
  }

  const created = await brevoFetch("/smtp/templates", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (created.status === 201 && created.data?.id) {
    console.log(c.ok(`  ✓ created`), c.dim(`(id ${created.data.id})`));
    return created.data.id;
  }
  console.log(c.err(`  create failed: ${JSON.stringify(created.data)}`));
  return null;
}

// ---- step 3: Shopify variant GIDs ----------------------------------------

async function dumpShopifyVariants() {
  console.log(c.bold("\n▸ Shopify: variant GIDs by handle"));
  if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
    console.log(c.warn("  skipped — Shopify env vars missing"));
    return {};
  }

  const handles = ["etiopia", "kenia", "pack-degustacion", "suscripcion"];
  const result = {};

  for (const handle of handles) {
    const data = await shopifyFetch(
      /* GraphQL */ `
        query($handle: String!) {
          product(handle: $handle) {
            id title handle
            variants(first: 10) {
              edges { node { id title } }
            }
          }
        }`,
      { handle }
    );
    const product = data?.data?.product;
    if (!product) {
      console.log(c.warn(`  ✗ ${handle} — not found in Shopify`));
      continue;
    }
    console.log(c.ok(`  ✓ ${handle}`), c.dim(`(${product.title})`));
    const variants = product.variants.edges.map((e) => e.node);
    for (const v of variants) {
      console.log(`      ${v.title.padEnd(20)} ${v.id}`);
    }
    result[handle] = variants;
  }

  // Print products.ts patch suggestion for etiopia + kenia.
  const note = ["", c.bold("Patch for src/data/products.ts variants:")];
  for (const handle of ["etiopia", "kenia"]) {
    const variants = result[handle] || [];
    const grano = variants.find((v) => /grano/i.test(v.title));
    const molido = variants.find((v) => /molido/i.test(v.title));
    if (grano || molido) {
      note.push(`  ${handle}:`);
      if (grano) note.push(`    Grano  → shopifyVariantId: "${grano.id}"`);
      if (molido) note.push(`    Molido → shopifyVariantId: "${molido.id}"`);
    }
  }
  if (note.length > 2) console.log(note.join("\n"));

  return result;
}

// ---- step 4: patch .env.local --------------------------------------------

function patchEnvLocal(patches) {
  if (!existsSync(envPath)) {
    console.log(c.warn("\n.env.local not found — skipping patch"));
    return;
  }
  let raw = readFileSync(envPath, "utf8");
  let touched = false;
  for (const [key, value] of Object.entries(patches)) {
    if (value === null || value === undefined) continue;
    const re = new RegExp(`^${key}=.*$`, "m");
    if (re.test(raw)) {
      const current = raw.match(re)[0].slice(key.length + 1);
      if (current === String(value)) continue;
      raw = raw.replace(re, `${key}=${value}`);
      touched = true;
    } else {
      if (!raw.endsWith("\n")) raw += "\n";
      raw += `${key}=${value}\n`;
      touched = true;
    }
  }
  if (touched) {
    writeFileSync(envPath, raw);
    console.log(c.ok("\n✓ Patched .env.local with new IDs"));
  } else {
    console.log(c.dim("\n.env.local already up to date"));
  }
}

// ---- run -----------------------------------------------------------------

(async () => {
  if (!BREVO_API_KEY) {
    console.error(c.err("BREVO_API_KEY missing in .env.local — aborting"));
    process.exit(1);
  }

  const listId = await ensureBrevoList();
  const templateId = await ensureBrevoTemplate();
  await dumpShopifyVariants();

  patchEnvLocal({
    BREVO_NEWSLETTER_LIST_ID: listId,
    BREVO_WELCOME_TEMPLATE_ID: templateId,
  });

  console.log("");
  console.log(c.bold("Done."));
  console.log(c.dim("Next: review the suggested patches, then commit any updates to src/data/products.ts."));
})();
