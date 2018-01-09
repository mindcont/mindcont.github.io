---
title: 使用OpenWrt打造透明路由
date: 2016-11-15 20:32:36
tags: openwrt
categories: 物联
toc: ture
---

Openwrt是用于路由器的高度模块化，高度智能化的嵌入式Linux发行版，具有强大的扩展性，有数百个编译好的软件可供安装。Openwrt版本的Shadowsocks，具有透明代理，UDP转发等功能，透明代理实现流量转发，DNS的污染问题则通过UDP转发解决(DNS查询使用UDP协议)。


## 前提
本方案实施的前提条件：一台支持刷为Openwrt的路由器，一台PC机，Shadowscosks账号。

## 思路
本方案翻墙流程大致如下：客户端发出某域名的DNS请求–>chinadns解析–>解析到的IP存入ipset表中–>设置iptables规则，ipset表中的ip地址全部走SS代理端口–>正常浏览被墙网站。

* 路由器网络(Network)->DHCP and DNS 即（dnsmasq进程）将所有的dns解析任务转发到本地127.0.0.1:5353 端口

* chinadns 监听本地5353端口，分别对国内IP和国外Ip双向过滤，并向它的上一级请求219.149.6.99（ISP供应商）和8.8.8.8（谷歌DNS）,从而实现国内国外走不同的线路。

* 再配置ipset表和iptables规则，将解析到的IP存入ipset表中–设置iptables规则，ipset表中的ip地址（即dnsmasq.d/dnsmasq_list.conf.conf文件中的地址）全部走SS代理端口(如本地1080端口)–正常浏览被墙网站。

* 而这里的shadowsocks中的ss-redir 负责监听本地端口1080，负责将收到的包经由ss，加密socks代理至ss服务器。

## 配置
### 安装shasowsocks和chinadns
![](http://static.mindcont.com/blog/images/images/iot/openwrt/shadowsocks-install.png)
chinadns 的安装过程类似。

### 配置Shadowsocks
在windows下使用SSH工具，如[Putty](http://www.chiark.greenend.org.uk/~sgtatham/putty/)等，在Host name 填写192.168.1.1，端口22 ，然后点击 Open.
![](http://static.mindcont.com/blog/images/images/iot/openwrt/putty.png)

在linux下，打开终端输入
```
ssh root@192.168.1.1
```
输人密码（默认 admin）登陆,如下图所示
![](http://static.mindcont.com/blog/images/images/iot/openwrt/welcome.png)

配置 /etc/shadowsocks.json：运行命令vi /etc/shadowsocks.json，格式如下：

```
{
"server": "X.X.X.X",    #这里填写你的SS服务器IP
"server_port": 443,     #SS服务器端口
"local_port": 1080,     #本地端口1080
"password": "password", # 密码
"timeout": 60,          # 超时时间
"method": "chacha20"    # 加密方式
}

按　esc ，输入：wq! 保存
```
修改 /etc/init.d/shadowsocks，通过指令vi /etc/init.d/shadowsocks 注释掉ss-local，取消掉ss-redir（透明代理）。格式如下：
```
#!/bin/sh /etc/rc.common

START=95

SERVICE_USE_PID=1
SERVICE_WRITE_PID=1
SERVICE_DAEMONIZE=1

CONFIG=/etc/shadowsocks.json

start() {
        #service_start /usr/bin/ss-local -c $CONFIG -b 0.0.0.0
        service_start /usr/bin/ss-redir -c $CONFIG -b 0.0.0.0
        #service_start /usr/bin/ss-tunnel -c $CONFIG -b 0.0.0.0 -l 5353 -L 8.8.8.8
}

stop() {
        #service_stop /usr/bin/ss-local
        service_stop /usr/bin/ss-redir
        #service_stop /usr/bin/ss-tunnel
}

按　esc ，输入：wq! 保存
```

### 配置dnsmasq和ipset

修改 /etc/dnsmasq.conf
```
cd /etc
ls
vi dnsmasq.conf
```
在文本末尾填写如下内容
```
# add this for dnsmasq config 2016/11/15                              
conf-dir=/etc/dnsmasq.d  

按　esc ，输入：wq! 保存
```
新建并进入目录 /etc/dnsmasq.d，下载[dnsmasq_list.conf](http://pan.baidu.com/s/1pKl8AgV)并放在该目录下（本人仅添加了谷歌，Youtube，脸书，推特等等常用域名，该列表持续更新中。注意域名太多反而会影响dnsmasq的性能！）。
```
mkdir dnsmasq.d
cd dnsmasq.d

# 将下载的dnsmasq_list.conf 放到dnsmasq.d 目录下
# windows 下可通过winscp 工具上传
# linux 下通过  scp pi@192.168.113:/home/pi/dnsmasq_list.conf .
```
### Luci界面配置
这一部分我们通过openwrt 的web管理界面进行配置。在浏览器输入 192.168.1.1 登录路由器管理界面，默认账户root 默认密码：admin。

#### 配置路由器DNS(dnsmasq)

进入网络(Network)->DHCP and DNS。
将DNS解析端口设置为127.0.0.1#5353。这将使得路由器将DNS请求经由dnsmasq全部转发至ChinaDNS处理。
![](http://static.mindcont.com/blog/images/images/iot/openwrt/dhcp.png)

勾选“忽略解析文件”(ignore resolve file), 保存并应用
![](http://static.mindcont.com/blog/images/images/iot/openwrt/dhcp_hosts.png)

#### ChinaDNS配置
在路由器web管理页面，进入服务(Services)->ChinaDNS
本地端口写5353，中国路由表(CHNRoute File)填/etc/chinadns_chnroute.txt
上游DNS服务器填114.114.114.114,.8.8.8.8。（可将114.114.114.114改成当前ISP提供的DNS服务器IP）
保存并应用
![](http://static.mindcont.com/blog/images/images/iot/openwrt/chinadns.png)

这样设置后，从内网主机端发出的国外DNS请求将发送至：dnsmasq->ChinaDNS->8.8.8.8，
国内DNS请求则：dnsmasq->ChinaDNS->114.114.114（或你的ISP供应商的DNS）。

#### shadowsocks 配置
进入服务(Services)->ShadowSocks 。访问控制－>接口-WAN 被忽略的IP 列表选择 chinadns路由表,保存并应用。
![](http://static.mindcont.com/blog/images/images/iot/openwrt/shadowsocks_udp.png)

#### 自定义防火墙
进入Luci界面-网络-防火墙-自定义规则，加入以下规则（最后的1080是Shadowsocks的本地端口，请酌情修改）：
```
ipset -N gfwlist iphash
iptables -t nat -A PREROUTING -p tcp -m set --match-set gfwlist dst -j REDIRECT --to-port 1080
iptables -t nat -A OUTPUT -p tcp -m set --match-set gfwlist dst -j REDIRECT --to-port 1080
```
如下图所示
![](http://static.mindcont.com/blog/images/images/iot/openwrt/iptable.png)

### 调试
路由器**重启后**，即可无界访问了。如果遇到问题，请打开**下面的参考链接**。可以通过　netstat -nl 查看当前活动的链接，看看相应的端口是否已经打开。
```
root@DEEPMIND:~# netstat -nl
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       
tcp        0      0 0.0.0.0:139             0.0.0.0:*               LISTEN      
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      
tcp        0      0 0.0.0.0:53              0.0.0.0:*               LISTEN      
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      
tcp        0      0 0.0.0.0:1080            0.0.0.0:*               LISTEN      
tcp        0      0 0.0.0.0:445             0.0.0.0:*               LISTEN      
tcp        0      0 :::139                  :::*                    LISTEN      
tcp        0      0 :::80                   :::*                    LISTEN      
tcp        0      0 :::53                   :::*                    LISTEN      
tcp        0      0 :::22                   :::*                    LISTEN      
tcp        0      0 :::445                  :::*                    LISTEN      
udp        0      0 127.0.0.1:53001         0.0.0.0:*                           
udp        0      0 0.0.0.0:53              0.0.0.0:*                           
udp        0      0 0.0.0.0:67              0.0.0.0:*                           
udp        0      0 0.0.0.0:35696           0.0.0.0:*                           
udp        0      0 192.168.1.255:137       0.0.0.0:*                           
udp        0      0 192.168.1.1:137         0.0.0.0:*                           
udp        0      0 0.0.0.0:137             0.0.0.0:*                           
udp        0      0 192.168.1.255:138       0.0.0.0:*                           
udp        0      0 192.168.1.1:138         0.0.0.0:*                           
udp        0      0 0.0.0.0:138             0.0.0.0:*                           
udp        0      0 0.0.0.0:5353            0.0.0.0:*                           
udp        0      0 0.0.0.0:54250           0.0.0.0:*                           
udp        0      0 :::547                  :::*                                
udp        0      0 :::53                   :::*                                
raw        0      0 0.0.0.0:1               0.0.0.0:*               1           
raw        0      0 ::%4559988:58           :::*                    58          
raw        0      0 ::%4559988:58           :::*                    58          
Active UNIX domain sockets (only servers)
Proto RefCnt Flags       Type       State         I-Node Path
unix  2      [ ACC ]     STREAM     LISTENING       2315 /var/nmbd/unexpected
unix  2      [ ACC ]     STREAM     LISTENING        379 /var/run/ubus.sock
```

通过　top 查看当前活动进程。下图是我配置好以后的运行进程。
```
Mem: 26204K used, 3300K free, 0K shrd, 1908K buff, 6840K cached
CPU:   1% usr   0% sys   0% nic  96% idle   0% io   0% irq   1% sirq
Load average: 0.00 0.01 0.05 2/45 11322
  PID  PPID USER     STAT   VSZ %VSZ %CPU COMMAND
 1891     1 root     S     1732   6%   1% /usr/sbin/hostapd -P /var/run/wifi-ph
  916     1 root     S     1544   5%   0% /sbin/netifd
11309   993 root     S     1216   4%   0% /usr/sbin/dropbear -F -P /var/run/dro
 1574     1 root     S     1484   5%   0% {mwan3track} /bin/sh /usr/sbin/mwan3t
11320 11312 root     R     1484   5%   0% top
  882     1 root     S     1048   4%   0% /sbin/logd -S 16
 1413     1 root     S      832   3%   0% /usr/bin/chinadns -p 5353 -s 219.149.
 1387     1 root     S     8912  30%   0% /usr/sbin/collectd
 1325     1 root     S     3180  11%   0% /usr/sbin/nmbd -D
 1323     1 root     S     3088  10%   0% /usr/sbin/smbd -D
 1434     1 root     S     3040  10%   0% /usr/bin/ss-redir -c /etc/shadowsocks
 1371     1 nobody   S     2068   7%   0% /usr/sbin/dnsmasq -C /var/etc/dnsmasq
 1028     1 root     S     1580   5%   0% /usr/sbin/uhttpd -f -h /www -r OpenWr
 1463     1 root     S     1484   5%   0% /usr/sbin/ntpd -n -p 0.openwrt.pool.n
  975     1 root     S     1484   5%   0% /usr/sbin/crond -f -c /etc/crontabs -
11312 11309 root     S     1484   5%   0% -ash
11322  1574 root     S     1472   5%   0% sleep 5
    1     0 root     S     1420   5%   0% /sbin/procd
  953     1 root     S     1184   4%   0% /usr/sbin/odhcpd
  993     1 root     S     1148   4%   0% /usr/sbin/dropbear -F -P /var/run/dro

```

## 参考
* [教你如何实现Openwrt路由器智能翻墙](https://php-rmcr7.rhcloud.com/openwrt-fq/)
* [在 OpenWRT 上使用 ShadowSocks 建立透明代理](http://undownding.me/2015/02/10/use-shadowsocks-on-openwrt/)
* [OpenWRT路由器上的ShadowSocks+ChinaDNS搭梯子方案](https://blog.chionlab.moe/2016/01/23/openwrt-bypass-gfw-solution/)
* [路由器刷OpenWRT安装shadowsocks使用透明代理+去DNS污染](https://www.logcg.com/archives/860.html)
* [路由器刷OpenWRT使用ShadowSocks透明代理进阶配置](https://www.logcg.com/archives/868.html)
* [ChinaDNS+ShadowSocks实现路由器透明代理](https://www.shintaku.cc/2016/06/01/chinadns/)
