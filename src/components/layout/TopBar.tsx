import { Bell, LogIn, Search, User } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Card } from '../ui/Card'

interface TopBarProps {
  notificationCount: number
  onSearch?: (query: string) => void
  onNotifications?: () => void
  onProfile?: () => void
  onLogout?: () => void
}

export function TopBar({ notificationCount, onSearch, onNotifications, onProfile, onLogout }: TopBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch?.(query.trim())
  }

  return (
    <Card className="flex h-[78px] items-center gap-2 px-3 sm:h-[106px] sm:gap-[14px] sm:px-[24px] 2xl:mr-[6px]">
      <form role="search" onSubmit={handleSubmit} className="relative min-w-0 flex-1">
        <label htmlFor="global-search" className="sr-only">
          Search pages
        </label>
        <input
          id="global-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search pages..."
          className="h-[44px] w-full rounded-full border border-slate-200 bg-[#f1f4f9] pr-11 pl-[14px] text-[15px] text-ink placeholder:text-slate-500 focus:ring-2 focus:ring-brand-300 focus:outline-none sm:h-[50px] sm:pl-[18px] [&::-webkit-search-cancel-button]:appearance-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute top-1/2 right-1 flex size-[36px] -translate-y-1/2 items-center justify-center text-ink hover:text-brand-600 sm:right-2"
        >
          <Search size={18} />
        </button>
      </form>

      <button
        type="button"
        onClick={onNotifications}
        aria-label={`Notifications, ${notificationCount} unread`}
        className="relative flex size-[44px] shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white transition hover:bg-brand-50 sm:size-[50px]"
      >
        <Bell size={16} className="fill-brand-600 text-brand-600" />
        {notificationCount > 0 && (
          <span className="absolute -top-[2px] -right-[8px] rounded-full bg-brand-500 px-[7px] py-[4px] text-[10.5px] leading-none font-bold text-white">
            {notificationCount > 99 ? '99+' : notificationCount}
          </span>
        )}
      </button>

      <button
        type="button"
        onClick={onProfile}
        aria-label="Open profile"
        className="flex size-[44px] shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#0b7f9c] to-[#0a3a4a] text-white ring-[3px] ring-brand-100 transition hover:scale-105 sm:size-[48px]"
      >
        <User size={20} strokeWidth={2.2} />
      </button>

      <button
        type="button"
        onClick={onLogout}
        aria-label="Log out"
        className="hidden size-[48px] shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-500 transition hover:bg-brand-50 xs:flex"
      >
        <LogIn size={18} />
      </button>
    </Card>
  )
}
