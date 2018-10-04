---
title: Nvidia Digits with Caffe 配置指南
date: 2016-07-26 21:33:58
tags: caffe
categories: 深度学习
toc: ture
---
Digits: Deep Learning GPU Training System1，是由英伟达（NVIDIA）公司开发的第一个交互式深度学习GPU训练系统。目的在于整合现有的Deep Learning开发工具，实现深度神经网络（Deep Neural Network，DNN）设计、训练和可视化等任务变得简单化。<!--more-->DIGITS是基于浏览器的接口，因而通过实时的网络行为的可视化，可以快速设计最优的DNN。DIGITS是开源软件，可在[GitHub](https://github.com/NVIDIA/DIGITS)上找到，因而开发人员可以扩展和自定义DIGITS。

Demo: 访问 http://digits.daoapp.io
## Digits 特性

* 提供了友好的用户界面，只需简单的点击即完成DNNs的训练。Digits是一个Web应用，用浏览器访问，上图是典型的工作流程图。
* Digits用户接口提供了DNN优化工具。主控制台列出了现有的数据库和机器上可用的先前训练好的网络模型以及正在进行的训练活动。
* Digits使可视化网络和快速对比精度变得简单。你选择一个模型，Digits显示训练状态和精度，并提供在网络训练时或训练完毕后加载和分类图像的选项。
* 由于Digits运行在一个web服务器上，团队用户可以很方便地分享数据库和网络配置，以及测试和分享结果。
* Digits集成了流行的 [Caffe](https://github.com/BVLC/caffe) (deep learning framework)，并支持使用cuDNN进行GPU加速。

## 安装
**注意：** 在此，我们默认你以安装好了[Caffe](https://github.com/BVLC/caffe) 或 [torch7](https://github.com/torch/torch7)，本文以Ubuntu 14.04 LTS 环境下简述Nvidia Digits 和 caffe 相关配置，如果您在Ubuntu 下还没有配置成功 Caffe ,建议你查看我的另一篇博客 [Ubuntu 14.04 64bit + Caffe rc3 + CUDA 7.5 + Intel MKL 配置说明](http://blog.mindcont.com/2016/07/20/ubuntu1404-caffe-r3-cuda7-5-mkl/)。

打开命令行，依次输入下面的指令
```sh
# 获取 CUDA packages
CUDA_REPO_PKG=cuda-repo-ubuntu1404_7.5-18_amd64.deb
wget http://developer.download.nvidia.com/compute/cuda/repos/ubuntu1404/x86_64/${CUDA_REPO_PKG} -O /tmp/${CUDA_REPO_PKG}
sudo dpkg -i /tmp/${CUDA_REPO_PKG}
rm -f /tmp/${CUDA_REPO_PKG}

# 获取 Nvidia Machine Learning packages
ML_REPO_PKG=nvidia-machine-learning-repo_4.0-2_amd64.deb
wget http://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1404/x86_64/${ML_REPO_PKG} -O /tmp/${ML_REPO_PKG}
sudo dpkg -i /tmp/${ML_REPO_PKG}
rm -f /tmp/${ML_REPO_PKG}

# Download new list of packages
sudo apt-get update
```
安装，默认位置 /usr/share/digits 下
```bash
# 安装Digits
sudo apt-get install digits

# 安装Nvidia caffe ，安装过 BVLC/caffe 再安装这里的 Nvidia caffe 很容易！
export CAFFE_HOME=~/NVcaffe
git clone https://github.com/NVIDIA/caffe.git $CAFFE_HOME

# 安装 python依赖
sudo pip install -r $CAFFE_HOME/python/requirements.txt

# 编译
cd $CAFFE_HOME
mkdir build
cd build
cmake ..
make --jobs=4 #这里指使用4线程编译，通常跟 **你的处理器的核数** 一致

# 配置，按提示执行
sudo python -m digits.config.edit -v

```
开启服务
```bash
# 跳转到安装目录
cd /usr/share/digits

# 查看当前目录下的文件
dir

# 启动
sudo ./digits-devserver
```
打开浏览器，依次访问 http://localhost/ (if installed from Deb packages), http://localhost:5000/ (if using digits-devserver) or http://localhost:34448/ (if using digits-server). 如果你看到如下画面，恭喜你，digits 已运行成功！

![](/images/research/caffe/digits/digits_success.jpg)

不过一般情况下，你会看到如下画面
![](/images/research/caffe/digits/digits_error.png)
不要气馁，导致的原因大多因为Digits 依赖的环境与你本地的环境版本不符而导致的。
下面是官方[requirements.txt](https://github.com/NVIDIA/DIGITS/blob/master/requirements.txt)，其中有几项必须是特定版本，如 Flask==0.10.1，lmdb==0.87等
```
Pillow>=2.3.0,<=3.1.2
numpy>=1.8.1,<=1.11.0
scipy>=0.13.3,<=0.17.0
protobuf>=2.5.0,<=2.6.1
six>=1.5.2,<=1.10.0
requests>=2.2.1,<=2.9.1
gevent>=1.0,<=1.0.2
Flask==0.10.1
Flask-WTF==0.11,<=0.12
wtforms>=2.0,<=2.1
Flask-SocketIO==0.6.0
gunicorn==17.5
setuptools>=3.3,<=20.7.0
lmdb==0.87
h5py>=2.2.1,<=2.6.0
pydot==1.0.28
```
解决方法
```bash
# 查看本地环境版本
pip list

#比对其中不合适的，进行卸载
sudo pip uninstall ***

#例如安装指定版本 lmdb==0.87
sudo pip install 'lmdb==0.87'
```

## 使用
### 下载数据集
打开命令行，依次输入下面的指令,将会下载mnist数据集到 /home/你的用户名/mnist 文件夹下
```bash
python /usr/share/digits/tools/download_data/main.py mnist ~/mnist
```
### 创建数据集
依次点击 New Dataset > Images > Classification，并按下图配置
![](/images/research/caffe/digits/new-dataset.jpg)

点击 create，会看到如下画面。表示正在把下载的数据集创建为 lmdb 数据库格式。
![](/images/research/caffe/digits/creating-dataset.jpg)

当 jobs 进度条完成后，可以查看数据库中的 trian 和 test 数据库格式。其中 训练数据 占数据集的75%
![](/images/research/caffe/digits/explore_mnist_train_lmdb.png)

测试数据 占数据集的 25%
![](/images/research/caffe/digits/explore_mnist_test_lmdb.png)

点击 左上角 DIGITS 返回主界面
![](/images/research/caffe/digits/digits_main.png)

### 训练模型
依次点击  New Model > Images > Classification，进入模型配置界面，并按下图配置训练模型
![](/images/research/caffe/digits/new-model-top-half.jpg)
![](/images/research/caffe/digits/new-model-bottom-half.jpg)
点击创建后，训练任务自动执行。如下图所示
![](/images/research/caffe/digits/digits_real_time.png)
等待训练结束，下面我们好进行测试。
### 测试训练结果
![](/images/research/caffe/digits/digits_test.png)

首先测试**单张图片**，点击Browse 按钮，以此选择类似于下面的路径
![](/images/research/caffe/digits/digits_test_one_upload.png)

之后点击 Classify One ，并候选选框，会看到如下，显示模型每层的处理情况。
![](/images/research/caffe/digits/digits_test_one_res.png)
**测试多张图片**，同理打开类似下面的路径
![](/images/research/caffe/digits/digits_test_many_upload.png)
然后点击 Classify Many。会看到后台结果如下
![](/images/research/caffe/digits/digits_test_many_service.png)
测试结果如下
![](/images/research/caffe/digits/digits_test_many_res.png)
可视化分类结果
![](/images/research/caffe/digits/digits_test_many_TopN.png)

## 参考链接
* [NVIDIA-DIGITS](https://github.com/NVIDIA/DIGITS/blob/master/docs/GettingStarted.md)
* [如若明镜- NVIDIA DIGITS 学习笔记](http://blog.csdn.net/enjoyyl/article/details/47397505)
