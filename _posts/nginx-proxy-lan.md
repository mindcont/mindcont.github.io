---
title: 局域网内nginx反向代理上网
date: 2016-12-26 12:31:25
tags: openwrt
categories: 物联
toc: false
---

**背景：**局域网下有两台Linux服务器，信息如下：

|服务器|IP地址|操作系统|Internet访问|
|---|---|---|---|
|HOSTA(OpenWrt路由器)|110.1.1.65(wan)|CentOS 6.7 x64|是|
|HOSTB|110.1.1.215|CentOS 6.7 x64|否|
<!--more-->
**需求：**HOSTA和HOSTB均处在局域网中，二者能够互相ping通，HOSTA开通网络策略支持互联网访问，但是HOSTB不支持，现在需要将HOSTA作为代理服务器，让HOSTB通过HOSTA实现互联网访问，主要需要HOSTB能够进行在线的软件包安装（yum和pip）

## 方案
使用Nginx反向代理将HOSTA作为http服务器，在HOSTB上配置http全局代理。

![](https://sslbucket-a.akamaihd.net/www.opswat.com/images/blog/web-proxy-diagram-new.png)

### 设置nginx为HTTP代理服务器
**服务器端即HOSTA主机**,设置nginx为HTTP代理服务器上网，只需要3步，分别为安装nginx、配置nginx、修改OpenWrt 防火墙。

**1、登录OpenWrt 安装nginx**
在windows下使用SSH工具，如[Putty](http://www.chiark.greenend.org.uk/~sgtatham/putty/)等，在Host name 填写192.168.1.1，端口22 ，然后点击 Open.
![](http://static.mindcont.com/blog/images/images/iot/openwrt/putty.png)

在linux下，打开终端输入
```
ssh root@192.168.1.1
```
输人密码（默认 admin）登陆,如下图所示s
![](http://static.mindcont.com/blog/images/images/iot/openwrt/welcome.png)

使用opkg安装 nginx ,输入下面的指令
```
opkg update
opkg install nginx
```
**2、配置 nginx**
这里我们首先将nginx原本配置文件`nginx.conf`备份为`nginx.conf.backup`，后修改里面的内容，配置为HTTP反向代理模式，选择8080为服务监听端口。
```
cd /etc/nginx
cp nginx.conf nginx.conf.backup
vi nginx.conf
```
将下面的内容替换`nginx.conf`中默认的内容
```
user nobody nogroup;
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    #include       mime.types;
    #default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    gzip  on;
    #include /etc/nginx/conf.d/*.conf;

    resolver 114.114.114.114;
    server {
        listen       8080;
        location / {
              proxy_pass $scheme://$http_host$request_uri;
         }
    }
}
```
修改完成后，按　esc ，输入`：wq!` 保存
紧接着，启动nginx
```
cd /etc/init.d
./nginx start
```
**3、修改OpenWrt 防火墙**
由于OpenWrt wan口防火墙默认禁止入站数据，这里我们需要改为`ACCEPT`。在OpenWrt LuCI 界面中修改防火期设置。

打开浏览器，输入`192.168.1.1` ，账号默认为root,默认密码admin。依次选择网络 -> 防火墙

![](http://static.mindcont.com/blog/images/images/iot/openwrt/firewall.png)

使你的设置同绿框中标明的那样，然后点击`保存&应用`。

略过此步，使用windows 网络 ->疑难解答,你将会看到**该设备或资源(Web 代理)未设置为接受端口'8080'上的连接**的错误提示，如下
![](http://static.mindcont.com/blog/images/images/iot/openwrt/reject-detail.png)

### 设置浏览器的代理(以IE为例)
设置HOSTB为http全局代理，以windows平台为例，在控制面板 -> Internet选项 -> 连接 -> 局域网设置 -> 代理服务器

填写IP(这里我们填写HOSTA 的IP，即110.1.1.65)和Port(即nginx 监听端口8080)即可。

![](http://static.mindcont.com/blog/images/images/iot/openwrt/client-config.png)

注明：**nginx不支持https正向代理** 因为nginx不支持CONNECT，所以无法正向代理https网站。

## 参考

* [Nginx：设置为HTTP代理服务器上网](http://blog.csdn.net/guowenyan001/article/details/22718179)
* [局域网下通过代理实现服务器的互联网访问](http://www.cnblogs.com/xshrim/p/5934032.html)
* [openwrt 防火墙设置 /etc/config/firewall](http://blog.csdn.net/aa120515692/article/details/46917637)
