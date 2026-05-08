## ManzaLife🚀 Equipo 5️⃣
Plataforma web turistica para enfocada en mostrar los mejores lugares, experiencias y actividades de Manzanillo 

## 📖 Descripción del Proyecto
Manzalife es una plataforma web desarrollada para turistas y residentes a descubrir los mejores lugares de Manzanillo.
El sistema permite explorar:
- 🌴Playas y zonas turisticas.
- 🍽️Restaurantes y gastronomia.
- 🏨Hospedajes.
- 📍Lugares emblematicos.
- 📰Blogs y recomendaciones.
- 📁Itinerarios turísticos
El proyecto está construido utilizando una arquitectura moderna con:
- Frontend: React + Tailwind CSS + Vite
- Backend: Django + Django REST Framework
- Base de Datos: PostgreSQL + Supabase

## 📸 Vista Previa
🏠 Página Principal
<img width="1582" height="765" alt="Captura de pantalla 2026-03-06 105606" src="https://github.com/user-attachments/assets/35c67902-7719-4302-b253-94bab04a3956" />

🔐 Pantalla de Inicio de Sesión
<img width="1547" height="813" alt="Captura de pantalla 2026-05-08 073215" src="https://github.com/user-attachments/assets/2c89ca37-1334-4a06-b16b-1f2102e30fef" />
<img width="1540" height="761" alt="Opera Captura de pantalla_2026-05-08_073141_localhost" src="https://github.com/user-attachments/assets/d1561f2a-784d-43da-b5ca-9356a2d3e192" />

📰 Pantalla Blog
<img width="1574" height="757" alt="image" src="https://github.com/user-attachments/assets/6bdd282f-e0cf-49fa-aa41-aa19638595d8" />
<img width="1532" height="766" alt="image" src="https://github.com/user-attachments/assets/4c2dc3ec-022f-41bc-8ed3-9677e80341cd" />


![Python 3.12+](https://img.shields.io/badge/Python-3.13%2B-blue?style=for-the-badge&logo=python)
![Hecho con Django](https://img.shields.io/badge/Hecho%20con-Django-purple?style=for-the-badge&logo=Django)
![Hecho con React](https://img.shields.io/badge/Hecho%20con-React-orange?style=for-the-badge&logo=React)
![Hecho con Tailwind](https://img.shields.io/badge/Hecho%20con-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Status](https://img.shields.io/badge/Estado-En%20Curso-yellow?style=for-the-badge)

---

## 📋 Tabla de Contenidos
- [Vista Previa📷](#-vista-previa)
- [Características Principales🧾](#-características-principales)
- [Tecnologías Utilizadas💻](#-tecnologías-utilizadas)
- [Instalación🛠](#-instalación)
- [Uso⚙️](#-uso)
- [Estructura del Proyecto📁](#-estructura-del-proyecto)

## ✨ Características Principales
📰 Blog Turístico
- Publicación de artículos.
- Categorías dinámicas.
- Slugs automáticos.
- Comentarios anidados.
- Imágenes para publicaciones.

🗺️ Turismo
- Exploración de lugares turísticos.
- Información detallada de sitios.
- Organización por categorías.
- Experiencia responsive para móviles.
  
⚙ Panel Administrativo
- Administración de publicaciones.
- Gestión de usuarios.
- Moderación de comentarios.
- Administración de categorías.

## 🛠 Tecnologías Utilizadas
- *Lenguaje:* [HTML5, Javascript, CSS, Python]![Python 3.12+].   <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"><img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"><img src="https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"><img src="https://img.shields.io/badge/python%203.12+-%233776AB.svg?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.12+">
- *Framework/Librería:* [React, Django, Tailwind]![Hecho con Django].   <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React"><img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"><img src="https://img.shields.io/badge/django-%23092e20.svg?style=for-the-badge&logo=django&logoColor=white" alt="Django">
- *Base de Datos:* [PostgresSQL, Supabase].   <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"><img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
- *Herramientas:* [Git].   <img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white" alt="Git">

## 💻 Uso

1.Explorar: Navega por la página de inicio para ver los lugares destacados del día.

2.Filtrar: Utiliza las categorías para encontrar específicamente "Playas" o "Gastronomía".

3.Leer: Entra al blog para conocer la historia detrás de lugares como "El Faro" o "La Boquita".

4.Admin: Accede a /admin para gestionar el contenido (solo personal autorizado).

## 📁 Estructura del Proyecto
ManzaLife/
│

├── backend/

│   ├── api/

│   │   ├── migrations/

│   │   ├── models.py

│   │   ├── serializers.py

│   │   ├── views.py

│   │   ├── urls.py

│   │   └── permissions.py

│   │

│   ├── config/

│   │   ├── settings.py

│   │   ├── urls.py

│   │   └── wsgi.py

│   │

│   ├── manage.py

│   └── requirements.txt

│

├── frontend/

│   ├── public/

│   ├── src/

│   │   ├── components/

│   │   ├── pages/

│   │   ├── hooks/

│   │   ├── services/

│   │   └── assets/

│   │

│   ├── package.json

│   └── vite.config.js

│

├── docs/

└── README.md

## 🚀 Instalación
1️⃣ Clonar el repositorio
- git clone https://github.com/Gasdcoder07/Proyecto-semestre-2-PI.git.
- cd Proyecto-semestre-2-PI.

⚙ Configuración del Backend

2️⃣ Entrar a la carpeta backend
- cd backend.

3️⃣ Crear entorno virtual
- Windows.
- python -m venv venv.
- venv\Scripts\activate.
- Linux / Mac.
- python3 -m venv venv.
- source venv/bin/activate.
  
4️⃣ Instalar dependencias
- pip install -r requirements.txt.

5️⃣ Ejecutar migraciones
python manage.py migrate.

6️⃣ Iniciar servidor Django
- python manage.py runserver.
- Servidor disponible en: http://127.0.0.1:8000/.

🎨 Configuración del Frontend

7️⃣ Abrir otra terminal y entrar al frontend
- cd frontend.
  
8️⃣ Instalar dependencias
- npm install.
  
9️⃣ Ejecutar proyecto React
- npm run dev.
- http://localhost:5173/.

## 📡 API REST

Método	      |      Endpoint	        |  Descripción
________________________________________________________________
GET	          |     /api/posts/	      |  Obtener publicaciones
  
POST	        |     /api/posts/	      |  Crear publicación
  
GET	          |  /api/categories/	    |  Obtener categorías
  
POST	        |    /api/login/	      |  Iniciar sesión
  
POST	        |   /api/register/	    |  Registrar usuario
  
GET	          |    /api/comments/     |  Obtener comentarios 


## 📌 Funcionalidades Implementadas
- ✅ Sistema de autenticación.
- ✅ API REST.
- ✅ Gestión de publicaciones.
- ✅ Categorías dinámicas.
- ✅ Comentarios anidados.
- ✅ Diseño responsive.
- ✅ Panel administrativo Django.
- ✅ Integración con Supabase.
- ✅ Sistema de reseñas.
- ✅ Gestión de perfiles.

## 🔮 Funcionalidades Futuras
- 🌐 Integración con Google Maps.
- 📍 Geolocalización de lugares.
- ❤️ Sistema de favoritos.
- 📱 Aplicación móvil.
      
            
⭐ Apoya el Proyecto
Si te gustó el proyecto puedes:
⭐ Darle una estrella al repositorio
🍴 Hacer un fork
🛠 Contribuir al desarrollo
📢 Compartirlo

*Hecho con corazón ❤️ en Manzanillo, Colima.*

## 📬 Contacto
- *Desarrolladores:*
- NOMBRE: Diaz Hernandez Axl Enrique😄                    -EMAIL: adiaz106@ucol.mx📲
- NOMBRE: Martinez Contreras Manuel Isahit😄              -EMAIL: mmartinez134@ucol.mx📲
- NOMBRE: Sebastian Silvestre Brian😄                     -EMAIL: bsebastian0@ucol.mx📲
- NOMBRE: Serna Diaz Greco Alejandro😄                    -EMAIL: gserna@ucol.mx📲
- NOMBRE: Vaca Cipres Valentin😄                          -EMAIL: vvaca2@ucol.mx📲


Desarrollado con mucho cariño para resaltar la belleza de Manzanillo. 🌊🌴

A domir ggs nos fuimos💤


