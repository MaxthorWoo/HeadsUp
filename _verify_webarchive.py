# -*- coding: utf-8 -*-
"""临时校验脚本：反向解析 index.webarchive 并校验结构。"""
import plistlib
import sys

sys.stdout.reconfigure(encoding="utf-8")

with open(r"e:/WebApp/HeadsUp/index.webarchive", "rb") as f:
    data = plistlib.load(f)

print("top-level keys:", list(data.keys()))
main = data["WebMainResource"]
print("main keys:", sorted(main.keys()))
html = main["WebResourceData"].decode("utf-8")
print("has <!DOCTYPE html>:", "<!DOCTYPE html>" in html)
print("has 职业身份:", "职业身份" in html)
print("has 交通工具:", "交通工具" in html)
print("mime:", main["WebResourceMIMEType"])
print("encoding:", main["WebResourceTextEncodingName"])
print("frame:", repr(main["WebResourceFrameName"]))
print("url:", main["WebResourceURL"])
print("html len:", len(html))
print("subresources:", len(data["WebSubresources"]))
print("subframe archives:", len(data["WebSubframeArchives"]))
