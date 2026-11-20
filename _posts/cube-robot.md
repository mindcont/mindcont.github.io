---
title: 魔方机器人开箱
date: 2018-02-28 13:48:02
tags:
toc: true
---

学习，理解，锻炼，在充分思考后动手，DIY能够会磨炼你的耐心和细心，这就是所谓的“创客精神的吧”！😺 😸 😹

<!--more-->

**Demo**

<video src="https://github.com/mindcont/mindcont.github.io/raw/master/videos/cube-robot.mp4" controls="controls" style="max-width: 500px; display: block; margin-left: auto; margin-right: auto;">
your browser does not support the video tag
</video>

Let's begin ！！！🐸

## 硬件层

清点一下零件数量是否有缺，部分消耗品或配件（如USB连接线、白乳胶、镊子）外观可能因不同批次有所差异，并不影响使用，部分易得选配件（如电池）可能不会附赠。

### 0、物料清单

|序号|名称(个)|数量|作用|
|--|--|--|--|
|1|木板 A,B,C,D,E|各1|魔方机器人主体结构|
|2|扩展板|1|引出主控板连线，便于与舵机直接连接|
|3|主控板|1|接收电脑动作信号并转换为舵机运动指令|
|4|塑料舵机|1|用于带动旋转魔方基底的运动，与舵盘连接处白色|
|5|金属舵机|1|用于保持、释放和翻转魔方，与舵盘连接处黄色|
|6|电池盒|1|用于存放3节五号电池并给舵机供电。注意：仅凭USB数据线来自电脑主板的供电无法使两舵机正常运转！|
|7|螺丝螺母收纳纸盒|1|收纳用于固定舵机和主控板与木板支架的螺丝和螺母|
|8|高质量魔方|1|容忍旋转角度误差，当旋转不到位时不会卡住|
|9|USB数据线|1|用于给主控板烧录程序以及与电脑通信接受|
|10|五号电池|3节|用于给舵机供电|
|11|十字螺丝刀|1|用于安装螺丝螺母和电池盒与拓展板之间的供电线连接|
|12|镊子|1|用于不便于手伸入的位置夹持和安装螺母，尤其是带尼龙圈的紧固螺母|
|13|白乳胶|1|粘接木板|

![](/images/external/1461b78c0c94.jpg)

### 1、结构拼装
![](/images/external/310701ccec60.jpg)

### 2、魔方托盘
![](/images/external/adc62cb49eef.jpg)

### 3、魔方卡手
![](/images/external/ea91b64a79b3.jpg)

### 4、主体安装
![](/images/external/94295eea123a.jpg)

### 5、详细组装步骤

![](/images/external/d43c7f6ad541.jpg)
![](/images/external/51b80b49b1ea.jpg)
![](/images/external/3515a762db2a.jpg)
![](/images/external/9dc4c1848163.jpg)
![](/images/external/beeb58a834b6.jpg)
![](/images/external/55121db83a64.jpg)
![](/images/external/1434abf75b6b.jpg)
![](/images/external/4a156d125629.jpg)
![](/images/external/aa6523c52d50.jpg)
![](/images/external/22d62a62fff6.jpg)
![](/images/external/e8a2ed448abc.jpg)
![](/images/external/7ff3f83ec8ca.jpg)
![](/images/external/00aa9bd8f56f.jpg)
![](/images/external/f847eea202b7.jpg)
![](/images/external/ac9c367ea21c.jpg)
![](/images/external/9015c67f6656.jpg)
![](/images/external/7e1a1600c8e7.jpg)
![](/images/external/b84b740fcaf7.jpg)
![](/images/external/75c7f251c83b.jpg)
![](/images/external/470a43e271e2.jpg)
![](/images/external/0dafb8696466.jpg)
![](/images/external/145cf2916224.jpg)
![](/images/external/de41eebdf946.jpg)
![](/images/external/2067647c964f.jpg)
![](/images/external/484e96424f74.jpg)
![](/images/external/0f36e2c88c9e.jpg)
![](/images/external/32-retry.jpg)
![](/images/external/e83988dfa6b5.jpg)
![](/images/external/9f178d418452.jpg)
![](/images/external/88ead2161df7.jpg)
![](/images/external/22c25912d3fa.jpg)
![](/images/external/35fdf57ebe4e.jpg)

其中舵机接线方式

|G|V|S|端口号|
|--|--|--|--|
|黑|红|白|5|
|棕|红|黄|6|

![](/images/external/63d535a83dcd.jpg)

电池盒接线方式

|极性|--|
|--|--|
|VCC|电池盒红线|
|GND|电池盒黑线|


![](/images/external/9631caa41400.jpg)
![](/images/external/13f264d8ab35.jpg)
![](/images/external/06ded36d3653.jpg)
![](/images/external/64933c83121f.jpg)
![](/images/external/bf22360b2768.jpg)

至此，硬件平台组装完成 😋
## 软件层

### 1 、安装usb驱动

安装CH340驱动后，电脑方可与Arduino通讯。
根据自己的系统版本下载对应的驱动压缩包，解压》SETUP.EXT》INSTALL 默认安装即可。

win7 [http://www.arduined.eu/files/CH341SER.zip](http://www.arduined.eu/files/CH341SER.zip)
win8及以上 [http://www.arduined.eu/files/windows8/CH341SER.zip](http://www.arduined.eu/files/windows8/CH341SER.zip)
Mac [http://kig.re/downloads/CH341SER_MAC.ZIP](http://kig.re/downloads/CH341SER_MAC.ZIP)

![](/images/external/5d5e0cc693d5.jpg)
![](/images/external/8224e515508d.jpg)
![](/images/external/eda6e58a519d.jpg)

检查是否安装成功。依次右键点击我的电脑》设备管理器》端口，显示`CH340`字样即说明安装成功。
![](/images/external/faa012d05ff5.jpg)
![](/images/external/255d61cdcc7c.jpg)
![](/images/external/2de08b62c325.jpg)


### 2、PC 端烧录程序

这一小节，依次打开本套件赠送的资料中`Arduion`》`rsolve`, 然后双击`rsolve.ino`

![](/images/external/ea7e80cf725f.jpg)

点击Upload

成功安装后，运行`上位机`》`windows`文件下`rubisolver.exe` ,如下图所示

![](/images/external/9d5bd0167732.jpg)

下列界面显示表示已经成功和Arduino通信
![](/images/external/f03e8188c0a8.jpg)

填上魔方颜色后，点击SOLVE，获得解答步骤后，点击SEND，即可
![](/images/external/9cc96214241e.jpg)

主控板烧录程序成功后，开机时魔方的基座旋转舵盘会归位，翻转手臂会自动翻转魔方一次。可视此过程为开机自检。如果此过程不正常，则需要重新剥离舵盘和舵机，以调整初始位置。
![](/images/external/c5359b4cab1d.jpg)

基座塑料舵机初始位：与翻转手轴线平行
翻转卡手舵机初始位：应远离魔方，卡在图中红色圈相应位置
如魔方运转过程中卡顿，请检查电池盒开关是否打开，电池盒与扩展板接线是否牢靠？

**提示：**上位机程序看上去魔方的正面是以翻动魔方手臂的方向看去为前方，即下图所示
![](/images/external/ad9d7690eefb.jpg)


### 3、程序调试
先简单介绍一下舵机的基本知识。舵机简单的说就是集成了直流电机、电机控制器和减速器等，并封装在一个便于安装的外壳里的伺服单元。能够利用简单的输入信号比较精确的转动给定角度的电机系统。
![](/images/external/8837c4015b34.jpg)

舵机除电源外，只要一根信号线即可；使用PPM（脉冲比例调制）信号控制；所谓“PPM”，是一个周期约20ms，其间有个宽度在2ms 左右的脉冲控制信号。一般是以1.5ms 为基准，此时舵机居中，小于1.5ms 舵机左转，大于1.5ms，舵机右转；至于角度和脉冲宽度关系各个产品不同，例如：0.5ms 对应左转90 度，2.5ms 对应右转90 度。
![](/images/external/5da211af8a63.jpg)

由于使用不同的舵机采用的具体脉冲不同，即便是同一型号的舵机也因为死区不一致性，初始位置安装误差等，导致原始程序在部分用户安装的魔方破解机器人上不能正常工作。现根据我们所选用的舵机（塑料舵机：Futaba S3003、金属舵机：TowerPro MG995）上图图示情况进行简单的说明。

1ms（毫秒）=1000us（微秒），所以对应的情况是：
500us =  0°
1000us = 45°
1500us = 90°
2000us = 135°
2500us = 180°

变化区间2000us内涵盖角度0-180°，由此可见脉宽每增加或减少约11us，舵机摆动角度相应改变1°。

现在我们来分析上下位机中对应的需要调整的程序参数。在控制板烧录完程序以后，每次上电启动，魔方破解机器人都会进行一次魔方翻转运动，由此时，你可以观察魔方是否被正确顺滑翻转。你也可以在上位机传送命令F（Flip）翻转，让机器人执行此指令，如下图所示

![](/images/external/3415df6f57bb.jpg)
此外，上位机发送的全部指令一共就三种F（Flip）、H（Hold）、T（Turn）指令默认用空格隔开，对于一段魔方解答的结果就是由这三种指令的结果组成。（为了让部分有兴趣了解其算法的朋友能深入学习，后续我们将继续补充教程，针对此结果产生的算法进行讨论）目前我们仅讨论舵机参数需要调整以确保上诉3个动作能够完整的运行。

手臂舵机（armservo）总的来说有三个位置，对应3种指令
![](/images/external/20c801fcff4c.jpg)

`F（flip）`翻转指令必须要保证手臂和魔方高度匹配，在中间黑色示意的导向区必须保证翻转动作后能自由落下到卡位，所以两块三角形导向板之间的连接螺丝必须保持适当的松紧度。

`H（hold）`把持指令执行时，手臂运动到此位置时，必须保证魔方的上两层被抓手握住，在魔方基底旋转时，魔方能被正确旋拧90度。

`T（turn）`旋转指令执行时，手臂必须退到导向板卡槽处附近，并向上倾斜约45度，手臂在此位置时，魔方基底旋转不会被手臂任何部位所阻碍

接下来，我们看一下，在程序中，以上三个位置对应的参数
![](/images/external/f04d9229e047.jpg)

显然，

`OFF`对应`T指令`时的位置
`HOLD`对应`H指令`时的位置
`PUSH`对应`F指令`时的位置

你可以通过上述舵机的基本知识得到相应的关系去调整此3个参数，并重新烧录程序到Arduino控制板，获得手臂位置的微调。

需要注意的是，当上位机正在运行并与控制板通信时，烧录新程序将失败，因为两个程序竞争，只有能一个程序获得通过串口与控制板通信的权利。

也部分读者可能会问，为什么不是if-else语句中if下的3个参数，那是因为我们舵机可以正反安装，当反向安装时，上面的3个参数对应的位置才有效，否则默认执行else语句下的三个参数。

基底舵机（baseservo）总的来说有四个位置，分别在指令H和T中起作用

仔细观察的读者可能已经发现，放置魔方的基底托盘并不是刚好能放下魔方，而是比魔方略大，大概宽出3-4mm。这是多方面的原因导致的，但最直接的原因就是因为翻转魔方时需要空间，同时需要兼容导向板等可能产生的误差，这个道理同样适用于卡爪上，手臂最前端的卡爪也不能是恰恰好能卡住魔方而不多留一点剩余的空间。
![](/images/external/fe46a600ef29.jpg)

这种**冗余误差**的做法，同样会给魔方扭转过程带入其它的新问题。如卡爪和底座都有空间，那么当卡爪把持魔方，底座完全旋转90°时，问题就出现了。由于空隙的存在，魔方往往不能恰好转到90°的位置。当一个位置扭不到准确的90°时，翻转或者旋转90°再扭时，魔方将会卡壳，甚至是损坏。由于我们选配了可以容错的高质量魔方（超过20元一个，而不是那种几块钱的魔方），这个问题其实已经可以容纳非常宽松的偏差，扭不到位的魔方在侧面再拧时会自动修复不到位的一面，目测10°以内不会有问题。即便如此，我们还是希望利用程序中的修正参数，把这个问题说清楚。

在魔方基底旋转的过程中，有原位和90°旋转位两个基本位置。几乎是同理加上了后缀词（over）。也就是说，当魔方基底选择时，先转到over位，然后再回到基本位，利用过转的这个超调量，克服每次动作时卡爪和基底的空隙带来的魔方90°旋转不到位。

![](/images/external/ab66af04976a.jpg)  
基于上述的理论，你就会知道，当每次执行H（hold）指令后，如果魔方扭不到90°的正确位置，那么你就应该要尝试调整上面的4个参数咯。

## 写在后面的话
当你有幸看到这里，说明你是一个有细心，耐心和好奇心的同学，加油！期待你做出更好玩的DIY作品。 👍👍👍