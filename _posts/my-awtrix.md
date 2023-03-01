---
title: 复刻一个 WIFI 像素时钟
date: 2020-05-30 00:23:31
tags:
---
在知乎闲逛DIY作品，发现国外大神[AWTRIX 2.0](https://docs.blueforcer.de/#/v2/) 基于wifi 的像素时钟很炫酷、开源、材料易得随打算复刻一个。制作过程网上已有很多资料，不多说，上作品。

<video src="https://cdn.mindcont.com/videos/my_awtrix_diy_demo.mp4" controls="controls" style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;"><br>your browser does not support the video tag<br></video>

### 使用手册

#### 用途/功能

1、计时器和秒表功能
2、强大的API接口，例如MQTT和REST
用于IFTTT等外部服务，支持IOS 快捷指令显示短消息
3、使用友，好可通过Web界面完成配置
4、集成的Appstore添加应用
5、支持自定义提醒、应用显示

#### 运行环境

接口：USB Mini 
输入电压：DC 5V 2A

#### 初始化

STEP1:
将设备接入电源，此时屏幕会显示如下
![](https://cdn.mindcont.com/blog/images/m_awtrix_hostpot.jpg)

拿起手机/笔记本 扫描WIFI网络，此时有 “AWTRIX Controller ”的热点，连接该热点

STEP2:
当手机连接到该热点后，会自动跳转到 http://172.217.28.1 网页上，如下图，此时类似于家用路由器配置界面
<img src="https://cdn.mindcont.com/blog/images/m_awtrix_config_step1.jpg" width="50%">

STEP3: 
选择 第一个按钮“Configure Controller”
<img src="https://cdn.mindcont.com/blog/images/m_awtrix_config_step2.jpg" width="50%">

STEP4:
此时设备会自动扫描本地附近热点，选择你的热点。
其中SSID 表示你的热点名称，Password 表示你的热点密码。


STEP5:
当你输入完成后，设备会自动重启。正常显示下图，就进入联网模式，动态显示预先设定好的APP。
![](https://cdn.mindcont.com/blog/images/m_awtrix.png)

ENJOY~ AND HAVE FUN.

#### 出错处理和恢复
Q1：使用一段时间后，接入电源不良
A： 排查输入电压是否有电？接口是否松动？可通过背板螺丝拆开，拧好各接口线路


Q2:屏幕亮，但没有动态显示
A:重新上电，观察是否有 WIFI （对勾）表示已连接到本地网络。观察上电是否显示 服务端IP信息，类似“172.X.X.X:9001” 字样


### 参考链接
[1] [AWTRIX 2.0 Docs](https://docs.blueforcer.de/#/v2/)

[2] [3D Print](https://www.thingiverse.com/thing:2791276/files)

[3] [如何制作一个 WIFI 像素时钟](https://pengchujin.github.io/post/a46d7696.html)

[4] [IOS 快捷指令](https://www.bilibili.com/video/av51122911/)
