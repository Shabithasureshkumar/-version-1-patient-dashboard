interface ToastProps {
  message: string | null
}

/** Polite live-region toast, always mounted so screen readers announce changes. */
export function Toast({ message }: ToastProps) {
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      {message && (
        <p className="rounded-full bg-ink px-5 py-3 text-[13px] font-medium text-white shadow-card">{message}</p>
      )}
    </div>
  )
}
