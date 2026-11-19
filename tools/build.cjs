const fs = require('node:fs/promises');
const fsSync = require('node:fs');
const path = require('node:path');

(async () => {
  const root = path.resolve(__dirname, '..');
  const stage = path.resolve(root, '.build');
  const source = path.resolve(stage, 'source');
  await fs.rm(stage, { recursive: true, force: true });
  await fs.mkdir(source, { recursive: true });

  for (const entry of ['_posts', 'about', 'books', 'history', 'images', 'media', 'icon']) {
    const from = path.resolve(root, entry);
    if (fsSync.existsSync(from)) await fs.cp(from, path.resolve(source, entry), { recursive: true });
  }

  // Site-level static files kept outside the theme (legacy manual assets).
  const staticFiles = ['js/recent-comments.js'];
  for (const relative of staticFiles) {
    const from = path.resolve(root, relative);
    if (fsSync.existsSync(from)) {
      const to = path.resolve(source, relative);
      await fs.mkdir(path.dirname(to), { recursive: true });
      await fs.cp(from, to);
    }
  }

  const Hexo = require(path.resolve(root, 'node_modules', 'hexo'));
  const site = new Hexo(root, {
    _: ['generate'],
    config: path.resolve(root, '_config.yml'),
    init: true,
    silent: false
  });
  site.env.init = true;
  await site.init();
  await site.call('clean');
  await site.call('generate');
  await site.exit();
  console.log(`Built ${path.resolve(stage, 'public')}`);
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
