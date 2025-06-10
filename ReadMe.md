📄 README.md
markdown

# 🐾 ClinicVeterinary

Aplicación web para la gestión de pacientes en una clínica veterinaria. Permite registrar, editar, eliminar y visualizar información de pacientes, así como autenticarse mediante JWT y exportar/importar datos en formato Excel.

---

## 🔧 Tecnologías utilizadas

### Backend (Spring Boot)

- Java 17
- Spring Boot 3.x
- Spring Security (JWT)
- Spring Data JPA
- MySQL / PostgreSQL / H2
- Apache POI (para manejo de Excel)

### Frontend (React)

- React 18+
- TypeScript
- React Router
- Axios
- Context API (para manejo de sesión)

---

## 📦 Funcionalidades

### Backend

- Autenticación con JWT (`/api/auth`)
- CRUD completo de pacientes (`/api/pacientes`)
- Exportación e importación de pacientes en Excel
- Protección de endpoints con roles y JWT
- Base de datos pre-cargada para pruebas

### Frontend

- Login con persistencia de sesión JWT
- Rutas protegidas (ProtectedRoute)
- Tabla de pacientes con filtros y acciones (editar/eliminar)
- Formulario dinámico para agregar o editar pacientes
- Botones para exportar e importar pacientes

---

## 🚀 Cómo ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/Codiker/ClinicVeterinary.git
cd ClinicVeterinary


2. Backend
cd backend
./mvnw spring-boot:run
Variables configurables en application.properties:

properties

spring.datasource.url=jdbc:mysql://localhost:3306/clinicadb
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
jwt.secret=clave_secreta


3. Frontend

cd frontend
npm install
npm run dev
✅ Usuario de prueba
