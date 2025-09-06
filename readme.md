# 📚 LMS Backend

Backend untuk **Learning Management System (LMS)** menggunakan:

- **Express.js** (REST API)
- **Prisma ORM** (PostgreSQL)
- **JWT + Refresh Token** (Authentication)
- **Joi** (Validation)
- **TypeScript** (Type safety)

---

## 🚀 Features

- **Auth**
  - Register
  - Login (JWT Access & Refresh Token)
  - Refresh Access Token
  - Logout
- **Users**
  - User management (student, instructor, admin)
- **Categories**
  - CRUD kategori modul
- **Contents**
  - CRUD konten
  - Pagination + search
  - Relasi ke kategori & pemateri
- **Validation**
  - Input body dengan Joi
- **Middleware**
  - Authentication & Authorization

---

## 📦 Tech Stack

- Node.js + Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT (Access + Refresh)
- Joi
- bcryptjs

---

## 📂 Project Structure

src/
├── controllers/
│ ├── auth.controllers.ts
│ ├── category.controllers.ts
│ └── content.controllers.ts
├── middlewares/
│ └── auth.middleware.ts
├── routes/
│ ├── auth.routes.ts
│ ├── category.routes.ts
│ └── content.routes.ts
├── utils/
│ ├── prisma.ts
│ └── validate.ts
├── validator/
│ ├── auth.validator.ts
│ ├── categories.validator.ts
│ └── contents.validator.ts
├── prisma/
│ ├── schema.prisma
│ └── migrations/
├── server.ts
└── app.ts

---

## ⚙️ Setup & Installation

### 1. Clone Repository

```bash
git clone https://github.com/muhammadsandi07/lms-adhivasindo-backend.git
cd lms-backend
```

npm install

# Database

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/lms_db?schema=public"

# JWT

JWT_SECRET="your_jwt_secret"
JWT_REFRESH_SECRET="your_jwt_refresh_secret"

# Server

PORT=5000

Jalankan migration:

```bash
npx prisma migrate dev --name init
```

Generate Prisma Client:

```bash
npx prisma generate

```

Jalankan Seed Optional:

```bash
npx ts-node prisma/seed.ts
```

# Run Project

## Development

```bash
npm run dev
```

## Production

```bash
npm run build
npm start
``





```
