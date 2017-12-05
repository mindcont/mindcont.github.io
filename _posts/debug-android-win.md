---
title: 调试安卓的小技巧
date: 2017-02-25 09:26:57
tags: coding
categories:
---
在win10下开发安卓小程序使用物理机调试的时候，USB数据线接触不好，总是很容易断开链接，害的处女座的强迫症都要犯了。

<!--more-->
## 使用wifi来调试你的应用

### 使用方法
**1.测试手机和开发PC要在同一wifi局域网内**

||IP地址|能否访问Internet|
|---|---|---|
|PC(开发者)|192.168.1.123|是|
|测试手机|192.168.1.100|是|

**2.确保你正确配置了adb（Android Debug Bridge）环境变量**

当你打开命令行，输入'adb version'，看到类似如下信息，就说明adb配置成功

![](http://static.mindcont.com/blog/images/coding/android/adb.png)

**3.设置手机以侦听端口 5555 上的 TCP/IP 连接**
第一次的时候需要用手机USB连接到你的电脑，之后运行下面国外大牛写的shell脚本，脚本在mac或者Linux肯定是ok的，windows上需要安装一些如msysgit或者[Cygwin](https://www.cygwin.com/setup-x86.exe)才可运行以上Linux shell。

下载[adbwifi.sh](https://gist.github.com/stormzhang/6fa157ceb7980a25fbf0) 放到cygwin 目录下 例如我'C:\cygwin64\home\fenxi\adbwifi.sh'
运行
```
sh adbwifi.sh
```

**4. 连接**

断开手机和PC相连的usb数据线

查找 Android 设备的 IP 地址。例如，在 Nexus 设备上，您可以通过访问 Settings > About tablet（或 About phone) > Status > IP address 查找 IP 地址。例如我的手机地址为'192.168.1.100',打开命令行，输入
```
adb connect 192.168.1.100

#查看已连接设备
adb devices
```
现在，您可以开始操作了！

**注意：**
手机重启后需要使用数据线再连接一遍，重复以上步骤才可使用无线调试模式。
这属于安卓系统安全策略，不然任何时候局域网内其他PC都可以远程控制你的手机了

## 使用dryrun

github是个大宝藏，对于 Android 开发者来说，除了阅读还有运行 demo 看下项目效果等。

来看下一般人的阅读开源项目的姿势是怎么样的：
```
找到项目地址
点击「download zip」
解压到一个目录
打开 Android Studio
导入项目
Sync gradle
运行项目
选择运行的设备
删除下载的 zip 文件
```
只要安装dryrun这个工具，直接执行一个命令：

![](http://static.mindcont.com/blog/images/coding/android/usage_v4.gif)

### 使用方法
**1.安装ruby**
这里我推荐使用[RailsInstaller](http://railsinstaller.org/en)自动配置好ruby、rails、Devkit等
，记得勾选添加到环境变量。

检查ruby安装是否成功，'ruby -v'

**2.安装dryrun**
[dryrun Try the demo project of any Android Library](https://github.com/cesarferreira/dryrun)

```
gem install dryrun
```
**3.运行demo**
值得注意的是，先用usb连接到手机，这里好像不支持无线调试的方式
```
dryrun git@github.com:cesarferreira/android-helloworld.git
```
![](http://static.mindcont.com/blog/images/coding/android/dryrun-success.jpg)

附上我一张图

![](http://static.mindcont.com/blog/images/coding/android/hello-world.jpg)

## 有用的链接
[stormzhang的博客](http://stormzhang.com/friends/)
[ANDROID通过WIFI来调试你的应用](http://stormzhang.com/android/2014/08/27/adb-over-wifi/)
[Android 调试桥](https://developer.android.com/studio/command-line/adb.html)
[教你一招最屌的阅读开源项目的姿势](http://stormzhang.com/2016/10/19/how-to-read-and-run-the-demo/)
