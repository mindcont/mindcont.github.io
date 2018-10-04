---
title: naoqi robot 开发环境搭建
date: 2016-12-14 10:52:41
tags: ros
categories:
toc: false
---
本文将带您完成naoqi robot SDK 在ubuntu 14.04(lts)下开发环境的配置,这里值得注意的是您不一定需要购买一个naoqi 机器人才能进行开发，这里可以选择使用虚拟机器人，一般开发过程中我们首先将程序指令在虚拟机器人中进行调试，待成功后下载到真实机器人中进行实地运行。
<!--more-->
![](/images/coding/ubuntu/ros/2016_DEV_PROG_launch_banner_600x360_mailing_V3_EN.png)


### 安装　naoqi choregraphe suite

Choregraphe是一个多平台的桌面应用程序，允许您：

1、创建动画，行为和对话框，
2、在模拟机器人上或直接在真实机器人上测试它们，
3、监控和控制你的机器人，
4、使用自己的Python代码丰富Choregraphe行为。

由于官方提供的链接国内下载容易失败，这里可以使用笔者已经下载好的文件。
```
wget ftp://mindcont.com/IoT/Naoqi/Choregraphe/choregraphe-suite-2.1.4.13-linux64.tar.gz
tar -xvf choregraphe-suite-2.1.4.13-linux64.tar.gz naoqi/
cd ~/naoqi/choregraphe-suite-2.1.4.13-linux64/
./choregraphe
```
![](/images/coding/ubuntu/ros/choregraphe-license.png)

这里先选择试用，当然你可以去[开发者社区](https://community.ald.softbankrobotics.com/en/developerprogram)申请为开发者，可以无限制的免费使用，但同一时间只能有一个　choregraphe运行。

打开后界面如下,类似于matlab 工具箱中的模块化编程，可以在左下角中选择官方封装好的模块，然后用鼠标拖动到中间区域，连线使之成为一个通路，然后点击上方的绿色三角形，让虚拟机器人开始执行。

![](/images/coding/ubuntu/ros/choregraphe.jpg)

通过执行naoqi来检查安装是否成功:
```
cd ~/naoqi/choregraphe-suite-2.1.4.13-linux64/bin
./naoqi-bin
```
你应该看到类似的输出:
```
pi@MINDCONT:~/naoqi/choregraphe-suite-2.1.4.13-linux64/bin$ ./naoqi-bin
[I] 27177 core.naoqi: ..::: starting NAOqi version 2.1.4 :::..
[I] 27177 core.naoqi: Copyright (c) 2005-2013, Aldebaran Robotics
[I] 27177 core.naoqi: Build tag: jenkins-release-2.1_choregraphe-suite_linux64-39
[I] 27177 qimessaging.servicedirectory: ServiceDirectory listener created on tcp://0.0.0.0:9559
[I] 27177 qimessaging.transportserver: TransportServer will listen on: tcp://172.17.0.1:9559
[I] 27177 qimessaging.transportserver: TransportServer will listen on: tcp://192.168.1.123:9559
[I] 27177 qimessaging.transportserver: TransportServer will listen on: tcp://127.0.0.1:9559
[I] 27177 qimessaging.servicedirectory: Registered Service "ServiceDirectory" (#1)
[I] 27177 qimessaging.servicedirectory: Registered Service "LogManager" (#2)
．．．．
．．．．
[I] 27177 Dialog.LongTermMemory: User database creation succeed
[I] 27177 Dialog.preference: No dialog history management
[I] 27177 Dialog.preference: AI system enabled
[I] 27177 Dialog.preference: BNF confidence 0.5
[I] 27177 Dialog.preference: REMOTE confidence 0.3
[I] 27177 Dialog.preference: Serialization enabled
[I] 27177 Dialog.preference: Upper SLM 1
[I] 27177 Dialog.preference: Enable auto update
[I] 27177 Dialog.preference: Push mode 2
[I] 27177 Dialog.preference: Enable full speech recognition
[I] 27177 Dialog.preference: Audio expression enabled
[I] 27177 Dialog.preference: Smalldisplacement enabled
[I] 27177 Dialog.preference: Breath enabled
[I] 27177 Dialog.preference: No animated speech configuration
[I] 27177 Dialog.preference: Default volume 0
[I] 27177 Dialog.preference: No dialog history management
[I] 27177 Dialog.preference: AI system enabled
[I] 27177 Dialog.preference: BNF confidence 0.5
[I] 27177 Dialog.preference: REMOTE confidence 0.3
[I] 27177 Dialog.preference: Serialization enabled
[I] 27177 Dialog.preference: Upper SLM 1
[I] 27177 Dialog.preference: Enable auto update
[I] 27177 Dialog.preference: Push mode 2
[I] 27177 Dialog.preference: Enable full speech recognition
[I] 27177 Dialog.preference: Audio expression enabled
[I] 27177 Dialog.preference: Smalldisplacement enabled
[I] 27177 Dialog.preference: Breath enabled
[I] 27177 Dialog.preference: No animated speech configuration
[I] 27177 Dialog.preference: Default volume 0
[I] 27177 qimessaging.servicedirectory: Registered Service "ALDialog" (#77)
[I] 27177 core.naoqi: NAOqi is ready...

```

### 安装　naoqi python SDK
这里我们采用 naoqi 官方提供的python 接口(类似的还可以选择 java 、c++ 步骤类似)，调用封装好的函数，实现自己的功能。我已经下载好windows、mac、linux 各个平台的开发所需的文件，大家可以在[ftp://mindcont.com/IoT/Naoqi](ftp://mindcont.com/IoT/Naoqi)自行下载。
```
wget ftp://mindcont.com/IoT/Naoqi/sdk/python/pynaoqi-python2.7-2.1.4.13-linux64.tar.gz
tar -xvf pynaoqi-python2.7-2.1.4.13-linux64.tar.gz naoqi/

# 配置环境变量，在打开的文本中添加下面的内容．注意换成你的路径
gedit ~/.bashrc

# edit for naoqi python sdk
export PYTHONPATH=${PYTHONPATH}:/home/pi/naoqi/pynaoqi-python2.7-2.1.4.13-linux64/

# 保存后，输入下面的指令使其生效
source ~/.bashrc
```
打开新的命令行窗口，用python 的导入naoqi 包，来测试你的路径是否配置成功。如果没有报错，那麽恭喜你完成了naoqi 机器人的开发环境搭建。
```
python
import naoqi
```
![](/images/coding/ubuntu/ros/naoqi-python-sdk.png)

## Next
下一步，我们会构建[基于ROS的 naoqi 机器人开发环境](http://blog.mindcont.com/2016/12/14/ros-naoqi-ubuntu/)的搭建，欢迎继续关注。

本文系作者原创，**转载注明出处 http://blog.mindcont.com/2016/12/14/naoqi-robot-sdk-ubuntu/**

## 参考
* [Getting started with ROS for Nao](http://wiki.ros.org/nao/Tutorials/Getting-Started)
* [Python SDK Install Guide](http://doc.aldebaran.com/1-14/dev/python/install_guide.html#python-install-guide)
* [Naoqi Robot Choregraphe doc](http://doc.aldebaran.com/2-1/software/choregraphe/choregraphe_overview.html)
