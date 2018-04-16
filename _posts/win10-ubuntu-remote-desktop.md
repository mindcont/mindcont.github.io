---
title: win10连结ubuntu 远程桌面
date: 2016-05-12 11:02:23
tags: ubuntu
categories: Linux
toc: false
---

笔者最近需要查看实验室另一台装有ubuntu 14.04 LTS 版本系统的电脑，并进行远程可视化操作。通过搜索有关ubuntu 远程桌面大量信息并亲身实践，现总结如下:

<!--more-->
## 前提

|实验平台 | 操作系统 | 说明 |
|--- | --- | --- |
|笔记本 | win10(10240) |IP:192.168.0.66|
|待连结电脑 | ubuntu 14.04 lts |IP:192.168.0.100|
|例如 192.168.0.66 --->192.168.0.100|需要保证两台电脑IPv4地址中，第3位数字一样 | Windows下打开cmd命令行，ping 你的ubuntu 主机IP地址 有回应|

## ubuntu 配置
### 安装xrdp 和相关组件
因为win 系统采用xrdp 协议，所以我们在ubuntu下安装 xrdp 和相关组件。
```bash
sudo apt-get install xrdp vnc4server xbase-clients
```
### 安装dconf-editor
现在我们还不能直接， 因为win下加密验证方式和linux下不同，所以接着我们安装 dconf-editor 用来去除gnome 远程桌面的密码验证。
```bash
sudo apt-get install dconf-editor
```
然后 输入 dconf-editor ,以此在 org > gnome > desktop > remote-access
![](/images/coding/ubuntu/remote-access/ubuntu-dconf-editor.png)

### 设置远程桌面选项
打开搜索，输入桌面，点击**桌面共享**。这里我们要对桌面共享首选项进行设置。
![](/images/coding/ubuntu/remote-access/ubuntu-share-desktop.png)

输入远程登录用户的密码并允许查看和控制，**特别注意的是 在"安全"选项下 将每次访问进行确认的对号去掉**，否则每次远程登录都要在待连接设备ubuntu 这边进行允许确认。
![](/images/coding/ubuntu/remote-access/ubunt-share-desktop-config.png)

## win10 连接
### 打开远程桌面
同时安装 Win + R 键打开命令行输入 mstsc ，打开远程桌面。或通过搜索 "远程桌面" 的方式打开。输入ubuntu在内网下的IP 地址和用户名。如果不清楚，可在ubuntu下输入
```bash
ifconfig # 在ubuntu下输入，可以在ipv4一行中查看其IP地址。
```
![](/images/coding/ubuntu/remote-access/win-remote-desktop.png)
### 选择为console的方式
按连接后，会打开如下界面。点击下三角，选择为console的方式,输入我们刚才在ubuntu下配置的远程访问密码。

![](/images/coding/ubuntu/remote-access/win-mstsc-xrdp-console.png)

恭喜，远程桌面连接成功！
![](/images/coding/ubuntu/remote-access/ubuntu-remote-desktop.png)

