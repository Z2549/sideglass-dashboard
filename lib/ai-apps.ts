import { AI_BRAND_ICONS, type AiIconSrc } from "@/components/icons/ai-brand-icon"

export type AiApp = {
  id: string
  name: string
  icon: AiIconSrc
  url: string
}

export const AI_APPS: AiApp[] = [
  // International
  { id: "chatgpt", name: "ChatGPT", icon: AI_BRAND_ICONS.chatgpt, url: "https://chatgpt.com" },
  { id: "gemini", name: "Gemini", icon: AI_BRAND_ICONS.gemini, url: "https://gemini.google.com" },
  { id: "claude", name: "Claude", icon: AI_BRAND_ICONS.claude, url: "https://claude.ai" },
  {
    id: "perplexity",
    name: "Perplexity",
    icon: AI_BRAND_ICONS.perplexity,
    url: "https://www.perplexity.ai",
  },
  {
    id: "copilot",
    name: "Microsoft Copilot",
    icon: AI_BRAND_ICONS.copilot,
    url: "https://copilot.microsoft.com",
  },
  { id: "grok", name: "Grok", icon: AI_BRAND_ICONS.grok, url: "https://grok.com" },
  // Domestic (China)
  {
    id: "deepseek",
    name: "DeepSeek",
    icon: AI_BRAND_ICONS.deepseek,
    url: "https://chat.deepseek.com",
  },
  { id: "glm", name: "智谱清言 GLM", icon: AI_BRAND_ICONS.glm, url: "https://chatglm.cn" },
  {
    id: "yuanbao",
    name: "腾讯元宝",
    icon: AI_BRAND_ICONS.yuanbao,
    url: "https://yuanbao.tencent.com",
  },
  { id: "doubao", name: "豆包", icon: AI_BRAND_ICONS.doubao, url: "https://www.doubao.com" },
  { id: "kimi", name: "Kimi", icon: AI_BRAND_ICONS.kimi, url: "https://kimi.moonshot.cn" },
  {
    id: "tongyi",
    name: "通义千问",
    icon: AI_BRAND_ICONS.tongyi,
    url: "https://tongyi.aliyun.com",
  },
  { id: "wenxin", name: "文心一言", icon: AI_BRAND_ICONS.wenxin, url: "https://yiyan.baidu.com" },
  { id: "spark", name: "讯飞星火", icon: AI_BRAND_ICONS.spark, url: "https://xinghuo.xfyun.cn" },
  {
    id: "sensechat",
    name: "商量 SenseChat",
    icon: AI_BRAND_ICONS.sensechat,
    url: "https://chat.sensetime.com",
  },
  { id: "hailiao", name: "海螺 AI", icon: AI_BRAND_ICONS.hailiao, url: "https://hailiao.ai" },
  {
    id: "tiangong",
    name: "天工 AI",
    icon: AI_BRAND_ICONS.tiangong,
    url: "https://www.tiangong.cn",
  },
  { id: "metaso", name: "秘塔 AI", icon: AI_BRAND_ICONS.metaso, url: "https://metaso.cn" },
]

const AI_APP_IDS = new Set(AI_APPS.map((app) => app.id))

export function isAiAppId(id: string): boolean {
  return AI_APP_IDS.has(id)
}

export function getAiAppById(id: string): AiApp | undefined {
  return AI_APPS.find((app) => app.id === id)
}

export function getAiAppUrl(id: string): string {
  return getAiAppById(id)?.url ?? AI_APPS[0].url
}
