// Publishes a Zime-branch update: builds latest.json (Tauri v2 updater format)
// with absolute CDN (jsdelivr) + raw.githubusercontent URLs and stages the files
// in `zime-update/` so they can be committed on the Zime branch.
//
// Usage (after `pnpm run tauri:build` with the signing key):
//   export TAURI_SIGNING_PRIVATE_KEY="$(cat ~/.tauri/zime.key)"
//   export TAURI_SIGNING_PRIVATE_KEY_PASSWORD="your password"
//   pnpm run tauri:build
//   node scripts/publish-zime-update.mjs
//
// Then commit the generated `zime-update/` folder on the Zime branch:
//   git add zime-update && git commit -m "chore: publish vX.Y.Z update artifacts" && git push

import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  copyFileSync,
  readdirSync,
  existsSync,
} from "node:fs"
import { join, resolve } from "node:path"

const ROOT = resolve(import.meta.dirname, "..")
const BUNDLE = join(ROOT, "src-tauri", "target", "release", "bundle", "nsis")
const OUT = join(ROOT, "zime-update")

const REPO = "Z2549/sideglass-dashboard"
const BRANCH = "Zime"
const CDN = (file) => `https://cdn.jsdelivr.net/gh/${REPO}@${BRANCH}/zime-update/${file}`
const RAW = (file) => `https://raw.githubusercontent.com/${REPO}/${BRANCH}/zime-update/${file}`

if (!existsSync(BUNDLE)) {
  console.error(`bundle dir not found: ${BUNDLE}`)
  console.error("Run `pnpm run tauri:build` with the signing key first.")
  process.exit(1)
}

const config = JSON.parse(readFileSync(join(ROOT, "src-tauri", "tauri.conf.json"), "utf8"))
const version = config.version
const prefix = `Sideglass_${version}_x64`
const installer = readdirSync(BUNDLE).find((f) => f.startsWith(prefix) && f.endsWith("-setup.exe"))
if (!installer) {
  console.error(`NSIS installer for v${version} not found in`, BUNDLE)
  process.exit(1)
}

const sigFile = `${installer}.sig`
const sigPath = join(BUNDLE, sigFile)
if (!existsSync(sigPath)) {
  console.error(`signature missing: ${sigPath}`)
  console.error("Build with the signing key so the updater artifacts are signed.")
  process.exit(1)
}

mkdirSync(OUT, { recursive: true })
for (const file of [installer, sigFile]) {
  copyFileSync(join(BUNDLE, file), join(OUT, file))
}

const signature = readFileSync(sigPath, "utf8").trim()
const latest = {
  version,
  notes: "",
  pub_date: new Date().toISOString(),
  platforms: {
    "windows-x86_64": {
      signature,
      url: [CDN(installer), RAW(installer)],
    },
  },
}
writeFileSync(join(OUT, "latest.json"), JSON.stringify(latest, null, 2) + "\n")

console.log("Update artifacts staged in:", OUT)
console.log("Files:", [installer, sigFile, "latest.json"].join(", "))
console.log("Version:", version)
console.log("App will check for updates via:")
console.log("  -", CDN("latest.json"), "(jsdelivr CDN)")
console.log("  -", RAW("latest.json"), "(raw.githubusercontent fallback)")
console.log("\nCommit zime-update/ on the Zime branch to publish this update.")
