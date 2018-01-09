---
title: OpenCV 2.4.9 模块简介
date: 2016-05-28 09:49:51
tags: opencv
categories:
toc: ture
---
<!--more-->

![](http://static.mindcont.com/blog/images/tools/opencv/OpenCV_Logo.png)  
OpenCV的全称是Open Source Computer Vision Library，是一个跨平台的计算机视觉库。OpenCV是由英特尔公司发起并参与开发，以BSD许可证授权发行，可以在商业和研究领域中免费使用。OpenCV可用于开发实时的图像处理、计算机视觉以及模式识别程序。该程序库也可以使用英特尔公司的IPP进行加速处理。   

|---|---|
|---|---|
|原作者| 英特尔公司|
|初始版本| 2010年6月|
|稳定版本| 3.1.0（2015年12月18日，​5个月前）|
|操作系统| 跨平台|
|类型|开发库|
|许可协议|BSD许可证|
|网站|http://opencvlibrary.sourceforge.net/|

# 模块介绍
在此我们管中窥豹，通过opencv安装路径下include目录里面头文件的分类存放，来一窥OpenCV这些年迅猛发展起来的庞杂组件架构。  

我们先进入OpenCV的安装路径，例如我的是E:\Program Files\OpenCV\OpenCV-2.4.9\build\include目录，可以看到有opencv和opencv2这两个文件夹。显然，opencv这个文件夹里面包含着旧版的头文件。而opencv2这个文件夹里面包含着具有时代意义的新版OpenCV2系列的头文件。
![](http://static.mindcont.com/blog/images/tools/opencv/OpenCV-Module-1.png)  

在opencv这个文件夹里面，也就是E:\Program Files\OpenCV\OpenCV-2.4.9\build\include\opencv目录下，可以看到如下的各种头文件。这里面大概就是opencv 1.0最核心的，而且保留下来的内容的头文件，可以把它们整体理解为一个组件。   
![](http://static.mindcont.com/blog/images/tools/opencv/OpenCV-Module-2.png)

再来看看我们重点关注的opencv2这边，在E:\Program Files\OpenCV\OpenCV-2.4.9\build\include\opencv2目录下，我们可以看到这些文件夹
![](http://static.mindcont.com/blog/images/tools/opencv/OpenCV-Module-3.png)

我们灵机一动，发现下面有个叫opencv_modules.hpp的hpp文件，一看就知道里面存放的是opencv2中的新模块构造相关的说明代码，打开一看，果不其然，定义的是OpenCV2所有组件的宏：
```cplusplus
/*
 *     ** File generated automatically, do not modify **
 *
 *This file defines the list of modules available in current build configuration
 *
 *
*/

#define HAVE_OPENCV_CALIB3D
#define HAVE_OPENCV_CONTRIB
#define HAVE_OPENCV_CORE
#define HAVE_OPENCV_FEATURES2D
#define HAVE_OPENCV_FLANN
#define HAVE_OPENCV_GPU
#define HAVE_OPENCV_HIGHGUI
#define HAVE_OPENCV_IMGPROC
#define HAVE_OPENCV_LEGACY
#define HAVE_OPENCV_ML
#define HAVE_OPENCV_NONFREE
#define HAVE_OPENCV_OBJDETECT
#define HAVE_OPENCV_OCL
#define HAVE_OPENCV_PHOTO
#define HAVE_OPENCV_STITCHING
#define HAVE_OPENCV_SUPERRES
#define HAVE_OPENCV_TS
#define HAVE_OPENCV_VIDEO
#define HAVE_OPENCV_VIDEOSTAB
```
下面就是OpenCV的所有模块介绍  

|模块名称|功能|备注||
|---|---|---||
|calib3d|其实就是就是Calibration（校准）加3D这两个词的组合缩写。这个模块主要是相机校准和三维重建相关的内容|基本的多视角几何算法<br>单个立体摄像头标定<br>物体姿态估计<br>立体相似性算法<br>3D信息的重建等等。|
|contrib|也就是Contributed/Experimental Stuf的缩写， 该模块包含了一些最近添加的不太稳定的可选功能，不用去多管|2.4.8里的这个模块有新型人脸识别，立体匹配，人工视网膜模型等技术。|
|core|核心功能模块|OpenCV基本数据结构、动态数据结构、绘图函数、数组操作相关函数、辅助功能与系统函数和宏、与OpenGL的互操作。|
|features2d|也就是Features2D， 2D功能框架|特征检测和描述<br>特征检测器（Feature Detectors）通用接口<br>描述符提取器（Descriptor Extractors）通用接口<br>描述符匹配器（Descriptor Matchers）通用接口<br>通用描述符（Generic Descriptor）匹配器通用接口<br>关键点绘制函数和匹配功能绘制函数。|
|flann|Fast Library for Approximate Nearest Neighbors，高维的近似近邻快速搜索算法库|快速近似最近邻搜索、聚类。|
|gpu|运用GPU加速的计算机视觉模块|
|highgui|也就是high gui，高层GUI图形用户界面|包含媒体的I / O输入输出，视频捕捉、图像和视频的编码解码、图形交互界面的接口等内容。|
|imgproc|Image和Processing这两个单词的缩写组合。图像处理模块|线性和非线性的图像滤波、图像的几何变换、其它（Miscellaneous）图像转换、直方图相关、结构分析和形状描述、运动分析和对象跟踪、特征检测、目标检测等内容。|
|legacy|一些已经废弃的代码库，保留下来作为向下兼容|运动分析<br>期望最大化<br>直方图<br>平面细分（C API）<br>特征检测和描述（Feature Detection and 通用描述符（Generic Descriptor Matchers）的常用接口<br>匹配器。|
|ml|机器学习模块|Machine Learning，基本上是统计模型和分类算法，例如：<br>一般贝叶斯分类器 （Normal Bayes Classifier）<br>K-近邻 （K-NearestNeighbors）<br>支持向量机 （Support Vector Machines）<br>决策树 （Decision Trees）<br>提升（Boosting）<br>梯度提高树（Gradient Boosted Trees）<br>随机树 （Random Trees）<br>超随机树 （Extremely randomized trees）<br>期望最大化 （Expectation Maximization）<br>神经网络 （Neural Networks）<br>MLData。|
|nonfree|也就是一些具有专利的算法模块 |包含特征检测和GPU相关的内容。最好不要商用，可能会被告哦|
|objdetect|目标检测模块|包含Cascade Classification（级联分类）和Latent SVM这两个部分|
|ocl|运用OpenCL加速的计算机视觉组件模块|即OpenCL-accelerated Computer Vision|
|photo|图像修复和图像去噪|Computational Photography|
|stitching|图像拼接模块|images stitching，拼接流水线<br>特点寻找和匹配图像<br>估计旋转<br>自动校准<br>图片歪斜<br>接缝估测<br>曝光补偿<br>图片混合。|
|superres|超分辨率技术的相关功能模块|SuperResolution|
|ts|opencv测试相关代码|不用去管他|
|video|视频分析组件|该模块包括运动估计，背景分离，对象跟踪等视频处理相关内容|
|videostab|视频稳定相关的组件|Video stabilization，官方文档中没有多作介绍，不管它了|


# 参考
[1] http://docs.opencv.org/2.4/modules/core/doc/intro.html
[2] [中文维基.OpenCV]https://zh.wikipedia.org/wiki/OpenCV
[3] http://blog.csdn.net/poem_qianmo/article/details/19925819
