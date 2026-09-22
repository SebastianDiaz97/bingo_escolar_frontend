# 🎟️ Bingo Escolar — Frontend

Aplicación web para la **gestión financiera de bingos escolares**, desarrollada como SPA con React y TypeScript.

Permite administrar bingos, cursos, usuarios y roles, registrar ingresos y gastos, y consultar un dashboard financiero con balances, categorías y progreso de las metas por curso.

El frontend consume una API REST desarrollada específicamente para este proyecto.

## ✨ Funcionalidades

### 🔐 Autenticación

* Registro e inicio de sesión.
* Formularios con validación mediante `react-hook-form`.
* Autenticación mediante JWT.
* Token almacenado en `localStorage`.
* Envío automático del token mediante interceptor de Axios.
* Protección de las rutas de administración.

### 🎟️ Gestión de bingos

Los usuarios con permisos de administración pueden:

* Crear bingos.
* Editar información del bingo.
* Activar o cerrar un bingo.
* Consultar los usuarios asociados.
* Asignar usuarios a un bingo.
* Administrar los roles de los usuarios.

La aplicación permite seleccionar un **bingo activo** y utilizarlo como contexto para las distintas secciones del sistema.

### 👥 Usuarios y roles

El sistema contempla distintos niveles de acceso:

* `admin`
* `organizador`
* `viewer`

Los menús disponibles se adaptan según el rol del usuario dentro del bingo seleccionado.

### 📚 Gestión de cursos

Los usuarios con permisos correspondientes pueden:

* Crear cursos.
* Renombrar cursos.
* Eliminar cursos.

La edición del nombre se realiza directamente desde la interfaz.

### 💰 Ingresos y gastos

Cada bingo permite registrar y administrar sus movimientos financieros.

#### Ingresos

* Categoría.
* Monto.
* Fecha.
* Método de pago.
* Curso asociado cuando corresponde.

#### Gastos

* Categoría.
* Monto.
* Fecha.
* Estado del gasto.

Ambos tipos de movimiento cuentan con operaciones para:

* Crear.
* Editar.
* Eliminar.
* Visualizar información detallada.

### 📊 Dashboard financiero

Cada bingo cuenta con un dashboard que muestra:

* Total de ingresos.
* Total de gastos.
* Balance.
* Gastos pendientes.
* Ingresos por categoría.
* Gastos por categoría.
* Progreso de cada curso respecto de su meta.
* Información resumida del bingo.

También permite mostrar u ocultar cursos adicionales y copiar un enlace para compartir el dashboard.

### 🌐 Dashboard público

Existe una vista pública independiente del panel administrativo:

```text
/dashboard/:bingoId
```

Esta vista permite compartir la información financiera del bingo mediante un enlace, sin utilizar el layout de administración.

Si el bingo no existe, la aplicación redirige a una página de error.

### 🔔 Experiencia de usuario

* Notificaciones mediante `sonner`.
* Estados de carga en botones.
* Estados vacíos.
* Mensajes de error.
* Diseño responsive.
* Sidebar adaptable.
* Grillas y tarjetas para visualizar la información.

---

## 🛠️ Tecnologías

| Tecnología           | Uso                           |
| -------------------- | ----------------------------- |
| React 19             | Construcción de la interfaz   |
| TypeScript           | Tipado estático               |
| Vite                 | Desarrollo y build            |
| Tailwind CSS         | Estilos y diseño responsive   |
| React Router         | Enrutamiento                  |
| TanStack React Query | Gestión de datos del servidor |
| Axios                | Comunicación con la API REST  |
| React Hook Form      | Formularios y validaciones    |
| Zustand              | —                             |
| Sonner               | Notificaciones                |
| ESLint               | Calidad de código             |

> El proyecto utiliza React Compiler mediante la configuración de Vite.

---

## 🏗️ Arquitectura

El frontend está organizado separando la comunicación con la API, la gestión de datos, las vistas y los componentes reutilizables.

```text
React Application
│
├── Views
│   ├── Login
│   ├── Register
│   ├── Bingos
│   ├── Cursos
│   ├── Usuarios
│   ├── Ingresos
│   ├── Gastos
│   └── Dashboard
│
├── API
│   ├── Auth
│   ├── Bingos
│   ├── Cursos
│   ├── Usuarios
│   ├── Ingresos
│   ├── Gastos
│   └── Dashboard
│
├── React Query
│   ├── Queries
│   └── Mutations
│
└── Backend REST API
```

La comunicación con el backend se centraliza mediante Axios y los datos obtenidos del servidor son administrados mediante TanStack React Query.

Las mutaciones invalidan las consultas relacionadas para mantener actualizada la información mostrada en la interfaz.

---

## 📁 Estructura del proyecto

```text
src/
├── api/
│   ├── authApi.ts
│   ├── bingoApi.ts
│   ├── cursoApi.ts
│   ├── dashboardApi.ts
│   ├── incomeApi.ts
│   ├── expenseApi.ts
│   └── userApi.ts
│
├── config/
│   ├── axios.ts
│   └── menus.ts
│
├── hooks/
│   ├── useBingos.ts
│   ├── useCursos.ts
│   ├── useDashboard.ts
│   ├── useExpense.ts
│   ├── useIncome.ts
│   └── useUsers.ts
│
├── layout/
│   ├── AppLayout.tsx
│   └── AuthLayout.tsx
│
├── views/
│   ├── LoginView.tsx
│   ├── RegisterView.tsx
│   ├── Bingos.tsx
│   ├── Cursos.tsx
│   ├── Users.tsx
│   ├── Ingresos.tsx
│   ├── Gastos.tsx
│   ├── Dashboard.tsx
│   ├── DashboardViewAll.tsx
│   └── NotFoundView.tsx
│
├── components/
├── types/
├── utils/
├── router.tsx
├── main.tsx
└── index.css
```

---

## 🧭 Rutas principales

| Ruta                        | Descripción              |
| --------------------------- | ------------------------ |
| `/`                         | Redirección al panel     |
| `/auth/login`               | Inicio de sesión         |
| `/auth/register`            | Registro                 |
| `/admin/bingos`             | Administración de bingos |
| `/admin/cursos`             | Administración de cursos |
| `/admin/:bingoId/dashboard` | Dashboard financiero     |
| `/admin/:bingoId/cursos`    | Cursos del bingo         |
| `/admin/:bingoId/usuarios`  | Usuarios del bingo       |
| `/admin/:bingoId/ingresos`  | Ingresos                 |
| `/admin/:bingoId/gastos`    | Gastos                   |
| `/dashboard/:bingoId`       | Dashboard público        |
| `/404`                      | Bingo no encontrado      |

---

## 🔗 Integración con el Backend

Este repositorio consume el backend REST de **Bingo Escolar**.

Repositorio:

**`bingo_escolar_backend`**

La API utiliza el prefijo:

```text
/api
```

Ejemplos de operaciones utilizadas por el frontend:

```text
POST /api/auth/login
POST /api/auth/create-account

GET  /api/bingo
POST /api/bingo

GET  /api/dashboard/:bingoId

GET  /api/bingo/:bingoId/income
POST /api/bingo/:bingoId/income

GET  /api/bingo/:bingoId/expense
POST /api/bingo/:bingoId/expense
```

---

## ⚙️ Requisitos

* Node.js
* npm
* Backend de Bingo Escolar ejecutándose y accesible

---

## 🔧 Configuración

Crear un archivo `.env` en la raíz:

```env
VITE_API_URL=http://localhost:4000
```

| Variable       | Descripción          |
| -------------- | -------------------- |
| `VITE_API_URL` | URL base del backend |

---

## 🚀 Instalación

Clonar el repositorio:

```bash
git clone https://github.com/SebastianDiaz97/bingo_escolar_frontend.git
cd bingo_escolar_frontend
```

Instalar dependencias:

```bash
npm install
```

Configurar las variables de entorno y ejecutar:

```bash
npm run dev
```

---

## 📜 Scripts

| Comando           | Descripción                                 |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo                      |
| `npm run build`   | Verificación de tipos y build de producción |
| `npm run lint`    | Ejecuta ESLint                              |
| `npm run preview` | Previsualiza el build de producción         |

---

## 🔗 Proyecto relacionado

Este repositorio corresponde al **frontend** de Bingo Escolar.

El sistema utiliza un backend independiente desarrollado con Node.js, Express y TypeScript.

**Backend:** `bingo_escolar_backend`

---

## 👨‍💻 Autor

**Sebastián Díaz**
Ingeniero Civil en Informática
