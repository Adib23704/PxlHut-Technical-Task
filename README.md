# 🔐 PxlHut Secure Auth & Payment API

A secure REST API for user authentication, role-based access control, and Stripe payment integration using **Express.js**, **MongoDB**, **Passport/JWT**, and **Stripe**. A Technical Test demo project.

---

## 🧰 Tech Stack

- **Express.js** (REST API)
- **MongoDB** with Mongoose
- **JWT** + **Refresh Tokens**
- **Stripe API**
- **Winston** for Logging
- **Swagger** (OpenAPI 3.0 docs)
- **Docker** + Docker Compose

---

## 🚀 Getting Started

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/Adib23704/PxlHut-Technical-Task.git
cd PxlHut-Technical-Task
```

### 2️⃣ Install Dependencies

```bash
yarn install
```

### 3️⃣ Set Up Environment

Create a `.env` file based on the example:

```bash
cp .env.example .env
```

Fill in:

```env
NODE_ENV=development

PORT=3000
BACKEND_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3000

MONGO_URI=mongodb://localhost:27017/auth-api
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=1h

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRE=7d

STRIPE_SECRET_KEY=sk_test_...
```

---

## 🐳 Docker Setup

```bash
docker-compose up --build
```

- API: [http://localhost:3000](http://localhost:3000)
- Swagger: [http://localhost:3000/docs](http://localhost:3000/docs)
- MongoDB: localhost:27017 (container: `mongo`)

---

## 🔐 Auth Endpoints

| Method | Endpoint           | Description       | Auth              |
| ------ | ------------------ | ----------------- | ----------------- |
| POST   | `/auth/register`   | Register new user | ❌                |
| POST   | `/auth/login`      | Login user        | ❌                |
| POST   | `/auth/refresh`    | Refresh JWT token | ❌                |
| GET    | `/auth/me`         | Get current user  | ✅ Bearer         |
| GET    | `/auth/admin-test` | Test admin access | ✅ Bearer + Admin |

---

## 💳 Payment Endpoint

| Method | Endpoint                | Description                      | Auth      |
| ------ | ----------------------- | -------------------------------- | --------- |
| POST   | `/payment/make-payment` | Make a direct Stripe payment     | ✅ Bearer |
| POST   | `/payment/checkout`     | Create a Stripe checkout session | ✅ Bearer |

Use Stripe test card: `pm_card_visa`

---

## 🌐 Live Links

API Endpoint: [http://pxlhut.adib23704.com](http://pxlhut.adib23704.com)

Full docs: [http://pxlhut.adib23704.com/docs](http://pxlhut.adib23704.com/docs)

---

## 📂 Folder Structure

```
src/
├── app.js
├── config
|  ├── db.js
|  ├── stripe.js
|  └── swagger.js
├── docs
|  ├── auth.schemas.js
|  ├── index.js
|  └── payment.schemas.js
├── middlewares
|  ├── auth.middleware.js
|  ├── error.middleware.js
|  ├── logger.middleware.js
|  └── validation.middleware.js
├── modules
|  ├── auth
|  |  ├── auth.controller.js
|  |  └── auth.routes.js
|  ├── payment
|  |  ├── payment.controller.js
|  |  ├── payment.model.js
|  |  └── payment.routes.js
|  └── user
|     └── user.model.js
└── utils
   ├── JwtToken.js
   └── logger.js
```
