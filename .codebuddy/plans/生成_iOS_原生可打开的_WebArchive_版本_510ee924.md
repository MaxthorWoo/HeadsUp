---
name: 生成 iOS 原生可打开的 WebArchive 版本
overview: 编写一个 Python 生成脚本，将单文件 index.html 打包为 index.webarchive（Apple 网页归档格式，二进制 plist，完整内嵌 HTML/CSS/JS），使其能在 iPhone/iPad 的文件 App 中通过 Safari 原生直接打开并完整运行游戏。
todos:
  - id: write-script
    content: 编写 build_webarchive.py：读取 index.html，构造 WebArchive 三键结构，用 plistlib 输出二进制 plist 到 index.webarchive
    status: completed
  - id: generate-verify
    content: 运行脚本生成 index.webarchive，反向解析校验三键结构与 HTML 内容完整性
    status: completed
    dependencies:
      - write-script
  - id: write-readme
    content: 编写 README-iOS.md：局域网/AirDrop/微信/iCloud 传输方式、Safari 打开步骤与添加到主屏幕说明
    status: completed
---

## 产品概述

为纯本地单文件游戏 `index.html` 制作 iOS 原生可直接打开的 **WebArchive（.webarchive）** 版本，解决 iOS「文件」App 无法直接预览 .html 的问题，并附赠 iPhone 获取文件与打开方式的使用说明。

## 核心功能

- 生成 `index.webarchive`：iOS Safari 原生支持的网页归档格式，离线打开即可运行全部交互（换词、分类、渐变背景）
- 提供可重复执行的生成脚本 `build_webarchive.py`：后续修改词库/样式后一键重新生成
- 提供 `README-iOS.md`：说明如何将文件传输到 iPhone 并用 Safari 打开（局域网 / AirDrop / 微信 / iCloud Drive）

## 边界

- 仅新增文件，不改动现有 `index.html` 任何代码
- 该方案针对 iOS（.webarchive 为 Apple 专有格式，Windows/Android 浏览器不支持打开，但原 index.html 不受影响）

## 技术栈

- Python 3 标准库 `plistlib`（Windows 环境已有 Python，零第三方依赖）
- Apple WebArchive 文件格式（本质为二进制 plist）

## 实现方案

### 格式原理

WebArchive 是 NSKeyedArchiver 序列化的二进制 plist，顶层字典含三个键：

| 键 | 值 |
| --- | --- |
| WebMainResource | dict：`WebResourceData`（HTML 字节）、`WebResourceFrameName`（""）、`WebResourceMIMEType`（"text/html"）、`WebResourceTextEncodingName`（"UTF-8"）、`WebResourceURL`（合法 URL，如 `http://localhost/heads-up/`） |
| WebSubresources | [] |
| WebSubframeArchives | [] |


### 可行性依据

- 游戏为单文件、CSS/JS 全部内联、零外部资源，打包 webarchive 无子资源解析问题
- iOS Safari 对 .webarchive 支持 file:// 协议直接打开且可运行内联 JS（经实测验证）
- 其他格式不可行：PDF 无交互、docx 不运行 JS、PWA 需先在线访问

### 关键决策

- 生成脚本用 `plistlib.dumps(data, fmt=plistlib.FMT_BINARY)` 输出二进制 plist，兼容性最好
- `WebResourceURL` 仅用于相对资源解析，本游戏无外部资源，任意合法 URL 均可
- 脚本保持幂等可重复执行；产物大小应与 html 相当（约 30-40KB）

## 目录结构

```
e:/WebApp/HeadsUp/
├── index.html           # 现有文件，不改动
├── build_webarchive.py  # [NEW] 生成脚本：读取 index.html → 构造 WebArchive dict → 二进制 plist 写入 index.webarchive
├── index.webarchive     # [NEW] 生成产物，供 iPhone Safari 打开
└── README-iOS.md        # [NEW] iPhone 使用说明：传输方式、打开步骤、添加到主屏幕
```

## 验证方式

1. 运行脚本后确认 `index.webarchive` 生成成功、大小与 html 相当
2. 用 plistlib 反向解析生成文件：确认三个顶层键存在，`WebResourceData` 可 UTF-8 解码且包含 `<!DOCTYPE html>` 与词库关键词（如「职业身份」「交通工具」）
3. 确认本地服务器 8080 可访问 `index.webarchive`（供 iPhone 局域网下载）
4. 提示用户在 iPhone 实测 Safari 打开