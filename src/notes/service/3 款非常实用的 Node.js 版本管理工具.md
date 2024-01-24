---
# 当前页面内容标题
title: 3 款非常实用的 Node.js 版本管理工具
# 分类
category:
  - node
# 标签
tag: 
  - node
  - 管理工具
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

 Node.js 版本分为 LTS 和 Current 系列，当我们需要在本地开发环境同时安装 LTS 版本和 Current 版本时，就需要对 Node.js 版本进行版本管理。

比如本地需要同时安装 Node.js 8.0.0 和 Node.js 17.0.0。

为了能够对 Node.js 版本进行版本管理，我整理了 3 款非常实用的 Node.js 版本管理工具，让大家能够自由的切换本地环境不同的 Node.js 版本。

## 1.nvm

⭐ Github stars: 60K+

nvm 是一款 Node.js 版本管理工具，允许用户通过命令行快速安装、切换和管理不同的 Node.js 版本。

![img](./images/50071740d0e989110ae59f807b662fd0.png)

nvm 只适用于 [macOS](https://so.csdn.net/so/search?q=macOS&spm=1001.2101.3001.7020) 和 Linux 用户的项目，如果是 Windows 用户，可以使用 [nvm-windows](https://github.com/coreybutler/nvm-windows) 、[nodist](https://github.com/marcelklehr/nodist) 或 [nvs](https://github.com/jasongin/nvs) 替换。

### 安装方式

macOS 下载方式：

```shell
# 方式1 浏览器打开下面链接下载
https://github.com/nvm-sh/nvm/blob/v0.39.1/install.sh
# 下载完成后，通过命令安装
sh install.sh

# 方式2 推荐
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# 方式3
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

安装过程中如果遇到一些奇怪的问题，可以查看下 [nvm 补充说明](https://github.com/nvm-sh/nvm#additional-notes)。

### 常用命令

```shell
nvm ls                # 查看版本安装所有版本
nvm ls-remote         # 查看远程所有的 Node.js 版本
nvm install 17.0.0    # 安装指定的 Node.js 版本
nvm use 17.0.0        # 使用指定的 Node.js 版本
nvm alias default 17.0.0  # 设置默认 Node.js 版本
nvm alias dev 17.0.0  # 设置指定版本的别名，如将 17.0.0 版本别名设置为 dev
```

![img](./images/41fe2a9d384c07c35a459372803c36af.png)

## 2.n

⭐ *Github stars: 16.7K+*

[n](https://github.com/tj/n) 是一款交互式的 Node.js 版本管理工具，没有子脚本，没有配置文件，也没有复杂的 API，使用起来非常简单。

![img](./images/1c2c985f5cd513932551aa3f38d7a574.gif)

n 只适用于 macOS 和 Linux ，不适用于 Windows。

### 安装方式

可以使用 npm 直接安装到全局：

```shell
npm install n -g
```

### 常用命令

```shell
n          # 显示所有已下载版本
n 10.16.0  # 下载指定版本
n lts      # 查看远程所有 LTS Node.js 版本
n run 10.16.0 # 运行指定的 Node.js 版本
```

输入 `n -h`查看帮助信息，主要命令如下：

```shell
  n                              Display downloaded Node.js versions and install selection
  n latest                       Install the latest Node.js release (downloading if necessary)
  n lts                          Install the latest LTS Node.js release (downloading if necessary)
  n <version>                    Install Node.js <version> (downloading if necessary)
  n install <version>            Install Node.js <version> (downloading if necessary)
  n run <version> [args ...]     Execute downloaded Node.js <version> with [args ...]
  n which <version>              Output path for downloaded node <version>
  n exec <vers> <cmd> [args...]  Execute command with modified PATH, so downloaded node <version> and npm first
  n rm <version ...>             Remove the given downloaded version(s)
  n prune                        Remove all downloaded versions except the installed version
  n --latest                     Output the latest Node.js version available
  n --lts                        Output the latest LTS Node.js version available
  n ls                           Output downloaded versions
  n ls-remote [version]          Output matching versions available for download
  n uninstall                    Remove the installed Node.js
```

## 3. fnm

⭐ *Github stars: 8.4K+*

[fnm ](https://github.com/Schniz/fnm)是一款快速简单 🚀 的 Node.js 版本管理器，使用 [Rust](https://so.csdn.net/so/search?q=Rust&spm=1001.2101.3001.7020) 构建。

![img](./images/af48ab79872c9db4fecf1aca4867d7be.png)

主要特点包括：

-   🌎 跨平台支持，包括：macOS、Windows、Linux；
-   ✨ 单一文件，轻松安装，即时启动 ；
-   🚀 以速度为设计理念；
-   📂 适用于 `.node-version` 和 `.nvmrc` 文件；

### 安装方式

macOS / Linux 环境：

```shell
# bash, zsh and fish shells
curl -fsSL https://fnm.vercel.app/install | bash
```

Windows 环境：

```shell
# 管理员模式打开终端，安装后只能使用管理员模式打开使用

choco install fnm

# 安装完成还需要手动设置环境变量
```

Linux/macOS/Windows 环境也可以直接下载二进制文件安装，下载地址：https://github.com/Schniz/fnm/releases

### 常用命令

```shell
fnm -h             # 查看帮助
fnm install 17.0.0 # 安装指定 Node.js 版本
fnm use 17.0.0     # 使用指定 Node.js 版本
fnm default 17.0.0 # 设置默认 Node.js 版本
```

