# Heads Up! 在 iPhone / iPad 上使用

游戏本体是单文件 HTML，iPhone 的「文件」App 无法直接预览 `.html`。因此这里额外提供了 **`index.webarchive`**——Apple 网页归档格式，iOS Safari 原生支持，**离线打开即可完整运行游戏**（换词、分类、渐变背景全部可用）。

## 一、把文件传到 iPhone（任选一种）

### 方式 A：局域网服务器（推荐，一次配置多次用）
1. 在本电脑运行本地服务器（保持打开）：
   ```
   python -m http.server 8080 --directory e:/WebApp/HeadsUp
   ```
2. 确保手机和电脑连**同一个 Wi-Fi**，在 iPhone Safari 地址栏输入：
   ```
   http://电脑的局域网IP:8080/index.webarchive
   ```
   电脑 IP 可在命令行用 `ipconfig` 查看（如 `192.168.1.5`）。
3. 打开后点击页面中间的下载按钮（或长按 → 下载），文件会存到「文件」App。

### 方式 B：微信文件传输助手
1. 电脑微信 → 文件传输助手 → 发送 `index.webarchive`。
2. iPhone 微信收到后点击该文件 → 右上角「…」→「用其他应用打开」→ 选 **Safari**。

### 方式 C：AirDrop 隔空投送
1. 确保电脑与 iPhone 都开启蓝牙和 Wi-Fi。
2. 在电脑上右键 `index.webarchive` → 「共享」→ 选择你的 iPhone。

### 方式 D：iCloud Drive
1. 将 `index.webarchive` 上传到 iCloud Drive（网页版 icloud.com 或电脑 iCloud 目录）。
2. iPhone「文件」App → iCloud Drive → 找到文件。

## 二、在 iPhone 上打开

1. 打开「文件」App，找到 `index.webarchive`。
2. 点一下会出现 Quick Look 预览页 → 点右上角**分享按钮**（方框+箭头）→「用 Safari 打开」。
3. Safari 中即可开始游戏。

> 注意：iOS 不允许文件 App 直接点开运行交互页面，必须经过「用 Safari 打开」这一步。

## 三、添加到主屏幕（可选，接近 App 体验）

在 Safari 中打开后：
1. 点击底部**分享按钮** → 「添加到主屏幕」。
2. 命名后即可从桌面图标一键全屏进入，每次无需再走文件 App。

## 四、更新词库后如何重新生成

修改 `index.html` 后，重新运行一次即可：
```
python build_webarchive.py
```
会覆盖生成新的 `index.webarchive`，重新按第一部分传一次即可。

## 格式说明

- `.webarchive` 是 Apple 专有格式，仅 iOS / macOS Safari 支持；Android / Windows 浏览器无法打开，但原始的 `index.html` 不受影响。
- 本游戏为单文件（CSS/JS 全内联、零外部资源），打包后无需任何联网即可完整运行。
