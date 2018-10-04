---
title: Matlab连接Kinect V2
date: 2016-05-18 20:09:55
tags: matlab
categories: 
toc: ture
---
如何让matlab支持Kinect呢？通过搜索在[mathworks 中国](http://cn.mathworks.com/hardware-support/kinect-windows.html)得知，只有最新版的 matlab 2016a 才支持 Kinect v2 。具体信息如下表，

|Version|	MATLAB Release	|Kinect for Windows Runtime	|Platform|
|---|---|---|---|
|Kinect for Windows v1|	R2013a and later|	1.6 (Installed by support package)|	Windows|
|Kinect v2	|R2016a and later|	2.0 (Installed by support package)|	Windows 8 and later|

# 获取matlab 2016a

从百度云下载 matlab2016a ,大约7.6个g。值得注意的是：从2016开始 matlab不再支持win32平台。

原版2016a 光盘镜像ISO
链接: http://pan.baidu.com/s/1YOrl8 密码: 8k7u
2016a 破解文档及安装说明
链接: http://pan.baidu.com/s/1kUyozNx 密码: fygw

# 安装

## 加载镜像
![](/images/tools/matlab/matlab-2016a-1.jpg)
## 安装
选择安装方法
![](/images/tools/matlab/matlab-2016a-2.jpg)
输入安装说明中的密钥。 在破解文档readme.txt中。
![](/images/tools/matlab/matlab-2016a-3.jpg)
选择安装位置
![](/images/tools/matlab/matlab-2016a-4.jpg)
选择组件。 第一个是分布式计算，用不到的朋友建议取消勾选，其余用不到的工具箱也建议不要安装，这样可以减少安装目录的大小，加快安装速度和运行时速度。
![](/images/tools/matlab/matlab-2016a-5.jpg)
勾选 将快捷方式添加到桌面选项，否则桌面上将不会出现matlab 2016a的启动快捷方式，还要的手动到安装目录下 /bin文件下寻找。
![](/images/tools/matlab/matlab-2016a-6.jpg)
安装完成
![](/images/tools/matlab/matlab-2016a-7.jpg)
## 破解
破解方式如同matlab之前的版本那样，这里我们简要的介绍一下。
运行MATLAB R2016a，进行授权lic注册
![](/images/tools/matlab/matlab-2016a-8.jpg)
![](/images/tools/matlab/matlab-2016a-9.jpg)
授权在破解文件夹内，根据自己安装时候选择的安装模式进行lic注册。
![](/images/tools/matlab/matlab-2016a-10.jpg)
激活完成，值得注意的是:现在破解还没有完成，现在运行会出错。
![](/images/tools/matlab/matlab-2016a-11.jpg)
**替换原文件** 将破解文件夹中的Matlab_2016a win64_Crack\R2016a下的两个文件夹 bin 和 toolbox复制到matlab的文件路径下.
![](/images/tools/matlab/matlab-2016a-12.jpg)
恭喜，此时，安装和激活全部完成，现在可以运行！
![](/images/tools/matlab/matlab-2016a-13.jpg)
# 下载kinect支持包
首先输入下面的这行命令
```bash
source.vid = videoinput('kinect',1); #设置视频的输入方式和相应的格式
```
在没有安装kinect 支持包的时候，会报下面的错误
![](/images/tools/matlab/kinect-v2-1.png)
用鼠标单击图中所示，会打开一个安装扩展支持包的界面
![](/images/tools/matlab/kinect-v2-2.png)
把图中标红的两项都要安装，其中一个是kinect v2 的支持包，一个是系统通用视频接口的支持包(支持笔记本摄像头)。值得注意的是：安装过程中需要去mathworks 官网注册一个帐号。
# 测试
查看安装信息，输入下面的指令。
```bash
imaqhwinfo
```
如果显示下面的信息，说明安装完成。
![](/images/tools/matlab/kinect-v2-3.png)
还可以通过matlab 提供的工具箱进行测试。在菜单栏 "应用程序" 》 "Image Acquisition" 选项中双击打开。
![](/images/tools/matlab/kinect-v2-4.png)
可以在侧边栏看到 硬件信息，选择其中一项如Depth_512*424 ,点击中部的预览 ，看见上面的预览窗口显示深度画面即表示matlab 连接 kinect v2 成功！！！
![](/images/tools/matlab/kinect-v2-5.png)

作者:[mindcont](https://github.com/mindcont)  2016-05-18 第一次编辑
**转载注明出处 http://blog.mindcont.com/2016/05/18/Microsoft-Kinect-V2-with-Matlab/**
