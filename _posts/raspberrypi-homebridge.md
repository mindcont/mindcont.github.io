---
title: 玩转树莓派第一弹：HomeBridge控制LED灯
date: 2018-01-03 20:06:32
tags: 树莓派
categories: 物联
toc: true
---

<!-- <img src="https://github.com/mindcont/mindcont.github.io/raw/master/images/iot/homebridge_mi.png?imageMogr2/thumbnail/!70p"> -->
<img src="https://github.com/mindcont/mindcont.github.io/raw/master/images/iot/homebridge_mi.png" width="500px">

<!--more-->

<!-- 本文的功能主旨 -->
作为玩转树莓派的第一弹，这里我们将借助iPhone 和 树莓派3b 实现通过Siri语音控制LED灯开关的功能。如上图控制逻辑类似，这里我们使用`HomeBridge`作为桥梁，将Siri 的语音指令发送给树莓派，然后一个插件控制gpio 27引脚上LED灯的亮灭。

Demo

<video src="http://cdn-mindcont.opengps.cn/videos/cube-robot.mp4" controls="controls" style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">
your browser does not support the video tag
</video>

Let's begin ！！！

## 硬件层

### 本期物料清单

1、树莓派3b（默认ssh 打开）    一个
2、iPhone (ios 10以上版本)    一个
3、LED二极管                  一个
4、杜邦线                     两根
5、电阻                       若干
5、笔记本（mac/win）          一台

其他，诸如树莓派电源（5v 2.5A），HDMI显示器连接线，读卡器等树莓派必备配件应该有。如果没有HDMI显示器连接线，可以参考[win10连结ubuntu 远程桌面](http://blog.mindcont.com/2016/05/12/win10-ubuntu-remote-desktop/)进行远程查看。

### 树莓派3b
<img src="/images/iot/raspberrypi_3b.jpg" width="384px">

规格参数，

**SOC**: Broadcom BCM2837芯片
**CPU**: 四核Cortex-A53@1.2GHz，ARMv8架构，32KB一级缓存 512KB二级缓存
**GPU**: 双核VideoCore IV GPU@400MHz，3D core@300MHz，OpenGL ES 2.0，1080p 60fps h.264/MPEG-4 AVC
**工作温度范围**: SOC-40~85°C，LAN9514(0~70°C)
**内存**：1GB LPDDR2（900 MHz）
**SMSC LAN9514**：4个USB2.0 和10/100M Ethernet共享
**BCM43438**：WiFi（802.11 b/g/n 2.4GHz）和蓝牙4.1（BLE）,支持无线电
**GPIO**: 40-pin
**视频接口**：HDMI1.4
**接口**：DSI显示屏接口（15-pin）、CSI 2 摄像头接口（15-pin）、3.5mm复合视频输出口、microSD接口
**供电**：支持5V 2.5A

GPIO引脚图，
<img src="/images/iot/raspberrypi_3b_gpio.png" width="512px">

管脚驱动电流， 详细参见[官方说明](https://www.raspberrypi.org/help/faqs/#POWER)。
<pre>
<table>
    <thead>
        <tr>
            <th style="text-align:left"></th>
            <th style="text-align:center"></th>
            <th style="text-align:center">Pi1 (B+)</th>
            <th style="text-align:center">Pi2 B</th>
            <th style="text-align:center">Pi3 B (amps)</th>
            <th style="text-align:center">Zero (amps)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align:left">Boot</td>
            <td style="text-align:center">Max</td>
            <td style="text-align:center">0.26</td>
            <td style="text-align:center">0.40</td>
            <td style="text-align:center">0.75</td>
            <td style="text-align:center">0.20</td>
        </tr>
        <tr>
            <td style="text-align:left"></td>
            <td style="text-align:center">Avg</td>
            <td style="text-align:center">0.22</td>
            <td style="text-align:center">0.22</td>
            <td style="text-align:center">0.35</td>
            <td style="text-align:center">0.15</td>
        </tr>
        <tr>
            <td style="text-align:left">Idle</td>
            <td style="text-align:center">Avg</td>
            <td style="text-align:center">0.20</td>
            <td style="text-align:center">0.22</td>
            <td style="text-align:center">0.30</td>
            <td style="text-align:center">0.10</td>
        </tr>
        <tr>
            <td style="text-align:left">Video playback (H.264)</td>
            <td style="text-align:center">Max</td>
            <td style="text-align:center">0.30</td>
            <td style="text-align:center">0.36</td>
            <td style="text-align:center">0.55</td>
            <td style="text-align:center">0.23</td>
        </tr>
        <tr>
            <td style="text-align:left"></td>
            <td style="text-align:center">Avg</td>
            <td style="text-align:center">0.22</td>
            <td style="text-align:center">0.28</td>
            <td style="text-align:center">0.33</td>
            <td style="text-align:center">0.16</td>
        </tr>
        <tr>
            <td style="text-align:left">Stress</td>
            <td style="text-align:center">Max</td>
            <td style="text-align:center">0.35</td>
            <td style="text-align:center">0.82</td>
            <td style="text-align:center">1.34</td>
            <td style="text-align:center">0.35</td>
        </tr>
        <tr>
            <td style="text-align:left"></td>
            <td style="text-align:center">Avg</td>
            <td style="text-align:center">0.32</td>
            <td style="text-align:center">0.75</td>
            <td style="text-align:center">0.85</td>
            <td style="text-align:center">0.23</td>
        </tr>
    </tbody>
</table>
</pre>

## 软件层
这一部分重点参考了 [树莓派安装homekit](https://paine1690.github.io/2017/05/25/raspi/%E6%A0%91%E8%8E%93%E6%B4%BE%E5%AE%89%E8%A3%85homekit/)。

### 依赖包

```java
## 安装nodejs

curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs

## 安装libavahi-compat-libdnssd-dev

sudo apt-get -y install libavahi-compat-libdnssd-dev
```
如果你的树莓派是最新的系统，在安装`libavahi-compat-libdnssd-dev`的时候，应该会报一个如下依赖错误：

```json
libavahi-compat-libdnssd-dev : Depends: libavahi-client-dev but it is not 
going to be installed

E: Unable to correct problems, you have held broken packages.
```

这是因为libdbus的版本过高而导致的依赖冲突，使用aptitude 解决依赖问题。更多参考[邻家的の柠檬叔](https://www.douban.com/note/619209826/)

```php
## 如果安装过 aptitude，则跳过，直接执行第二条指令
sudo apt-get install aptitude
sudo aptitude install libavahi-compat-libdnssd-dev

```

而`aptitude`会给出一系列的建议，仔细观察，然后根据你的情况选择是（y）或者否（n）。我这里第二次才给出正确的建议。

```json
The following NEW packages will be installed:
  libavahi-client-dev{a} libavahi-common-dev{a} libavahi-compat-libdnssd-dev libavahi-compat-libdnssd1{a} libdbus-1-dev{ab}
0 packages upgraded, 5 newly installed, 0 to remove and 1 not upgraded.
Need to get 401 kB of archives. After unpacking 1,160 kB will be used.
The following packages have unmet dependencies:
 libdbus-1-dev : Depends: libdbus-1-3 (= 1.8.20-0+deb8u1) but 1.8.22-0+deb8u1 is installed.
The following actions will resolve these dependencies:
     Keep the following packages at their current version:
1)     libavahi-client-dev [Not Installed]
2)     libavahi-compat-libdnssd-dev [Not Installed]
3)     libdbus-1-dev [Not Installed]
Accept this solution? [Y/n/q/?] n
The following actions will resolve these dependencies:
     Downgrade the following packages:
1)     libdbus-1-3 [1.8.22-0+deb8u1 (now) -> 1.8.20-0+deb8u1 (stable)]
Accept this solution? [Y/n/q/?] Y
The following packages will be DOWNGRADED:
  libdbus-1-3
The following NEW packages will be installed:
  libavahi-client-dev{a} libavahi-common-dev{a} libavahi-compat-libdnssd-dev libavahi-compat-libdnssd1{a} libdbus-1-dev{a}
0 packages upgraded, 5 newly installed, 1 downgraded, 0 to remove and 1 not upgraded.
Need to get 550 kB of archives. After unpacking 1,159 kB will be used.
Do you want to continue? [Y/n/?] Y
Get: 1 http://mirrors.sohu.com/raspbian/raspbian/ jessie/main libavahi-compat-libdnssd1 armhf 0.6.31-5 [42.9 kB]
Get: 2 http://mirrors.sohu.com/raspbian/raspbian/ jessie/main libdbus-1-3 armhf 1.8.20-0+deb8u1 [149 kB]
```

### npm镜像（可选）
npm全称Node Package Manager，是node.js的模块依赖管理工具。
因为`homebridge`需要通过npm安装，但是由于npm的源在国外，所以国内用户使用起来各种不方便。你这里可以选择是否对npm 设置国内镜像。

```java
1.临时使用
npm --registry https://registry.npm.taobao.org install express

2.永久使用
npm config set registry https://registry.npm.taobao.org

// 配置后可通过下面方式来验证是否成功
npm config get registry
// 或
npm info express
```

### HomeBridge

[Homebridge](https://github.com/nfarina/homebridge)是一个轻量级的NodeJS服务器，您可以在您的家庭网络上运行，模拟iOS HomeKit API。它支持插件，它是社区贡献的模块，提供了从HomeKit到“智能家居”设备制造商提供的各种第三方API的基本桥梁。

总的来讲，就是通过`Homebridge`，使得原先没有认证的智能家居模块可以使用 苹果“家庭”应用或Siri 进行语音控制。

安装 homebridge：
```
sudo npm install -g --unsafe-perm homebridge
```
众多的社区插件，可以通过[探索其他插件](https://www.npmjs.com/search?q=homebridge-plugin)。
本次我们将利用`wiringpi`树莓派GPIO的库 和 `homebridge-gpio-wpi2`插件来实现使用siri控制LED灯的亮灭。

```java
sudo apt-get install wiringpi
sudo npm install -g homebridge-gpio-wpi2
```
## 联调

### 硬件连接

在启动homebridge 之前，首先将LED 发光`二极管正极`，通过杜邦线连接在 树莓派 gpio 口的`27` 管脚，也就是 靠近芯片那一侧，从上往下数第7个管脚。`二极管负极`，通过另一根杜邦线连接在 树莓派gpio的ground 管脚，我这里选择是第`39`管脚。

**注意**，插杜邦线要注意正负极，配合管脚图谨慎操作，避免树莓派gpio口被烧坏。请根据自己二极管可承受电流，选择性使用电阻来限流。

### 软件配置
在普通用户pi家目录 新建`/home/pi/.homebridge/config.json`文件，复制以下内容到`config.json` ，保存。
```json

{
        "bridge": {
                "name": "Homebridge",
                "username": "CC:22:3D:E3:CE:30",
                "port": 51826,
                "pin": "133-45-678"
        },
        "platforms": [{
                 "platform" : "WiringPiPlatform",
                "name" : "Pi GPIO (WiringPi)",
                "overrideCache" : "true",
                "autoExport" : "true",
                "gpiopins" : [{
                        "name" : "灯",
                        "pin"  : 27,
                        "enabled" : "true",
                        "mode" : "out",
                        "pull" : "down",
                        "inverted" : "false",
                        "duration" : 0,
                        "polling" : "true"
                        },{
                        "name" : "门",
                        "pin"  : 22,
                        "enabled" : "true",
                        "mode" : "in",
                        "pull" : "off",
                        "inverted" : "false",
                        "duration" : 0
                }]
        }]
}
```
在命令行输入`homebridge`启动,如下图说明启动成功

<img src="https://github.com/mindcont/mindcont.github.io/raw/master/images/iot/homebridge.png" width=400x>

如果你的iPhone 和树莓派在同一局域网下， 打开`家庭`应用，会自动显示可配对的设备`homebridge`,通过扫描或输入 类似`133-45-678`即可添加成功。

<img src="https://github.com/mindcont/mindcont.github.io/raw/master/images/iot/ios_home.JPG" width=256px>

赶快试试开关吧，这时你也可以通过Siri 进行控制了呢。输入日志如下
```json
6-80f9-017adae59b93
[2018-1-4 15:31:11] [Pi GPIO (WiringPi)] Turning off pin #27
[2018-1-4 15:31:11] [Pi GPIO (WiringPi)] 门 Configure GPIO Pin 57b3e135-6285-404b-9c47-a2f46ec4426b
[2018-1-4 15:31:11] [Pi GPIO (WiringPi)] Setting up interrupt callback
Setup Payload:
X-HM://0023OVLOU45DL
Scan this code with your HomeKit app on your iOS device to pair with Homebridge:
.
.
.
Or enter this code with your HomeKit app on your iOS device to pair with Homebridge:
                       
    ┌────────────┐     
    │ 133-45-678 │     
    └────────────┘     
                       
[2018-1-4 15:31:11] [Pi GPIO (WiringPi)] Loading cached GPIO pins complete
[2018-1-4 15:31:11] Homebridge is running on port 51826.
[2018-1-4 15:32:35] [Pi GPIO (WiringPi)] Turning on pin #27
[2018-1-4 15:32:36] [Pi GPIO (WiringPi)] Turning off pin #27

```

## 参考

* [1] [国内优秀npm镜像推荐及使用](http://riny.net/2014/cnpm/)
* [2] [树莓派安装homekit](https://paine1690.github.io/2017/05/25/raspi/%E6%A0%91%E8%8E%93%E6%B4%BE%E5%AE%89%E8%A3%85homekit/)
* [3] [树莓派进阶（一）：借助树莓派与 HomeBridge，从米家到 HomeKit](https://www.jianshu.com/p/ec79b2711bd5)
* [4] [探索其他插件](https://www.npmjs.com/search?q=homebridge-plugin)
* [5] [树莓派3B规格+GPIO引脚图+负载电流参考](https://www.jianshu.com/p/a255c22b96fa)
* [6] [有趣的树莓派项目](https://blog.mindcont.com/2016/05/05/raspberry-pi-excellent-project/)
* [7] [家具变智能：用HomeKit+Siri声控家里电器](http://shumeipai.nxez.com/2017/09/04/homekit-and-siri-voice-control-home-appliances.html)
* [8] [利用 HomeAssistant +树莓派+ Amazon Echo 的智能家居实践（二）—— 初识 HomeAssistant](http://kittenyang.com/homeassistant_practice_02/)
