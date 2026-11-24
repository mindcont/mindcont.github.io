# 项脊轩博客

博客源码。文章与图片位于 `_posts/`、`about/`、`books/`、`history/`、`images/`、`media/`；主题 `themes/maupassant` 随仓库托管（不再是 Git submodule）。站点由 GitHub Actions 构建并部署到 GitHub Pages，默认地址 `https://mindcont.github.io/`。

## 环境

- Node.js 18 或 20（`package.json` 的 engines 为 `>=18 <21`）
- pnpm 10（仓库含 `pnpm-lock.yaml`，CI 使用 `--frozen-lockfile`）
- Hexo 6.3.0

首次准备：

```powershell
corepack enable
pnpm install --frozen-lockfile
```

## 写文章

```powershell
npx hexo new "文章标题"
```

也可以直接新建 `_posts/YYYY-MM-DD-标题.md`，使用 YAML front matter：

```yaml
---
title: 文章标题
date: 2026-10-13 10:00:00
tags:
  - coding
categories:
  - Linux
---
```

## 本地构建与预览

```powershell
pnpm run build
pnpm run serve
```

`build` 会清空 `.build/`，把 `_posts`、`about`、`books`、`history`、`images`、`media`、`icon` 及 `staticFiles` 复制到 `.build/source`，再由 Hexo 生成到 `.build/public`。`serve` 读取 `.build/source`，默认 http://localhost:4000；改文章后需重新 `build`。

## 部署

推送到 `rebuild-src` 即触发 `.github/workflows/deploy.yml`：Node 20 + pnpm 10 安装依赖、构建，上传 `.build/public` 并由 GitHub Pages 发布。

仓库设置要求：

- Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**
- Settings → Pages → Custom domain 必须为空（不再使用 `blog.mindcont.com`；若浏览器仍跳转该域名，在此清除并保存）
- Settings → Environments → `github-pages` → Deployment branches 允许 `rebuild-src`（或 No restriction）

`google44adb23bef6af1e9.html` 已在 `tools/build.cjs` 的 `staticFiles` 中，会随产物发布；`CNAME` 文件与 `blog.mindcont.com` 已移除。域名侧若仍保留 `blog` 指向 `mindcont.github.io` 的 CNAME 记录，也应一并删除，否则该域名会解析到 GitHub 但不再有站点。

## 分支

- `rebuild-src`：唯一分支，源码与部署触发分支，也是仓库默认分支
- 旧的 `master` 分支已删除；其最后的站点快照保存在 tag `site-master-e4f37b93`

`npm run publish` / `npm run publish:apply` 是旧流程（复制到本地 `master` 工作树），Actions 上线后已停用；`D:\mindcont.github.io` 工作树已删除，仓库现在就在本目录。

## 已知限制

- `media/videos/` 被 `.gitignore` 忽略，视频不进入仓库；历史视频引用已移除或改为本地封面图。
- 旧 CDN 外链图片已本地化到 `images/`，少量历史外链（音乐播放器、JS）仍为外部资源。
