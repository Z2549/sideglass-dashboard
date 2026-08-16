# Sideglass Zime 🇨🇳

<p align="center">
  <strong>中文（默认）</strong> · <a href="./README.en.md">English</a> · <a href="./README.es.md">Español</a>
</p>

<p align="center">
  <img src="public/screenshots/landscape-dark.png" alt="Sideglass —— Windows 副屏仪表盘" width="720" />
</p>

<p align="center">
  <strong>Windows 桌面应用</strong>（Tauri + Next.js）—— 为国内用户打造的副屏仪表盘：天气、日历、硬件监控、笔记、Bilibili 视频、AI 应用面板，界面全中文。
</p>

<p align="center">
  <a href="https://github.com/Z2549/sideglass-dashboard/releases/tag/v0.2.36">⬇ 下载 v0.2.36（Windows x64 安装包）</a>
  ·
  <a href="https://github.com/Z2549/sideglass-dashboard">GitHub</a>
  ·
  <a href="./CHANGELOG.md">更新日志</a>
</p>

---

## 🇨🇳 Zime 中国化特色

- **全界面中文**：时钟、天气、设置、主题、更新提示全部中文化；支持中文 / English / Español 三语切换，默认跟随系统语言
- **每日一言改用中国经典**：内置 105 条《论语》、古诗词等中文名言（中英西三语对照），每日自动轮换
- **AI 面板加入 12 个国内应用**：DeepSeek、智谱清言（GLM）、腾讯元宝、豆包、Kimi、通义千问、文心一言、讯飞星火、商汤 SenseChat、海螺 AI、天工 AI、秘塔 AI 搜索，全部使用官网官方 logo
- **自定义 AI 面板**：设置中可隐藏任意 AI 应用；可一键调整整个面板大小（小 / 中 / 大）
- **视频模块换成 Bilibili**：内置 Bilibili 搜索与播放，替代国内无法访问的 YouTube
- **天气点击跳转国内网站**：点击天气卡片跳转百度天气搜索（非中文环境跳转 Google）
- **日历中文化**：星期、月份、"今天"等全部中文显示；iCal 订阅兼容国内日历服务
- **时钟中文显示**：上午 / 下午放在时间前面（如"上午 09:30"）
- **主题选项随语言切换**：主题的三种选项在不同语言下显示对应文字
- **窄窗口不再挤压**：低分辨率 / 窄窗口自动等比缩放，720p 副屏也能完整显示所有模块，无需滚动
- **系统状态模块修复**：修复模块被遮挡、间距错乱，以及 RAM / DISK 高度与带温度模块不一致的问题
- **国内可用的更新通道**：更新源指向本仓库 Zime 分支，GitHub Release + jsdelivr CDN 加速 + raw 备用，国内用户可直接检查并安装更新

## 功能特性

- 时钟与天气（Open-Meteo 数据源，应用内请求，国内可直接使用，无需 API 密钥）
- 通过 iCal 网址接入日历（兼容国内日历服务）
- 实时 CPU、内存、GPU、主磁盘占用；内置传感器 / NVML 温度监控（管理员运行可显示温度）
- **可拖拽调整大小的小组件**：拖动卡片边角保存任意尺寸，内容自适应缩放
- **Bilibili 视频面板**：应用内直接搜索、播放
- **AI 应用面板**：内置 18 个国内外 AI 应用，可自定义显示
- 每日名言（105 条中文经典）、本地笔记、小组件自由排序
- **Windows 风格标题栏**（右侧最小化 / 最大化 / 关闭）
- 自动更新：**设置 → 检查更新**
- 随 Windows 启动、全局快捷键、系统托盘

## 技术栈

| 层级   | 技术                                                    |
| ------ | ------------------------------------------------------- |
| UI     | Next.js 16, React 19, TypeScript, Tailwind v4           |
| 桌面端 | Tauri v2（无边框窗口、托盘、签名更新器）                |
| 原生   | Rust — sysinfo、WMI/LibreHardwareMonitor、NVML          |

## 快速配置

| 功能                        | 位置                                     |
| --------------------------- | ---------------------------------------- |
| 日历                        | 设置 → 日历 iCal 网址                    |
| 调整小组件大小              | 顶栏 → 自定义按钮 → 拖动卡片边角         |
| Bilibili                    | 视频小组件 → 应用内搜索                  |
| 隐藏 / 显示 AI 应用、面板大小 | 设置 → AI 应用                           |
| 温度显示                    | 安装包已内置；若 °C 未显示，以管理员身份运行 |
| 更新                        | 设置 → **检查更新**                      |
| 开机自启 / 快捷键           | 设置                                     |

## 开发

```bash
pnpm install
pnpm run dev          # Web 预览 http://localhost:3000
pnpm run tauri:dev    # 桌面应用
pnpm run tauri:build  # Windows 安装包
```

```bash
pnpm run lint && pnpm run check && pnpm run build
```

重新生成营销截图：

```bash
pnpm run screenshots
```

## 发布更新（Zime 分支）

```bash
# 1. 构建（需要签名密钥）
export TAURI_SIGNING_PRIVATE_KEY="$(cat ~/.tauri/zime.key)"
export TAURI_SIGNING_PRIVATE_KEY_PASSWORD="your password"
pnpm run tauri:build

# 2. 生成更新产物（zime-update/ 目录）
node scripts/publish-zime-update.mjs

# 3. 提交推送，并创建 GitHub Release（上传 latest.json、安装包与签名文件）
```

应用通过 **设置 → 检查更新** 依次拉取 GitHub Release 资产（`releases/latest/download/latest.json`）、jsdelivr CDN、raw.githubusercontent，国内用户也可正常更新。

## 开放源码

Sideglass 以 PolyForm Noncommercial License 1.0.0 许可开放源码。商业使用、转售、再分发、白标、付费托管或竞争性商业分支需要获得原作者 Moises Valero 的书面许可。

- [提交 issue](https://github.com/Z2549/sideglass-dashboard/issues)
- 欢迎提交 Pull Request

## 贡献者

- [DeepSeek](https://deepseek.com) — 中文本地化与翻译、Zime 中国化功能
- [Moises Valero](https://moisesvalero.es) — 原作者

## 许可证

[PolyForm Noncommercial License 1.0.0](LICENSE) — Copyright (c) 2026 Moises Valero
