---
title: 部署自己的chatgpt
date: 2023-03-28 15:49:10
updated: 2023-03-28 17:05:04
toc: true
---

<img src="/images/external/09b281a3e509.jpg" width="750px">

<p>Chatgpt 如火如荼，如何搭建自己的 chatgpt 服务呢？这里我们采用的技术路线 “OpenAI key” + “Chatbot UI” + “Vercel”实现。</p>
<!--more-->

<p>和将一头大象放入冰箱的步骤一样，简单为三步：<br>1、申请 OpenAI 的 key;<br>2、将 Chatbot UI 项目 clone 到自己的 github 账号下；<br>3、创建 Vecel 项目 简单配置 然后 Vecel 会自动构建部署。<br>就可以使用了。</p>
<h2 id="申请-OpenAI-key"><a href="#申请-OpenAI-key" class="headerlink" title="申请 OpenAI key"></a>申请 OpenAI key</h2><p>参照 <a target="_blank" rel="noopener" href="https://cloud.tencent.com/developer/article/2190154">一文教你快速注册 OpenAi</a></p>
<p>这里不在重复，经过这一步你需要拿到形如“sk-hyaUTHpxxxxxxxxxxxxxxx” 一个 key,即可进入下一步。</p>
<h2 id="clone-到自己的-github-账号下"><a href="#clone-到自己的-github-账号下" class="headerlink" title="clone 到自己的 github 账号下"></a>clone 到自己的 github 账号下</h2><p>1、打开项目地址 <code>https://github.com/mckaywrigley/chatbot-ui</code>， 点击 fork<br><img src="/images/resources/fork.png"></p>
<p>2、点击 create fork.<br><img src="/images/resources/fork-info.png"></p>
<h2 id="Vecel-项目和部署"><a href="#Vecel-项目和部署" class="headerlink" title="Vecel 项目和部署"></a>Vecel 项目和部署</h2><p>1、注册 Vercel 账号，推荐使用 GitHub 账号登录。<br><img src="/images/resources/login-vercel.png"></p>
<p>2、点击创建 Vercel 项目，import 刚才 clone 的 github 账号下的项目。<br><img src="/images/resources/add-new.png"></p>
<p><img src="/images/resources/import.png"></p>
<p>3、配置项目<br><img src="/images/resources/create-vercel.png"></p>
<p>ok !!!<br><img src="/images/resources/chatgpt-ok.png"></p>
