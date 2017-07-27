---
title: Kinect深度成像的基本原理
date: 2017-05-09 16:01:32
tags: Kinect
categories: Kinect
toc: true
---

![](http://static.mindcont.com/blog/images/kinect/basic-principle/US7433024_Page_3.png)

<!--more-->

## 原理
根据PrimeSense公司的专利[1]记载，Kinect深度成像的原理是一种叫做光编码(light coding)的技术。组成成像系统的三个核心元件包括:激光发射器，不均匀透明介质，CMOS感光器件。其构造图如下图所示，其中，激光发射器与CMOS感光器件成一定角度对准目标场景，而不均匀透明介质放置于激光发射器镜头前。激光发射器透过不均匀介质发射激光，在场景中形成激光散斑，CMOS感光元件可以拍摄散斑图像。
![](http://static.mindcont.com/blog/images/kinect/basic-principle/Kinect-Depth-imaging.jpg)

### 标定
首先在口标区域距光源的多个不同位置分别用CMOS感光元件采集散斑图案，然后存储这些不同位置的图案作为参考图像。此时标定完成。图3中，参考图像的位置分别记为Z1,Z2,Z3,Z4。   

### 取样
当不透明物体放人场景，或者物体在场景中运动时，在物体表面形成新的散斑，得到测试图像，此时的散斑图样发生变化，与所有参考图像均不同。在图3中，物体A和物体B表面形成散斑的位置是Za,Zb。

### 定位
将测试图像与所有参考图像分别计算相关系数，选取产生相关系数最大的参考图像，即物体在该参考图像所在位置的可能性最大。在图3中，场景放人A物体所拍摄的Za位置散斑测试图与Z2处参考图像相关系数最大，即认为A物体在Z2距离处。同理，B物体认为在Z3距离处。    

### 重建
根据所选取的参考图像与光源间的标定关系，通过几何变换，计算得出物体到光源的距离，构建3D图像。并对距离数据归一化，转换成图像灰度值，最后将所生成的深度图像输出给外部处理设备。此时即完成对场景某一时刻的深度图像拍摄，向外部处理系统输出。然后返回执行第2步，得到连续不断的深度图像视频流。

## 总结
![](http://static.mindcont.com/blog/images/kinect/basic-principle/US7433024_Page_4.png)
PrimeSense将其深度测量技术命名为Light coding，与结构光法不同的是，Light coding的光源被称为“激光散斑（laser speckle）”，是当激光照射到粗糙物体或穿透毛玻璃后形成的随机衍射斑点。这些散斑具有高度的随机性，而且会随着距离的不同变换图案。也就是说空间中任意两处的散斑图案都是不同的。只要在空间中打上这样的结构光，整个空间就都被做了标记，把一个物体放进这个空间，只要看看物体上面的散斑图案，就可以知道这个物体在什么位置了。

参考文献:
[1] https://www.google.com/patents/US7433024 <i class="fa fa-download" aria-hidden="true"><a href="https://cloud.mindcont.com/d/34d8cdb853a54a2d90d3/files/?p=/doc/US7433024.pdf ">下载</a></i>
[2] 李红波，丁林建，冉光勇. 基于Kinect深度图像的人体识别分析. 重庆邮电大学网络智能研究所
