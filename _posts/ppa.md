---
title: 发布自己的软件包存档
date: 2016-11-13 19:45:31
tags:
categories: Linux
toc: ture
---

PPA，或是Personal Package Archive（个人软件包存档），是默认情况下并未被包含在Ubuntu中的软件的一个集合。使用个人包存档（PPA），您可以直接向Ubuntu用户分发软件和更新。<!--more-->创建你的源码包，上传它，Launchpad将构建二进制文件，然后将它们托管在您自己的apt存储库中。 这意味着Ubuntu用户可以安装您的软件包，就像安装标准Ubuntu软件包一样，他们会自动接收更新。

Launchpad中的每个个人和团队都可以拥有一个或多个PPA，每个PPA都有自己的URL。 您在PPA中发布的软件包将保留在那里，直到您删除它们，它们将被您上传的另一个软件包或其所构建的Ubuntu版本所取代。

## 前期准备
而创建一个属于自己维护的PPA，大致包括一下流程：创建自己的GPG KEY密钥(用于对软件包认证和签名)，SSH KEY,创建launchpad账户并配置密钥，安装打包环境，编写软件包，打包测试，对生成的软件包认证，最后上传到launchpad。下面我将逐步的介绍。

### 安装打包需要的软件环境
Ubuntu 11.10之前
```
sudo apt-get install gnupg pbuilder ubuntu-dev-tools bzr-builddeb apt-file
```
Ubuntu 11.10之后，可以通过如下命令安装：
```
sudo apt-get install packaging-dev   
```

### 创建自己的GPG key
1991年，程序员[Phil Zimmermann](http://en.wikipedia.org/wiki/Phil_Zimmermann)为了避开政府监视，开发了加密软件PGP。这个软件非常好用，迅速流传开来，成了许多程序员的必备工具。但是，它是商业软件，不能自由使用。所以，自由软件基金会决定，开发一个PGP的替代品，取名为GnuPG。这就是GPG的由来。

如果想要将软件包上传到launchpad.net，就必须使用gpg签名。要配置gpg，可以参考gpp官网上的[袖珍说明书](http://www.gnupg.org/howtos/zh/index.html)。**注意**，过程中会要求你输入一个加密密码，一定要记住，不要乱写！！！

```
gpg --gen-key　
```
![](/images/ubuntu/ppa/gpgkey.png)
之后你应该会看到如下信息：
```
pub   2048R/AA08D2A8 2014-03-25
       密钥指纹 = 5EAC 8E2F 5507 E388 E316  3AD9 F894 2D76 AA08 D2A8
uid                  zhangxin (openyoudao) <justzx2011@gmail.com>
sub   2048R/8A54FE05 2014-03-25
其中AA08D2A8是生成的key
```
将key的公共部分上传到key server，这样全世界的开发者就可以根据你的key来识别你的信息和文件
```
# gpg --send-keys --keyserver keyserver.ubuntu.com <KEY ID>
# 这里的<KEY ID>　用你的　pub 字段中　2048R/****　中的****替换，如下例所示

gpg --send-keys --keyserver keyserver.ubuntu.com AA08D2A8
```
### 创建你的ssh key
ssh 代表安全的shell ,这里用来安全的把文件上传到PPA发布平台
```
ssh-keygen -t rsa
```

### 创建pbuilder
pbuilder 是允许开发者在本地创建PPA包的工具

```
如果是Ubuntu 13.04 (代号 Raring Ringtail)，所以执行如下命令
pbuilder-dist raring create

如果是Ubuntu 14.04 (代号 Trusty Tahr)，则执行：
pbuilder-dist trusty create
```
之后便是漫长的等待.....

![](/images/ubuntu/ppa/pbuilder.png)

### 创建Launchpad账户

[官网注册](https://login.launchpad.net/+new_account),之后上传GPG key到Launchpad。

```
通过如下指令查看自己的GPG key：
gpg ­­--fingerprint <email@address.com>
```
例如我的：
```
pi@DeepMind:~$ gpg --fingerprint bond@mindcont.com
/home/pi/.gnupg/pubring.gpg
---------------------------
pub   4096R/D38B4796 2016-04-12
      密钥指纹 = EB4C 1BFD 4F04 2F6D DDCC  EC91 7721 F63B D38B 4796
uid                  Google Inc. (Linux Packages Signing Authority) <linux-packages-keymaster@google.com>
sub   4096R/640DB551 2016-04-12 [有效至：2019-04-12]

pub   2048R/D059E4D9 2016-11-11
      密钥指纹 = AD34 CE83 5C79 C68B A81D  4F02 ED3C A58E D059 E4D9
uid                  zhangzhengxuan <bond@mindcont.com>
sub   2048R/EDE83100 2016-11-11

```

登陆你的launchpad，选择下图红框的位置
![](/images/ubuntu/ppa/upload_gpg_key_1.png)

然后填写刚才我们查找的pub字段，密钥指纹中的字符串
![](/images/ubuntu/ppa/upload_gpg_key_2.png)

点击　import 之后，系统会发送一封邮件到你的邮箱，用来对导入的key进行验证。你需要用自己的私钥对服务器用你刚上传公钥加密的内容进行解密 。**其中邮件的内容为不可读的**,需要解密的内容类似于：
```
­­­­­BEGIN PGP MESSAGE­­­­­
  Version: GnuPG v1.4.3 (GNU/Linux)
  hQIOA0THhKozD+K5EAf9F3PcOL2iU6onH2YsvB6IKDXNxbK0NBVy6ppxcNq8hoTe
  cuHvzWLFfh1ehhSNe1V6xpuFnt5sJoeA4qEEOxez3HmY80tKIKMPLyhC/8JiSIW9
  fwuxj4C0F6pdyrpvGbQAzfPEFk/P1AtIHXm4WLXduhBT7YEpmUk/I4A/KlSrKoiP
  J5vBtbroUyp2jvIhDUmY7ToU+ifrDe3+VP1ZzSEJzOOXec9oPbcbvf5NptXA7Hbp
  S0ElBAcLjKpAu7VKotCwFZIsVXDHT/mxf2qm88bGIrlXS5uTzvmyhQps1KmyNiCz
  I0i5kSVvHZWyVZ+8FrROLqYAqqnEIMg9hUnbFAervgf/YiYs0xxWLYf9e14eoMZA
  ranGT72q/JHmBNBYenOijaquFNi1TH5J8Udtt2RfdyRUlmGilxRvtIYL8gpnuNpS
  +GHOoBWUN2f4nawaDeqgrf6Nt3qQWWLO4iJPgieejFP2FP6zkLme1t7dXo+z1ary
  EZuxSLtKIWkOFEZ8Gcn02hBgOhJZucnkF6BmVW9dr1C4QEAmGM631uqfsp5PapAn
  yjHbEU1L2R9i7vPtJNRr6ubFLWg1Yhfv63ByxSx/WQHMMqlrbL+moXBGED3L2hM8
  7FP9eapBRgmS+Bda9ArcGMUElTOkWoUYIOPyLOYmo15LvbxHOVaXjn7+fDgr2S1J
  R9LArwHycmdKKelRww+ZvylHIfq8xy10atRQIYawchh9A1myXD1TlWbrrIkodQJF
  iEpO2i1LKvqwZHOx3szT4hF+44tNFzQIL1j+zF5Hrt2WOTnS5WXGgGRtfEd8F7fN
  khQZOAdhwrnlY+yknruC8Y8Jm8vM57+KnPgBfvxuxzLX1XFTfTZCHXeUmwwu3mga
  m+6WzckeBGBDHKK6GqwFoOAykTwjyqOZaty7DPHeoINc0tLMVr9Ks64DScf8bgh4
  MkNonA0YhMQbkmwRc33APw441+/iLw5gqndQdX44kKqC71dG6LqanAOjD29Xj3JV
  ZBsjg95Jrx7Sx+i/V0PUeaU9QjCT0Q1jEy1Bcs8NYtTJnpG+4oHYJ0pyiGxIquQH
  V9E+hW6Qehx5DbsIXEvfeaBBHOfAHHOhUH14WK4bsJWm8wZ50XiYBZrNFOqzsm13
  2STcY4VIoJp3Uw2qNyvZXQUhpndlfgQGO14CMSadzDn6Vts=
  =hTe6
  END PGP MESSAGE­­­­­
```
将邮件中这些内容拷贝到一个文件中，例如：file.txt，然后执行如下命令：
```
gpg --decrypt file.txt
```
此时会提示你输入之前设置的**加密私钥key密码**，解密成功后，会有如下提示：
```
  Please go here to finish adding the key to your Launchpad account:
  [[https://launchpad.net/token/bP56TDKg8HXQbBs6LsN0]]
```
复制该链接，在浏览器中打开，即完成了GPG key 上传。同样的方法，我们还要**上传SSH KEY**。
```
打开id_rsa.pub文件,
gedit ~/.ssh/id_rsa.pub

将其中的内容拷贝到帐号的add ssh key文本框中，选择导入后完成上传
```
### 配置 Bazzar和环境变量
Bazzar一个版本控制软件同git一样,可以管理代码,[Bazaar in five minutes](http://doc.bazaar.canonical.com/latest/en/mini-tutorial/) 。这里我们安装一个bzr可视化管理工具，详见[bzr explorer install](http://doc.bazaar.canonical.com/explorer/en/install-linux.html)
```
sudo add-apt-repository ppa:bzr-explorer-dev/ppa
sudo apt-get update
sudo apt-get install bzr-explorer
```
告诉Bazzar你是谁,和git 中全局信息设置类似。
```
bzr whoami "xin zhang <justzx2011@gmail.com>"
bzr launchpad-login justzx2011（我的Launchpad账户id）

# 之后可以通过输入, 查看你的配置信息
bzr whoami
```
配置你的shell环境变量
```
# 打开.bashrc 文件
gedit ~/.bashrc

# 在文件开头加上如下内容
export DEBFULLNAME="xin zhang"
export DEBEMAIL="justzx2011@gmail.com"

# 执行
source ~/.bashrc
```
## 打包上传

### 安装编译工具
```
sudo apt-get install build-essential dh-make
```
这里我们使用openyoudao 软件包为例说明一个软件包的上传过程。首先下载Openyoudao源码包，Openyoudao代码托管在Github上，下载源码包，首先感谢 Linux之父[林纳斯·托瓦兹](http://zh.wikipedia.org/wiki/%E6%9E%97%E7%BA%B3%E6%96%AF%C2%B7%E6%89%98%E7%93%A6%E5%85%B9)发明了Git，为世界创造了一个知识传递平台.
```
wget https://github.com/justzx2011/openyoudao/archive/beta0.2.tar.gz
```
### 根据模板生成配置文件
bzr-builddeb包括一个插件，用于从模板创建一个新的包。 插件是一个包装　dh_make命令，如果你安装了packaging-dev，你应该已经有了这些。 运行命令，提供上游tarball的软件包名称，版本号和路径。
```
bzr dh-make openyoudao 0.2 beta0.2.tar.gz
```
之后你会看到,配置信息和本地软件包的编译位置。如 /home/pi/work/openyoudao
```
pi@DeepMind:~/work$ bzr dh-make openyoudao 0.2 beta0.2.tar.gz
Fetching tarball                                                               
Looking for a way to retrieve the upstream tarball
Upstream tarball already exists in build directory, using that

Type of package: single binary, indep binary, multiple binary, library, kernel module, kernel patch?
 [s/i/m/l/k/n] s

Maintainer name  : zhengxuan zhang
Email-Address    : bond@mindcont.com
Date             : Sun, 13 Nov 2016 16:57:30 +0800
Package Name     : openyoudao
Version          : 0.2
License          : blank
Type of Package  : Single
Hit <enter> to confirm:
Skipping creating ../openyoudao_0.2.orig.tar.gz because it already exists
Currently there is no top level Makefile. This may require additional tuning.
Done. Please edit the files in the debian/ subdirectory now. You should also
check that the openyoudao Makefiles install into $DESTDIR and not in / .
Package prepared in /home/pi/work/openyoudao
```

### 修改配置文件
这里我们主要修改openyoudao/debian/changelog　、control 两个文件。

* changelog文件中修改　trusty为ubuntu 14.04 的版本代号（代表我们的软件包运行平台）和版本号
```
openyoudao (0.2-1) trusty; urgency=low

  * Initial release 1.0
```
* control　文件中修改　Section: net　不然会报错。
```
Source: openyoudao
Section: net
Priority: optional
Maintainer: zhengxuan zhang <bond@mindcont.com>
Build-Depends: debhelper (>= 8.0.0)
Standards-Version: 3.9.4
Homepage: <insert the upstream URL, if relevant>
#Vcs-Git: git://git.debian.org/collab-maint/openyoudao.git
#Vcs-Browser: http://git.debian.org/?p=collab-maint/openyoudao.git;a=summary

Package: openyoudao
Architecture: any
Depends: ${shlibs:Depends}, ${misc:Depends}
Description: <insert up to 60 chars description>
 <insert long description, indented with spaces>
```

这里的配置信息很重要，不然你最后将软件包上传之后，可能会收到系统发送的拒绝邮件。你可能会遇到下面几个错误。
* 错误1
  ```
  Rejected:
  Unable to find distroseries: unstable
  Further error processing not possible because of a critical previous error.

  openyoudao (0.2-1) unstable; urgency=low

    * Initial release (Closes: #nnnn)  <nnnn is the bug number of your ITP>
  ```
  解决方法：修改changelog文件中修改 将unstable 修改为ubuntu 对于平台版本代号 例如14.04 为trusty
* 错误2　
  ```
  Rejected:
  opencv_2.1.0-1.dsc: Unknown section 'unknown'
  opencv_2.1.0.orig.tar.gz: Unknown section 'unknown'
  opencv_2.1.0-1.debian.tar.gz: Unknown section 'unknown'
  Further error processing not possible because of a critical previous error.

  opencv (2.1.0-1) trusty; urgency=low

    * Initial release (Closes: #nnnn)  <nnnn is the bug number of your ITP>
  ```
  解决方法：修改control 文件中Section:unknown 为Section: net
* 错误3
  ```
  Rejected:
  File opencv_2.1.0.orig.tar.gz already exists in Primary Archive for Ubuntu, but uploaded version has different contents. See more information about this error in https://help.launchpad.net/Packaging/UploadErrors.
  Files specified in DSC are broken or missing, skipping package unpack verification.

  opencv (2.1.0-1) trusty; urgency=low

    * Initial release 0.1.
  ```
  解决办法：
  你上传的opencv_2.1.0.orig.tar.gz 已经存在于官方维护的存档中，你上传的版本与官方的冲突。更改版本号。


值得注意的是，这里大部分错误信息都可以在[官方的文档](https://help.launchpad.net/Packaging/UploadErrors)中找到解决方法。参照打好的包： https://github.com/justzx2011/openyoudao/tree/beta

### 将修改提交到打包分支
```
cd openyoudao
bzr commit -m "Initial commit of Debian packaging."
```
之后你应该会看到如下信息：
```
pi@DeepMind:~/work/openyoudao$ bzr commit -m "Initial commit of Debian packaging."
Committing to: /home/pi/work/openyoudao/                                       
added debian
added debian/README.Debian
added debian/README.source
added debian/changelog
added debian/compat
added debian/control
added debian/copyright
added debian/docs
added debian/rules
added debian/source
Committed revision 2.          
```

### 在当前环境中编译软件包
```
bzr builddeb -- -us -uc
```
附 debuild命令例子:
```
只生成二进制包，不签名
debuild -us -uc -b
生成二进制包和源码包，不签名
debuild -us -uc
生成二进制包和源码包，签名
debuild -sa -k42AA6EC7
只生成源码包，签名
debuild -S -sa -k42AA6EC7
只生成只包含debian打包脚本部分的源码包，签名
debuild -S -sd -k42AA6EC7
```
软件包生成完毕后，可以使用dpgk-deb来查看其内容清单。

### 检测软件包是否存在bug
```
cd ..
lintian openyoudao_0.2-1ubuntu1.dsc
```
之后你应该会看到如下信息：
```
pi@DeepMind:~/work$ lintian openyoudao_0.2-1.dsc
E: openyoudao source: source-is-missing cache/js/autocomplete.r156903.js
E: openyoudao source: source-is-missing cache/js/jquery-ui.min.js
E: openyoudao source: source-is-missing cache/js/jquery.min.js
E: openyoudao source: source-is-missing cache/js/result-min.js
W: openyoudao source: package-needs-versioned-debhelper-build-depends 9
W: openyoudao source: superfluous-clutter-in-homepage <insert the upstream URL, if relevant>
W: openyoudao source: bad-homepage <insert the upstream URL, if relevant>
W: openyoudao source: out-of-date-standards-version 3.9.4 (current is 3.9.5)
```
这里有几个错误信息，我们先略过，不影响下面的操作。

### 给软件包签名
这里我们用我们上传到launchpad中的GPG KEY 对我们的软件包进行签名。如果忘记自己的公钥代码，可以参加上面进行查询。
```
cd openyoudao
debuild -S -kD059E4D9
```
### 上传软件包
* 编辑~/.dput.cf
通过上面的一系列流程，我们生成了一组经过数字签名的文件，最后需要做的是将这些文件上传到ppa官方的ftp，此时会用到一个叫dput的软件，要使用dput，首先要编辑文件~/.dput.cf，没有就创建.在这个文件里面定义要上传的Launchpad账号。我的~/.dput.cf文件内容如下：
```
[openyoudao]
fqdn = ppa.launchpad.net
method = ftp
incoming = ~mindcont/openyoudao/ubuntu/
login = anonymous
allow_unsigned_uploads = 0
```
* 执行上传
```
cd ..
dput ppa:mindcont/openyoudao openyoudao_0.2-1_source.changes　＃上传方式一

dput openyoudao openyoudao_0.2-1_source.changes＃上传方式二，这里的openyoudao 就是我们上一步配置中的[openyoudao]
```
之后你应该会看到如下信息：
```
pi@DeepMind:~/work$ dput ppa:mindcont/opencv2.1 openyoudao_0.2-1_source.changes
Package has already been uploaded to ppa on ppa.launchpad.net
Nothing more to do for openyoudao_0.2-1_source.changes
pi@DeepMind:~/work$ dput ppa:mindcont/opencv2.1 openyoudao_0.2-1_source.changes
Checking signature on .changes
gpg: 于 2016年11月13日 星期日 17时11分20秒 CST 创建的签名，使用 RSA，钥匙号 D059E4D9
gpg: 完好的签名，来自于“zhangzhengxuan <bond@mindcont.com>”
Good signature on /home/pi/work/openyoudao_0.2-1_source.changes.
Checking signature on .dsc
gpg: 于 2016年11月13日 星期日 17时11分20秒 CST 创建的签名，使用 RSA，钥匙号 D059E4D9
gpg: 完好的签名，来自于“zhangzhengxuan <bond@mindcont.com>”
Good signature on /home/pi/work/openyoudao_0.2-1.dsc.
Uploading to ppa (via ftp to ppa.launchpad.net):
  Uploading openyoudao_0.2-1.dsc: done.
  Uploading openyoudao_0.2.orig.tar.gz: done.    
  Uploading openyoudao_0.2-1.debian.tar.gz: done.
  Uploading openyoudao_0.2-1_source.changes: done.
Successfully uploaded packages.
```
说明我们上传成功，这里你的邮箱会收到一封ppa发来的邮件，内容如下：
```
Accepted:
 OK: openyoudao_0.2.orig.tar.gz
 OK: openyoudao_0.2-1.debian.tar.gz
 OK: openyoudao_0.2-1.dsc
     -> Component: main Section: net

openyoudao (0.2-1) trusty; urgency=low

  * Initial release 1.0

--
https://launchpad.net/~mindcont/+archive/ubuntu/openyoudao
You are receiving this email because you made this upload.
```

接下来就静待官方编译吧,编译进度可以在 Overview of published packages》View package details 中查看

![](/images/ubuntu/ppa/build.png)

编译完成后，就可以通过ppa源进行安装了
![](/images/ubuntu/ppa/build_success.png)
```
sudo add-apt-repository ppa:mindcont/openyoudao
sudo apt-get update
sudo apt-get install openyoudao
```

## 总结
创建launchpad账户》配置GPG密钥》配置ssh》创建project》编写软件包》创建本地编译环境》编译软件包》签名》上传　.changefile》等待官方确认邮件.

## 参考

* [如何在ubuntu系统下制作自己的ppa安装包](http://openyoudao.org/%E5%A6%82%E4%BD%95%E5%9C%A8ubuntu%E7%B3%BB%E7%BB%9F%E4%B8%8B%E5%88%B6%E4%BD%9C%E8%87%AA%E5%B7%B1%E7%9A%84ppa%E5%AE%89%E8%A3%85%E5%8C%85)
* [Ubuntu 15.10系统下制作自己的PPA安装包](https://www.mobibrw.com/2016/3138)
* [GPG入门教程](http://www.ruanyifeng.com/blog/2013/07/gpg.html)
* [为Debian和Ubuntu制作软件包(三)](https://www.ibm.com/developerworks/community/blogs/5144904d-5d75-45ed-9d2b-cf1754ee936a/entry/%25e4%25b8%25badebian%25e5%2592%258cubuntu%25e5%2588%25b6%25e4%25bd%259c%25e8%25bd%25af%25e4%25bb%25b6%25e5%258c%2585_%25e4%25b8%2589?lang=en)
* [Packaging New Software](http://packaging.ubuntu.com/html/packaging-new-software.html)
* [Uploading a package to a PPA](https://help.launchpad.net/Packaging/PPA/Uploading#The_easy_way:_FTP_in_Ubuntu_9.10_and_newer)
* [Package upload errors](https://help.launchpad.net/Packaging/UploadErrors)
* [Bazaar Explorer install](http://doc.bazaar.canonical.com/explorer/en/install-linux.html)
* [Build Debian packages from Bazaar branches](http://doc.bazaar.canonical.com/plugins/en/builddeb-plugin.html)
* [Ubuntu PPA的使用方法](http://lerry.me/post/2013/07/14/ubuntu_ppa_usagedfa)
