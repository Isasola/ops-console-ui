"use client"

import { OpsConsole } from "./ops-console"

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_USERS = [
  { id: "1", email: "carolina.gomez@gmail.com",    full_name: "Carolina Gómez",    is_subscribed: true,  is_test: false, user_id: "uid1", professional_title: "Product Manager" },
  { id: "2", email: "rodrigo.diaz@outlook.com",    full_name: "Rodrigo Díaz",      is_subscribed: false, is_test: false, user_id: "uid2", professional_title: "Backend Developer" },
  { id: "3", email: "valentina.rios@empresa.com",  full_name: "Valentina Ríos",    is_subscribed: true,  is_test: false, user_id: "uid3", professional_title: "UX Designer" },
  { id: "4", email: "sebastian.luna@gmail.com",    full_name: "Sebastián Luna",    is_subscribed: false, is_test: true,  user_id: "uid4", professional_title: "Data Analyst" },
  { id: "5", email: "mariela.torres@yahoo.com",    full_name: "Mariela Torres",    is_subscribed: true,  is_test: false, user_id: "uid5", professional_title: "Marketing Lead" },
  { id: "6", email: "andres.paredes@hotmail.com",  full_name: "Andrés Paredes",    is_subscribed: false, is_test: false, user_id: "uid6", professional_title: "DevOps Engineer" },
  { id: "7", email: "lucia.mendez@gmail.com",      full_name: "Lucía Méndez",      is_subscribed: true,  is_test: false, user_id: "uid7", professional_title: "Frontend Developer" },
  { id: "8", email: "gabriel.rojas@empresa.py",   full_name: "Gabriel Rojas",     is_subscribed: false, is_test: false, user_id: null,   professional_title: "Contador" },
]

const MOCK_CONTENT = [
  { id: "c1", titulo: "Cómo pasar filtros ATS en 2025",           slug: "pasar-filtros-ats-2025",      tipo: "blog",       is_active: true,  categoria: "Tecnología" },
  { id: "c2", titulo: "Beca BECAL — Convocatoria abierta",        slug: "beca-becal-2025",             tipo: "beca",       is_active: true,  categoria: "Educación" },
  { id: "c3", titulo: "Foro de Empleabilidad LATAM — Julio 2025", slug: "foro-empleabilidad-jul-2025", tipo: "foro",       is_active: true,  categoria: "Otros" },
  { id: "c4", titulo: "5 habilidades más buscadas en Paraguay",   slug: "habilidades-buscadas-py",     tipo: "blog",       is_active: false, categoria: "Marketing" },
  { id: "c5", titulo: "Beca Santander Tech 2025",                 slug: "beca-santander-tech-2025",    tipo: "beca",       is_active: true,  categoria: "Tecnología" },
  { id: "c6", titulo: "Cumbre de RR.HH. Asunción",               slug: "cumbre-rrhh-asuncion",        tipo: "oportunidad",is_active: true,  categoria: "Administración" },
]

const MOCK_TOKENS = [
  { id: "t1", email: "reclutador@bancoitau.com.py",   access_token: "CVT-7X9KM2-PRO",   token_balance: 87,  plan_type: "pro"        },
  { id: "t2", email: "talentos@tigo.com.py",          access_token: "CVT-3BN4QR-ENT",   token_balance: 999, plan_type: "enterprise" },
  { id: "t3", email: "seleccion@copaco.com.py",       access_token: "CVT-2LW8PX-STR",   token_balance: 4,   plan_type: "starter"    },
  { id: "t4", email: "hr@multinacional.com",          access_token: "CVT-9YT1ZK-PRO",   token_balance: 62,  plan_type: "pro"        },
]

const MOCK_BETA = [
  { id: "b1", email: "juan.perez@gmail.com",       created_at: "2025-06-20T10:00:00Z", status: "pending"  },
  { id: "b2", email: "ana.gonzalez@outlook.com",   created_at: "2025-06-21T14:30:00Z", status: "invited"  },
  { id: "b3", email: "marcos.silva@yahoo.com",     created_at: "2025-06-22T09:15:00Z", status: "pending"  },
  { id: "b4", email: "sofia.castro@empresa.com",   created_at: "2025-06-23T16:45:00Z", status: "pending"  },
  { id: "b5", email: "nicolas.vega@gmail.com",     created_at: "2025-06-24T11:20:00Z", status: "invited"  },
]

// ─── Mono style shared ────────────────────────────────────────────────────────

const MONO = "'JetBrains Mono', 'Courier New', monospace"

// ─── Tab renders ─────────────────────────────────────────────────────────────

function UsuariosTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.15em", color: "rgba(232,232,224,0.3)", textTransform: "uppercase" }}>USUARIOS B2C</p>
          <h2 className="text-xl text-[#e8e8e0] mt-0.5">{MOCK_USERS.length} registros</h2>
        </div>
        <span style={{ fontFamily: MONO, fontSize: "10px", color: "rgba(232,232,224,0.2)", border: "1px solid rgba(255,255,255,0.07)", padding: "4px 10px" }}>↻ Actualizar</span>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-white/[0.07]">
            {["NOMBRE", "EMAIL", "TÍTULO", "TIPO", "PLAN"].map(h => (
              <th key={h} className="text-left py-2.5 px-3 font-normal tracking-widest text-[rgba(232,232,224,0.3)]" style={{ fontFamily: MONO, fontSize: "10px" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04]">
          {MOCK_USERS.map(u => (
            <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
              <td className="py-3 px-3 text-sm text-[#e8e8e0]">{u.full_name}</td>
              <td className="py-3 px-3 text-[rgba(232,232,224,0.5)]" style={{ fontFamily: MONO, fontSize: "11px" }}>{u.email}</td>
              <td className="py-3 px-3 text-[rgba(232,232,224,0.4)]" style={{ fontSize: "12px" }}>{u.professional_title}</td>
              <td className="py-3 px-3">
                <span className={`text-[10px] px-2 py-0.5 border ${u.is_test ? "border-amber-500/40 text-amber-400" : "border-white/10 text-[rgba(232,232,224,0.4)]"}`} style={{ fontFamily: MONO }}>
                  {u.is_test ? "TEST" : "REAL"}
                </span>
              </td>
              <td className="py-3 px-3">
                {u.user_id ? (
                  <span className={`text-[10px] px-2 py-0.5 border ${u.is_subscribed ? "border-[#c9a84c]/50 text-[#c9a84c]" : "border-white/10 text-[rgba(232,232,224,0.4)]"}`} style={{ fontFamily: MONO }}>
                    {u.is_subscribed ? "● PRO" : "○ FREE"}
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 border border-white/[0.05] text-[rgba(232,232,224,0.15)] cursor-not-allowed" style={{ fontFamily: MONO }} title="Sin login aún">
                    ○ FREE
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ContenidoTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.15em", color: "rgba(232,232,224,0.3)", textTransform: "uppercase" }}>GESTOR</p>
          <h2 className="text-xl text-[#e8e8e0] mt-0.5">Contenido ({MOCK_CONTENT.length})</h2>
        </div>
        <span style={{ fontFamily: MONO, fontSize: "10px", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.2)", padding: "4px 10px" }}>+ Nuevo</span>
      </div>
      <div className="border border-white/[0.07] divide-y divide-white/[0.04]">
        {MOCK_CONTENT.map(item => (
          <div key={item.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 border border-white/10 text-[rgba(232,232,224,0.4)]" style={{ fontFamily: MONO }}>{item.tipo.toUpperCase()}</span>
                <span className="text-sm text-[#e8e8e0]">{item.titulo}</span>
              </div>
              <p className="text-[11px] text-[rgba(232,232,224,0.3)] mt-0.5" style={{ fontFamily: MONO }}>/{item.slug}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${item.is_active ? "bg-emerald-400" : "bg-red-400/50"}`} />
              <span style={{ fontFamily: MONO, fontSize: "10px", color: "rgba(232,232,224,0.2)" }}>{item.categoria}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TokensTab() {
  return (
    <div>
      <div className="mb-6">
        <p style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.15em", color: "rgba(232,232,224,0.3)", textTransform: "uppercase" }}>ACCESO B2B</p>
        <h2 className="text-xl text-[#e8e8e0] mt-0.5">Tokens B2B</h2>
      </div>
      <div className="border border-white/[0.07]">
        <div className="px-5 py-3 border-b border-white/[0.07]">
          <p style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.15em", color: "rgba(232,232,224,0.3)", textTransform: "uppercase" }}>TOKENS EMITIDOS — {MOCK_TOKENS.length}</p>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/[0.05]">
              {["EMAIL", "TOKEN", "BALANCE", "PLAN"].map(h => (
                <th key={h} className="text-left py-2.5 px-4 font-normal tracking-widest text-[rgba(232,232,224,0.3)]" style={{ fontFamily: MONO, fontSize: "10px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {MOCK_TOKENS.map(t => (
              <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-4 text-sm text-[#e8e8e0]">{t.email}</td>
                <td className="py-3 px-4" style={{ fontFamily: MONO, fontSize: "11px", color: "#c9a84c" }}>{t.access_token}</td>
                <td className="py-3 px-4" style={{ fontFamily: MONO, color: t.token_balance < 5 ? "#f87171" : "#e8e8e0" }}>{t.token_balance}</td>
                <td className="py-3 px-4">
                  <span className={`text-[10px] px-2 py-0.5 border ${
                    t.plan_type === "enterprise" ? "border-[#c9a84c]/50 text-[#c9a84c]"
                    : t.plan_type === "pro" ? "border-sky-400/40 text-sky-400"
                    : "border-white/10 text-[rgba(232,232,224,0.4)]"
                  }`} style={{ fontFamily: MONO, letterSpacing: "0.1em" }}>
                    {t.plan_type.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function BetaTab() {
  return (
    <div>
      <div className="mb-8">
        <p style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.15em", color: "rgba(232,232,224,0.3)", textTransform: "uppercase" }}>PIPELINE</p>
        <h2 className="text-xl text-[#e8e8e0] mt-0.5">Beta & Leads</h2>
      </div>
      <div className="border border-white/[0.07]">
        <div className="px-5 py-3 border-b border-white/[0.07]">
          <p style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.15em", color: "rgba(232,232,224,0.3)", textTransform: "uppercase" }}>
            LISTA BETA — {MOCK_BETA.length}
          </p>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/[0.05]">
              {["EMAIL", "FECHA", "STATUS", "ACCIÓN"].map(h => (
                <th key={h} className="text-left py-2.5 px-4 font-normal tracking-widest text-[rgba(232,232,224,0.3)]" style={{ fontFamily: MONO, fontSize: "10px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {MOCK_BETA.map(entry => (
              <tr key={entry.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-4 text-[rgba(232,232,224,0.7)]" style={{ fontFamily: MONO, fontSize: "12px" }}>{entry.email}</td>
                <td className="py-3 px-4 text-[rgba(232,232,224,0.4)]" style={{ fontFamily: MONO, fontSize: "11px" }}>
                  {new Date(entry.created_at).toLocaleDateString("es-PY")}
                </td>
                <td className="py-3 px-4">
                  <span className={`text-[10px] px-2 py-0.5 border ${
                    entry.status === "invited" ? "border-emerald-500/40 text-emerald-400"
                    : "border-white/10 text-[rgba(232,232,224,0.4)]"
                  }`} style={{ fontFamily: MONO }}>
                    {entry.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {entry.status !== "invited" && (
                    <span className="text-[10px] text-sky-400/60 cursor-pointer hover:text-sky-400 transition-colors" style={{ fontFamily: MONO }}>
                      Invitar →
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Demo export ─────────────────────────────────────────────────────────────

export default function OpsConsoleDemo() {
  return (
    <OpsConsole
      password="demo1234"
      appName="ACME OPS"
      appSubtitle="OPERATIONS CONSOLE"
      metrics={[
        { label: "USUARIOS TOTALES", value: "1,284", sub: "en base de datos" },
        { label: "PRO ACTIVOS",      value: 47,       sub: "is_subscribed = true" },
        { label: "OPORTUNIDADES",    value: "3,921",  sub: "activas hoy" },
        { label: "MRR",              value: "$840",   sub: "este mes" },
      ]}
      navItems={[
        { id: "brief",    label: "Brief del día", dotColor: "bg-emerald-400", badge: null },
        { id: "usuarios", label: "Usuarios",      dotColor: "bg-[#c9a84c]",  badge: "8"  },
        { id: "contenido",label: "Contenido",     dotColor: "bg-white/30",   badge: "6"  },
        { id: "tokens",   label: "Tokens B2B",    dotColor: "bg-sky-400",    badge: "4"  },
        { id: "beta",     label: "Beta / Leads",  dotColor: "bg-white/30",   badge: "5"  },
      ]}
      signals={[
        { color: "gold",  message: "5 usuarios en plan Free — candidatos para convertir" },
        { color: "red",   message: "1 token B2B con balance crítico (<5)" },
        { color: "green", message: "Sistema operativo · todos los servicios activos" },
      ]}
      renderTab={(tabId) => {
        if (tabId === "usuarios")  return <UsuariosTab />
        if (tabId === "contenido") return <ContenidoTab />
        if (tabId === "tokens")    return <TokensTab />
        if (tabId === "beta")      return <BetaTab />
        return null
      }}
    />
  )
}
