---
title: Xbox One Kinect完全拆解
date: 2016-04-15 16:26:26
tags: Kinect
categories: Kinect
---
第二代 Kinect for Windows 感应器和软件开发工具包将人机交互带入新阶段，所提供的更大的整体精确度、响应能力和直觉能力将加速计算机语音和手势体验的发展。第二代感应器的彩色相机的增强特性包括 1080p 高分辨率视频,更宽广的视野、增强的骨骼追踪和新增的红外线探测功能。

 | Kinect Version 1 | Kinect Version 2 |
---| --- |---|
有效距离 | 0.4m - 4.0m | 0.4m - 4.5m
视频图分辨率 | 640x480 | 1920x1080
深度图分辨率 | 320x240 | 512x424
红外图分辨率 | None | 512x424
麦克风 | 4-mic array | 4-mic array
USB接口 | 2.0 | 3.0
code移植性 |v1 code cannot simply be recompiled into v2 code|

### 1.全新的摄像头功能与技术
新的Kinect有1080p视频传感器，相较于原先一代的VGA传感器是一个巨大的改进。新kinect允许更精确的人脸识别功能，可获得更清晰的图像和视频信息！这种清晰的视频信息将会在全新的Skype整合功能方面派上大用场。他们还提高了深度传感器所能支持的最大分辨率来允许捕捉更多的细节，如手指动作和肢体定位。新的Xbox Kinect 每秒数据处理量可达2GB！微软还用读取深度“飞行时间计算”的方法来替代了现有的“光照测量”的测算方法，使得新Kinect比原始Kinect更快、更准确。该方法基于单个光子从物体或人身上反弹回来的最准确的时间计算原理。
### 2.对于初代Kinect不满之处的改进
原来的Kinect是具有革命性的产品，但也不是没有缺点，例如一些核心玩家的抱怨。微软已经采纳了一些意见，明显提高了新Kinect的技术来解决他们的问题。

抱怨之一是延迟。原先做一个动作可以看到与屏幕输入之间有时间差。而现在专用处理和USB 3.0端口使新的Kinect只剩下每秒2帧的延迟！也就是仅有66毫秒的延迟！大多数主机手柄输入游戏为133毫秒的平均延迟，而需要更敏捷操作的游戏（第一人称射击游戏）具有67毫秒的响应时间！这是一个巨大的改进！你的动作将以每秒30帧的实时速度被捕捉更新！意味着与大多数游戏运行相同的帧率！

Kinect的另一个主要抱怨是有关空间的要求。新的Kinect的视野已经提高了60%！这意味着新的传感器，可以看到更紧密，更广泛和更深入的捕捉范围。你不再需要重新布置客厅进行游玩！
### 3.其他方面的改进
微软并没有停止前进，或只是解决抱怨，他们还想达到新的水平。新的Kinect现在可以同时跟踪6人动作！它还可以跟踪每个Xbox手柄内置的红外LED。例如，在游戏时举起你的手柄，你的角色可能会举起他的盾牌。Kinect2.0也将自动跟踪分屏游戏时手柄的位置来调整分屏位置。

骨骼跟踪已经提高了很多。不仅可以读取更多的关节、四肢的运动方向，还有你动作的力度。导航仪表现在可以有打开或关闭的手势了，你将不再需要“悬停”在一个对象上进行选择。夜间捕捉模式是内置的，无论照明条件如何，都可以进行捕捉。新的Kinect甚至可以捕捉你的情绪（快乐，悲伤等），甚至读取你的脉搏！


其他一些值得注意的改进是麦克风阵列。现在它可以更可靠地消除背景噪声，玩家可以使用更顺畅的语音控制。不用花更多时间思考猜测什么语音命令才能让Xbox理解，你只需要说你想说的话，Xbox就会做它应该做的！

## 拆机
![](http://static.mindcont.com/blog/images/kinect/unboxing/kinect-unboxing-1.jpg)
Kinect 2.0配备1080p全高清广角摄像头，还有适应低光环境的主动式红外摄像头，多麦克风阵列具备降噪和语音指令功能，每秒钟可处理2Gb(256MB/s)的环境数据。
![](http://static.mindcont.com/blog/images/kinect/unboxing/kinect-unboxing-2.jpg)
电源线插得很结实
![](http://static.mindcont.com/blog/images/kinect/unboxing/kinect-unboxing-3.jpg)
T10标准螺丝
![](http://static.mindcont.com/blog/images/kinect/unboxing/kinect-unboxing-4.jpg)
拧下螺丝，外壳就打开了。
![](http://static.mindcont.com/blog/images/kinect/unboxing/kinect-unboxing-5.jpg)
型号编号Model 1520(主机是Model 1540)，同样有来自西雅图的问候。
![](http://static.mindcont.com/blog/images/kinect/unboxing/kinect-unboxing-6.jpg)
散热器很容易拿下。
![](http://static.mindcont.com/blog/images/kinect/unboxing/kinect-unboxing-7.jpg)
散热器来自日本电产科宝(Nidec)，编号U40R05MS1A7-57A07A。
![](http://static.mindcont.com/blog/images/kinect/unboxing/kinect-unboxing-8.jpg)
内部世界开始显现
![](http://static.mindcont.com/blog/images/kinect/unboxing/kinect-unboxing-9.jpg)
主体也是绿色调的。
![](http://static.mindcont.com/blog/images/kinect/unboxing/kinect-unboxing-10.jpg)
解脱束缚
![](http://static.mindcont.com/blog/images/kinect/unboxing/kinect-unboxing-11.jpg)
主体侧面挂着一小块电路板
![](http://static.mindcont.com/blog/images/kinect/unboxing/kinect-unboxing-12.jpg)
很小，但也很重要，上边有LED和传感器
![](http://static.mindcont.com/blog/images/kinect/unboxing/kinect-unboxing-13.jpg)
红色的是主处理器，取代第一代里的主传感芯片。上边打着微软和Xbox的标记，编号为X871141-001。橙色的是三星K4B1G1646G 1Gb(128MB) DDR3 SDRAM内存。
![](http://static.mindcont.com/blog/images/kinect/unboxing/kinect-unboxing-14.jpg)
小心地取下第一个摄像头。都是螺丝固定的。
![](http://static.mindcont.com/blog/images/kinect/unboxing/kinect-unboxing-15.jpg)
摄像头近照
![](http://static.mindcont.com/blog/images/kinect/unboxing/kinect-unboxing-16.jpg)
第二个摄像头
![](http://static.mindcont.com/blog/images/kinect/unboxing/kinect-unboxing-17.jpg)
三个红外增强器，Kinect 2.0具备新的主动式红外技术，即便在黑暗的房间里也能看到你。
![](http://static.mindcont.com/blog/images/kinect/unboxing/kinect-unboxing-18.jpg)
所有零部件合集
----
完 ヽ(ﾟДﾟ)ﾉ
