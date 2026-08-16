# Sideglass Zime

<p align="center">
  <a href="./README.md">中文（默认）</a> · <strong>English</strong> · <a href="./README.es.md">Español</a>
</p>

<p align="center">
  <img src="public/screenshots/landscape-dark.png" alt="Sideglass — second-monitor dashboard for Windows" width="720" />
</p>

<p align="center">
  <strong>Source-available desktop app for Windows</strong> (Tauri + Next.js) — customizable secondary monitor dashboard: weather, calendar, hardware, notes, embedded Bilibili, and an AI dock. This is the <strong>Zime branch</strong> with full Chinese localization.
</p>

<p align="center">
  <a href="https://github.com/Z2549/sideglass-dashboard/releases/tag/v0.2.36">⬇ Download v0.2.36 (Windows x64 installer)</a>
  ·
  <a href="https://github.com/Z2549/sideglass-dashboard">GitHub</a>
  ·
  <a href="./CHANGELOG.md">Changelog</a>
</p>

---

## 🇨🇳 Zime China-focused features

- **Full Chinese UI**: clock, weather, settings, themes, and update prompts fully localized; Chinese / English / Español switchable, follows the system language by default
- **Chinese daily quotes**: 105 built-in quotes from the *Analects*, classical poems, etc. (trilingual zh/en/es), rotated daily
- **12 domestic AI apps** in the dock: DeepSeek, Zhipu GLM, Tencent Yuanbao, Doubao, Kimi, Qwen (Tongyi), ERNIE Bot, iFlytek Spark, SenseChat, Hailiao AI, Tiangong AI, Metaso — all with official brand logos
- **Customizable AI dock**: hide any AI app in Settings; resize the whole dock (small / medium / large)
- **Bilibili instead of YouTube**: in-app search and playback, since YouTube is not reachable from mainland China
- **Weather opens domestic sites**: clicking the weather card opens Baidu weather search (Google for non-Chinese locales)
- **Localized calendar**: Chinese weekdays/months/"today"; iCal works with domestic calendar services
- **Chinese clock**: 上午/下午 (AM/PM) prefix before the time (e.g. 上午 09:30)
- **Theme options follow the language** (the three theme choices are translated)
- **No more squeezed narrow windows**: automatic proportional scaling on low-res / narrow windows; a 720p secondary monitor shows every widget without scrolling
- **System status fixes**: fixed covered widgets and spacing, and RAM/DISK rows no longer misalign with temperature rows
- **CN-friendly updates**: the updater points at this repo's Zime branch — GitHub Release assets, jsdelivr CDN, and raw.githubusercontent fallback

## Features

- Clock and weather (Open-Meteo, no API key; fetched in-app so it works from China)
- Google/domestic calendar via iCal URL
- Live CPU, RAM, GPU, and primary disk usage; temperatures via bundled sensors / NVML (run as administrator for °C)
- **Resizable responsive widgets**: drag the corner to any saved size; contents scale inside the card
- **Bilibili inside the panel** with real search in the Tauri app
- AI dock (18 international + domestic apps, customizable)
- Daily quotes (105 Chinese classics), local notes, reorderable widgets
- **Windows-style** title bar (minimize / maximize / close on the right)
- Auto-update: **Settings → Check for updates**
- Start with Windows, global hotkey, system tray

## Stack

| Layer   | Tech                                              |
| ------- | ------------------------------------------------- |
| UI      | Next.js 16, React 19, TypeScript, Tailwind v4     |
| Desktop | Tauri v2 (frameless window, tray, signed updater) |
| Native  | Rust — sysinfo, WMI/LibreHardwareMonitor, NVML    |

## Quick setup

| Feature             | Where                                                   |
| ------------------- | ------------------------------------------------------- |
| Calendar            | Settings → Calendar iCal URL                            |
| Resize widgets      | Top bar → customize button → drag the card corner freely|
| Bilibili            | Video widget → search in app                            |
| Hide AI apps / dock size | Settings → AI apps                                 |
| Temperatures        | Bundled in installer; run as administrator if °C is missing |
| Updates             | Settings → **Check for updates**                        |
| Autostart / hotkey  | Settings                                                |

## Development

```bash
pnpm install
pnpm run dev          # Web preview http://localhost:3000
pnpm run tauri:dev    # Desktop app
pnpm run tauri:build  # Windows installer
```

```bash
pnpm run lint && pnpm run check && pnpm run build
```

Regenerate marketing screenshots:

```bash
pnpm run screenshots
```

## Publish a release (Zime branch)

```bash
# 1. Build with the signing key
export TAURI_SIGNING_PRIVATE_KEY="$(cat ~/.tauri/zime.key)"
export TAURI_SIGNING_PRIVATE_KEY_PASSWORD="your password"
pnpm run tauri:build

# 2. Generate update artifacts (zime-update/ folder)
node scripts/publish-zime-update.mjs

# 3. Commit & push, then create a GitHub Release (upload latest.json, installer and signature)
```

The app checks **Settings → Check for updates**, fetching `releases/latest/download/latest.json` first, then jsdelivr CDN, then raw.githubusercontent.

## Source available

Sideglass is source-available under the PolyForm Noncommercial License 1.0.0. Commercial use, resale, redistribution, white-labeling, paid hosting, or competing commercial forks require written permission from Moises Valero.

- [Open an issue](https://github.com/Z2549/sideglass-dashboard/issues)
- Pull requests welcome

## Contributors

- [DeepSeek](https://deepseek.com) — Chinese localization and Zime China-ification features
- [Moises Valero](https://moisesvalero.es) — original author

## License

[PolyForm Noncommercial License 1.0.0](LICENSE) — Copyright (c) 2026 Moises Valero
