# 项脊轩博客

博客源码。文章与图片位于 `_posts/`、`about/`、`books/`、`history/`、`images/`、`media/`；主题 `themes/maupassant` 随仓库托管（不再是 Git submodule）。站点由 GitHub Actions 构建并部署到 GitHub Pages，域名 `blog.mindcont.com`。

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
- Settings → Environments → `github-pages` → Deployment branches 允许 `rebuild-src`（或 No restriction）

`CNAME` 与 `google44adb23bef6af1e9.html` 已在 `tools/build.cjs` 的 `staticFiles` 中，会随产物发布。

## 分支

- `rebuild-src`：唯一活跃分支，源码与部署触发分支
- `master`：旧的分支式发布产物，已打 tag `site-master-e4f37b93` 归档；把默认分支切到 `rebuild-src` 后即可删除

`npm run publish` / `npm run publish:apply` 是旧流程（复制到本地 `master` 工作树），Actions 上线后已停用；`D:\mindcont.github.io` 工作树已删除，仓库现在就在本目录。

## 已知限制

- `media/videos/` 被 `.gitignore` 忽略，视频不进入仓库；历史视频引用已移除或改为本地封面图。
- 旧 CDN 外链图片已本地化到 `images/`，少量历史外链（音乐播放器、JS）仍为外部资源。
