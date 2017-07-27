---
title: Houston, we have a problem
date: 2016-06-29 16:13:22
tags:
categories: 随笔日记
---

今天登录网站服务器，本来想看看硬盘存储空间被日志占用的还剩多少，谁知打开nginx的access.log 文件，发现15万9千条来自俄罗斯 '195.2.252.223''195.2.252.67''195.88.208.232'这3个IP地址利用 xmlrpc.php文件 POST数据，持续时间 从2016年6月6号到7号，初步确定想利用WordPress 的xmlrpc.php 漏洞 POST 用户名和密码来暴力破解。

部分记录如下:
```bash
195.2.252.67 - - [06/Jun/2016:03:40:53 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.223 - - [06/Jun/2016:03:40:53 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.223 - - [06/Jun/2016:03:40:53 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.88.208.232 - - [06/Jun/2016:03:40:53 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.67 - - [06/Jun/2016:03:40:54 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.223 - - [06/Jun/2016:03:40:54 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.223 - - [06/Jun/2016:03:40:55 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.67 - - [06/Jun/2016:03:40:56 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.67 - - [06/Jun/2016:03:40:56 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.223 - - [06/Jun/2016:03:40:57 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.223 - - [06/Jun/2016:03:40:57 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.67 - - [06/Jun/2016:03:40:58 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.223 - - [06/Jun/2016:03:40:58 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.223 - - [06/Jun/2016:03:40:58 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.223 - - [06/Jun/2016:03:40:58 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.223 - - [06/Jun/2016:03:40:59 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.88.208.232 - - [06/Jun/2016:03:40:59 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.223 - - [06/Jun/2016:03:40:59 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.67 - - [06/Jun/2016:03:41:00 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.67 - - [06/Jun/2016:03:41:00 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.223 - - [06/Jun/2016:03:41:00 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.223 - - [06/Jun/2016:03:41:00 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.67 - - [06/Jun/2016:03:41:01 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.223 - - [06/Jun/2016:03:41:01 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.67 - - [06/Jun/2016:03:41:03 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
195.2.252.67 - - [06/Jun/2016:03:41:03 -0400] "POST /xmlrpc.php HTTP/1.0" 499 0 "-" "Mozilla/4.0 (compatible: MSIE 7.0; Windows NT 6.0)" "-"
```

## 解决办法

* 删除xmlrpc.php或重命名为xmlrpc.php.backup
* 设置其权限为不可访问。

## 背景

暴力猜解攻击是我们至今为止在互联网上看到的最古老而常见的攻击之一。黑客可以通过SSH和FTP协议，暴力猜解攻击你的WEB服务器。


* **传统暴力猜解攻击**

    这些攻击一般都不是很复杂，而且理论上是比较容易遏制的。但是，它们仍然拥有存在的价值，因为人们并不习惯采用强密码，而且不是每个人都拥有良好的登录习惯。

    然而可惜的是，暴力猜解攻击有个致命的弱点。通常来说，如果黑客需要尝试500个不同的密码，他将尝试发送500次不同的请求到服务器上。通过限制登录次数，可以在一定层面上遏制暴力猜解攻击。

* **放大型暴力猜解攻击**

    黑客可以减少攻击次数么，他们能否一次请求，就能进行多次登陆尝试？请想象一下，如果你一次攻击请求能尝试500个密码，那么登录次数限制神马的，不都是战斗力5的渣渣了？

    这种手法有点类似于咱们以前的DDoS放大攻击，一个核心指挥服务器，能够利用DNS或者NTP协议回应进行放大攻击，增加原本攻击强度50-100倍。无论是任何类型的放大型攻击，都将让黑客倍加受益。

* **通过Wordpress XML-RPC进行暴力猜解放大攻击**

    XML-RPC的隐藏特性之一，则是你可以使用system.multicall方法，在单个请求中进行多次尝试，这是非常有用的。它允许应用程序通过一条HTTP请求，执行多个命令。

    **XML-RPC是一个通过HTTP方法进行远程调用的，非常简单易用的玩意儿。它支持Perl、Java、Python、C、C++、PHP，以及许多其他编程语言。**Wordpress和Drupal，以及许多其他内容管理系统都支持XML-RPC。

当然，**任何好的技术都是双刃剑。**在XML-RPC技术被普通程序开发者所喜爱的同时，也成了黑客手中的利器。

>背景来源：SU、TA，编译/dawner，转载请注明来自FreeBuf黑客与极客（FreeBuf.COM）
