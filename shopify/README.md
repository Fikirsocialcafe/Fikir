# Tienda Shopify de Fikir Social Café

Tema propio (Online Store 2.0) para www.fikircafe.com. Sustituye a la web Next.js de `src/`.

- `theme/`: código del tema (Liquid, CSS, JS, traducciones ES/EN e imágenes).
- `build-theme.sh`: genera `dist/fikir-social-cafe-theme.zip`, el paquete que se sube a Shopify.

## Marca

Colores, tipografías y tono siguen la guía de marca (octubre 2026): fondo crema `#F8EEE2`, texto tinta `#1A1A1A`
y un acento por origen (Etiopía `#A3422A`, Kenia `#2E5E45`, Uganda `#7E5410`). Belleza para el nombre de marca y Lato para el resto.

## Datos de producto

Las fichas de origen se guardan en metafields del producto (`custom.pais`, `custom.region`, `custom.productor`,
`custom.altitud`, `custom.variedad`, `custom.proceso`, `custom.cosecha`, `custom.sca`, `custom.notas`, `custom.perfil`, `custom.acento`).
El acento de color de cada producto se elige por la etiqueta `etiopia`, `kenia` o `uganda`.

## Textos

Los textos de las secciones salen de `locales/es.default.json` y `locales/en.json` cuando el campo del editor está vacío,
así la web funciona en los dos idiomas sin más configuración. Cualquier texto escrito en el editor de Shopify tiene prioridad.
