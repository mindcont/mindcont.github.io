---
title: naoqi ros 开发环境搭建
date: 2016-12-14 16:47:33
tags: ros
categories:
---
ROS( robot operating system) 是一款开源的面向与机器人控制领域的操作系统，起源于2007斯坦福大学人工智能实验室的项目与机器人技术公司Willow Garage 的个人机器人项目之间的合作，2008年之后由Willow Garage 推动，2010 年该公司将其开源，2015年，ros 发布了Jade 版本。
<!--more-->
![](https://dn-mindcont.qbox.me/blog/images/ubuntu/ros/hero_product.jpg)

[书接上回](http://blog.mindcont.com/2016/12/14/naoqi-robot-sdk-ubuntu/)，下面我将带您一览ros和naoqi robot 在ubuntu 14.04(lts)版本下开发环境的搭建。

### 安装 ros-indigo-desktop

* 1、 配置 Ubuntu 软件仓库
配置你的 Ubuntu 软件仓库(repositories) 以允许 "restricted"、"universe" 和 "multiverse"这三种安装模式。 你可以 [按照ubuntu中的配置指南](https://help.ubuntu.com/community/Repositories/Ubuntu)来完成配置。

![](https://dn-mindcont.qbox.me/blog/images/ubuntu/ros/ubuntu-repositories-config.png)


* 2、 添加 sources.list
配置你的电脑使其能够安装来自 packages.ros.org的软件。 ROS Indigo 仅 支持 Saucy (13.10) 和 Trusty (14.04)。
```
[官方]
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'

[国内镜像]
sudo sh -c '. /etc/lsb-release && echo "deb http://mirrors.ustc.edu.cn/ros/ubuntu/ $DISTRIB_CODENAME main" > /etc/apt/sources.list.d/ros-latest.list'
```
 **注**：强烈建议使用国内或者新加坡的镜像源，这样能够大大提高安装下载速度。

* 3、 添加 keys
```
sudo apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net:80 --recv-key 421C365BD9FF1F717815A3895523BAEEB01FA116
sudo apt-get update
```
* 4、 桌面版安装： 包含ROS、rqt、rviz以及通用机器人函数库。
```
sudo apt-get install ros-indigo-desktop
```

* 5、后续环节
```
# 安装　rosinstall
sudo apt-get install python-rosinstall

# 初始化 rosdep
sudo rosdep init
rosdep update

# 配置环境变量　Environment setup
echo "source /opt/ros/indigo/setup.bash" >> ~/.bashrc
. ~/.bashrc
```
 **note**: If you have more than one ROS distribution installed, ~/.bashrc must only source the setup.bash for the version you are currently using.

### 启动 ROS on a virtual NAOqi
Before starting, please make sure you meet all the required dependencies especially the packages [naoqi_driver](http://wiki.ros.org/naoqi_driver), [naoqi_bridge](http://wiki.ros.org/naoqi_bridge) and [nao_description](http://wiki.ros.org/nao_description). You can either install the official releases via your package manager or directly clone the necessary ros packages from github.

```
#时钟同步，用于同步机器人和开发者PC　指令时钟
sudo apt-get install chrony

#中间层驱动
sudo apt-get install ros-indigo-naoqi-driver ros-indigo-naoqi-bridge ros-indigo-nao-description

# robot 3D meshes
sudo apt-get install ros-indigo-nao-meshes
```

安装 naoqi 为ros提供的中间接口部件
The core functionality is implemented in the [nao_robot](http://wiki.ros.org/nao_robot) stack (can be installed on the robot or on a remote PC), extended with further functionality in [nao_extras](http://wiki.ros.org/nao_extras) (should be installed on a remote PC).
```
sudo apt-get install ros-indigo-nao-robot ros-indigo-nao-extras
```
**1、运行roscore**
打开命令行窗口，这里我们称它为窗口1
```
roscore
```

![](https://dn-mindcont.qbox.me/blog/images/ubuntu/ros/roscore.png)

**2、运行naoqi-bin 启动虚拟naoqi**
再打开一个新的命令行窗口，这里我们称它为窗口2
```
 ~/naoqi/choregraphe-suite-2.1.4.13-linux64/bin/naoqi-bin --verbose --broker-ip 127.0.0.1
```
broker-ip地址127.0.0.1是用于连接到您自己的PC的环回地址。 因此，只有本地ROS可以连接到NAOqi。 NAOqi API可以通过broker-ip地址访问，nao_driver充当NAOqi API的包装器。

![](https://dn-mindcont.qbox.me/blog/images/ubuntu/ros/naoqi-bin.png)

**3、然后启动ros_driver包，使ros连接到本地PC上的模拟Naoqi**
再打开一个新的命令行窗口，这里我们称它为窗口3，在新终端中运行：

```
LD_LIBRARY_PATH=~/naoqi/choregraphe-suite-2.1.4.13-linux64/lib:$LD_LIBRARY_PATH NAO_IP=127.0.0.1 roslaunch naoqi_driver_py naoqi_driver.launch
```
**注意**：不要将此路径添加到.bashrc中的全局LD_LIBRARY_PATH，因为其他事情将会中断。 例如 rviz将无法运行与错误

![](https://dn-mindcont.qbox.me/blog/images/ubuntu/ros/naoqi_driver_launch.png)

完整输出如下：
```
... logging to /home/pi/.ros/log/873f953c-c1d1-11e6-bfbe-68f728886d0f/roslaunch-MINDCONT-32499.log
Checking log directory for disk usage. This may take awhile.
Press Ctrl-C to interrupt
Done checking log file disk usage. Usage is <1GB.

started roslaunch server http://MINDCONT:44778/

SUMMARY
========

PARAMETERS
* /naoqi_joint_states/use_odometry: True
* /rosdistro: indigo
* /rosversion: 1.11.20

NODES
 /
   nao_logger (naoqi_driver_py/naoqi_logger.py)
   naoqi_joint_states (naoqi_driver_py/naoqi_joint_states.py)
   naoqi_moveto (naoqi_driver_py/naoqi_moveto.py)

ROS_MASTER_URI=http://localhost:11311

core service [/rosout] found
process[naoqi_joint_states-1]: started with pid [32526]
process[naoqi_moveto-2]: started with pid [32527]
process[nao_logger-3]: started with pid [32528]
[INFO] [WallTime: 1481702387.495187] Connecting to NaoQi at 127.0.0.1:9559
[I] 32527 qimessaging.session: Session listener created on tcp://0.0.0.0:0
[I] 32527 qimessaging.transportserver: TransportServer will listen on: tcp://172.17.0.1:34320
[I] 32527 qimessaging.transportserver: TransportServer will listen on: tcp://192.168.1.123:34320
[I] 32527 qimessaging.transportserver: TransportServer will listen on: tcp://127.0.0.1:34320
```
至此，你就通过ros -> naoqi_driver -> virtual NAOqi 会话过程的建立，但是还没有可视化过程，下面我们将进行可视化。


### 通过rviz可视化模拟机器人 Nao robot

关闭所有的窗口，然后打开一个新的窗口，输入下面的指令
```
roslaunch nao_description display.launch
```

在左上角的“显示”窗口中，将“固定框架”更改为“/ base_link”。如果只有“/ map”选项可用，则不会从上一步加载URDF模型。
![](https://dn-mindcont.qbox.me/blog/images/ubuntu/ros/fixed-frame-base_link.jpg)

点击“添加”按钮并添加RobotModel

![](https://dn-mindcont.qbox.me/blog/images/ubuntu/ros/add-robot-model.png)

如果一切正常，你会看到一个机器人模型。通过调节右侧的滑块，机器人将做相应的动作。

![](https://dn-mindcont.qbox.me/blog/images/ubuntu/ros/naoqi-display.jpg)
![](https://dn-mindcont.qbox.me/blog/images/ubuntu/ros/turtlebot.jpg)

如果过程中遇到错误和问题，请参考下面的[参考链接](http://blog.mindcont.coms/2016/12/14/ros-naoqi-ubuntu/#参考)。

本文系作者原创，**转载注明出处 http://blog.mindcont.com/2016/12/14/ros-naoqi-ubuntu/**
## 参考
* [Humanoid Teleoperation](http://wiki.ros.org/openni/Contests/ROS%203D/Humanoid%20Teleoperation)
* [nao Tutorials](http://wiki.ros.org/nao/Tutorials)
* [Ubuntu install of C turtle](http://wiki.ros.org/cturtle/Installation/Ubuntu)
* [在Ubuntu中安装ROS Indigo](http://wiki.ros.org/cn/indigo/Installation/Ubuntu)
* [ros-nao](http://wiki.ros.org/nao)
* [ros-nao-install](http://wiki.ros.org/nao/Tutorials/Installation)
* [Getting started with ROS for Nao](http://wiki.ros.org/nao/Tutorials/Getting-Started)
* [Launching_ROS_on_a_virtual_NAOqi](http://wiki.ros.org/nao/Tutorials/Getting-Started#Launching_ROS_on_a_virtual_NAOqi)
