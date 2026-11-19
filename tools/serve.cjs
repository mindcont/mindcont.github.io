const path = require('node:path');

(async () => {
  const root = path.resolve(__dirname, '..');
  const Hexo = require(path.resolve(root, 'node_modules', 'hexo'));
  const site = new Hexo(root, {
    _: ['server'],
    config: path.resolve(root, '_config.yml'),
    init: true,
    silent: false
  });
  site.env.init = true;
  await site.init();
  await site.call('server', { draft: false });
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
