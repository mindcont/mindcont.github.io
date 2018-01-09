---
title: Ubuntu 14.04 安装 Nvidia 私有驱动并进行双显卡切换
date: 2016-07-15 15:55:36
tags: ubuntu
categories: Linux
---
笔者最近弄Caffe不小心有把nvidia显卡驱动弄坏了，现在将ubuntu14.04 双显卡切换记录如下。

---|---|备注|
---|---|---|
硬件|GeForce GT640M|-|
系统版本| 3.13.0-37-generic #64-Ubuntu x86_64 GNU/Linux|输入`uname -a`查看|


首先 彻底卸载原有Nvidia驱动
```bash
sudo apt-get purge nvidia*
```
清理无关项
```bash
sudo apt-get autoremove
```
使用如下命令添加Graphic Drivers PPA
```bash
sudo add-apt-repository ppa:graphics-drivers/ppa
sudo add-apt-repository ppa:nilarimogard/webupd8
```
安装特定版本的nvidia 专有驱动和设置工具
```bash
sudo apt-get update
sudo apt-get install nvidia-340 nvidia-340-uvm nvidia-settings nvidia-prime prime-indicator
```
重启,同windows一样，驱动需要重启后生效。
```bash
sudo reboot
```
![](/images/coding/ubuntu/nvidia_success.png)

**注意!!!**
如果在安装过程中遇到下面的问题
```
sudo apt-get install nvidia-340 nvidia-settings nvidia-prime
正在读取软件包列表... 完成
正在分析软件包的依赖关系树       
正在读取状态信息... 完成       
nvidia-settings 已经是最新的版本了。
有一些软件包无法被安装。如果您用的是 unstable 发行版，这也许是
因为系统无法达到您要求的状态造成的。该版本中可能会有一些您需要的软件
包尚未被创建或是它们已被从新到(Incoming)目录移出。
下列信息可能会对解决问题有所帮助：


下列软件包有未满足的依赖关系：
 nvidia-331 : 依赖: lib32gcc1 但是它将不会被安装
E: 无法修正错误，因为您要求某些软件包保持现状，就是它们破坏了软件包间的依赖关系
```
笔者认为之所以出现这个问题,是由于"源"(包含各种软件和环境依赖包)随着ubuntu内核和版本的更新导致低版本的ubuntu所需要的软件和环境与当前它所提供的各个软件包之间相互冲突.解决办法就是寻找一个满足你机器当前内核和软件环境的源来安装 nvidia 专有驱动.请按照以下两个方向寻找解决办法,我建议**升级到最新ubuntu的发行版本**进行安装,不过最新的ubuntu 中附带的软件如 gcc 可能版本过高,需要降级使用.

* 先尝试修改不同的源进行更新安装(软件源设置，在更新选项卡选中推荐更新)
* 或者升级到ubuntu 16.04 LTS
