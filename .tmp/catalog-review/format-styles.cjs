const fs = require('node:fs');
for (const file of ['src/pages/productos.astro', 'src/components/productos/ProductCatalog.astro', 'src/components/productos/CatalogProduct.astro']) {
  const source = fs.readFileSync(file, 'utf8');
  const formatted = source.replace(/<style>([\s\S]*?)<\/style>/, (_, css) => {
    let depth = 1;
    let buffer = '';
    const lines = [];
    for (const token of css.split(/([{};])/)) {
      if (token === '{') {
        lines.push('  '.repeat(depth) + buffer.trim().replace(/\s+/g, ' ') + ' {');
        depth++;
        buffer = '';
      } else if (token === ';') {
        lines.push('  '.repeat(depth) + buffer.trim() + ';');
        buffer = '';
      } else if (token === '}') {
        depth--;
        if (buffer.trim()) lines.push('  '.repeat(depth + 1) + buffer.trim());
        lines.push('  '.repeat(depth) + '}');
        if (depth === 1) lines.push('');
        buffer = '';
      } else buffer += token;
    }
    return '<style>\n' + lines.join('\n').trimEnd() + '\n</style>';
  });
  fs.writeFileSync(file, formatted);
}
