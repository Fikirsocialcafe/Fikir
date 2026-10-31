#!/usr/bin/env bash
# Empaqueta el tema de Shopify (carpeta theme/) en dist/fikir-social-cafe-theme.zip
set -euo pipefail
cd "$(dirname "$0")/theme"
mkdir -p ../dist
rm -f ../dist/fikir-social-cafe-theme.zip
zip -qr ../dist/fikir-social-cafe-theme.zip layout templates sections snippets assets config locales
echo "dist/fikir-social-cafe-theme.zip"
