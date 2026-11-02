import { Sparkle } from 'lucide-react'

interface AiBannerProps {
  onOpen?: () => void
}

export function AiBanner({ onOpen }: AiBannerProps) {
  return (
    <section
      aria-label="Dr. Nevo AI"
      className="relative flex min-h-[128px] items-center overflow-hidden 2xl:h-[128px] rounded-[28px] bg-[#007999] px-[25px] text-white shadow-banner"
    >
      <div className="relative z-10 max-w-[calc(100%-150px)] sm:max-w-none">
        <h2 className="flex items-center gap-3 text-[24px] leading-none font-bold">
          Dr. Nevo AI
          <Sparkle size={12} className="fill-white" aria-hidden />
        </h2>
        <p className="mt-[11px] text-[16px] font-normal text-white/90">Your Health Companion.</p>
      </div>

      <button
        type="button"
        onClick={onOpen}
        aria-label="Open Dr. Nevo AI assistant"
        className="absolute inset-y-0 right-0 w-[228px]"
      >
        <img
          src={`${import.meta.env.BASE_URL}images/ai-companion.webp`}
          alt=""
          className="size-full object-cover object-right [mask-image:linear-gradient(to_right,transparent,black_60px)]"
        />
      </button>
    </section>
  )
}
