---
title: Ubuntu 14.04安装 OpenCV 2.4.9
date: 2016-07-16 15:27:45
tags: opencv
categories:
toc: ture
---
OpenCV的全称是Open Source Computer Vision Library，是一个跨平台的计算机视觉库。OpenCV是由英特尔公司发起并参与开发，以BSD许可证授权发行，可以在商业和研究领域中免费使用。OpenCV可用于开发实时的图像处理、计算机视觉以及模式识别程序。该程序库也可以使用英特尔公司的IPP进行加速处理。
在本指南中，我将告诉你如何在ubuntu14.04(lts)中安装OpenCV。ok,让我们开始吧～

## 更新源
首先将源更新为阿里云源
```bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak         #备份
sudo gedit /etc/apt/sources.list                                #修改

##添加如下内容，点击保存后关闭文件
deb http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse

##更新系统
sudo apt-get update
sudo apt-get upgrade
```
## 下载依赖环境
现在，你需要安装很多相关性，比如支持读取和写入图像文件，在屏幕上绘制，一些必要的工具，其他图书馆，等等...这一步是很容易的，你只需要在终端上写下面的命令：
```bash
sudo apt-get install build-essential libgtk2.0-dev libjpeg-dev libtiff4-dev libjasper-dev libopenexr-dev cmake python-dev python-numpy python-tk libtbb-dev libeigen3-dev yasm libfaac-dev libopencore-amrnb-dev libopencore-amrwb-dev libtheora-dev libvorbis-dev libxvidcore-dev libx264-dev libqt4-dev libqt4-opengl-dev sphinx-common texlive-latex-extra libv4l-dev libdc1394-22-dev libavcodec-dev libavformat-dev libswscale-dev default-jdk ant libvtk5-qt4-dev
```
## 下载OpenCV

```bash
#切换到家目录
cd ~

#使用wget下载 Opencv-2.4.9
wget http://sourceforge.net/projects/opencvlibrary/files/opencv-unix/2.4.9/opencv-2.4.9.zip   

#解压          
unzip opencv-2.4.9.zip      

#转到解压目录    
cd opencv-2.4.9                 
```
## 编译
现在我们通过使用cmake生成Makefile文件。在这里我们可以定义我们要编译OpenCV的哪个部位。既然我们要使用的即模块，Python和Java的，TBB时，OpenGL，QT，与视频接口的调用等等，这里是我们需要来设置。而就在终端执行以下命令行来创建相应的Makefile文件。请注意，有在该行的最后两个点，它是为cmake的程序参数，这意味着父目录（因为我们是build目录里面，我们要参考OpenCV的目录，这是它的父目录）。
```bash
#创建编译目录
mkdir build

#转到编译目录下    
cd build  

#设置编译参数          
cmake -D WITH_TBB=ON -D BUILD_NEW_PYTHON_SUPPORT=ON -D WITH_V4L=ON -D INSTALL_C_EXAMPLES=ON -D INSTALL_PYTHON_EXAMPLES=ON -D BUILD_EXAMPLES=ON -D WITH_QT=ON -D WITH_OPENGL=ON -D WITH_VTK=ON -D CUDA_GENERATION=Auto ..  
```
检查上面的命令不会产生错误，并且特别是报告FFMPEG为YES。如果不是这种情况下，你将无法读取或写入视频。检查使用Java，Python，TBB，OpenGL的，V4L，OpenGL和Qt的都正确检测。
![](/images/tools/opencv/cmake1.png)

确保你向上滚动，并检查了将要构建的模块是这些：core flann imgproc highgui features2d calib3d ml video legacy objdetect photo gpu ocl nonfree contrib java python stitching superres ts videostab viz.
![](/images/tools/opencv/cmake2.png)

好，万事俱备，开始编译OpenCV-2.4.9。
```bash
make
sudo make install
```
如果这里报如下错误的话
```
Building NVCC (Device) object modules/core/CMakeFiles/cuda_compile.dir/src/cuda/Debug/cuda_compile_generated_gpu_mat.cu.obj
nvcc fatal : Unsupported gpu architecture 'compute_11'
```
**注意：** 你需要用这个参数 **CUDA_GENERATION** 来指定GPU显卡的架构，例如你的显卡是 Titan显卡（包括GTX 900系列）的架构是比较新的Maxwell架构，应该在cmake 参数命令中增加 '-D CUDA_GENERATION=Kepler' 虽然Kepler架构是Maxwell架构的上一代，但是这样配置也可以成功。

**注意:**中途可能会报错
```
opencv-2.4.9/modules/gpu/src/nvidia/core/NCVPixelOperations.hpp(51): error: a storage class is not allowed in an explicit specialization
```
解决方法在此：http://code.opencv.org/issues/3814  下载 [NCVPixelOperations.hpp](http://code.opencv.org/projects/opencv/repository/revisions/feb74b125d7923c0bc11054b66863e1e9f753141/raw/modules/gpu/src/nvidia/core/NCVPixelOperations.hpp) 替换掉opencv2.4.9内'/modules/gpu/src/nvidia/core/'下重名文件， 重新build。

## 配置环境变量
配置OpenCV库引用(类似于windows环境变量)
```bash
sudo gedit /etc/ld.so.conf.d/opencv.conf
```
添加下面一行在文件末尾（它可能是一个空文件，这是确定的），然后将其保存：
```bash
/usr/local/lib
```
![](/images/tools/opencv/opencv-conf.png)
输入下面的命令使其生效
```bash
sudo ldconfig
```
现在打开另一个文件
```bash
sudo gedit /etc/bash.bashrc
```
添加这两行的文件的末尾并保存：
```bash
PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/local/lib/pkgconfig
export PKG_CONFIG_PATH
```
![](/images/tools/opencv/bashrc.png)

**注意:** 关闭控制台，打开一个新的终端，或者重新启动计算机或注销，然后重新登录。不然OpenCV将无法正常工作。现在你有OpenCV的2.4.9安装在您的计算机三维可视化，Python和Java的，TBB，OpenGL的，视频和Qt支持。

## 运行Demo
现在，让我们来编译运行OpenCV包中的一些例子，输入下面的命令
```bash
cd ~/opencv-2.4.9/samples/c
chmod +x build_all.sh
./build_all.sh
```
这些例子使用了旧版本的 C 接口，

```bash
./facedetect --cascade="/usr/local/share/OpenCV/haarcascades/haarcascade_frontalface_alt.xml" --nested-cascade="/usr/local/share/OpenCV/haarcascades/haarcascade_eye.xml" --scale=1.5 lena.jpg
```
![](/images/tools/opencv/demo1.png)

鼠标滚轮滑动，可以直接看到图像像素对应的RGB数值。
![](/images/tools/opencv/QT-tools.png)

再运行一个例子，输入下面的指令
```bash
~/opencv-2.4.9/build/bin/cpp-example-calibration_artific
```
![](/images/tools/opencv/demo2.png)

## 参考

* [Installing OpenCV 2.4.9 in Ubuntu 14.04 LTS](http://www.samontab.com/web/2014/06/installing-opencv-2-4-9-in-ubuntu-14-04-lts/)
* [Ubuntu下多个版本OpenCV管理](http://www.cnblogs.com/xzd1575/p/5555523.html)
