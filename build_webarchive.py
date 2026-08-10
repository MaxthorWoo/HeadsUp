#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
将 index.html 打包为 iOS Safari 原生可打开的 index.webarchive。

用法:  python build_webarchive.py
产物:  index.webarchive (Apple WebArchive / 二进制 plist)
"""
import plistlib
from pathlib import Path

BASE = Path(__file__).resolve().parent
SRC = BASE / "index.html"
OUT = BASE / "index.webarchive"

# WebArchive 顶层结构 (NSKeyedArchiver 序列化的二进制 plist)
archive = {
    "WebMainResource": {
        "WebResourceData": SRC.read_bytes(),
        "WebResourceFrameName": "",
        "WebResourceMIMEType": "text/html",
        "WebResourceTextEncodingName": "UTF-8",
        # 本游戏零外部资源，该 URL 仅用于相对资源解析，任意合法值均可
        "WebResourceURL": "http://localhost/heads-up/index.html",
    },
    "WebSubresources": [],
    "WebSubframeArchives": [],
}

data = plistlib.dumps(archive, fmt=plistlib.FMT_BINARY)
OUT.write_bytes(data)

print(f"已生成: {OUT}")
print(f"HTML 大小: {SRC.stat().st_size:,} 字节")
print(f"产物大小: {len(data):,} 字节")
