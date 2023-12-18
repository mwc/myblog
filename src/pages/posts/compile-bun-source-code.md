---
title: '编译Bun源码'
layout: '@lib/layouts/md.astro'
publish: '2023-11-09 15:15'
author: '前端子鱼'
tag: ['Bun']
cover: '/myblog/v2-683f6951e52b2776ec8e2a2d797646eb_1440w.webp'
---

在《[使用 Bun 创建与运行 SvelteKit 项目](./posts/create-run-kit-using-bun/)》一文中，我已尝试过使用 `Bun` 这个运行时替换掉 `Node.js`，目前一帆风顺，安装遂心应手，回归测试无往不利，跑起来畅通无阻，均没碰上问题，顺利得有点出人意料。

就躬身体验而言，尚且可以，值得一试；没感觉到快多少，可能 `Node.js` 本身就已经足够快，譬如生成过程耗时 `500` 毫秒和 `5` 毫秒之间相比，看似 `100` 倍惊人的巨大的差距，感官上未必体会得出来，你要说两者都是 “一瞬间” 就完成了也说得过去。

无论如何，这也说明 `Bun` 已具备可用性，往后较大可能将与 `Node.js` 并驱齐驾，由此大家又多了一个选择，可以捡肥拣瘦，以供挑剔。

当然，目前断是不会轻易强用于生产，毕竟还未自成气候之前，宜作壁上观，静观其变，也乐见其成。

悉闻目前网上对 `Bun` 的介绍文章，多有吹捧之嫌，我经过试验也是怅然未获惊喜，倒不至于轻率断论为 “不外如是”，逞一孔之见而自满，毕竟未究其底细，没有深入了解不好评议。

故此，我计划抽时间阅读一下 `Bun` 的源码，增长见闻，不是为了贡献 PR，没这意愿，也没这能力。

整个过程也是比较顺畅的，首先确保已能科学上网，再者最好是电信网络，在下载 `bun` 依赖的其他库时会比较快速。

整体用时 `40` 分钟这样，包括下载、生成等等，如果太慢无非是网络的问题。

官网说预留 `10GB` 的磁盘空间，我察看最终结果是用了 `6GB` 多点（`MacOS`），不同系统不知是否不一样；

`Windows` 本机编译不支持，需要在 `WSL` 环境中编译。

下面开始第一步：

# 一、编译前的准备

## 1、clone bun 源码库

```bash
$ git clone https://github.com/oven-sh/bun.git
```

克隆完成后，不要着急在 `vscode` 打开源码库，否则让你安装一堆扩展，可以留到生成完毕后再安装不迟。

## 2、安装 Bun

有点意思，编译 `Bun` 源码之前，你得需要一个现有的 `Bun`，因为 `setup.sh` 过程有些脚本是 `bun` 生成的。

`NPM` 或 `PNPM`：

```bash
$ npm install -g bun

# 或者
$ pnpm add -g bun
```

或者使用 `brew`：

``` bash
$ brew tap oven-sh/bun
$ brew install bun
```

## 3、安装 LLVM 和 ninja 等编译和构建工具

``` bash
$ brew install llvm@16 automake ccache cmake coreutils gnu-sed go libiconv libtool ninja pkg-config rust
```

我看怎么连 `go`、`rust` 也搞上了。

## 4、安装 Zig

`Zig` 是 `Bun` 的实现语言，因此是必须的。
通过下方命令下载的是 `Bun` 所使用的 `Zig` 版本：

``` bash
$ bun install -g @oven/zig
```

不过自行去 `Zig` 官方下载页面下载最新的编译器也可以（通常版本还要新），比 `Bun` 使用的版本要大就行，不能小于 `Bun` 所使用的版本，否则不能编译（除非你十分熟悉并手动改了 `build` 脚本）。

自行下载的 `Zig` 解压后，覆盖 `~/.bun/install/global/node_modules/@oven/zig/` 文件夹下所有文件或文件夹即可，同时，你需要给上方文件夹可执行权限，以 `MacOS` 为例，在上方的  `@oven/zig` 文件夹打开终端，输入下方命令：

``` bash
$ chmod 777 .
```

然后使用 `zig version` 检查一下是否成功，成功则输出版本号。

如果遇到被 `MacOS` 拦截，按下述步骤配置应用安全性：

点击左上角苹果图标，选择`【系统设置...】`，转到`【隐私与安全性】`，右侧下拉到`【安全性】`栏，配置 `zig` 允许其执行。

这个过程较为繁琐，因此，不建议你自行下载，除非你遇到了网络问题，不得不手工处理。 

## 5、设置 $PATH

我建议先设置好 `$PATH`，后续麻烦事少一些，你最好先将下方的路径加入到 `PATH`（不管当前是否已经存在），以修改 `MacOS` 下的 `/etc/paths` 为例：

``` bash
# LLVM 的路径，不是 brew 安装的话可能是其他路径
/opt/homebrew/opt/llvm@16/bin

# ${bun 源码根目录}/build
/Users/ziyu/bun/build
```

# 二、开始编译 Bun 源码

在源码根目录打开终端，执行源码根目录下的 `scripts/setup.sh` 开始编译源码：

``` bash
# 如果前面没有配置 PATH，
# 需要下方这行先配置 LLVM 到 PATH
$ export PATH="$(brew --prefix llvm@16)/bin:$PATH"

# 可以使用：
$ bun setup

# 或者 bash 命令，两者选其一：
$ bash ./scripts/setup.sh
```

这期间会执行很多命令，其中一项是下载 `webkit` 子模块，因为 `bun` 使用的 `JS` 引擎不是`V8` 而是 `Webkit` 的 `JavaScriptCore`，`bun` 有自己包装的版本，叫 `bun-webkit`。

如果因科学上网的原因导致下载速度过慢，或者直接就 `timeout` 了，可以先行中断 `setup` 的执行，先自行到 [这个地址](https://github.com/oven-sh/WebKit/releases) 去下载试试，在 `Assets` 中挑选正确的压缩包，选择下载的安装包名为 `bun-webkit-${OS}-${CPU}.tar.gz`，例如 `MacOS` 选择文件名 `bun-webkit-macos-arm64.tar.gz`。

下载后，复制到 `bun` 源码根目录下的 `.cache` 文件夹中，如果没有则自行创建它。

然后打开 `scripts/download-webkit.sh` 文件（`Windows` 下打开 `download-webkit.ps1` ），注释掉第 `56～62` 行的 `curl` 下载命令（`Windows` 下注释 `ps1` 文件中的 `25 ～ 32` 行）：

``` bash
rm -rf "$OUTDIR"

# 注释掉下方的代码
# if [ ! -f "$tar" ]; then
#   echo "-- Downloading WebKit"
#   if ! curl -o "$tar" -L "$url"; then
#     echo "Failed to download $url"
#     exit 1
#   fi
# fi

tar -xzf "$tar" -C "$(dirname "$OUTDIR")" || (rm "$tar" && exit 1)
```

搞定完后，再次运行 `bun setup` 即可。

如没有遇到上述问题则跳过。

顺利构建完成后，会在源码根目录下生成一个 `build` 文件夹。

在 `build` 文件夹中，所生成的 `bug-debug` 即为最终所要的可执行文件，它是 `debug` 版的 `bun`，前面第一部分早已建议将其加入 `PATH` 了，这样可以便于后续调试之用。

此时可在 `vscode` 打开源码库，然后按需安装一堆 `vscode` 扩展插件，包括 `Zig`、`C/C++`、`CMake/CMake Tools` 等等，想装哪些看着办吧。

# 三、日常开发构建

## 1、vscode 插件与 Zig 语言服务(ZLS)

安装编辑器的插件与语言服务，能达到最佳的使用体验。

一般你在打开 `vscode` 任意一份 `.zig` 文件时，`vscode` 便会提示你安装 `Zig Language` 官方插件， 照办即可，这个过程中，将同时会下载安装 `ZLS`，`ZLS` 是 `Zig` 的语言服务，用于编辑器智能提示、查错等功能。

一般安装过程没有什么问题。

如果遇到 `ZLS` 安装失败（几乎可以断言是你的科学上网不太给力），你需要手工到下方地址按本机操作系统来下载 `ZLS`：

https://github.com/zigtools/zls/wiki/Installation

下载后，解压至任意文件夹，然后在 `vscode` 的 `settings.json` 中，配置 `ZLS path` 为你所解压的位置，如下方示例：

![sample](/myblog/v2-b12dc739b8f043fb2cc4be0932276725_1440w.webp)

配置完毕后，随意打开一份 .zig 文件，然后在空白地方输入 @ 符号，看是否有一堆函数提示即可。

## 2、重新构建

`setup.sh` 执行一次即可，后续更改了代码后，只需运行下方命令重新编译连接即可：

``` bash
$ ninja -Cbuild
```

下面尝试修改一下 `src/main.zig` 看看，修改为下方这样（`void` 加个叹号前缀改为 `!void`，下方加一行）：

![](/myblog/v2-69a4ebf09f31280ea91480213dc76ff7_1440w.webp)

执行 `ninja -Cbuild` 重新编译、连接，整体大概耗时 **40 ～ 60** 秒左右，成功执行后生成 `./build/bun-debug` 最终可执行文件：

![](/myblog/v2-4e03669296d982948dd1893410880c49_1440w.webp)

如果在前面第一节你已将 `bun` 源码目录下的 `build` 纳入 `PATH`，那么直接就可以运行：

``` bash
$ bun-debug
```

否则你需在源码根目录打开终端，执行：

``` bash
$ ./build/bun-debug
```

结果如下：

![](/myblog/v2-92e12c58bdc017772563d12e277c29a8_1440w.webp)

至此，`bun` 已任由你肆意蹂躏摧残了。

参考链接：https://bun.sh/docs/project/contributing