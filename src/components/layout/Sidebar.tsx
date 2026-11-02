import { ChevronsLeft } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { NavItem } from '@/types'
import { Card } from '../ui/Card'
import { LogoMark } from './Logo'

interface SidebarProps {
  items: NavItem[]
  activeId: string
  collapsed: boolean
  onSelect: (id: string) => void
  onToggleCollapse: () => void
}

export function Sidebar({ items, activeId, collapsed, onSelect, onToggleCollapse }: SidebarProps) {
  return (
    <>
    <nav
      aria-label="Primary mobile"
      className="order-first -mx-3.5 overflow-x-auto px-3.5 xl:hidden [scrollbar-width:none]"
    >
      <ul className="flex w-max gap-2 rounded-full bg-white p-2 shadow-card">
        {items.map(({ id, label, icon: Icon }) => {
          const active = id === activeId
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onSelect(id)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex h-10 items-center gap-2 rounded-full px-4 text-[13px] font-medium whitespace-nowrap transition',
                  active ? 'bg-[#e2e7e9] text-ink' : 'text-ink/80 hover:bg-slate-100',
                )}
              >
                <Icon size={16} strokeWidth={1.6} className={active ? 'text-[#1fa9d6]' : 'text-[#9aa3b0]'} aria-hidden />
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
    <aside className="relative hidden xl:col-start-1 xl:row-span-3 xl:row-start-1 xl:block 2xl:row-span-1">
      <Card
        as="nav"
        aria-label="Primary"        className={cn(
          'sticky top-[26px] flex h-[calc(100vh-59px)] min-h-[620px] flex-col rounded-[36px] pt-[36px] pb-8 transition-[width] duration-200',
          collapsed ? 'w-[84px] items-center px-3' : 'w-[203px] px-[30px]',
        )}
      >
        <div className="mb-[30px] flex h-[52px] items-center">
          {collapsed ? (
            <LogoMark />
          ) : (
            <img src={`${import.meta.env.BASE_URL}images/logo.webp`} alt="Mednevo" width={156} height={52} className="-ml-[4px] max-w-none" />
          )}
        </div>

        <ul className="flex flex-col gap-[10px]">
          {items.map(({ id, label, icon: Icon }) => {
            const active = id === activeId
            return (
              <li key={id} className={cn(id === 'vitals' && 'mt-[5px]', id === 'medications' && 'mt-[7px]')}>
                <button
                  type="button"
                  onClick={() => onSelect(id)}
                  aria-current={active ? 'page' : undefined}
                  title={collapsed ? label : undefined}
                  className={cn(
                    'flex h-9 w-full items-center gap-2.5 rounded-full px-2 text-left text-[13px] whitespace-nowrap transition',
                    active ? 'bg-[#e2e7e9] font-medium text-ink' : 'font-medium text-ink/90 hover:bg-slate-100',
                    collapsed && 'justify-center px-0',
                  )}
                >
                  <Icon
                    size={17}
                    strokeWidth={1.6}
                    className={cn('ml-0.5 shrink-0', id !== 'vitals' && 'fill-current', active ? 'text-[#1fa9d6]' : 'text-[#9aa3b0]')}
                    aria-hidden
                  />
                  {!collapsed && <span>{label}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </Card>

      <button
        type="button"
        onClick={onToggleCollapse}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="absolute top-[370px] -right-[11px] z-10 flex size-[26px] items-center justify-center rounded-full border-[1.5px] border-slate-400 bg-white text-slate-600 shadow-soft transition hover:text-brand-600"
      >
        <ChevronsLeft size={14} className={cn('transition-transform', collapsed && 'rotate-180')} />
      </button>
    </aside>
    </>
  )
}
