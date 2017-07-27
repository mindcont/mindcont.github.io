---
title: 深度学习：数据集篇
date: 2016-09-13 16:34:32
tags:
categories: 深度学习
---
大数据，数据挖掘，深度学习，终究绕不开数据集，为此单独开一个页面，持续更新各类数据集，希望可以碰出一些好的思路，用深度学习的方法解决一些实际问题。

<!-- ![](http://static.mindcont.com/blog/images/ubuntu/princeton.jpg) -->

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Download</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="http://places.csail.mit.edu/index.html">AlexNet-Places205</a></td>
      <td><img src="https://caffe2.ai/static/images/boathouse.png" alt="images places recognition" /></td>
      <td><a href="http://places.csail.mit.edu/model/placesCNN_upgraded.tar.gz">download</a></td>
    </tr>
    <tr>
      <td><a href="http://www.speech.cs.cmu.edu/databases/an4/">AN4</a>: 948 training and 130 test utterances</td>
      <td><img src="https://caffe2.ai/static/images/landing-audio.png" alt="speech" /></td>
      <td><a href="http://www.speech.cs.cmu.edu/databases/an4/an4_raw.bigendian.tar.gz">download</a></td>
    </tr>
    <tr>
      <td><a href="https://www2.eecs.berkeley.edu/Research/Projects/CS/vision/bsds/">BSDS (300/500)</a>: 12k labeled segmentations</td>
      <td><img src="https://caffe2.ai/static/images/wolf.jpg" alt="image segmentation" /></td>
      <td><a href="https://www2.eecs.berkeley.edu/Research/Projects/CS/vision/bsds/BSDS300-images.tgz"> images</a> <a href="https://www2.eecs.berkeley.edu/Research/Projects/CS/vision/bsds/BSDS300-human.tgz"> segmentations</a></td>
    </tr>
    <tr>
      <td><a href="http://mmlab.ie.cuhk.edu.hk/projects/CelebA.html">Celeb-A</a>: 200k+ celebrity images, 10k+ identities</td>
      <td><img src="https://caffe2.ai/static/images/celebrity.png" alt="celebrity images" /></td>
      <td><a href="https://www.dropbox.com/sh/8oqt9vytwxb3s4r/AAB06FXaQRUNtjW9ntaoPGvCa?dl=0">download</a></td>
    </tr>
    <tr>
      <td><a href="https://www.cs.toronto.edu/~kriz/cifar.html">CIFAR-10</a>: 60k tiny (32x32) tagged images</td>
      <td><img src="https://caffe2.ai/static/images/cifar-tiny.png" alt="tiny images" /></td>
      <td><a href="https://www.cs.toronto.edu/~kriz/cifar.html">download</a></td>
    </tr>
    <tr>
      <td><a href="http://mscoco.org/dataset/">COCO</a>: A large image dataset designed for object detection, segmentation, and caption generation.</td>
      <td><img src="https://caffe2.ai/static/images/coco.png" alt="coco" /></td>
      <td><a href="http://mscoco.org/dataset/#download">download</a></td>
    </tr>
    <tr>
      <td><a href="http://mmlab.ie.cuhk.edu.hk/datasets/comp_cars/index.html">CompCars</a>: 136k+ car images &amp; 1716 car models</td>
      <td><img src="https://caffe2.ai/static/images/cars.png" alt="cars" /></td>
      <td><a href="http://mmlab.ie.cuhk.edu.hk/datasets/comp_cars/index.html">download</a></td>
    </tr>
    <tr>
      <td><a href="http://www.robots.ox.ac.uk/~vgg/data/flowers/102/index.html">Oxford 102 Flowers</a>: 102 flower categories</td>
      <td><img src="https://caffe2.ai/static/images/flowers.png" alt="flowers" /></td>
      <td><a href="http://www.robots.ox.ac.uk/~vgg/data/flowers/102/102flowers.tgz"> images</a> <a href="http://www.robots.ox.ac.uk/~vgg/data/flowers/102/102segmentations.tgz"> segmentations</a></td>
    </tr>
    <tr>
      <td><a href="http://image-net.org/">ImageNet</a>: 14,197,122 images, 21841 synsets indexed</td>
      <td><img src="https://caffe2.ai/static/images/imagenet.jpg" alt="large range of images" /></td>
      <td><a href="http://image-net.org/download">download</a></td>
    </tr>
    <tr>
      <td><a href="http://www.image-net.org/challenges/LSVRC/">ImageNet ILSVRC</a>: Competition datasets</td>
      <td><img src="https://caffe2.ai/static/images/imagenet.jpg" alt="large range of images" /></td>
      <td><a href="http://www.image-net.org/challenges/LSVRC/">download</a></td>
    </tr>
    <tr>
      <td><a href="https://en.wikipedia.org/wiki/Iris_flower_data_set">Iris</a></td>
      <td><img src="https://caffe2.ai/static/images/iris.jpg" alt="flowers &gt; classification" /></td>
      <td><a href="https://en.wikipedia.org/wiki/Iris_flower_data_set">download</a></td>
    </tr>
    <tr>
      <td><a href="http://lsun.cs.princeton.edu/2016/">LSUN Scenes</a> millions of indoor/outdoor building scenes</td>
      <td><img src="https://caffe2.ai/static/images/kitchen.jpg" alt="scene classification" /></td>
      <td><a href="https://github.com/fyu/lsun/blob/master/download.py">download</a></td>
    </tr>
    <tr>
      <td><a href="http://lsun.cs.princeton.edu/2016/">LSUN Room Layout</a> 4000 indoor scenes</td>
      <td><img src="https://caffe2.ai/static/images/layout.png" alt="scene classification" /></td>
      <td><a href="https://github.com/fyu/lsun/blob/master/download.py">download</a></td>
    </tr>
    <tr>
      <td><a href="http://yann.lecun.com/exdb/mnist/">MNIST</a> 60k handwriting training set, 10k test images</td>
      <td><img src="https://caffe2.ai/static/images/mnist.png" alt="handwriting" /></td>
      <td><a href="http://yann.lecun.com/exdb/mnist/">download</a></td>
    </tr>
    <tr>
      <td><a href="http://cs-people.bu.edu/jmzhang/sos.html">Multi-Salient-Object (MSO)</a> 1224 tagged salient object images</td>
      <td><img src="https://caffe2.ai/static/images/mso.png" alt="tagged objects" /></td>
      <td><a href="http://www.cs.bu.edu/groups/ivc/data/SOS/MSO.zip">download</a></td>
    </tr>
    <tr>
      <td><a href="http://www.openu.ac.il/home/hassner/Adience/data.html#agegender">OUI-Adience Face Image</a> 26,580 age &amp; gender labeled images</td>
      <td><img src="https://caffe2.ai/static/images/age.png" alt="age, gender" /></td>
      <td><a href="http://www.openu.ac.il/home/hassner/Adience/data.html#agegender">download</a></td>
    </tr>
    <tr>
      <td><a href="http://host.robots.ox.ac.uk/pascal/VOC/">PASCAL VOC 2012</a> 11,530 images w/ 27,450 ROI annotated objects and 6,929 segmentations</td>
      <td><img src="https://caffe2.ai/static/images/voc.png" alt="images &gt; object recognition" /></td>
      <td><a href="http://host.robots.ox.ac.uk/pascal/VOC/">download</a></td>
    </tr>
    <tr>
      <td><a href="http://www.netresec.com/?page=PcapFiles">PCAP</a> Network captures of regular internet traffic and attack scenario traffic</td>
      <td><img src="https://caffe2.ai/static/images/defcon.jpg" alt="network capture" /></td>
      <td><a href="http://www.netresec.com/?page=PcapFiles">download</a></td>
    </tr>
    <tr>
      <td><a href="http://www.fit.vutbr.cz/~imikolov/rnnlm/">Penn Treebank (PTB)</a> statistical language modeling</td>
      <td><img src="https://caffe2.ai/static/images/landing-audio.png" alt="language" /></td>
      <td><a href="http://www.fit.vutbr.cz/~imikolov/rnnlm/simple-examples.tgz">download</a></td>
    </tr>
    <tr>
      <td><a href="http://crcv.ucf.edu/data/UCF_YouTube_Action.php">UCF11/YouTube Action</a> 11 action categories: basketball shooting, biking/cycling, diving, golf swinging, horse back riding, soccer juggling, swinging, tennis swinging, trampoline jumping, volleyball spiking, and walking with a dog</td>
      <td><img src="https://caffe2.ai/static/images/action.jpg" alt="video &gt; action" /></td>
      <td><a href="http://crcv.ucf.edu/data/UCF_YouTube_Action.php">download</a></td>
    </tr>
    <tr>
      <td><a href="https://archive.ics.uci.edu/ml/datasets.html">UCI Datasets</a></td>
      <td><img src="https://caffe2.ai/static/images/caffe2variety.png" alt="variety" /></td>
      <td><a href="https://archive.ics.uci.edu/ml/datasets.html">download</a></td>
    </tr>
    <tr>
      <td><a href="https://catalog.data.gov/dataset">US Census</a>: demographic data</td>
      <td><img src="https://caffe2.ai/static/images/linegraph.png" alt="line graph" /></td>
      <td><a href="https://catalog.data.gov/dataset">download</a></td>
    </tr>
    <tr>
      <td><a href="http://www.robots.ox.ac.uk/~vgg/software/vgg_face/">VGG-Face</a> millions of faces</td>
      <td><img src="https://caffe2.ai/static/images/faces.jpg" alt="faces" /></td>
      <td><a href="http://www.robots.ox.ac.uk/~vgg/software/vgg_face/src/vgg_face_caffe.tar.gz">download</a></td>
    </tr>
  </tbody>
</table>

## 补充
|CV 开源代码|链接|
|---|---|
|code| http://www.sigvc.org/bbs/thread-72-1-1.html|
|vision.princeton.edu|vision.princeton.edu/research.html|

|ILSVRC 历年竞赛数据集|链接 (http://image-net.org/)|
|---|---|
|ILSVRC2016 Challenge|http://image-net.org/challenges/LSVRC/2016/download-images-8r28#det|
|ILSVRC2015 Challenge|http://image-net.org/challenges/LSVRC/2015/download-images-3j16.php|
|ILSVRC2014 Challenge|http://image-net.org/challenges/LSVRC/2014/download-images-5jj5.php|
|ILSVRC2012 Challenge|http://image-net.org/challenges/LSVRC/2012/nonpub-downloads|
|ILSVRC2010 Challenge|http://image-net.org/challenges/LSVRC/2010/download-all-nonpub|

|PASCAL VOC Challenge|链接|
|---|---|
|The PASCAL VOC Challenge 2012|http://host.robots.ox.ac.uk/pascal/VOC/voc2012/|
|The PASCAL VOC Challenge 2007|http://host.robots.ox.ac.uk/pascal/VOC/voc2007/|

|名称|链接|
|---|---|
|MS-COCO|http://mscoco.org/dataset/#download|
|youtube人脸|http://www.cs.tau.ac.il/~wolf/ytfaces/index.html|
|人脸|http://vis-www.cs.umass.edu/lfw/|
|三维人脸|http://biometrics.idealtest.org/dbDetailForUser.do?id=8|
|文本类|http://blog.csdn.net/freesum/article/details/7370823|
|数字图像处理|http://blog.csdn.net/wangyaninglm/article/details/38707257|
|机器视觉中常用的数据测试集|http://blog.csdn.net/maxiemei/article/details/17281767|
|常用图像数据集：标注、检索|http://www.cnblogs.com/huashiyiqike/p/3778035.html|
|花卉|http://www.cnblogs.com/fuleying/p/3895817.html|
|100+诡异的数据集|http://www.cnblogs.com/xianghang123/p/3773086.html|

## 参考

* [数据分析和挖掘有哪些公开的数据来源？](https://www.zhihu.com/question/19969760)
* [Datasets | Caffe2](https://caffe2.ai/docs/datasets.html)
