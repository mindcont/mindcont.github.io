---
title: 二手华为路由hg255d刷OpenWrt
date: 2016-10-27 10:40:52
tags: openwrt
categories: 物联
toc: ture
---
**刷机有危险，刷机前请做好相关知识储备！！！**
**刷机有危险，刷机前请做好相关知识储备！！！**
**刷机有危险，刷机前请做好相关知识储备！！！**
重要的话儿，说三遍～
<!--more-->
本文仅适合 华为hg255d v4 版本路由，某宝入手二手华为hg255d路由器，CPU: Ralink RT3052F Flash:4M RAM:32M 此为背景。硬改可参考[2].

![](/images/iot/hg255d/hg255d-1.jpg)
![](/images/iot/hg255d/hg255d-2.jpg)

### 连接路由，上传u-boot
设置本地连接为 192.168.1.100  子网掩码：255.255.255.0 网关丶DNS不用填写（以后只要更新固件就是192.168.1.100的固定ip切记切记），网线与hg255d连接好，保持机器关闭状态.

![](/images/iot/hg255d/hg255d-3.jpg)

先在浏览器输入http://192.168.1.1/upload.html 然后按住路由的reset键并接通电源，保持reset按住，浏览器刷新，大约十秒左右就可以进入如图所示的界面
![](/images/iot/hg255d/hg255d-4.jpg)

此时一定要抓紧选择ralink.bin（此固件内已包含改版u-boot和电信原版u-boot，后面u-boot-rom-hg255d_hg256.bin是升级用的）固件并开始刷入，因为在10-20秒以后，路由将正常启动，页面输入固件将会失败。切记速度！！！

lan口灯狂闪，ralink固件写入结束，大约5min之后路由**会自动重启**，稍等片刻在浏览器中输入192.168.1.1帐号密码同为admin.进入ralink的设置界面.
![](/images/iot/hg255d/hg255d-5.jpg)

### 刷u-boot
u-boot 即Bootloader ,从设备加电到启动系统这段时间内固化这主板上的一段代码块，同电脑的BIOS类似。刷u-boot，只需要执行一个shell就可以了.找到 系统管理->系统指令。
```
执行命令：/hg255d/hg255d-flash-uboot.sh   提交一下
```
![](/images/iot/hg255d/hg255d-6.jpg)

大约1-2秒就结束了，很快的，然后**手动重启路由器**。路由重启后，只要是电源灯频闪基本上就说明刷u-boot成功了.（如想恢复电信原固件，用tftp重刷ralink.bin固件，执行/hg255d/hg255d-flash-tel-uboot.sh就OK了）

### 刷openwrt
还是开机的时候按住wps/wlan/reset按钮任一按钮，然后刷入固件openwrt-ramips-rt305x-hg255d-squashfs-sysupgrade.bin.** 当进度条上传完成，不要断电和动路由器，路由器会自动重启**
![](/images/iot/hg255d/hg255d-7.jpg)


写入固件大约10秒钟，此时电源灯为常亮，然后大约是5分钟的等待时间，电源灯会灭一下，然后频闪，之后稍等一会就可以192.168.1.1进入openwrt ...
![](/images/iot/hg255d/hg255d-8.jpg)
默认账号：root 密码：admin，然后你就可以看到下面的画面
![](/images/iot/hg255d/hg255d-9.jpg)

**固件和工具**
链接：http://pan.baidu.com/s/1bpMd0OB 密码：zhe0

### 配置网络
这一部分参考老高[4]的博客，来简要介绍openwrt中br-lan,eth0,eth0.1,eth0.2 这几个接口的意思。
![](/images/iot/hg255d/hg255d-10.png)

#### 有线网配置
openwrt的有线网络配置文件位于/etc/config/network，参考老高[4]的配置如下：
```
config interface 'loopback' # 本地回环地址
    option ifname 'lo'
    option proto 'static'
    option ipaddr '127.0.0.1'
    option netmask '255.0.0.0'

config globals 'globals'
    option ula_prefix 'auto'

config interface 'lan' # 内网口，默认地址192.168.1.1
    option ifname 'eth0.1'
    option force_link '1'
    option type 'bridge'
    option proto 'static'
    option ipaddr '192.168.1.1' # 如果用openwrt做二级路由，且与一级路由地址192.168.1.1冲突，可修改这里
    option netmask '255.255.255.0'
    option ip6assign '60'
    option macaddr '64:09:80:05:e1:bb'

config interface 'wan' # 外网口
    option ifname 'eth0.2'
    option _orig_ifname 'eth0.2'
    option _orig_bridge 'false'
    option proto 'pppoe' # 可以看出这里使用光纤拨号的方式
    option macaddr '64:09:80:05:e1:bc' # mac 地址
    option username '11100026295' # 宽带账号
    option password '380926' # 宽带密码

config interface 'wan6' # ipv6 不用动
    option _orig_ifname '@wan'
    option _orig_bridge 'false'
    option proto '6to4'

config switch # 交换机
    option name 'mt762x'
    option reset '1'
    option enable_vlan '1'

config switch_vlan # 虚拟出两个 vlan (可以将物理地址屏蔽开，用于不同网段之间通信)，这里是vlan 1
    option device 'mt762x'
    option vlan '1'
    option ports '0 1 2 3 5 6t'

config switch_vlan # 这里是vlan2
    option device 'mt762x'
    option vlan '2'
    option ports '4 6t'
```
#### 无线网络配置
openwrt的无线网络配置文件位于/etc/config/wireless，配置如下：
```
config wifi-device 'rai0'
    option type 'mt7612'
    option mode '14'
    option channel 'auto'
    option txpower '100'
    option ht '20+40+80'
    option country 'US'
    option disabled '0'

config wifi-iface
    option device 'rai0'
    option network 'lan'
    option mode 'ap'
    option ssid 'BYBY_WORLD' # 2.4G 热点名称
    option encryption 'psk2' # 加密方式
    option key 'xxx'

config wifi-device 'ra0'
    option type 'rt2860v2'
    option mode '9'
    option channel 'auto'
    option txpower '100'
    option ht '40'
    option country 'US'
    option disabled '0'

config wifi-iface
    option device 'ra0'
    option network 'lan'
    option mode 'ap'
    option wps 'pbc'
    option ssid 'HELLO_WORLD' # 5G 热点名称
    option encryption 'psk2' # 加密方式
    option key 'xxx'
```
#### 名词解释
* II. pppoe-wan
虚拟设备，他就是常见的拨号宽带上网，需要有ISP提供的用户名密码，连接后方可激此接口！

* III. lo
虚拟设备，自身的回环网设备。

* IV. ra0 rai0
这两个是成对出现，一看就知道是无线设备，它们各自对应一个SSID，分别是2.4G和5G。

* V. 虚拟局域网
开启虚拟局域网 对应 config switch.划分子网 你可以在网络->交换机中找到！
![](/images/iot/hg255d/hg255d-11.png)
对照着图下面的配置应该很容易就懂了。
```
config switch_vlan
    option device 'mt762x'
    option vlan '1'
    option ports '0 1 2 3 5 6t'

config switch_vlan
    option device 'mt762x'
    option vlan '2'
    option ports '4 6t'
```
* VI. eth0
eth0是一块物理网卡。eth0.1 eth0.2都是从此设备上虚拟出来的。
```
eth0.1 是vlan1分出的lan口。
eth0.2 是vlan分出的wan口。
```
* VII. br-lan
虚拟设备，用于LAN口设备桥接，可以用brctl show查看使用情况。
```
~ brctl show

bridge name bridge id       STP enabled interfaces
br-lan      7fff.64098005e1bb   no      eth0.1 rai0 ra0
br-lan = eth0.1 + rai0 + ra0，即将有线LAN口和无线网统一划分为 LAN，便于管理！
```
### 参考
* [1 OpenWrt：HG255D华为路由器刷OpenWrt](http://www.jianshu.com/p/34f9c4963105)
* [2 历经曲折HG255D改造64M内存双SMA天线（独家改法）](http://forum.eepw.com.cn/thread/236267/1)
* [3 拆解Huawei(華為) HG255D-已經硬改64M內存 + 被動式散熱改造](http://www.right.com.cn/forum/thread-153163-1-1.html)
* [4 openwrt中br-lan,eth0,eth0.1,eth0.2](https://blog.phpgao.com/openwrt-interface.html)
