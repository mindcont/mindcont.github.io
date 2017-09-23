---
title: Caffe 入门指南
date: 2017-02-15 16:22:46
tags: caffe
categories: 深度学习
toc: true
---

![](/images/caffe/caffe.jpg)
<!--more-->
## 简介
[Caffe](http://caffe.berkeleyvision.org/)是一个清晰而高效的深度学习的框架，其作者是博士毕业于UC Berkeley的[贾扬清](http://daggerfs.com/)，目前在Google工作。
[Caffe](http://caffe.berkeleyvision.org/)是纯粹的C++/CUDA架构，支持命令行、Python和MATLAB接口；可以在CPU和GPU54直接无缝切换：
```
Caffe::set_mode(Caffe::GPU);
```
**Caffe的优势**

* 上手快：模型与相应优化都是以文本形式而非代码形式给出。
* Caffe给出了模型的定义、最优化设置以及预训练的权重，方便立即上手。
* 速度快：能够运行最棒的模型与海量的数据。
* Caffe与cuDNN结合使用，测试AlexNet模型，在K40上处理每张图片只需要1.17ms.
* 模块化：方便扩展到新的任务和设置上。
* 可以使用Caffe提供的各层类型来定义自己的模型。
* 开放性：公开的代码和参考模型用于再现。
* 社区好：可以通过BSD-2参与开发与讨论。

[Caffe2](https://caffe2.ai/) 一个新的轻量级，模块化和可扩展的深度学习框架，由 NVIDIA和Facebook团队重新打造并在[github](https://github.com/caffe2/caffe2)上开源，Caffe2允许开发人员和研究人员创建大规模分布式训练场景和构建边缘设备机器学习应用。

## 入门篇
推荐先阅读[一文读懂机器学习](http://www.cnblogs.com/mengfanrong/p/5169548.html)

前期入门主要根据自己的机器（nvidia显卡）完成Caffe 的安装，运行 [Caffe官网](http://caffe.berkeleyvision.org/)和  [github](https://github.com/bvlc/caffe) repo 上的**例程**。
### 安装
安装请仔细阅读下面的中文教程，**编译中遇到的错误**请在 github issues用英文仔细查看错误原因。而且大部分都是**环境依赖，路径错误**。
* [Ubuntu 14.04 64bit + Caffe rc3 + CUDA 7.5 + Intel MKL 配置说明](http://blog.mindcont.com/2016/07/20/ubuntu1404-caffe-r3-cuda7-5-mkl/)
* [Installation](http://caffe.berkeleyvision.org/installation.html)
* [issues](https://github.com/bvlc/caffe/issues)

### 例程
配合官方文档 例如mnist 手写体识别，其文档在 $CAFFE_ROOT/examples/mnist/Readme.md ，运行并理解其流程。尤其以下面几个最为重要，当细细品味。

|例程名|实现|学习意义|
|---|---|---|
|LeNet MNIST|[手写数字识别](https://blog.mindcont.com/2017/04/25/how-to-do-mnist-demo/)|理解模型|
|CaffeNet C++ Classification example|c++ 代码实现图片分类|理解如何用c++ 调用caffe|
|Fine-tuning for style recognition|根据自己数据集微调模型|迁移学习，构建自己数据集，微调模型|
|Web demo|基于web 网页的图片分类|如何构建 client /server|

### 入门书籍
如果链接失效，可以访问 [https://share.mindcont.com](https://cloud.mindcont.com/d/34d8cdb853a54a2d90d3/?p=/ai/caffe%E5%85%A5%E9%97%A8&mode=list) 获取。
* [Caffe 官方教程中译本](http://pan.baidu.com/s/1c0Ri2Py#path=%252FCaffeCN%25E7%25BF%25BB%25E8%25AF%2591)
* [深度学习21天实战Caffe-赵永科](https://book.douban.com/subject/26825082/)
* [薛开宇-caffe学习笔记](https://cloud.mindcont.com/d/34d8cdb853a54a2d90d3/files/?p=/ai/caffe%E5%85%A5%E9%97%A8/caffe%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.pdf)
* [贾扬清-DIY Deep Learning for Vision-  a Hands-On Tutorial with Caffe](http://pan.baidu.com/s/1hq8IoHe)

### 答疑社区
* [Caffe 中文社区](http://caffecn.cn/)
* [Caffe 深度学习交流2群 534492004]()
* [Caffe 讨论组](https://gitter.im/BVLC/caffe)
* [Valse 视觉与学习青年研讨会](http://valser.org/)
* [VALSE-D群 481109645]()
* [历次VALSE Webinar活动的录像](http://valser.org/article-86-1.html)

## 进阶篇
这里推荐一个很好的实践入门教程，使用python 和 caffe 进行了一个完整的流程，内容详实，可谓理论与实践兼备，不可多得。
* [A Practical Introduction to Deep Learning with Caffe and Python](http://adilmoujahid.com/posts/2016/06/introduction-deep-learning-python-caffe/)
* [自上而下的学习路线-软件工程师的机器学习](https://blog.mindcont.com/2017/01/05/machine-learning-for-software-engineers/)

### 应用
#### 视觉方向
视觉方面大致有针对图像的分类、分割(Segmentation)、理解(caption)，超分辨，去噪去模糊，以及针对物体的目标识别、检测和追踪。还有就是对视频信息进行同样的工作追求实时和可用。

|图片分类|--|
|--|--|
|[ResNet-v3](https://github.com/terrychenism/ResNeXt)|https://github.com/terrychenism/ResNeXt|
|[denseNet](https://github.com/liuzhuang13/DenseNet)|https://github.com/liuzhuang13/DenseNet|
|[Deep Residual Networks](https://github.com/KaimingHe/deep-residual-networks)|https://github.com/KaimingHe/deep-residual-networks|
|[Highway Networks](https://github.com/flukeskywalker/highway-networks)|https://github.com/flukeskywalker/highway-networks|
|[Deep-Compression-AlexNet](https://github.com/songhan/Deep-Compression-AlexNet)|https://github.com/songhan/Deep-Compression-AlexNet|
|[SqueezeNet](https://github.com/DeepScale/SqueezeNet)|https://github.com/DeepScale/SqueezeNet|
|[GoogleNet-V2](https://github.com/lim0606/caffe-googlenet-bn)|https://github.com/lim0606/caffe-googlenet-bn|

|目标检测|--|
|--|--|
|[PVANet](https://github.com/sanghoon/pva-faster-rcnn)|https://github.com/sanghoon/pva-faster-rcnn|
|[R-FCN](https://github.com/Orpine/py-R-FCN)|https://github.com/Orpine/py-R-FCN|
|[SSD: Single Shot MultiBox Detector](https://github.com/weiliu89/caffe/tree/ssd)|https://github.com/weiliu89/caffe/tree/ssd|
|[YOLO in caffe](https://github.com/xingwangsfu/caffe-yolo)|https://github.com/xingwangsfu/caffe-yolo|
|[DeepBox](https://github.com/weichengkuo/DeepBox)|https://github.com/weichengkuo/DeepBox|
|[Faster R-CNN](https://github.com/rbgirshick/py-faster-rcnn)|https://github.com/rbgirshick/py-faster-rcnn|
|[Fast R-CNN](https://github.com/rbgirshick/fast-rcnn)|https://github.com/rbgirshick/fast-rcnn|

#### 自然语言处理
将机器学习用于语音文本，词汇方面的工作，典型应用机器翻译。
* [NLP-Caffe](https://github.com/Russell91/nlpcaffe)
* [Sentiment Analysis](http://city.shaform.com/blog/2015/06/06/caffe-sentiment-analysis.html)

#### 语音
这里是指语言片段的识别，拼接，以及仿声合成，典型语音识别，也就是科大讯飞所作的工作。
* [Speech Recognition](https://github.com/pannous/caffe-speech-recognition)
* [Kaldi](https://github.com/kaldi-asr/kaldi)
* [技术文档-讯飞](http://www.xfyun.cn/index.php/default/doccenter/doccenterInner?itemTitle=anN3ZA==)

更多访问 [MichaelXin - Awesome-Caffe](https://github.com/MichaelXin/Awesome-Caffe)

### CS231N 课程
有了前面的初步了解，认识了什么是深度学习，什么是caffe，怎么使用caffe，以及caffe能够干什么，想要进一步的学习还要了解卷积神经网络的前世今生。我推荐斯坦福大学的CS231N 课程作为卷积神经网络的系统学习。
* [CS231n: Convolutional Neural Networks for Visual Recognition](http://cs231n.stanford.edu/)
* [视频和课件](http://pan.baidu.com/s/1pKsTivp)
* [课程资源](http://cs231n.stanford.edu/project.html)
* [深度学习斯坦福cs231n 课程笔记](http://blog.csdn.net/dinosoft/article/details/51813615)
* [智能单元-深度学习-cs231n 中文笔记](https://zhuanlan.zhihu.com/intelligentunit?topic=%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%EF%BC%88Deep%20Learning%EF%BC%89)
* [UFLDL教程](http://deeplearning.stanford.edu/wiki/index.php/UFLDL%E6%95%99%E7%A8%8B)
* [Machine Learning](http://openclassroom.stanford.edu/MainFolder/CoursePage.php?course=MachineLearning)

### 数据集
机器学习有人工标注数据的监督学习也好，没有人工标注数据的无监督学习以及介于两者之间的半监督学习也好，归根结底离不开大量的数据，基于各种各样场景下的问题性质，大家构建了相应的人工标注的数据集，一部分用于网络训练，让机器进行学习，另一部分用来做测试评价学习效果的好坏。

鉴于各式各样的数据集种类繁多，此部分单独列为一个页面，请参考下面的链接。

* [深度学习：数据集篇](http://blog.mindcont.com/2016/09/13/Deep-learning-dataset/)

标注工具
* [LabelImg](https://github.com/tzutalin/labelImg)
* [BBox-Label-Tool](https://github.com/puzzledqs/BBox-Label-Tool)
* [FastAnnotationTool](https://github.com/christopher5106/FastAnnotationTool)

### 博客
推荐一些好的博客，工程方面能让你解决某个具体问题能有所启发，而学术方面则可以让你紧跟业界最新潮流，这其中又分为学者个人的博客和著名科研单位的博客。

工程方面
* [实例详解机器学习如何解决问题](http://tech.meituan.com/mt-mlinaction-how-to-ml.html)
* [楼燚(yì)航的blog](http://www.cnblogs.com/louyihang-loves-baiyan/)
* [liumaolincycle的博客](http://blog.csdn.net/liumaolincycle/article/category/5705161)
* [denny的学习专栏](http://www.cnblogs.com/denny402)
* [Face++ -API](https://console.faceplusplus.com/documents/5679308)

学术探索
个人
* [Ross Girshick - Facebook AI Research](http://www.rossgirshick.info/)
* [Xiaogang Wang - CUHK](http://www.ee.cuhk.edu.hk/~xgwang/)
* [Andrej Karpathy - Stanford Computer Science Ph.D. student](http://cs.stanford.edu/people/karpathy/)
* [Rodrigo Benenson](http://rodrigob.github.io/#code)

单位和组织
* [视觉与学习青年学者研讨会](http://www.valser.org/)
* [历次活动录像下载地址](http://vision.ouc.edu.cn/valse/)
* [CVPR](http://www.cv-foundation.org/openaccess/menu.py)
* [深度学习大讲堂](https://zhuanlan.zhihu.com/dlclass)
* [机器之心](https://www.jiqizhixin.com/)
* [机器学习日报](https://memect.com/)
* [Berkeley Computer Vision Group](https://www2.eecs.berkeley.edu/Research/Projects/CS/vision/)
* [Stanford Vision Lab](http://vision.stanford.edu/)
* [Princeton Vision & Robotics Labs](http://vision.princeton.edu/)
* [Oxford - Information Engineering](http://www.robots.ox.ac.uk/~parg/home)
* [Max Planck Institute for Intelligent Systems](https://ps.is.tuebingen.mpg.de/publications)
* [OpenAI](https://openai.com/blog/)

竞赛
* [kaggle](https://www.kaggle.com)
* [阿里云天池](https://tianchi.aliyun.com/)


### 微调网络
* [楼燚(yì)航的blog-Caffe fine-tuning 微调网络](http://www.cnblogs.com/louyihang-loves-baiyan/p/5038758.html)
* [小咸鱼_-基于caffe的图像分类(1)——制作train.txt和val.txt文件](http://blog.csdn.net/sinat_30071459/article/details/51613304)

### 可视化
用反卷积的方法对自己的网络的各个卷积层进行可视化，能更好的理解你的网络每层学习到那些特征，思考到网络可能进入了哪些误区。

* deep-visualization-toolbox [code](https://github.com/yosinski/deep-visualization-toolbox) [paper](http://arxiv.org/abs/1506.06579)
* [DeepDraw](https://github.com/auduno/deepdraw)
* [netscope](http://ethereon.github.io/netscope/#/editor)

### 全卷积(FCN)
FCN将传统CNN中的全连接层转化成一个个的卷积层。在传统的CNN结构中，前5层是卷积层，第6层和第7层分别是一个长度为4096的一维向量，第8层是长度为1000的一维向量，分别对应1000个类别的概率。FCN将这3层表示为卷积层，卷积核的大小(通道数，宽，高)分别为（4096,1,1）、（4096,1,1）、（1000,1,1）。所有的层都是卷积层，故称为全卷积网络。

* [全卷积网络（FCN）与图像分割](http://blog.csdn.net/taigw/article/details/51401448)
* [FCN学习:Semantic Segmentation](https://zhuanlan.zhihu.com/p/22976342)

### 扩展新layer
加入一个新的层，满足自己的实际需求，最常见的就是修改 数据输入层DataLayer,增加一个新的、特殊的数据类型，也对应你特殊的数据处理方式，例如对图像进行每隔几度进行旋转，resize、crop、使用光流图像等。也可以换种思路看看别人是如何增加一个新的Layer的，从中获得启发。

* [Sunshine_in_Moon的专栏-Caffe扩展新层](http://blog.csdn.net/sunshine_in_moon/article/details/51453951)

## 高级篇

### 调参
深度学习，卷积神经网络莫过于一个适应于数据集规模，能够反映问题本质的网络，剩下的就是调参的事情了，无外乎实践，实践，再实践。当然机器很重要，好的机器，好的显卡，意味着快速迭代！机器不够用也没关系，那就要把理论功夫做足，参考成熟的网络设计，再前人的工作基础之上fine-tuning,往往比你自己训练要好的多。使用image-net数据集训练得到的caffemodel 就是一个很好的权值初始化参数。

* [你有哪些deep learning（rnn、cnn）调参的经验？](https://www.zhihu.com/question/41631631/answer/94816420)

构造网络
* [pynetbuilder](https://github.com/jay-mahadeokar/pynetbuilder)

### 转化
* [caffe-tensorflow](https://github.com/ethereon/caffe-tensorflow)
* [caffe-theano-conversion](https://github.com/kitofans/caffe-theano-conversion)
* [CaffeToKeras](https://github.com/MarcBS/keras)

### 分布式计算
* [SparkNet](https://github.com/amplab/SparkNet)
* [CaffeOnSpark](https://github.com/yahoo/CaffeOnSpark)
* [petuum/bosen ](https://github.com/petuum/bosen)

## 参考
* [Yangqing Jia (贾扬清)](http://daggerfs.com)
* [Image Net](http://image-net.org/)
* [MichaelXin - Awesome-Caffe](https://github.com/MichaelXin/Awesome-Caffe)

作者:[mindcont](https://github.com/mindcont)  2016-08-22 第一次编辑 2017-02-16 第二次编辑
**转载注明出处 http://blog.mindcont.com/2016/08/22/caffe-guide-book/**
