---
title: 2016 , 我的年终总结
date: 2017-02-16 16:27:20
tags:
categories: 随笔日记
---
转眼间，24岁我的本命年如风卷云涌般飘了过去，总感觉日子过得飞快，一不留神一年就过去了，也才想着趁现在做做年终总结，回顾一下自己的2016，并给2017的自己:heart:**订个小目标**:heart: 。
<!--more-->

## 比赛篇:muscle:
### 解魔方

2016年寒假刚过:monkey:，我就早早地来了学校，为年前和兵哥和恒参加的一个比赛做最后的工作，并争取去珠海参加总决赛。当时做的是一个解三阶魔方的机器人，各自分工，队长兵哥做的最多，从机械结构的设计，到蓝牙模块通信，还有解算算法的优化，我和恒哥则打打下手，总算在比赛截止日提交了作品。
![](/images/resources/20160306.jpg)
比赛方又要微信组织投票（朋友圈里小到幼儿园小朋友演出，大到省市优秀青年评选都喜欢微信投票:joy:）计入所谓的大众评分:alien:。

4月初，我们如愿以偿的:airplane:广州，兵哥带我去了华南理工见到了景海，我们围着华工转了转，传统的建筑和现代的教学楼，湖水给人的感觉很有气息，来来往往的学生和周围的环境很协调。之后我们转车到了珠海，安排入住，比赛展示和答辩，一切顺乎自然。比赛后，主办方全志科技的副总裁带我们参观了公司大楼，也给我们分享了他的创业历程，公司的定位和产品上下游链条以及公司未来的思考方向等等，总得感觉深圳和珠海的电子行业有实力也比其他地区有得天独厚的优势。

这次珠海行，对我的启发很大，无论从比赛本身还是眼界的扩展:joy:

###  BOT计算机视觉

9月份，实验室的小涛告诉我BOT 有个计算机视觉的比赛，初赛是图片分类，让计算机预测新图片这个是猫还是狗，是选手利用卷积神经网络配合比赛主办方提供的数据集进行训练和预测，正好我们可以练练手。在余下的一个月时间里，我们就开始了不停训练、预测、提交的流程。那时候我们使用的NVIDIA K2200 4g 的显卡，用caffe 来做训练。印象中那一个月就是等待训练结果，然后下载新的预测集进行预测，提交和等待排名更新。最好的一次在12种分类中我们达到80%几，然后最高的已经到97%识别正确率了，结果显而易见我们没有进入复赛。

至于收获嘛，大体就是尝试将自己对卷积网络的理解，caffe平台的搭建，数据集的处理和网络构建和训练，最后部署预测，整个流程做了一遍。之后就是除比赛之外，我搞科研的故事了或者说我的研究方向的确定(听起来好屌的样子:laughing:)。

## 科研篇:punch:
比赛回来，转眼到了5月份，自己就开始选定研究方向了。一开始我打算利用 Kinect识别人体动作，然后和Nao robot 进行人机交互。嗯，就是打算做下面这种效果，**机器人和人做同样的动作**。蒽，对，我们实验室有Nao robot。

<img src="/images/resources/kinect-nao.jpg" width="720" >

大体的思路是：kinect 输出人体关节点，计算机将人体的动作转化为Nao robot 各个关节电机参数，利用nao robot提供的API 驱动它。

之后我就顺着这个思路开始，先了解微软官方提供的Kinect v2 sdk 到他们的[讲解视频](https://mva.microsoft.com/zh-cn/training-courses/-kinect-for-windows-v2--8743?l=15BQDzV1_4504984382)，然后又搜相关的开源程序和代码，慢慢得就到了[OpenNI](https://structure.io/openni) 和 [openKinect](https://openkinect.org/wiki/Main_Page/zh-hans) ，由于是 kinect v2 版本，所以当时颇费周章的弄，逐渐弄到了ubuntu平台下。下面是使用 ubuntu 下配合[libfreenect2](https://github.com/OpenKinect/libfreenect2)成功读取到了信息。:poop:
![](/images/resources/openkinect_v2_ubuntu.png)

后面越做发现自己的编程能力不够，尤其涉及linux下 c和 c++ 相互调用还有视频的缩放和处理部分帧的问题，越往后越多的问题发现。看来一个人做不下去了，然后转变思路，就想基于depth image 做一些东西，后面就搜到了 [Shuran Song](http://vision.princeton.edu/people/shurans/) 的[室内场景下的3D 目标检测](http://videolectures.net/eccv2014_song_depth_images/)。根据她开放的数据集和代码，运行了demo如下

![](/images/resources/reproduce-shuransong-results.jpg)

还是没思路，7月份的时候，慢慢得就走向了 [卷积人工神经网络](http://cs231n.stanford.edu/) 和 [Caffe: a fast open framework for deep learning](http://blog.mindcont.com/2017/02/15/caffe-guide-book/)，就是用深度学习的方法去解决视觉方面的一些问题。先是安装 caffe,然后读了目标检测方面一些论文，动手实践了[faster-rcnn](https://github.com/ShaoqingRen/faster_rcnn)、[YoLo](http://pjreddie.com/darknet/yolo/)、[SSD](https://github.com/weiliu89/caffe/tree/ssd)等。下面是faster-rcnn 当时运行的demo

![](/images/resources/faster-rcnn.png)

9月份-10月份 参加了上海BOT大数据应用大赛是国内首个专业化AI大赛，“计算机视觉” 类的题目，见上面第二个比赛。11月初就开始弄开题报告，当时定的题目是**复杂场景下的交通信号灯识别研究**。思路是：近年来卷积神经网络方面一些新的网络模型和传统的图形学方法模板匹配和色域转换相结合来解决这个问题，其中清华大学[朱哲](http://cg.cs.tsinghua.edu.cn/traffic-sign/)博士的论文[Traffic-Sign Detection and Classification in the Wild](http://cg.cs.tsinghua.edu.cn/traffic-sign/0682.pdf)给了我很大的启发，多次向他发邮件，都给予了回答和解释在此向他表示感谢。

下面是两个当时答辩做的PPT
![](/images/resources/tlr-research-status.jpg)

拟研究思路，可能有理论问题，不要被我带入坑:stuck_out_tongue_winking_eye:
![](/images/resources/idea-of-traffic-signal-recognition.jpg)

答辩完,我们组组长zhou老大说这个问题和实验室大方向不符合:joy:,让我换到人体姿态估计上,类似下面这种识别人体姿势的效果，于是我就开始了这方面的学习:dog:。

<img src="/images/resources/amdo2012andriluka.jpg" align="right" width="720">
<p align="right">图片来源 Brown University Computer Science</p>

## 小目标:baby_chick::baby_chick::baby_chick:
2017 年的钟声又响啦，和全国人民一样撸起袖子，加油干。先立个flag吧，先定它个小目标。

- [x] 弄出实验结果:frog:
- [x] 发表文章，完成毕业要求:penguin:
- [x] 早睡，早起，要锻炼:ant:
- [x] 补充短板，找实习:wolf:
- [x] 提高博客质量:whale2:
- [x] 维护主网站，找准特色，极客范:palm_tree:

**现在是2017年2月17号 15点20分，坐在保守估计7万块电脑旁写下了这篇文章，马上就会更新上去了**:smiley:
## 引用
[EMOJI CHEAT SHEET](http://www.webpagefx.com/tools/emoji-cheat-sheet/)

作者:[mindcont](https://github.com/mindcont)  2017-02-17 第一次编辑
**转载注明出处 http://blog.mindcont.com/2017/02/16/my-review-2016/**
