---
layout: '@lib/layouts/md.astro'
author: '前端子鱼'
title: '使用Bun创建与运行SvelteKit项目'
tag: ['Bun', 'SvelteKit']
publish: '2023-10-30 16:55'
cover: '/myblog/v2-5dfbe9b115fe328cafa72c557e35e7a1_1440w.webp'
---

`bun` 目前对 `node` 兼容性（如 `fs/net` 等）日趋完善，因此已有不少依赖于 `node` 的库或框架可以直接跑在 `bun` 之上，`SvelteKit` 便是其中之一。

整个过程也非常简单（你是需要科学上网的哈），毕竟只是更换了一个运行时，由 `nodejs` 换为 `bun` 罢了。

至于开发体验上的收益（如热加载、编译速度等）总体而言不特别明显，快了些，但感觉不出快了多少，不过如果你本身已科学上网，且用的是电信网络，你在 `bun install` 时可能会节省几秒钟吧。

`bun` 目前还在快速迭代中，甚至乎，编写 `bun` 的 `zig` 语言目前还没抵达 `v1.0`，实话说，不得不佩服 `bun` 够胆用。

无论如何，毕竟试试又不会亏。

# 一、安装 Bun

很多途径可以安装到最新 `release` 的 `bun`，例如 `npm` 或 `pnpm`：

```bash
$ npm install -g bun
$ pnpm add -g bun
```

我一开始是使用 `brew` 来安装：

```bash
$ brew tap oven-sh/bun # 不要省略这行
$ brew install bun
```

安装成功一次之后，后续你都可以用 `bun` 自身 `upgrade` 命令来更新到最新版本了：

```bash
$ bun upgrade
```

# 二、创建与运行 SvelteKit 项目

通过 `bun create` 命令来创建 `Kit` 项目，这点与其他包管理器没什么区别：

```bash
$ bun create svelte@latest my-project

# 进入文件夹
$ cd my-project
```

不急着马上就 `bun install`，接下来先安装 `bun` 专用的 `adapter`：

```bash
$ bun add -D svelte-adapter-bun
```

`Kit` 默认的 `adapter` 是 `svelte-adapter-auto`，它是专用于 `vercel` 这类 `serverless` 的，而 `svelte-adapter-node` 则是专用于 `Node.js` 的，`svelte-adapter-bun` 则专用于 `bun`。

你需要打开 `svelte.config.js` 文件，将首行的：

```js
import adapter from "@sveltejs/adapter-auto";
```

改为：

```js
import adapter from "svelte-adapter-bun";
```

至此，已基本完成了所有配置了。

当然，你还可以通过 `svelte-add` 添加一些可选的功能，例如 `tailwindcss`：

```bash
$ bunx svelte-add tailwindcss
```

如不需要则跳过。

准备好前述所有步骤后，安装所有依赖包：

```bash
$ bun install
```

一切准备就绪，最后用 `bun` 来运行开发环境：

```bash
$ bun --bun run dev
```

这个 `--bun` 选项指示运行时使用 `bun`，如果忽略则使用 `Node.js`。

虽然运行时由 `Node.js` 改为了 `bun`，不过开发环境仍然由 `Vite` 承载。

最后，通过 `build` 来生成最终产品代码（无需 `--bun` 选项）：

```bash
$ bun run build
```

部署到服务器后，进入站点的根目录，你可以通过下方命令来跑起你的站点：

```bash
$ bun ./index.js 
```

# 三、最后……

我尝试将一个小型的项目改为使用 `bun` 来跑，做了些回归测试，没有发现任何问题。

相比之下，`Node.js` 目前仍然最为适合的运行时，暂时找不到充足的理由去替换为 `bun`。

参考链接：[Build an app with SvelteKit and Bun](https://bun.sh/guides/ecosystem/sveltekit)