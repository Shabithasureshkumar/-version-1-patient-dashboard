import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  id: string
  label: string
  icon: LucideIcon
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  price: string
  icon: LucideIcon
}

export type VitalStatus = 'normal' | 'warning' | 'critical'

export interface HeartRateVital {
  bpm: number
  status: VitalStatus
}

export interface BloodPressureVital {
  systolic: number
  diastolic: number
  status: VitalStatus
  /** Relative bar heights (0-100) for the mini chart. */
  trend: number[]
}

export interface WeightVital {
  kg: number
  deltaKg: number
  /** Relative points (0-100) for the sparkline. */
  trend: number[]
}

export interface HeightVital {
  cm: number
  feet: string
  min: number
  max: number
}

export interface Vitals {
  heartRate: HeartRateVital
  bloodPressure: BloodPressureVital
  weight: WeightVital
  height: HeightVital
}

export type MedicationTab = 'today' | 'tomorrow' | 'week'

export interface Medication {
  id: string
  name: string
  dose: string
  /** Display label, e.g. "8:00 AM". */
  time: string
  /** Position along the daily arc (0 = morning, 1 = night). */
  arcPosition: number
}

export type DoseState = 'pending' | 'taken' | 'skipped'

export type AppointmentStatus = 'completed' | 'upcoming' | 'cancelled'

export interface Doctor {
  name: string
  specialty: string
  avatarUrl?: string
}

export interface PastAppointment {
  id: string
  doctor: Doctor
  /** Pre-formatted, e.g. "Oct 20, 2026 • 10:00 AM". */
  when: string
  status: AppointmentStatus
}

export interface UpcomingAppointment {
  id: string
  doctor: Doctor
  /** ISO date (yyyy-mm-dd). */
  date: string
  startTime: string
  endTime: string
  type: string
}

export interface HubItem {
  id: string
  label: string
  icon: LucideIcon
  badge?: number
}

export type WellnessLevel = 'good' | 'moderate' | 'poor'

export interface WellnessFactor {
  id: string
  label: string
  level: WellnessLevel
  icon: LucideIcon
}
