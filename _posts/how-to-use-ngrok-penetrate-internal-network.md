---
title: 如何搭建ngrok穿透内网
date: 2016-05-04 20:52:29
tags: 树莓派
toc: true
---
ngrok 是一个反向代理，通过在公共的端点和本地运行的 Web 服务器之间建立一个安全的通道。ngrok 可捕获和分析所有通道上的流量，便于后期分析和重放。简单来说就是可以让你的本地服务暴露在外网上面，可以通过外网访问，这是我们经常需要用到的功能。

![](http://static.mindcont.com/blog/images/tools/ngrok/ngrok.png)

## 为何
因为宽带运营商只是提供动态的公网IP,我们使用路由器DHCP(Dynamic Host Configuration Protocol，动态主机配置协议)来获得诸如192.168.0.2的IP地址进行上网。假如我们想远程登录链接在家中路由器下的树莓派是不能直接访问的，这时候我们就要考虑ngrok或花生壳来达到远程访问的效果。

## 如何

### go环境的搭建
go环境安装可以通过源码安装或安装EPEL扩展源后使用yum安装，由于使用yum安装的go不能进行交叉编译，不能够编译生成Windows客户端，所以推荐使用通过源码安装。
源码安装go的详细过程如下：

* 1).下载源码，可以在http://www.golangtc.com/download 上找到自己系统对应的源码。需要说明的是：必须要保证go语言的版本为1.6以上，不然编译会出错。
     由于我的vps系统是centos 64位的，所以下载的是：go1.6.2.linux-amd64.tar.gz。

```bash
wget http://www.golangtc.com/static/go/1.6.2/go1.6.2.linux-amd64.tar.gz
```

* 2).将其解压到/usr/local目录下：

```bash
# 解压至 /usr/local
tar -C /usr/local  -xzf   go1.6.2.linux-amd64.tar.gz
```
注：如果是64位的系统下载了32位的安装包，后面的构建会出现 /lib/ld-linux.so.2: bad ELF interpreter 类似这样的错误 解决方法：yum install glibc.i686。安装一个32bit的glibc就可以了。

* 3). 在root环境下执行如下命令：

```bash
# 创建go语言的工作空间
mkdir $HOME/go  

# 设置go语言的根目录
echo 'export GOROOT=/usr/local/go'>> ~/.bashrc  

# 设置go语言的工作路径 ，新版要求系统路径和工作路径不一致才行！！！
echo 'export GOPATH=$HOME/go'>> ~/.bashrc  

# 设置go语言的系统路径
echo 'export PATH=$PATH:$GOROOT/bin'>> ~/.bashrc  

# 更新设置
source  $HOME/.bashrc

```
### 获取ngrok源码

```bash
#安装git
sudo apt-get install git

# 将ngrok的开源版本下载到本地
git clone https://github.com/inconshreveable/ngrok.git  
```
### 编译
* 1).配置环境变量,这里将tunnel.bbear.me设置为你自己的二级域名。值得注意的是，要为你的二级域名添加一条A记录或者设置泛域名解析，且DNS已经缓存成功可以ping 通过。

```bash
export NGROK_DOMAIN="tunnel.bbear.me"
```
* 2).生成自签名ssl证书

```bash
# 切换当前路径到源码解压文件夹下，例如 /home/pi/ngrok
cd ngrok

openssl genrsa -out rootCA.key 2048

openssl req -x509 -new -nodes -key rootCA.key -subj "/CN=$NGROK_DOMAIN" -days 5000 -out rootCA.pem

openssl genrsa -out device.key 2048

openssl req -new -key device.key -subj "/CN=$NGROK_DOMAIN" -out device.csr

openssl x509 -req -in device.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out device.crt -days 5000

# 将生成的证书复制到源码相应的目录下，以便编译为我们自己的服务端和客户端程序
cp rootCA.pem assets/client/tls/ngrokroot.crt

cp device.crt assets/server/tls/snakeoil.crt

cp device.key assets/server/tls/snakeoil.key

```
设置变量：
```bash
GOOS=linux GOARCH=amd64  #如果是32位系统，这里 GOARCH=386

#可以通过go env 查看当前的go环境变量信息
go env
```
生成服务端与客户端
```bash
make release-server release-client
```
注：上述编译的过程会需要去github、下载其余依赖项目的源码。编译之后，就会在ngrok源码的bin目录下生成两个可执行文件：ngrokd、ngrok。其中ngrokd就是ngrok的服务端程序，ngrok就是ngrok的客户端程序。由于现在生成的客户端ngrok只能在linux下运行，因此如果想要生成windows下的客户端程序，需要继续进行交叉编译。

### 交叉编译生成windows客户端
上述编译过程生成的服务端和客户端都是linux下的，不能在windows下用。如果想编译生成windows客户端，需要重新配置环境并编译。 交叉编译过程如下：
* 1). 进入go目录，进行环境配置

```bash
cd  /usr/local/go/src/

GOOS=windows GOARCH=amd64 CGO_ENABLED=0 ./make.bash  
```
* 2). 进入ngrok目录重新编译

```bash
cd  /usr/local/src/ngrok/

GOOS=windows GOARCH=amd64

make release-server release-client
```
编译后，就会在bin目录下生成windows_amd64目录，其中就包含着windows下运行的服务器和客户端程序。

### ngrokd服务启动与使用
* 1).启动ngrokd服务端

```bash
bin/ngrokd -domain="$NGROK_DOMAIN" -httpAddr=":8000"
```
注意，让程序一直在后台运行可以执行
```bash
nohup bin/ngrokd -domain="$NGROK_DOMAIN" -httpAddr=":8000"
```
想要结束后台进程可以
```bash
ps -A   #找到PID  
kill xxxid
```
* 2).启动ngrok客户端
客户端使用，拷贝刚刚生成的ngrok.exe文件到本地，创建ngrok.cfg配置文件，可以根据自己的实际情况进行配置.

```bash
server_addr: "tunnel.bbear.me:4443"
trust_host_root_certs: false  
```
再在windows控制台执行
```bash
ngrok -config=ngrok.cfg -subdomain upal 8080  
```
upal是你自定义地址。
看到这样一个界面就说明成功了！！！

![](http://static.mindcont.com/blog/images/tools/ngrok/ngrok-1.png)

如果是这种界面应该是启动服务端的时候环境变量有问题，客户端与服务端的域名配置不一样导致的。客户端ngrok.cfg中serveraddr后的值必须严格与-domain 以及证书中的NGROK_DOMAIN相同。

![](http://static.mindcont.com/blog/images/tools/ngrok/ngrok-2.png)

---
参考：[在阿里云搭建自己的ngrok服务](http://bbear.me/shi-yong-a-li-yun-da-jian-zi-ji-de-ngrokfu-wu/)  
整理:[mindcont](https://github.com/mindcont)  2016-05-04 第一次编辑
