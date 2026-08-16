import Image from "next/image"

export type AiIconSrc = string | { light: string; dark: string }

/** Official brand marks from https://svgl.app (stored in /public/icons/ai/) */
export function AiBrandIcon({ src, className }: { src: string; className?: string }) {
  return (
    <Image src={src} alt="" width={32} height={32} className={className} aria-hidden unoptimized />
  )
}

export const AI_BRAND_ICONS = {
  /** OpenAI logo: black on light UI, white on dark UI */
  chatgpt: {
    light: "/icons/ai/openai-light.svg",
    dark: "/icons/ai/openai-dark.svg",
  },
  gemini: "/icons/ai/gemini.svg",
  claude: "/icons/ai/claude.svg",
  perplexity: "/icons/ai/perplexity.svg",
  /** Microsoft Copilot (not GitHub Copilot) */
  copilot: "/icons/ai/copilot.svg",
  grok: {
    light: "/icons/ai/grok-light.svg",
    dark: "/icons/ai/grok-dark.svg",
  },
  // Domestic (China) brand tiles
  deepseek: "/icons/ai/deepseek.svg",
  glm: "/icons/ai/glm.svg",
  yuanbao: "/icons/ai/yuanbao.svg",
  doubao: "/icons/ai/doubao.svg",
  kimi: "/icons/ai/kimi.svg",
  tongyi: "/icons/ai/tongyi.svg",
  wenxin: "/icons/ai/wenxin.svg",
  spark: "/icons/ai/spark.svg",
  sensechat: "/icons/ai/sensechat.svg",
  hailiao: "/icons/ai/hailiao.svg",
  tiangong: "/icons/ai/tiangong.svg",
  metaso: "/icons/ai/metaso.svg",
} as const satisfies Record<string, AiIconSrc>

export function resolveAiIconSrc(icon: AiIconSrc, isDark: boolean): string {
  return typeof icon === "string" ? icon : isDark ? icon.dark : icon.light
}
