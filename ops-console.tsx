"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "./utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface OpsMetric {
  label: string
  value: string | number
  sub?: string
}

export interface OpsNavItem {
  id: string
  label: string
  dotColor?: string
  badge?: string | null
}

export interface OpsSignal {
  color?: "gold" | "red" | "green" | "blue"
  message: string
}

export interface OpsConsoleProps {
  /** App name shown in the sidebar */
  appName?: string
  /** Subtitle shown below app name */
  appSubtitle?: string
  /** Password to unlock the console (set to undefined to skip auth) */
  password?: string
  /** Metric cards shown in the Brief tab */
  metrics?: OpsMetric[]
  /** Nav items (tabs) */
  navItems?: OpsNavItem[]
  /** Signal lines shown in Brief */
  signals?: OpsSignal[]
  /** Render function for each tab's content */
  renderTab?: (tabId: string) => React.ReactNode
  /** Extra className on the root wrapper */
  className?: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

const MONO = "'JetBrains Mono', 'Courier New', monospace"

const SIGNAL_COLORS: Record<string, string> = {
  gold: "#c9a84c",
  red: "#f87171",
  green: "#34d399",
  blue: "#38bdf8",
}

const DEFAULT_METRICS: OpsMetric[] = [
  { label: "USUARIOS TOTALES", value: 1_284, sub: "en base de datos" },
  { label: "PRO ACTIVOS", value: 47, sub: "is_subscribed = true" },
  { label: "OPORTUNIDADES", value: 3_921, sub: "activas hoy" },
  { label: "INGRESOS", value: "$423", sub: "este mes" },
]

const DEFAULT_NAV: OpsNavItem[] = [
  { id: "brief", label: "Brief del día", dotColor: "bg-emerald-400", badge: null },
  { id: "usuarios", label: "Usuarios", dotColor: "bg-[#c9a84c]", badge: "1284" },
  { id: "contenido", label: "Contenido", dotColor: "bg-white/30", badge: null },
  { id: "tokens", label: "Tokens B2B", dotColor: "bg-white/30", badge: null },
]

const DEFAULT_SIGNALS: OpsSignal[] = [
  { color: "gold", message: "12 usuarios en plan Free — candidatos para convertir" },
  { color: "red", message: "2 tokens B2B con balance bajo (<5)" },
  { color: "green", message: "Sistema operativo · scrapers activos · emails verificados" },
]

// ─── SVG decorativa ───────────────────────────────────────────────────────────

function SignalLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      viewBox="0 0 800 400"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="sl1" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0" />
          <stop offset="40%" stopColor="#c9a84c" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sl2" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0" />
          <stop offset="60%" stopColor="#c9a84c" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
        </linearGradient>
        <filter id="sglow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M -50 100 C 120 80, 240 140, 400 112 S 600 72, 880 88"
        fill="none"
        stroke="url(#sl1)"
        strokeWidth="1"
        filter="url(#sglow)"
      >
        <animate attributeName="opacity" values="0.6;1;0.6" dur="3.2s" repeatCount="indefinite" />
        <animate
          attributeName="d"
          values="M -50 100 C 120 80, 240 140, 400 112 S 600 72, 880 88;M -50 112 C 120 96, 240 120, 400 128 S 600 88, 880 100;M -50 100 C 120 80, 240 140, 400 112 S 600 72, 880 88"
          dur="8s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M -50 220 C 160 200, 320 248, 480 220 S 680 192, 880 208"
        fill="none"
        stroke="url(#sl2)"
        strokeWidth="1"
      >
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="5.5s" repeatCount="indefinite" />
      </path>
      <path
        d="M -50 300 C 200 288, 400 320, 600 296 S 760 280, 880 292"
        fill="none"
        stroke="#c9a84c"
        strokeWidth="0.5"
        strokeOpacity="0.05"
      >
        <animate attributeName="opacity" values="0.04;0.12;0.04" dur="9s" repeatCount="indefinite" />
      </path>
    </svg>
  )
}

// ─── Login Screen ─────────────────────────────────────────────────────────────

interface LoginScreenProps {
  appName: string
  appSubtitle: string
  onAuth: () => void
  password?: string
}

function LoginScreen({ appName, appSubtitle, onAuth, password }: LoginScreenProps) {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    if (!password || value === password) {
      onAuth()
    } else {
      setError("Contraseña incorrecta")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="w-full max-w-sm border border-white/[0.07] p-8 bg-[#080808]"
      >
        <p style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.2em", color: "rgba(232,232,224,0.3)", textTransform: "uppercase", marginBottom: "24px" }}>
          {appSubtitle}
        </p>
        <h1 style={{ fontFamily: MONO, fontSize: "1.5rem", color: "#e8e8e0", fontWeight: 600, marginBottom: "24px" }}>
          {appName}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError("") }}
            placeholder="contraseña"
            className="w-full px-4 py-3 bg-transparent border border-white/[0.07] text-[#e8e8e0] text-sm placeholder-white/20 focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
            style={{ fontFamily: MONO }}
          />
          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 bg-[#c9a84c] text-[#080808] text-sm font-semibold tracking-wide hover:bg-[#e6cf8a] transition-colors disabled:opacity-50"
          >
            {loading ? "ACCEDIENDO..." : "ACCEDER →"}
          </motion.button>
        </form>
        {error && (
          <p style={{ fontFamily: MONO, fontSize: "12px", color: "#f87171", marginTop: "12px" }}>{error}</p>
        )}
      </motion.div>
    </div>
  )
}

// ─── Default Brief Tab ────────────────────────────────────────────────────────

function DefaultBrief({ metrics, signals }: { metrics: OpsMetric[]; signals: OpsSignal[] }) {
  return (
    <div>
      <div className="mb-8">
        <p style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.15em", color: "rgba(232,232,224,0.3)", textTransform: "uppercase" }}>
          BRIEF — {new Date().toLocaleDateString("es-PY", { weekday: "long", day: "numeric", month: "long" }).toUpperCase()}
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-[#e8e8e0]">Estado del sistema</h1>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.07] border border-white/[0.07]">
        {metrics.map((m, i) => (
          <div key={i} className="bg-[#080808] p-5">
            <p style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.15em", color: "rgba(232,232,224,0.3)", textTransform: "uppercase", marginBottom: "8px" }}>{m.label}</p>
            <p style={{ fontFamily: MONO, fontSize: "2.5rem", lineHeight: 1, color: "#e8e8e0", fontWeight: 600 }}>{m.value}</p>
            {m.sub && <p style={{ fontFamily: MONO, fontSize: "10px", color: "rgba(232,232,224,0.25)", marginTop: "4px" }}>{m.sub}</p>}
          </div>
        ))}
      </div>

      {/* Signals */}
      <div className="mt-6 border border-white/[0.07]">
        <div className="px-5 py-3 border-b border-white/[0.07]">
          <p style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.15em", color: "rgba(232,232,224,0.3)", textTransform: "uppercase" }}>SEÑALES</p>
        </div>
        <div className="divide-y divide-white/[0.05]">
          {signals.map((s, i) => (
            <div key={i} className="px-5 py-3 flex items-center gap-3">
              <span style={{ color: SIGNAL_COLORS[s.color || "gold"] }}>◆</span>
              <span className="text-sm text-[#e8e8e0]">{s.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Custom integration CTA */}
      <div className="mt-6 border border-[#c9a84c]/20 bg-[#c9a84c]/[0.03] p-5">
        <p style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.15em", color: "#c9a84c", textTransform: "uppercase", marginBottom: "8px" }}>
          ¿NECESITÁS INTEGRACIÓN REAL?
        </p>
        <p className="text-sm text-[rgba(232,232,224,0.6)] mb-3">
          Este componente incluye datos de demostración. Si necesitás conectarlo a tu base de datos (Supabase, PostgreSQL, API propia), te asesoramos.
        </p>
        <a
          href="mailto:contacto@cvitae.lat?subject=OPS Console — Integración personalizada"
          className="inline-block text-xs bg-[#c9a84c] text-[#080808] font-semibold px-4 py-2 hover:bg-[#e6cf8a] transition-colors"
          style={{ fontFamily: MONO }}
        >
          Escribir a contacto@cvitae.lat →
        </a>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function OpsConsole({
  appName = "OPS CONSOLE",
  appSubtitle = "SISTEMA DE OPERACIONES",
  password,
  metrics = DEFAULT_METRICS,
  navItems = DEFAULT_NAV,
  signals = DEFAULT_SIGNALS,
  renderTab,
  className,
}: OpsConsoleProps) {
  const [authed, setAuthed] = useState(!password)
  const [activeTab, setActiveTab] = useState(navItems[0]?.id ?? "brief")

  if (!authed) {
    return (
      <LoginScreen
        appName={appName}
        appSubtitle={appSubtitle}
        password={password}
        onAuth={() => setAuthed(true)}
      />
    )
  }

  const tabContent = renderTab
    ? renderTab(activeTab)
    : activeTab === "brief"
    ? <DefaultBrief metrics={metrics} signals={signals} />
    : (
      <div className="flex items-center justify-center h-64">
        <p style={{ fontFamily: MONO, fontSize: "12px", color: "rgba(232,232,224,0.25)" }}>
          Tab "{activeTab}" — pasá tu contenido via renderTab()
        </p>
      </div>
    )

  return (
    <div className={cn("min-h-screen flex", className)} style={{ backgroundColor: "#080808" }}>

      {/* SIDEBAR */}
      <aside className="w-52 fixed h-full border-r border-white/[0.07] bg-[#080808] flex flex-col py-6 px-4" style={{ zIndex: 20 }}>
        <div className="mb-8 px-2">
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "#c9a84c", fontWeight: 900 }}>
            {appName}
          </span>
          <p style={{ fontFamily: MONO, fontSize: "10px", color: "rgba(232,232,224,0.3)", marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.12em" }}>
            {appSubtitle}
          </p>
        </div>

        <div className="mb-6 px-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span style={{ fontFamily: MONO, fontSize: "11px", color: "rgba(232,232,224,0.4)" }}>ACTIVO</span>
        </div>

        <nav className="flex-1 space-y-0.5">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              whileTap={{ x: 2 }}
              className={cn(
                "w-full text-left px-2 py-2.5 text-sm transition-colors flex items-center gap-2.5",
                activeTab === item.id
                  ? "text-[#e8e8e0] bg-white/[0.05]"
                  : "text-[rgba(232,232,224,0.45)] hover:text-[#e8e8e0] hover:bg-white/[0.03]"
              )}
              style={{ borderLeft: activeTab === item.id ? "2px solid #c9a84c" : "2px solid transparent" }}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", item.dotColor ?? "bg-white/30")} />
              {item.label}
              {item.badge && (
                <span className="ml-auto text-[#c9a84c]" style={{ fontFamily: MONO, fontSize: "10px" }}>{item.badge}</span>
              )}
            </motion.button>
          ))}
        </nav>

        <div className="px-2 mt-4">
          <p style={{ fontFamily: MONO, fontSize: "10px", color: "rgba(232,232,224,0.2)" }}>
            {new Date().toLocaleDateString("es-PY")} {new Date().toLocaleTimeString("es-PY", { hour: "2-digit", minute: "2-digit" })}
          </p>
          <button
            onClick={() => setAuthed(false)}
            className="mt-3 text-xs text-red-400/60 hover:text-red-400 transition-colors"
          >
            ↩ Salir
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-grow ml-52 relative overflow-hidden" style={{ minHeight: "100vh" }}>
        <SignalLines />
        <div className="relative z-10 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {tabContent}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default OpsConsole
