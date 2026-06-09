# FRENOMAX — React + Vite + NestJS

Migración del proyecto original (Vue 3 + Express) a **React + Vite** (frontend) y **NestJS + TypeORM** (backend).

---

## Estructura

```
proyecto_react_nest/
├── backend/          ← NestJS API
│   └── src/
│       ├── main.ts
│       ├── app.module.ts
│       └── taller/
│           ├── taller.entity.ts
│           ├── taller.dto.ts
│           ├── taller.service.ts
│           ├── taller.controller.ts
│           └── taller.module.ts
└── frontend/         ← React + Vite
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── api/tallerApi.js
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Agregar.jsx
        │   ├── Listado.jsx
        │   └── AgenteIA.jsx       ← ✨ Nuevo: Agente Inteligente
        └── pages/
            ├── Inicio.jsx
            ├── Login.jsx          ← Actualizado: verifica hash SHA-256
            ├── Register.jsx       ← Actualizado: fortaleza + encriptación
            └── Perfil.jsx
```

---

## Base de datos

Misma base MySQL del proyecto original: `proyecto_cliente`, tabla `taller`.

NestJS usa TypeORM con `synchronize: true` (crea/ajusta la tabla automáticamente en desarrollo).

---

## Nuevas Funcionalidades (v4)

### 1. Validación de fortaleza de contraseña (Register.jsx)

Al momento de crear una nueva cuenta, el campo de contraseña muestra en tiempo real un indicador visual con tres niveles:

| Nivel       | Color     | Criterios                                                     |
|-------------|-----------|---------------------------------------------------------------|
| **Débil**   | 🔴 Rojo   | < 3 criterios cumplidos. **Bloquea el registro.**             |
| **Intermedia** | 🟠 Naranja | 3–4 criterios (longitud, mayúscula, minúscula, número)    |
| **Fuerte**  | 🟢 Verde  | 5–6 criterios (incluye símbolo especial y longitud ≥ 12)      |

Criterios evaluados:
- Longitud ≥ 8 caracteres (+1 punto)
- Longitud ≥ 12 caracteres (+1 punto adicional)
- Al menos una letra mayúscula
- Al menos una letra minúscula
- Al menos un número
- Al menos un símbolo especial (`!@#$%...`)

### 2. Contraseña encriptada (SHA-256)

La contraseña **nunca se guarda en texto plano**. Se usa `crypto.subtle.digest('SHA-256', ...)` de la **Web Crypto API** nativa del navegador — sin dependencias externas.

```
Registro → hashPassword(password) → guarda passwordHash en localStorage
Login    → hashPassword(input)    → compara con passwordHash almacenado
```

> El Login es retrocompatible: si existe una cuenta antigua con `password` en texto plano, también la acepta durante la transición.

### 3. Agente Inteligente — FrenoBot (AgenteIA.jsx)

Chatbot flotante (botón 🤖 en esquina inferior derecha) disponible en el Panel de Administración y en la página de Inicio.

- Conectado a la **API de Claude** (claude-sonnet-4-20250514)
- Rol configurado como asistente del taller FRENOMAX
- Responde preguntas sobre servicios, mecánica básica y uso del sistema
- Historial de conversación por sesión
- Indicador visual de "escribiendo..."

---

## Backend (NestJS)

```bash
cd backend
npm install
npm run start:dev
# Servidor en http://localhost:3000
```

### Endpoints disponibles

| Método | Ruta              | Descripción          |
|--------|-------------------|----------------------|
| GET    | /api/taller       | Listar todos          |
| GET    | /api/taller/:id   | Obtener uno           |
| POST   | /api/taller       | Crear nuevo           |
| PUT    | /api/taller/:id   | Actualizar            |
| DELETE | /api/taller/:id   | Eliminar              |

---

## Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
# App en http://localhost:5173
```

Vite proxea `/api` → `http://localhost:3000` automáticamente (ver `vite.config.js`).

---

## Cambios respecto a v3

| Aspecto            | v3                              | v4                                      |
|--------------------|---------------------------------|-----------------------------------------|
| Registro           | Contraseña en texto plano       | Hash SHA-256 (Web Crypto API)           |
| Validación pass    | Ninguna                         | Indicador débil/intermedia/fuerte       |
| Bloqueo registro   | No                              | Sí — bloquea si contraseña es débil     |
| Login              | Comparación directa             | Comparación con hash (retrocompatible)  |
| Agente IA          | No incluido                     | FrenoBot — chatbot Claude flotante      |

---

## Cambios respecto al original Vue/Express

| Aspecto       | Original               | Nuevo                    |
|---------------|------------------------|--------------------------  |
| Frontend      | Vue 3 + Element Plus   | React + Vite (puro CSS)  |
| Backend       | Express.js             | NestJS + TypeORM          |
| UI components | Element Plus           | Componentes propios       |
| Toasts        | vue-toastification     | react-hot-toast           |
| Validaciones  | Misma lógica regex     | Misma lógica regex        |
