---
title: Ubuntu 14.04 运行 YOLO Demo 记录
date: 2016-08-06 19:24:00
tags:
categories: 深度学习
toc: false
---
<video src="https://github.com/mindcont/mindcont.github.io/raw/master//video/YOLO_Watches_Nature_Part_2.mp4" controls="controls" width="640px" heigt="480px" preload="none" poster="/images/research/object-detection/Yolo/YOLO_Watches_Nature_Part_2.png"></video>

YOLO 是一个用来在VOC 2012 数据集上检测物体的框架。它可以检测 20 类物体：
<!--more-->
* 人
* 鸟, 猫, 牛, 狗, 马, 羊
* 飞机, 自行车, 船, 公共汽车, 小汽车, 摩托车, 火车
* 瓶，椅子，餐桌，盆花，沙发，电视/显示器

YOLO is joint work with [Santosh](http://homes.cs.washington.edu/~santosh/), [Ross](http://www.cs.berkeley.edu/~rbg/), and [Ali](http://homes.cs.washington.edu/~ali/), and is described in detail in our [paper](http://arxiv.org/abs/1506.02640).



## 安装 Darknet  

### 下载Darknet
同时按住 Alt + Ctrl + T ,打开命令行终端
```
git clone --recursive https://github.com/pjreddie/darknet.git
cd darknet
```
### 修改编译配置文件 Makefile
```
gedit Makefile
```
根据你的情况进行修改，例如这里我将使用 GPU 和 cuDNN 进行加速计算，故将他们置为 1
```
GPU=1
CUDNN=1
OPENCV=1
DEBUG=0

# 根据你显卡的计算力确定架构。例如我的显卡是NVIDIA K2200, deviceQuery 是5.0  
ARCH= --gpu-architecture=compute_50 --gpu-code=compute_50
```
编译
```
make -j4
```
### 测试
输入下面的指令进行测试Darknet 是否安装成功
```
./darknet  imtest data/eagle.jpg
```
如果看到下面的画面，恭喜你安装Darknet 成功！
![](/images/research/object-detection/Yolo/darknet_test.jpg)

## 预测
### 下载权值文件

点击下面的网址，分别下载 大中小 三个模型对应已训练好的网络权值文件
http://pjreddie.com/media/files/yolo.weights
http://pjreddie.com/media/files/yolo-small.weights
http://pjreddie.com/media/files/yolo-tiny.weights

然后放到darknet/weights目录下，然后在darknet根目录下输入下面的指令

```
 ./darknet yolo test cfg/yolo.cfg weights/yolo.weights data/dog.jpg
```
日志输出
```
0: Convolutional Layer: 448 x 448 x 3 image, 64 filters -> 224 x 224 x 64 image
1: Maxpool Layer: 224 x 224 x 64 image, 2 size, 2 stride
2: Convolutional Layer: 112 x 112 x 64 image, 192 filters -> 112 x 112 x 192 image
3: Maxpool Layer: 112 x 112 x 192 image, 2 size, 2 stride
4: Convolutional Layer: 56 x 56 x 192 image, 128 filters -> 56 x 56 x 128 image
5: Convolutional Layer: 56 x 56 x 128 image, 256 filters -> 56 x 56 x 256 image
6: Convolutional Layer: 56 x 56 x 256 image, 256 filters -> 56 x 56 x 256 image
7: Convolutional Layer: 56 x 56 x 256 image, 512 filters -> 56 x 56 x 512 image
8: Maxpool Layer: 56 x 56 x 512 image, 2 size, 2 stride
9: Convolutional Layer: 28 x 28 x 512 image, 256 filters -> 28 x 28 x 256 image
10: Convolutional Layer: 28 x 28 x 256 image, 512 filters -> 28 x 28 x 512 image
11: Convolutional Layer: 28 x 28 x 512 image, 256 filters -> 28 x 28 x 256 image
12: Convolutional Layer: 28 x 28 x 256 image, 512 filters -> 28 x 28 x 512 image
13: Convolutional Layer: 28 x 28 x 512 image, 256 filters -> 28 x 28 x 256 image
14: Convolutional Layer: 28 x 28 x 256 image, 512 filters -> 28 x 28 x 512 image
15: Convolutional Layer: 28 x 28 x 512 image, 256 filters -> 28 x 28 x 256 image
16: Convolutional Layer: 28 x 28 x 256 image, 512 filters -> 28 x 28 x 512 image
17: Convolutional Layer: 28 x 28 x 512 image, 512 filters -> 28 x 28 x 512 image
18: Convolutional Layer: 28 x 28 x 512 image, 1024 filters -> 28 x 28 x 1024 image
19: Maxpool Layer: 28 x 28 x 1024 image, 2 size, 2 stride
20: Convolutional Layer: 14 x 14 x 1024 image, 512 filters -> 14 x 14 x 512 image
21: Convolutional Layer: 14 x 14 x 512 image, 1024 filters -> 14 x 14 x 1024 image
22: Convolutional Layer: 14 x 14 x 1024 image, 512 filters -> 14 x 14 x 512 image
23: Convolutional Layer: 14 x 14 x 512 image, 1024 filters -> 14 x 14 x 1024 image
24: Convolutional Layer: 14 x 14 x 1024 image, 1024 filters -> 14 x 14 x 1024 image
25: Convolutional Layer: 14 x 14 x 1024 image, 1024 filters -> 7 x 7 x 1024 image
26: Convolutional Layer: 7 x 7 x 1024 image, 1024 filters -> 7 x 7 x 1024 image
27: Convolutional Layer: 7 x 7 x 1024 image, 1024 filters -> 7 x 7 x 1024 image
28: Connected Layer: 50176 inputs, 4096 outputs
29: Connected Layer: 4096 inputs, 1470 outputs
30: Detection Layer
forced: Using default '0'
Loading weights from weights/yolo.weights...Done!
data/dog.jpg: Predicted in 0.170866 seconds.
car: 51%
bicycle: 24%
dog: 25%
init done
opengl support available
```
![](/images/research/object-detection/Yolo/YOLO_predictions_out.jpg)

多测试两张
```
./darknet yolo test cfg/yolo.cfg weights/yolo.weights data/person.jpg
```

![](/images/research/object-detection/Yolo/YOLO_person_prediction_out.jpg)

```
./darknet yolo test cfg/yolo.cfg weights/yolo.weights data/horses.jpg
```

![](/images/research/object-detection/Yolo/YOLO_horses_prediction_out.jpg)

### 实时检测
运行这个Demo你需要编译 Darknet with CUDA and OpenCV. 你还需要选择 大中小 适当的模型和其对应的权值文件。通过 ls /dev/vi* 查看usb摄像头设备，如果输出video0则证明可用。

```
./darknet yolo demo cfg/yolo.cfg weights/yolo.weights
```
或者将一个小的待检测的视频文件，如test.mp4 放到darknet 根目录下
```
./darknet yolo demo cfg/yolo.cfg weights/yolo.weights test.mp4
```
来实现对视频文件进行实时检测。

### 修改显示阈值
YOLO 默认只显示 置信率大于0.2 的预测，可以通过参数 -thresh 0 来制定显示置信率的范围
```
./darknet yolo test cfg/yolo.cfg weights/yolo.weights data/dog.jpg -thresh 0
```
![](/images/research/object-detection/Yolo/Screen_Shot_2015-08-14_at_11.42.02_AM.png)

### 预测VOC2012test数据集

点击下面的链接，下载VOC2012test数据集
http://host.robots.ox.ac.uk:8080/eval/downloads/VOC2012test.tar
```
tar xf VOC2012test.tar
cp VOCdevkit/VOC2012/ImageSets/Main/test.txt .
```
生成图片文件的全路径
```
sed 's?^?'`pwd`'/VOCdevkit/VOC2012/JPEGImages/?; s?$?.jpg?' test.txt > voc.2012.test
```
将测试文件路径复制到 darknet /data 目录下
```
mv voc.2012.test <path-to>/darknet/data
```

运行预测
```
./darknet yolo valid cfg/yolo.cfg weights/yolo.weights
```
![](/images/research/object-detection/Yolo/Yolo_vaild.jpg)
![](/images/research/object-detection/Yolo/Yolo_valid_finish.jpg)

而结果在 /darknet/results/下，打开例如 comp4_det_test_bird.txt ，可以依次看到 图片名称，置信率，方框左上角和右下角的坐标
```
2008_000004 0.008654 0.000000 24.913101 363.373016 500.000000
2008_000005 0.009914 312.701294 66.039398 386.487000 196.171997
2008_000005 0.001622 332.917145 88.719940 395.596405 176.586151
2008_000005 0.004571 333.134979 60.575203 423.763519 201.134369
2008_000005 0.010197 410.791443 71.641754 485.329590 204.735779
2008_000005 0.002316 419.207123 126.652931 475.495758 229.286133
2008_000005 0.001054 268.657776 188.379456 387.683960 288.772614
2008_000005 0.001442 253.524567 235.698074 394.108795 343.994049
2008_000010 0.002900 34.902084 5.141296 378.781433 371.530365
2008_000011 0.001770 88.507141 60.645809 251.819916 128.710754
2008_000011 0.002937 208.442169 72.542442 356.038971 139.302185
2008_000011 0.003189 15.292969 49.904770 209.187149 158.970016
2008_000011 0.001175 350.284515 88.715370 441.157318 154.096954
2008_000011 0.005729 352.224884 69.389618 479.886383 195.413666
```
## 参考链接

* [YOLO: Real-Time Object Detection](http://pjreddie.com/darknet/yolo/)
