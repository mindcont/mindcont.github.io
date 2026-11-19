# 项脊轩博客

这是博客的 **源码分支**。文章和图片保存在仓库根目录的 `_posts/`、`about/`、`books/`、`history/`、`images/` 中；`main/master` 分支保存 Hexo 生成的静态网站。

## 环境

- Node.js 18 或 20（见 `package.json` 的 engines）
- Hexo 6.3.0
- Maupassant 主题通过 Git submodule 固定版本

首次准备：

```powershell
git submodule update --init --recursive
npm install
```

## 写文章

```powershell
npx hexo new "文章标题"
```

也可以直接新建 `_posts/2026-10-13-文章标题.md`，使用 YAML front matter：

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

## 本地预览和构建

```powershell
npm run build
npm run serve
```

`npm run build` 使用 Node API 生成站点，生成结果位于 `.build/public/`，该目录不提交到源码分支。`npm run serve` 使用 Node API 启动本地预览。

## 发布到 main/master

`npm run publish` 默认只构建并显示 dry-run，不会覆盖发布工作树。确认 `.build/public/` 内容后，再设置 `PUBLISH_WORKTREE` 指向发布分支工作树并显式执行：

```powershell
$env:PUBLISH_WORKTREE = 'D:\mindcont.github.io'
npm run publish:apply
```

脚本会保留 `.git`、`CNAME`、Google 验证文件和 README，其余发布工作树内容替换为生成结果。请在发布工作树中检查 `git diff --stat`、链接和页面后，再自行 commit/push；本项目不会自动推送。

## 已知限制

源码分支没有旧主题之外的历史发布资源，故旧 `main/master` 中的部分头像、视频、验证文件和手工静态资源不会由源文件自动复现；发布脚本会保留现有 CNAME/验证文件。`_posts` 中引用的外部图片、视频和历史路径仍需逐篇核对。
