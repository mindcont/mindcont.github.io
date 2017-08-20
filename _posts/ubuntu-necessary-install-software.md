---
title: ubuntu 装机必备
date: 2016-10-27 09:47:28
tags:
categories: Linux
toc: ture
---
说linux，不得不从unix 发展历史和发行版本说起，由通用电气\AT&T\MIT 合作开发unix。在美苏冷战期间,美国国防部 ncp >tcp/ip 捆绑 unix 上。c 语言之父肯.汤普森 丹尼斯.里奇重写了unix 底层代码。

<!--more-->
UNIX发行版本
```
		AIX 	IBM 	PowerPC
		HP-UX 	HP 	PA-RISC
		Solaris sun	SPARC
		Linux	Red Hat ,ubuntu (Intel AMD)
```
<!--more-->
LINUX 发展历史，由芬兰大学 Linux Torvalds 开源的软件，而芬兰 企鹅 logo 极地动物,象征开源。

Linux架构图
![](http://static.mindcont.com/blog/images/ubuntu/linux_kernel.jpg)

其发行版本
![](http://static.mindcont.com/blog/images/ubuntu/linux.jpg)

各发行版的特点
![](http://static.mindcont.com/blog/images/ubuntu/linux-2.jpg)

```
 Redhat
       fedora 全功能版,不稳定
       centos 社区维护版 新浪,网易 服务都采用的版本
 红旗 Linux
 suse 欧洲用的多
```
linux 系统的应用领域
```
	基于linux的企业服务器
	嵌入式应用
	linux 在电影娱乐
```
linux 学习方法
```
	1 详细的报错信息 邮件称呼
	2 帮助文档,查找,实例
	3 英语
		COMMAND NOT FOUND   未找到 命令 ?
		NO SUCH file or directory  没有找到文件或者 地址?
	4 忘掉windows的思维方式
	5 计划 专注 坚持 练习
```

### 更改/home 分区挂载点
ubuntu 难免要弄坏，然后重装，重装的时候，可以将手动更改 /etc/fastab 这个文件来指定文件系统的加载位置。前提是从前系统的 /home 与/ 分区 不在同一个分区中。
```
sudo gedit /etc/fastab

# home was on /dev/sda9 during installation
UUID=9a1eabc7-17ef-4033-ae61-48549c0f1483 /home           ext4    defaults 	0       0
```
例如我修改后的，然后保存，重启。
```
# /etc/fstab: static file system information.
#
# Use 'blkid' to print the universally unique identifier for a
# device; this may be used with UUID= as a more robust way to name devices
# that works even if disks are added and removed. See fstab(5).
#
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
# / was on /dev/sda3 during installation
UUID=57006982-8ad1-442f-a7d6-c56ee2e68306 /               ext4    errors=remount-ro 0       1
# swap was on /dev/sda8 during installation
UUID=43060bdb-2b29-424f-88b7-84ad64de7851 none            swap    sw              0       0
# home was on /dev/sda9 during installation
UUID=9a1eabc7-17ef-4033-ae61-48549c0f1483 /home           ext4    defaults 	0       0
```
### 修改源
可以自定义 源，值得注意的是，当通过设置——》软件源——》服务器位置的时候，会重写掉我们自定义的文件。
```
sudo gedit /etc/apt/sources.list
```
然后添加下面，保存，更新即可。
```
## 中国的骨干源
deb http://cn.archive.ubuntu.com/ubuntu/ trusty main restricted universe multiverse
deb http://cn.archive.ubuntu.com/ubuntu/ trusty-backports main restricted universe multiverse
deb http://cn.archive.ubuntu.com/ubuntu/ trusty-proposed main restricted universe multiverse

deb-src http://cn.archive.ubuntu.com/ubuntu/ trusty main restricted universe multiverse
deb-src http://cn.archive.ubuntu.com/ubuntu/ trusty-backports main restricted universe multiverse

## 阿里云
deb http://mirrors.aliyun.com/ubuntu trusty main restricted
deb-src http://mirrors.aliyun.com/ubuntu trusty main restricted
deb http://mirrors.aliyun.com/ubuntu trusty multiverse
deb-src http://mirrors.aliyun.com/ubuntu trusty multiverse
deb http://mirrors.aliyun.com/ubuntu trusty-updates multiverse
deb-src http://mirrors.aliyun.com/ubuntu trusty-updates multiverse
deb http://mirrors.aliyun.com/ubuntu trusty-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu trusty-backports main restricted universe multiverse
```

### 常用软件
```
# 安装fcitx-googlepinyin 输入法
sudo apt-get install ibus-googlepinyin

# 新立得软件包 (synaptic) 和经典菜单(classicMenu Indicator)
sudo apt-get install synaptic

# 在任务栏显示网速
sudo add-apt-repository ppa:nilarimogard/webupd8
sudo apt-get update
sudo apt-get install indicator-netspeed
```
### pip 镜像加速
```bash
pip install notebook --upgrade -i https://pypi.tuna.tsinghua.edu.cn/simple
```
类似的还可以编辑全局文件~/.pip/pip.con实现自动使用镜像地址
```bash
On Unix and Mac OS X the configuration file is: $HOME/.pip/pip.conf
On Windows, the configuration file is: %HOME%\pip\pip.ini

# on Ubuntu LTS
cd ~
gedit .pip/pip.conf


[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```
### GCC 降级和多版本共存
查看已安装版本 gcc -v ,我们可以通过修改优先级的方法来实现gcc 、g++ 的多版本共存。

```
安装 gcc-4.7
sudo apt-get install gcc-4.7

设置当前系统两个版本gcc 及其优先级
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.7 80
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-5 60
```
通过输入下面的指令，查看当前 gcc 的配置情况
```
sudo update-alternatives --config gcc
```
```
pi@MINDCONT:~$ sudo update-alternatives --config gcc
有 2 个候选项可用于替换 gcc (提供 /usr/bin/gcc)。

  选择       路径            优先级  状态
------------------------------------------------------------
* 0            /usr/bin/gcc-4.7   80        自动模式
  1            /usr/bin/gcc-4.7   80        手动模式
  2            /usr/bin/gcc-5     60        手动模式
```

对于 g++ 同理 .
```
sudo apt-get install g++-4.7
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.7 80
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-5 60
sudo update-alternatives --config g++
pi@MINDCONT:~$ sudo update-alternatives --config g++

有 2 个候选项可用于替换 g++ (提供 /usr/bin/g++)。

  选择       路径            优先级  状态
------------------------------------------------------------
* 0            /usr/bin/g++-4.7   80        自动模式
  1            /usr/bin/g++-4.7   80        手动模式
  2            /usr/bin/g++-5     60        手动模式

要维持当前值[*]请按<回车键>，或者键入选择的编号：
```

### 安装 shadowsocks 客户端

```
sudo apt-get install python-pip
pip install shadowsocks
```
新建 gui-config.json 文件，将你的信息按照下面的格式填写后保存。
```
{
"server" : "your_server_ip",
"server_port" : server_port,
"local_port": 1080,
"password" : "password",
"method" : "rc4-md5"
}
```
可以通过命令行运行,注意换成你的路径
```
/usr/local/bin/sslocal -c /home/pi/work/ss/gui-config.json
```
然后在firefox 浏览器-》高级-》网络设置中选择，自定义
```
SOCKS5 地址 127.0.0.1 端口 1080
```
![](http://static.mindcont.com/blog/images/ubuntu/firefox_test.png)

如果这时能够正常访问 https://www.google.com/ncr ， 即说明 shadowsocks安装和你的配置文件都没有问题。

![](http://static.mindcont.com/blog/images/ubuntu/browser.png)

下面我们修改开机启动项，使它能够开机自启动
```
sudo gedit /etc/rc.local
```
在打开的文件中，将下面的指令修改为你的路径，这条命令是程序后台运行并将输出日志重定向到ss.log 文件里
```
nohup /usr/local/bin/sslocal -c /home/pi/work/ss/gui-config.json>/home/pi/work/shadowsocks/ss.log
```
通过autoproxy 文件实现，国内网站和国外网站走不同的线路
```
sudo pip install genpac
pip install --upgrade genpac

# 通过代理，下载autoproxy.pac 文件
genpac -p "SOCKS5 127.0.0.1:1080" --gfwlist-proxy="SOCKS5 127.0.0.1:1080" --output="~/autoproxy.pac"
```
在设置-》网络-》代理-》自定义，保存
```
file:///home/pi/work/shadowsocks/autoproxy.pac
```
![](http://static.mindcont.com/blog/images/ubuntu/autoproxy.png)

最后，在firefox 浏览器-》高级-》网络设置中选择，使用系统代理 。重启电脑后，再次访问 https://www.google.com/ncr 试试吧！

### 重装win后修复ubuntu grub引导
简单的方法是使用easyBCD新加一个grub2引导，位置选择自动。缺点，要想进入ubuntu 需要二次引导。
第二种方法是，使用 U盘 ubuntu live CD，改bios引导顺序，从u盘启动，选择第一项，进入试用模式
```
#查看当前硬盘所有分区
sudo fdisk -l
```
挂载 ubuntu /分区（这里假设 / 分区为/dev/sda7） 所在分区至 livecd /mnt
值得注意的是，这里我的/boot分区位于 / 分区下
```
#获取管理员权限
sudo -i

mount /dev/sda7 /mnt

#若 /boot 单独又分区了的话，也加载到 /mnt/boot下
mount /dev/sda7 /mnt/boot
```
重新安装grub
```
grub-install --boot-directory=/mnt /dev/sda
```
重启电脑后，我们硬盘上的ubuntu 引导应该找到了，此时进入ubuntu后打开终端，再次更新grub 寻找win的引导
```
sudo update-grub
```
如果顺利的话，你会看到这些（表示成功）：
```
Generating grub.cfg ...
Found linux image: /boot/vmlinuz-2.6.32-22-generic-pae
Found initrd image: /boot/initrd.img-2.6.32-22-generic-pae
Found memtest86+ image: /boot/memtest86+.bin
Found Windows 7 (loader) on /dev/sda3
done

```
