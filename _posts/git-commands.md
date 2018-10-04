---
title: Git 常用指令
date: 2016-08-18 21:08:09
tags:
categories: Linux
toc: ture
---
Git 是由 Linux 之父 Linus Tovalds 为了更好地管理linux内核开发而创立的分布式版本控制／软件配置管理软件。简单来说，Git 是一个管理你的「代码的历史记录」的工具。
<!--more-->
![](/images/coding/github.png)

## 安装
运行平台|环境|链接|
---|---|---|
Microsoft Windows [版本 10.0.10240] | GitHub Desktop (3.1.1.4) | https://desktop.github.com/
Ubuntu [版本14.04] | GitKraken | https://www.gitkraken.com/

## 常用命令

### 创建新仓库

创建新文件夹，打开，然后执行
```
git init
```
以创建新的 git 仓库。

### 拉取远程仓库
执行如下命令以创建一个远程仓库的克隆版本：
```
git clone username@host:/path/to/repository
```
举个实例
```
cd /home/pi
git clone https://github.com/mindcont/caffe.git
```
### 工作流

你的本地仓库由 git 维护的三棵“树”组成。第一个是你的 **工作目录**，它持有实际文件；第二个是 **缓存区（Index）**，它像个缓存区域，临时保存你的改动；最后是 **HEAD**，指向你最近一次提交后的结果。

![](https://git-scm.com/images/about/index1@2x.png)

### 添加与提交
你可以计划改动（把它们添加到缓存区），使用如下命令：
```
git add <filename> # 添加单个改动的文件
git add * #添加多个改动的文件
```
这是 git 基本工作流程的第一步；使用如下命令以实际提交改动：
```
git commit -m "代码提交信息"
```
现在，你的改动已经提交到了 HEAD，但是还没到你的远端仓库。执行如下命令以将这些改动提交到远端仓库：
```
git push origin master
```
可以把 master 换成你想要推送的任何分支
![](https://git-scm.com/images/about/index2@2x.png)

### 分支
分支是用来将特性开发绝缘开来的。在你创建仓库的时候，master 是“默认的”。在其他分支上进行开发，完成后再将它们合并到主分支上。
![](https://camo.githubusercontent.com/1db631d931f4a57a439deb5f747bfc0c3c1098b2/68747470733a2f2f7777772e61746c61737369616e2e636f6d2f6769742f696d616765732f7475746f7269616c732f636f6c6c61626f726174696e672f636f6d706172696e672d776f726b666c6f77732f676974666c6f772d776f726b666c6f772f30352e737667)

创建一个叫做“feature_x”的分支，并切换过去：
```
git checkout -b feature_x
```
切换回主分支：
```
git checkout master
```
再把新建的分支删掉：
```
git branch -d feature_x
```
**注意** 除非你将分支推送到远端仓库，不然该分支就是 不为他人所见的。
### 更新与合并
将你本地分支推送到远端仓库，执行：
```
git push origin <branch>
```
要更新你的本地仓库至最新改动，执行：
```
git pull
```
以在你的工作目录中 获取（fetch） 并 合并（merge） 远端的改动。
要合并其他分支到你的当前分支（例如 master），执行：
```
git merge <branch>
```
两种情况下，git 都会尝试去自动合并改动。不幸的是，自动合并并非次次都能成功，并可能导致 冲突（conflicts）。 这时候就需要你修改这些文件来人肉合并这些 冲突（conflicts） 了。改完之后，你需要执行如下命令以将它们标记为合并成功：
```
git add <filename>
```
在合并改动之前，也可以使用如下命令查看：
```
git diff <source_branch> <target_branch>
```
**如果你上面的都没看懂，恭喜你可以略过前面的章节，仅看下面的 **可视化操作 **就可以了。**
## 可视化操作
这一部分仅推荐两个，Windows 平台下推荐使用 GitHub 官方的 GitHub Desktop ，泛 Linux 下推荐使用 GitKraken 。读者可能存有疑问为什么选择这两个作为推荐，因为我本人正在使用呀～～～～

软件|支持平台|截图|
---|---|---|
GitHub Desktop | Windows, Mac | ![](https://git-scm.com/images/guis/github-desktop@2x.png)
GitKraken | Windows, Mac, Linux |![](https://git-scm.com/images/guis/git-kraken@2x.png)

## 疑难杂症
### 删除已同步到远程的commit
经常往GitHub上提交修改的代码，会导致提交次数很多；又或者提交了某些不应该提交测试数据，那麽我们应该如何删除这些提交记录呢？
```bash
## 1、启动 git shell, 切换到项目所在的空间
cd c://github/android/rubikrobot   #例如项目位于C://GitHub/Android/RubikRobot 目录下

## 2、查看当前提交记录，输入 q退出日志
git log

## 3、使用git reset 进行撤销操作
git reset --hard HEAD~2                   # 取消当前版本之前的两次提交  
git push origin HEAD --force              # 强制提交到远程版本库，从而删除之前的两次提交数据  
```

### 保持Fork的同步
在原始Repo有新的commit后，Fork的Repo不会自动与原分支同步。

前置条件
*  已Fork
*  已在本地clone了Fork

步骤

进入命令行，进入本地Repo目录
```
# 添加远程分支(仅第一次)
remote add upstream https://github.com/akfish/MwCG.git

# 取回远程分支
git fetch upstream
```
合并(以更新本地Dev分支为例)
```
git checkout Dev

git merge upstream/Dev
```
把同步后的分支push到GitHub的remote repo上（可选）

## 参考链接
* [git - 指南](https://git-scm.com/book/zh/v2)
* [GUI Clients](https://git-scm.com/download/gui/linux)
* [Git 分支 - 远程分支](https://git-scm.com/book/zh/v1/Git-%E5%88%86%E6%94%AF-%E8%BF%9C%E7%A8%8B%E5%88%86%E6%94%AF)
* [了解更多关于git 操作](https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E6%92%A4%E6%B6%88%E6%93%8D%E4%BD%9C)
* [保持Fork的同步](https://github.com/akfish/MwCG/wiki/%E4%BB%BB%E5%8A%A1%EF%BC%9A%E4%BF%9D%E6%8C%81Fork%E7%9A%84%E5%90%8C%E6%AD%A5)
