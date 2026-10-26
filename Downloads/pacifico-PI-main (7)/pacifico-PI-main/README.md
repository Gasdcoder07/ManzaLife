<div align="center">

# 🌊 Pacífico POS

**Sistema web de punto de venta para administrar ventas, inventario, usuarios y sucursales.**

`Equipo 5️⃣` 

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E?logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-DB-4169E1?logo=postgresql&logoColor=white)

</div>

---

## 📑 Contenido

- [Vista previa](#-vista-previa)
- [Descripción](#-descripción)
- [Funciones del sistema](#-funciones-del-sistema)
- [Roles de usuario](#-roles-de-usuario)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Variables de entorno](#-variables-de-entorno)
- [Ejecución](#-ejecución)
- [Documentación de la API](#-documentación-de-la-api)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Próximas mejoras](#-próximas-mejoras)
- [Equipo de trabajo](#-equipo-de-trabajo)
- [Licencia y uso](#-licencia-y-uso)

---

## 📷 Vista previa
#Login
<img width="1600" height="1146" alt="WhatsApp Image 2026-09-28 at 7 45 22 PM" src="https://github.com/user-attachments/assets/5df01788-e316-4e05-99ce-9b9fecd38b9a" />

#Register
<img width="1600" height="1145" alt="WhatsApp Image 2026-09-28 at 7 45 22 PM (1)" src="https://github.com/user-attachments/assets/a8f3ee2b-ab0f-4e92-89be-113509ddc74f" />

#Punto De Venta
<img width="1600" height="992" alt="WhatsApp Image 2026-09-28 at 7 45 22 PM (2)" src="https://github.com/user-attachments/assets/27478e0c-3ba8-43ac-a2b9-80fe940bc616" />

#Ventas
<img width="1600" height="991" alt="WhatsApp Image 2026-09-28 at 7 45 22 PM (3)" src="https://github.com/user-attachments/assets/0ba099ee-a8f1-40e0-9f8d-0481b543f2c7" />

#Inventario
<img width="1600" height="993" alt="WhatsApp Image 2026-09-28 at 7 45 22 PM (4)" src="https://github.com/user-attachments/assets/0665a27a-3c04-4dbc-8e27-d933610e2e87" />

#Ganancias
<img width="1600" height="995" alt="WhatsApp Image 2026-09-28 at 7 45 22 PM (5)" src="https://github.com/user-attachments/assets/42278c61-d8ad-49e7-85be-ec85c8ddc9d0" />






---

## 📖 Descripción

**Pacífico POS** es un sistema de punto de venta pensado para mejorar la organización y el control de un negocio que vende productos.

Reúne en un solo lugar los procesos más importantes: ventas, productos, inventario, usuarios y sucursales, para consultar la información con claridad y facilitar el trabajo diario del personal.

La interfaz es moderna y adaptable, por lo que puede usarse desde computadora, tableta o teléfono.

---

## ✨ Funciones del sistema

| Módulo | Función | Estado |
|:---|:---|:---:|
| 🔐 Autenticación | Inicio de sesión y registro con Supabase Auth. Rutas privadas protegidas por sesión. | 🟡 En proceso |
| 👤 Usuarios | Listado, edición y baja de usuarios, con roles y sucursal asignada. | 🟡 En proceso |
| 🛒 Punto de venta | Catálogo de productos con búsqueda y carrito de compra. Métodos de pago: efectivo, tarjeta y transferencia. | 🟡 En proceso |
| 💰 Ventas | Consulta y control de las ventas realizadas. | 🟡 En proceso |
| 📦 Inventario | Consulta de productos y existencias por sucursal. | 🟡 En proceso |
| 📊 Panel principal | Métricas y gráficas de ventas (por ahora con datos de ejemplo). | 🟡 En proceso |
| 🏪 Sucursales | Consulta y organización de la información por establecimiento. | 🟡 En proceso |
| 📖 Documentación API | Documentación interactiva con Swagger UI. | 🟢 Disponible |
| 📱 Diseño adaptable | Interfaz responsiva para computadora, tableta y teléfono. | 🟢 Disponible |

---

## 👥 Roles de usuario

| ID | Rol | Alcance |
|:---:|:---|:---|
| 1 | **Administrador** | Acceso completo; gestiona usuarios de todas las sucursales. |
| 2 | **Gerente** | Gestiona a los cajeros de su propia sucursal. |
| 3 | **Cajero** | Acceso únicamente al punto de venta (`/sell`). |

---

## 🛠️ Tecnologías

| | Tecnología | Uso |
|:---:|:---|:---|
| <img src="https://cdn.simpleicons.org/nextdotjs/000000" width="24" height="24" alt="Next.js"/> | [Next.js 16] | Páginas, rutas y servicios (API Routes) del sistema. |
| <img src="https://cdn.simpleicons.org/react/61DAFB" width="24" height="24" alt="React"/> | [React 19] | Interfaz y componentes. |
| <img src="https://cdn.simpleicons.org/typescript/3178C6" width="24" height="24" alt="TypeScript"/> | [TypeScript] | Organización y validación del código. |
| <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" width="24" height="24" alt="Tailwind CSS"/> | [Tailwind CSS 4] | Diseño visual y adaptación a diferentes pantallas. |
| <img src="https://cdn.simpleicons.org/supabase/3ECF8E" width="24" height="24" alt="Supabase"/> | [Supabase] | Autenticación de usuarios. |
| <img src="https://cdn.simpleicons.org/postgresql/4169E1" width="24" height="24" alt="PostgreSQL"/> | [PostgreSQL] | Almacenamiento de la información (vía `pg`). |
| <img src="https://cdn.simpleicons.org/framer/0055FF" width="24" height="24" alt="Framer Motion"/> | [Framer Motion] | Animaciones y transiciones. |
| 🐻 | [Zustand] | Estado del carrito de compra. |
| <img src="https://cdn.simpleicons.org/reactquery/FF4154" width="24" height="24" alt="TanStack Query"/> | [TanStack Query] | Manejo de peticiones y caché. |
| 📊 | [Recharts]| Gráficas del panel principal. |
| <img src="https://cdn.simpleicons.org/swagger/85EA2D" width="24" height="24" alt="Swagger UI"/> | [Swagger UI] | Documentación interactiva de la API. |

## 🚀 Instalación

**Requisitos:** [Node.js](https://nodejs.org/) 20 o superior, `npm` y un proyecto de [Supabase](https://supabase.com/) con su base de datos PostgreSQL.

1️⃣ Clona el repositorio:

```bash
git clone URL-DE-TU-REPOSITORIO
```

2️⃣ Entra a la carpeta del proyecto:

```bash
cd pacifico-PI
```

3️⃣ Abre el proyecto en Visual Studio Code:

```bash
code .
```

4️⃣ Instala las dependencias:

```bash
npm install
```

---

## 🔑 Variables de entorno

Crea un archivo llamado `.env.local` en la carpeta principal del proyecto:

```env
DATABASE_URL=tu_cadena_de_conexion_postgresql
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_clave_service_role_de_supabase
```

| Variable | Descripción |
|:---|:---|
| `DATABASE_URL` | Cadena de conexión a PostgreSQL. |
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto de Supabase. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública (anon) de Supabase. |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave de servicio, usada solo en el servidor para crear usuarios. |


---

## ▶️ Ejecución

🟢 Inicia el servidor de desarrollo:

```bash
npm run dev
```

🟡 Después abre en tu navegador: [http://localhost:3000](http://localhost:3000)

🔴 Para detener el servidor, presiona `Ctrl + C` en la terminal.

**Otros comandos útiles**

| Comando | Descripción |
|:---|:---|
| `npm run build` | Genera la versión de producción. |
| `npm run start` | Inicia la versión de producción (requiere `build` previo). |
| `npm run lint` | Revisa el código con ESLint. |

---

## 📚 Documentación de la API

Las rutas protegidas esperan un token de sesión en el encabezado `Authorization: Bearer <token>`.

| Método | Ruta | Descripción |
|:---:|:---|:---|
| `POST` | `/api/auth/login` | Inicia sesión y devuelve la sesión y el perfil del usuario. |
| `POST` | `/api/auth/register/admin` | Registra un administrador. |
| `POST` | `/api/auth/register/manager` | Registra un gerente. |
| `POST` | `/api/auth/register/cashier` | Registra un cajero. |
| `GET` | `/api/usuarios` | Lista usuarios según el rol de quien consulta. |
| `GET` `PUT` `DELETE` | `/api/usuarios/{id}` | Consulta, edita o da de baja a un usuario. |
| `GET` | `/api/sucursales` | Lista las sucursales. |
| `GET` | `/api/sucursales/{id}` | Consulta una sucursal. |
| `GET` | `/api/inventory` | Inventario agrupado por sucursal. |
| `GET` | `/api/inventory/{id}` | Inventario de una sucursal. |
| `GET` | `/api/categorias` | Lista las categorías de productos. |

---

## 📁 Estructura del proyecto

```
pacifico-PI/
├── app/
│   ├── (auth)/          # Inicio de sesión y registro
│   ├── (dashboard)/     # Dashboard, ventas (/sell), inventario, sucursales y usuarios
│   ├── api/             # API Routes: auth, usuarios, sucursales, inventory, categorias, swagger
│   ├── sales/           # Tipos relacionados con ventas (métodos de pago)
│   ├── fonts/           # Tipografía Inter
│   └── page.tsx         # Página principal
├── features/            # Módulos por funcionalidad (componentes, servicios, tipos)
│   ├── auth/
│   ├── branches/
│   ├── dashboard/
│   ├── inventory/
│   ├── sell/            # Catálogo, carrito y store de Zustand
│   └── users/
├── shared/              # Código compartido
│   ├── components/      # Sidebar, Navbar, modales, selects, etc.
│   ├── config/          # Navegación y notificaciones
│   ├── lib/             # Conexiones a Supabase, PostgreSQL, Axios y Swagger
│   ├── types/           # Tipos globales (variables de entorno)
│   └── utils/           # Utilidades y formateadores
├── public/              # Imágenes, logotipos y archivos públicos
├── proxy.ts             # Protección de rutas según sesión y rol
├── package.json         # Dependencias y comandos
└── README.md            # Documentación del proyecto
```

---

## 🧭 Próximas mejoras

- [ ] Completar el proceso de cobro en el punto de venta.
- [ ] Registrar y consultar las ventas.
- [ ] Agregar, editar y eliminar productos.
- [ ] Controlar entradas y salidas del inventario.
- [ ] Conectar el panel principal con datos reales.
- [ ] Generar cortes de caja.
- [ ] Completar la administración de usuarios, roles y permisos.
- [ ] Sincronizar la información entre sucursales.

---

## 👨‍💻 Equipo de trabajo

| Integrante | Contacto |
|:---|:---|
| Valentin Vaca Cipres | vvaca2@ucol.mx |
| Brian Sebastián Silvestre | bsebastian0@ucol.mx |
| Greco Alejandro Serna Diaz | gserna@ucol.mx |
| Nelvin Antonio Frías Rodríguez | nfrias0@ucol.mx |
| Manuel Isahit Martínez Contreras | mmartinez134@ucol.mx |
| Angel Emanuel Arres Naranjo | aarres@ucol.mx |

---

## 📄 Licencia y uso

Este proyecto fue creado con fines académicos y educativos en la Universidad de Colima, Facultad de Ingeniería Electromecánica, carrera de Ingeniería en Software, campus El Naranjo, Manzanillo, Colima.
