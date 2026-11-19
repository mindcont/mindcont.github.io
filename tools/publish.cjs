const fs = require('node:fs/promises');
const path = require('node:path');

(async () => {
  const root = path.resolve(__dirname, '..');
  const publicDir = path.resolve(root, '.build', 'public');
  const target = path.resolve(process.env.PUBLISH_WORKTREE || root, '..', 'mindcont.github.io');
  const apply = process.argv.includes('--apply');

  require('node:child_process').execFileSync(process.platform === 'win32' ? 'node.exe' : 'node', [path.resolve(root, 'tools', 'build.cjs')], { cwd: root, stdio: 'inherit' });
  if (!await exists(publicDir)) throw new Error(`Missing build output: ${publicDir}`);
  if (!await exists(path.resolve(target, '.git'))) throw new Error(`Not a Git worktree: ${target}`);

  const preserved = new Set(['.git', 'CNAME', 'README.md', 'google44adb23bef6af1e9.html']);
  const entries = await fs.readdir(target);
  if (!apply) {
    console.log(`Dry run: would replace ${target} with ${publicDir}`);
    console.log(`Preserved: ${[...preserved].join(', ')}`);
    console.log('Run npm run publish:apply only after reviewing the generated site.');
    return;
  }

  for (const entry of entries) {
    if (!preserved.has(entry)) await fs.rm(path.resolve(target, entry), { recursive: true, force: true });
  }
  for (const entry of await fs.readdir(publicDir)) {
    await fs.cp(path.resolve(publicDir, entry), path.resolve(target, entry), { recursive: true });
  }
  console.log(`Published locally to ${target}. Review git diff there before commit/push.`);
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

async function exists(file) {
  try { await fs.access(file); return true; } catch { return false; }
}
