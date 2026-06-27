# OPS Console — Premium Admin Dashboard Component

Un panel de operaciones de alta calidad para SaaS, herramientas internas y startups. Diseño oscuro editorial con animaciones Framer Motion, signal lines SVG animadas y arquitectura 100% personalizable por props.

Extraído y generalizado del panel de operaciones interno de [CVitae](https://cvitae.lat) — donde se usa exclusivamente en el área de administración privada. Este componente es la versión reutilizable y desacoplada de ese diseño, lista para cualquier producto.

---

## Vista previa

- Login screen con autenticación por contraseña y animación de entrada
- Sidebar fijo con indicador de estado en tiempo real
- Signal lines SVG animadas en el fondo del área principal
- Métricas en grid con números tipografía monospace
- Panel de señales (alertas / estados del sistema)
- Transiciones entre tabs con Framer Motion spring

---

## Requisitos previos

```bash
npm install framer-motion clsx tailwind-merge
```

Asegurate de tener **Tailwind CSS v3 o v4** configurado en tu proyecto.

Para la fuente monospace de los números, agregá esto en tu `layout.tsx` o `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Playfair+Display:wght@900&display=swap" rel="stylesheet" />
```

---

## Instalación

1. Copiá la carpeta completa `ops-console/` dentro de tu proyecto:
   ```
   src/
   └── components/
       └── ops-console/
           ├── ops-console.tsx   ← componente principal
           └── utils.ts          ← función cn()
   ```

2. Si ya tenés una función `cn` en tu proyecto (ej: `lib/utils.ts`), podés eliminar `utils.ts` y actualizar el import en `ops-console.tsx`.

---

## Función utilitaria `cn`

Si no la tenés en tu proyecto, el archivo `utils.ts` ya la incluye:

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Uso básico

```tsx
import { OpsConsole } from "@/components/ops-console/ops-console"

export default function AdminPage() {
  return (
    <OpsConsole
      password="mi-password-secreto"
      appName="MI PRODUCTO"
      appSubtitle="PANEL DE OPERACIONES"
    />
  )
}
```

---

## Uso avanzado — con tabs personalizadas y datos reales

```tsx
import { OpsConsole, OpsNavItem, OpsMetric, OpsSignal } from "@/components/ops-console/ops-console"

const NAV: OpsNavItem[] = [
  { id: "brief",    label: "Brief",     dotColor: "bg-emerald-400", badge: null },
  { id: "usuarios", label: "Usuarios",  dotColor: "bg-yellow-400",  badge: "248" },
  { id: "ventas",   label: "Ventas",    dotColor: "bg-white/30",    badge: null },
  { id: "soporte",  label: "Soporte",   dotColor: "bg-red-400",     badge: "3"  },
]

const METRICS: OpsMetric[] = [
  { label: "USUARIOS",    value: 248,    sub: "registrados" },
  { label: "MRR",         value: "$840", sub: "este mes" },
  { label: "TICKETS",     value: 3,      sub: "pendientes" },
  { label: "UPTIME",      value: "99.9%", sub: "últimos 30d" },
]

const SIGNALS: OpsSignal[] = [
  { color: "gold",  message: "12 usuarios inactivos hace más de 7 días" },
  { color: "green", message: "Todos los servicios operativos" },
]

function UsuariosTab() {
  return (
    <div>
      <h2 className="text-xl text-white mb-4">Usuarios</h2>
      {/* Tu tabla de usuarios aquí */}
    </div>
  )
}

export default function AdminPage() {
  return (
    <OpsConsole
      password={process.env.ADMIN_PASSWORD}
      appName="ACME OPS"
      appSubtitle="INTERNAL TOOLS"
      navItems={NAV}
      metrics={METRICS}
      signals={SIGNALS}
      renderTab={(tabId) => {
        if (tabId === "usuarios") return <UsuariosTab />
        if (tabId === "ventas")   return <div>Ventas content...</div>
        if (tabId === "soporte")  return <div>Soporte content...</div>
        return null // Brief tab se renderiza automáticamente
      }}
    />
  )
}
```

---

## Props disponibles

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `appName` | `string` | `"OPS CONSOLE"` | Nombre del producto en el sidebar |
| `appSubtitle` | `string` | `"SISTEMA DE OPERACIONES"` | Subtítulo bajo el nombre |
| `password` | `string \| undefined` | `undefined` | Si se define, habilita login screen. Sin password, acceso directo. |
| `metrics` | `OpsMetric[]` | Mock data | Cards de métricas en el Brief tab |
| `navItems` | `OpsNavItem[]` | 4 tabs demo | Items del sidebar con dot, label y badge opcional |
| `signals` | `OpsSignal[]` | Mock data | Panel de alertas/estados del sistema |
| `renderTab` | `(tabId: string) => ReactNode` | `undefined` | Función para renderizar el contenido de cada tab. Si no se pasa, muestra placeholder. |
| `className` | `string` | `""` | Clase adicional en el wrapper raíz |

---

## Integración personalizada

Este componente incluye datos de demostración (mock data). Si necesitás:

- Conexión a **Supabase**, **PostgreSQL** o tu propia API
- Autenticación real con roles y permisos
- Acciones de escritura (actualizar registros, cambiar estados, etc.)
- Deploy en **Netlify Functions**, **Vercel Edge** o servidor propio

→ Escribí a **contacto@cvitae.lat** con el asunto "OPS Console — Integración personalizada" y te cotizamos.

---

## Licencia

Al adquirir este componente obtenés una **licencia personal y comercial** para usarlo en tus propios proyectos, incluyendo productos de pago.

**Prohibido:**
- Redistribuir o revender este componente como template propio
- Incluirlo en packs de UI sin autorización escrita

**Permitido:**
- Usarlo en proyectos propios, clientes y productos SaaS
- Modificarlo libremente para adaptarlo a tu diseño
- Usarlo en proyectos open source propios

© CVitae — cvitae.lat
