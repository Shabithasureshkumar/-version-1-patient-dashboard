export function LogoMark({ size = 42 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <defs>
        <linearGradient id="logo-g" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2fb3c9" />
          <stop offset="1" stopColor="#076d8b" />
        </linearGradient>
      </defs>
      <rect x="16" y="3" width="16" height="42" rx="8" stroke="url(#logo-g)" strokeWidth="3" />
      <rect x="3" y="16" width="42" height="16" rx="8" stroke="url(#logo-g)" strokeWidth="3" />
      <circle cx="24" cy="24" r="5" fill="url(#logo-g)" />
    </svg>
  )
}

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <LogoMark />
      <span className="text-[19px] font-extrabold tracking-wide text-brand-500">MEDNEVO</span>
    </div>
  )
}
