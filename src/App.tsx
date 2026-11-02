import { useCallback, useEffect, useRef, useState } from 'react'
import { AiBanner } from '@/components/dashboard/AiBanner'
import { HealthHub } from '@/components/dashboard/HealthHub'
import { HealthOverview } from '@/components/dashboard/HealthOverview'
import { MedicationReminder } from '@/components/dashboard/MedicationReminder'
import { RecentAppointments } from '@/components/dashboard/RecentAppointments'
import { ServiceCards } from '@/components/dashboard/ServiceCards'
import { UpcomingAppointments } from '@/components/dashboard/UpcomingAppointments'
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner'
import { WellnessScore } from '@/components/dashboard/WellnessScore'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'
import { Toast } from '@/components/ui/Toast'
import {
  CURRENT_USER,
  DEMO_NOW,
  HUB_ITEMS,
  MEDICATIONS,
  NAV_ITEMS,
  RECENT_APPOINTMENTS,
  SERVICES,
  UPCOMING_APPOINTMENTS,
  VITALS,
  WELLNESS,
  WELLNESS_FACTORS,
} from '@/data/mock'

export default function App() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [collapsed, setCollapsed] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const timer = useRef<number>(undefined)

  const notify = useCallback((message: string) => {
    setToast(message)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToast(null), 2600)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const soon = (what: string) => () => notify(`${what} is coming soon.`)

  const handleSearch = (query: string) => {
    if (!query) return
    const q = query.toLowerCase()
    const hit = NAV_ITEMS.find((n) => n.label.toLowerCase().includes(q))
    if (hit) {
      setActiveNav(hit.id)
      notify(`Opened ${hit.label}.`)
    } else {
      notify(`No page matches "${query}".`)
    }
  }

  const nameOf = (id: string, list: { id: string; title?: string; label?: string }[]) => {
    const item = list.find((i) => i.id === id)
    return item?.title ?? item?.label ?? id
  }

  return (
    <div className="mx-auto grid min-h-screen max-w-[2000px] grid-cols-1 gap-x-[14px] gap-y-6 p-3.5 xl:grid-cols-[auto_minmax(0,1fr)] xl:py-[26px] xl:pr-[29px] 2xl:grid-cols-[auto_minmax(0,1fr)_538px]">
      <Sidebar
        items={NAV_ITEMS}
        activeId={activeNav}
        collapsed={collapsed}
        onSelect={setActiveNav}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />

      <main className="flex min-w-0 flex-col gap-[25px] xl:col-start-2 xl:row-start-2 2xl:row-start-1">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[682fr_485fr]">
          <WelcomeBanner
            name={CURRENT_USER.name}
            role={CURRENT_USER.role}
            avatarUrl={CURRENT_USER.avatarUrl}
            initialTime={DEMO_NOW}
          />
          <AiBanner onOpen={soon('Dr. Nevo AI')} />
        </div>

        <ServiceCards services={SERVICES} onSelect={(id) => notify(`${nameOf(id, SERVICES)} is coming soon.`)} />
        <HealthOverview vitals={VITALS} />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 wide:grid-cols-3">
          <MedicationReminder medications={MEDICATIONS} onViewAll={soon('Medication list')} />
          <RecentAppointments appointments={RECENT_APPOINTMENTS} onViewAll={soon('Appointment history')} />
          <div className="lg:col-span-2 wide:col-span-1">
            <HealthHub items={HUB_ITEMS} onSelect={(id) => notify(`${nameOf(id, HUB_ITEMS)} is coming soon.`)} />
          </div>
        </div>
      </main>

      <div className="contents 2xl:col-start-3 2xl:row-start-1 2xl:flex 2xl:min-w-0 2xl:flex-col 2xl:gap-[26px] 2xl:pt-px">
        <div className="order-first min-w-0 xl:col-start-2 xl:row-start-1 2xl:order-none">
          <TopBar
            notificationCount={120}
            onSearch={handleSearch}
            onNotifications={soon('Notifications')}
            onProfile={soon('Profile')}
            onLogout={soon('Log out')}
          />
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2 xl:col-start-2 xl:row-start-3 2xl:flex 2xl:flex-col 2xl:gap-[26px]">
          <UpcomingAppointments
            appointments={UPCOMING_APPOINTMENTS}
            today={DEMO_NOW}
            onViewAll={soon('Appointments page')}
            onJoin={(id) => {
              const a = UPCOMING_APPOINTMENTS.find((x) => x.id === id)
              notify(`Joining video call with ${a?.doctor.name ?? 'doctor'}…`)
            }}
            onReschedule={soon('Rescheduling')}
          />
          <WellnessScore {...WELLNESS} factors={WELLNESS_FACTORS} onOpenChat={soon('Health assistant chat')} />
        </div>
      </div>

      <Toast message={toast} />
    </div>
  )
}
