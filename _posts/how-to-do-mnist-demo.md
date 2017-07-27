---
title: Caffe 入门-MNIST 实验
date: 2017-04-25 11:45:16
tags:
categories: 深度学习
toc: ture
---
MNIST 是一个包含各种手写数字（0-9）图片(images)和对应标签(label)的数据集，下面我们将介绍如何利用 [Caffe](https://github.com/bvlc/caffe/)框架对手写数字识别一个完整的流程，本实验代码可以[github](https://github.com/mindcont/caffe/blob/master/examples/mnist)下载。

<!--more-->
![](https://static.mindcont.com/blog/images/caffe/asamples.gif)

## 数据集准备
### 下载数据集
You will first need to download and convert the data format from the MNIST website. To do this, simply run the following commands:

We will assume that you have Caffe successfully compiled. If not, please refer to the [Installation page](). In this tutorial, we will assume that your Caffe installation is located at CAFFE_ROOT.

```bash
cd $CAFFE_ROOT

# 下载数据集并解压
./data/mnist/get_mnist.sh
```

输出结果

```java
pi@DEEPMIND:~/caffe$ ./data/mnist/get_mnist.sh
Downloading...
--2017-04-24 09:59:12--  http://yann.lecun.com/exdb/mnist/train-images-idx3-ubyte.gz
正在解析主机 yann.lecun.com (yann.lecun.com)... 216.165.22.6
正在连接 yann.lecun.com (yann.lecun.com)|216.165.22.6|:80... 已连接。
已发出 HTTP 请求，正在等待回应... 302 Found
位置：http://10.10.10.50/files/4107000000008DA0/yann.lecun.com/exdb/mnist/train-images-idx3-ubyte.gz [跟随至新的 URL]
--2017-04-24 09:59:17--  http://10.10.10.50/files/4107000000008DA0/yann.lecun.com/exdb/mnist/train-images-idx3-ubyte.gz
正在连接 10.10.10.50:80... 已连接。
已发出 HTTP 请求，正在等待回应... 200 OK
长度： 9912422 (9.5M) [application/octet-stream]
正在保存至: “train-images-idx3-ubyte.gz”

100%[======================================>] 9,912,422    479KB/s   用时 20s  

2017-04-24 09:59:37 (485 KB/s) - 已保存 “train-images-idx3-ubyte.gz” [9912422/9912422])
.
.
.
长度： 4542 (4.4K) [application/x-gzip]
正在保存至: “t10k-labels-idx1-ubyte.gz”

100%[======================================>] 4,542       --.-K/s   用时 0.001s

2017-04-24 09:59:44 (7.86 MB/s) - 已保存 “t10k-labels-idx1-ubyte.gz” [4542/4542])

```

### 数据存储格式

There are 4 files:
```bash
训练集
train-images-idx3-ubyte: training set images
train-labels-idx1-ubyte: training set labels

验证集
t10k-images-idx3-ubyte:  test set images
t10k-labels-idx1-ubyte:  test set labels
```
The training set contains 60000 examples, and the test set 10000 examples.

The first 5000 examples of the test set are taken from the original NIST training set. The last 5000 are taken from the original NIST test set. The first 5000 are cleaner and easier than the last 5000.

对于每个文件的存储格式，以train-images-idx3-ubyte 训练集图片：
```
TRAINING SET IMAGE FILE (train-images-idx3-ubyte):
[offset] [type]          [value]          [description]
0000     32 bit integer  0x00000803(2051) magic number
0004     32 bit integer  60000            number of images
0008     32 bit integer  28               number of rows
0012     32 bit integer  28               number of columns
0016     unsigned byte   ??               pixel
0017     unsigned byte   ??               pixel
........
xxxx     unsigned byte   ??               pixel

Pixels are organized row-wise. Pixel values are 0 to 255. 0 means background (white), 255 means foreground (black).
```
头部信息存储 整个文件信息（magic_number,number of images,image_width,image_hight），按字节偏移地址依次存储 每个像素的信息，对于单副图片我们要依次遍历28*28个像素，更多参见[mnist](http://yann.lecun.com/exdb/mnist/) 。


### 可视化MNIST 数据集

```bash
cd /data/mnist
mkdir train
python visual_mnist_data.py
```

从 `data/mnist/train/`下，我们可以看到刚才将 rain-images-idx3-ubyte 提取出来的训练集图像，可以看到训练集中单个图片是28*28 单通道灰度图像，如下图所示

![](https://static.mindcont.com/blog/images/caffe/0.png)

标签文件按图片名称顺序代表图片中数字。如 `0.png` 对应label.txt 第一个字符 5。


### 转化为lmdb 格式

```bash
./examples/mnist/create_mnist.sh
```

输出结果
```java
pi@DEEPMIND:~/caffe$ ./examples/mnist/create_mnist.sh
Creating lmdb...
I0424 10:03:11.133980  2966 db_lmdb.cpp:35] Opened lmdb examples/mnist/mnist_train_lmdb
I0424 10:03:11.134397  2966 convert_mnist_data.cpp:88] A total of 60000 items.
I0424 10:03:11.134409  2966 convert_mnist_data.cpp:89] Rows: 28 Cols: 28
I0424 10:03:15.408113  2966 convert_mnist_data.cpp:108] Processed 60000 files.
I0424 10:03:15.553190  2969 db_lmdb.cpp:35] Opened lmdb examples/mnist/mnist_test_lmdb
I0424 10:03:15.553597  2969 convert_mnist_data.cpp:88] A total of 10000 items.
I0424 10:03:15.553642  2969 convert_mnist_data.cpp:89] Rows: 28 Cols: 28
I0424 10:03:16.184403  2969 convert_mnist_data.cpp:108] Processed 10000 files.
Done.

```

## 定义MNIST 网络

这一部分，官方教程比较好，移步[Training LeNet on MNIST with Caffe](https://github.com/bvlc/caffe/blob/master/examples/mnist/readme.md)。
值得注意的是：本本所使用的LeNet模型 ，和原始的有所不同，我们使用Relu 代替 sigmoid,在`examples/mnist/lenet_train_test.prototxt`下。

### 可视化网络
```bash
cd  examples/mnist/trian
bash ./vis_net.sh
```
训练网络
![](https://static.mindcont.com/blog/images/caffe/lenet_train_test.png)

测试／部署网络，即用于测试，和训练网络区别在于没有标签的输入，只有前向传播过程。
![](https://static.mindcont.com/blog/images/caffe/lenet.png)

## 训练

```bash
cd /examples/mnist/train
./
./train_lenet.sh
```

其中`train_lenet.sh`内容如下
```java
#!/usr/bin/env sh
set -e

log_path="logs/"
mkdir -p $log_path

save_model_path="caffemodel/"
mkdir -p $save_model_path

# training log
file_prefix="mnist_"
log_file=$(date -d "today" +"%Y-%m-%d-%H:%M:%S")
log_file=$log_path$file_prefix$log_file".log"

# caffe execute file path
caffe_bin="../../../build/tools/caffe"

$caffe_bin train --solver=lenet_solver.prototxt  2>&1  | tee -a $log_file
```

观察训练日志输出，保存在`logs/`
```java
I0424 11:10:01.759721  4049 caffe.cpp:211] Use CPU.
I0424 11:10:01.785264  4049 solver.cpp:44] Initializing solver from parameters:
test_iter: 100
test_interval: 500
base_lr: 0.01
display: 100
max_iter: 10000
lr_policy: "inv"
gamma: 0.0001
power: 0.75
momentum: 0.9
weight_decay: 0.0005
snapshot: 5000
snapshot_prefix: "caffemodel/lenet"
solver_mode: CPU
net: "lenet_train_test.prototxt"
train_state {
  level: 0
  stage: ""
}
I0424 11:10:01.785367  4049 solver.cpp:87] Creating training net from net file: lenet_train_test.prototxt
I0424 11:10:01.785703  4049 net.cpp:294] The NetState phase (0) differed from the phase (1) specified by a rule in layer mnist
I0424 11:10:01.785719  4049 net.cpp:294] The NetState phase (0) differed from the phase (1) specified by a rule in layer accuracy
I0424 11:10:01.785794  4049 net.cpp:51] Initializing net from parameters:
name: "LeNet"
state {
  phase: TRAIN
  level: 0
  stage: ""
}
layer {
  name: "mnist"
  type: "Data"
  top: "data"
  top: "label"
  include {
    phase: TRAIN
  }
  transform_param {
    scale: 0.00390625
  }
  data_param {
    source: "../mnist_train_lmdb"
    batch_size: 64
    backend: LMDB
  }
}

.
.
.

I0424 11:22:48.831621  4049 solver.cpp:218] Iteration 9900 (14.7601 iter/s, 6.775s/100 iters), loss = 0.00511876
I0424 11:22:48.831665  4049 solver.cpp:237]     Train net output #0: loss = 0.00511864 (* 1 = 0.00511864 loss)
I0424 11:22:48.831676  4049 sgd_solver.cpp:105] Iteration 9900, lr = 0.00596843
I0424 11:22:55.538620  4049 solver.cpp:447] Snapshotting to binary proto file caffemodel/lenet_iter_10000.caffemodel
I0424 11:22:55.543390  4049 sgd_solver.cpp:273] Snapshotting solver state to binary proto file caffemodel/lenet_iter_10000.solverstate
I0424 11:22:55.578083  4049 solver.cpp:310] Iteration 10000, loss = 0.00350995
I0424 11:22:55.578119  4049 solver.cpp:330] Iteration 10000, Testing net (#0)
I0424 11:22:59.965965  4054 data_layer.cpp:73] Restarting data prefetching from start.
I0424 11:23:00.153450  4049 solver.cpp:397]     Test net output #0: accuracy = 0.9912
I0424 11:23:00.153553  4049 solver.cpp:397]     Test net output #1: loss = 0.0277065 (* 1 = 0.0277065 loss)
I0424 11:23:00.153568  4049 solver.cpp:315] Optimization Done.
I0424 11:23:00.153573  4049 caffe.cpp:259] Optimization Done.

```
至此，我们就完成了利用Lenet 网络模型在mnist数据集上进行训练，如何评价训练结果呢？我们可以输入一张新的图片，使用刚才训练的模型进行预测，来评价我们训练结果的好坏。

## 预测一张新的图片

假设待预测图片为下图
![](https://static.mindcont.com/blog/images/caffe/2.png)

```bash
cd examples/mnist/test
python mnist_test.py 2.png

```
输出
```java
pi@DEEPMIND:~/caffe/examples/mnist/test$ python mnist_test.py test.jpg
WARNING: Logging before InitGoogleLogging() is written to STDERR
W0424 14:23:46.789387  6313 _caffe.cpp:139] DEPRECATION WARNING - deprecated use of Python interface
W0424 14:23:46.789423  6313 _caffe.cpp:140] Use this instead (with the named "weights" parameter):
W0424 14:23:46.789428  6313 _caffe.cpp:142] Net('../train/lenet.prototxt', 1, weights='../train/caffemodel/lenet_iter_10000.caffemodel')
I0424 14:23:46.883805  6313 net.cpp:51] Initializing net from parameters:
name: "LeNet"
state {
  phase: TEST
  level: 0
}
layer {
  name: "data"
  type: "Input"
  top: "data"
  input_param {
    shape {
      dim: 64
      dim: 1
      dim: 28
      dim: 28
    }
  }
}
layer {
  name: "conv1"
  type: "Convolution"
  bottom: "data"
  top: "conv1"
  param {
    lr_mult: 1
  }
  param {
    lr_mult: 2
  }
  convolution_param {
    num_output: 20
    kernel_size: 5
    stride: 1
    weight_filler {
      type: "xavier"
    }
    bias_filler {
      type: "constant"
    }
  }
}

.
.
.

I0424 14:41:40.851599  7883 net.cpp:242] This network produces output prob
I0424 14:41:40.851608  7883 net.cpp:255] Network initialization done.
I0424 14:41:40.854398  7883 net.cpp:744] Ignoring source layer mnist
I0424 14:41:40.854982  7883 net.cpp:744] Ignoring source layer loss
[  5.44423534e-11   2.36225206e-11   1.00000000e+00   6.40073061e-09
   1.00278713e-18   2.31217930e-18   2.05065188e-17   6.41556852e-09
   5.65470171e-10   1.42476214e-13]
2

```

可以看到网络输出10分类各自的概率，最后取最大的概率所对应的标签作为预测结果，即`2`。

## 总结
通过上面的步骤，我们就完成了一个机器学习的通用步骤，即数据集的预处理、训练网络的定义，训练，预测和评估。

## 参考
* [Training LeNet on MNIST with Caffe](https://github.com/bvlc/caffe/blob/master/examples/mnist/readme.md)
* [MNIST Demos on Yann LeCun's website](http://yann.lecun.com/exdb/lenet/)
