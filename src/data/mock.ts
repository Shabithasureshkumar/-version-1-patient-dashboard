import {
  Activity,
  Apple,
  CircleHelp,
  FlaskConical,
  Clipboard,
  CreditCard,
  Hexagon,
  LayoutDashboard,
  MessagesSquare,
  MessageSquare,
  Moon,
  PersonStanding,
  Pill,
  SquarePlus,
  Users,
  Video,
  UserRound,
  Wind,
} from 'lucide-react'
import { addDays, toISODate } from '@/lib/date'
import type {
  HubItem,
  Medication,
  NavItem,
  PastAppointment,
  ServiceItem,
  UpcomingAppointment,
  Vitals,
  WellnessFactor,
} from '@/types'

/**
 * Fixed "now" so the dashboard matches the design reference.
 * Replace with `new Date()` once wired to a real backend.
 */
export const DEMO_NOW = new Date(2026, 9, 28, 20, 6, 0)

export const CURRENT_USER = {
  name: 'developer dev',
  role: 'patient',
  avatarUrl: `${import.meta.env.BASE_URL}images/patient.webp` as string | undefined,
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'appointments', label: 'Appointments', icon: UserRound },
  { id: 'chat', label: 'Chat', icon: MessagesSquare },
  { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
  { id: 'records', label: 'Medical Records', icon: Clipboard },
  { id: 'vitals', label: 'Vitals', icon: Activity },
  { id: 'medications', label: 'Medications', icon: Pill },
  { id: 'settings', label: 'Settings', icon: Hexagon },
]

export const SERVICES: ServiceItem[] = [
  { id: 'book', title: 'Book Appointment', description: 'Consult with trusted doctors', price: '$35/visit', icon: Video },
  { id: 'consult', title: 'Consult Now', description: 'Start a video consultation', price: '$35/visit', icon: Users },
  { id: 'refill', title: 'Prescription Refill', description: 'Request medicines', price: '$35/visit', icon: Pill },
  { id: 'lab', title: 'Lab Tests', description: 'Book lab tests', price: '$35/visit', icon: FlaskConical },
]

export const VITALS: Vitals = {
  heartRate: { bpm: 72, status: 'normal' },
  bloodPressure: {
    systolic: 118,
    diastolic: 76,
    status: 'normal',
    trend: [40, 78, 52, 70, 46, 82, 58, 76, 50, 88, 62, 94],
  },
  weight: { kg: 70, deltaKg: -2, trend: [52, 50, 48, 46, 44, 40, 36, 30, 25, 26, 24, 22] },
  height: { cm: 178, feet: `5'10"`, min: 150, max: 200 },
}

export const MEDICATIONS: Medication[] = [
  { id: 'dolo', name: 'Dolo 650', dose: '1 tablet', time: '8:00 AM', arcPosition: 0.18 },
  { id: 'vitd3', name: 'Vitamin D3', dose: '1 tablet', time: '12:00 PM', arcPosition: 0.5 },
  { id: 'omega3', name: 'Omega 3', dose: '1 capsule', time: '8:00 PM', arcPosition: 0.82 },
]

const AVATARS: Record<string, string> = {
  "Dr. Arjun Mehta": `${import.meta.env.BASE_URL}images/doctor-arjun.webp`,
  "Dr. Neha Verma": `${import.meta.env.BASE_URL}images/doctor-neha.webp`,
  "Dr. Rohit Saini": `${import.meta.env.BASE_URL}images/doctor-rohit.webp`,
}

const doctor = (name: string, specialty: string) => ({ name, specialty, avatarUrl: AVATARS[name] })

export const RECENT_APPOINTMENTS: PastAppointment[] = [
  { id: 'r1', doctor: doctor('Dr. Arjun Mehta', 'Dermatologist'), when: 'Oct 20, 2026 • 10:00 AM', status: 'completed' },
  { id: 'r2', doctor: doctor('Dr. Neha Verma', 'General Physician'), when: 'Oct 15, 2026 • 11:30 AM', status: 'completed' },
  { id: 'r3', doctor: doctor('Dr. Rohit Saini', 'Cardiologist'), when: 'Oct 10, 2026 • 09:00 AM', status: 'completed' },
  { id: 'r4', doctor: doctor('Dr. Neha Verma', 'General Physician'), when: 'Oct 15, 2026 • 11:30 AM', status: 'completed' },
]

export const HUB_ITEMS: HubItem[] = [
  { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 3 },
  { id: 'records', label: 'Medical Records', icon: SquarePlus },
  { id: 'billing', label: 'Billing & Payments', icon: CreditCard },
  { id: 'help', label: 'Help & Support', icon: CircleHelp },
]

/** Appointments are expressed relative to DEMO_NOW so the calendar always shows activity. */
export const UPCOMING_APPOINTMENTS: UpcomingAppointment[] = [
  {
    id: 'u1',
    doctor: doctor('Dr. Priya Sharma', 'General Physician'),
    date: toISODate(DEMO_NOW),
    startTime: '10:00 AM',
    endTime: '10:30 AM',
    type: 'Video Consultation',
  },
  {
    id: 'u2',
    doctor: doctor('Dr. Arjun Mehta', 'Dermatologist'),
    date: toISODate(DEMO_NOW),
    startTime: '04:00 PM',
    endTime: '04:30 PM',
    type: 'Video Consultation',
  },
  {
    id: 'u3',
    doctor: doctor('Dr. Rohit Saini', 'Cardiologist'),
    date: toISODate(addDays(DEMO_NOW, 2)),
    startTime: '11:00 AM',
    endTime: '11:30 AM',
    type: 'Video Consultation',
  },
]

export const WELLNESS = {
  score: 82,
  max: 100,
  label: 'Good',
  message: 'Your health is on track!',
}

export const WELLNESS_FACTORS: WellnessFactor[] = [
  { id: 'sleep', label: 'Sleep', level: 'good', icon: Moon },
  { id: 'activity', label: 'Activity', level: 'moderate', icon: PersonStanding },
  { id: 'nutrition', label: 'Nutrition', level: 'good', icon: Apple },
  { id: 'stress', label: 'Stress', level: 'good', icon: Wind },
]
