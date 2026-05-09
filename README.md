# Node JS Task

Backend API project built using Node.js, Express.js, MySQL, Sequelize ORM, JWT Authentication, Joi Validation, Multer File Upload, and PDF Generation.

---

# Features

## Admin Side

- Admin Login
- Create Seller
- Seller Listing with Pagination

## Seller Side

- Seller Login
- Add Product
- Multiple Brands Support
- Multiple Image Upload
- Product Listing with Pagination
- Product PDF View
- Delete Own Product

---

# Technologies Used

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT Authentication
- Joi Validation
- Multer
- PDFKit

---

# Project Setup

## Clone Repository

```bash
git clone YOUR_GITHUB_REPO_LINK
```

---

## Install Dependencies

```bash
npm install
```

---

## Create .env File

```env
PORT=

DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=

JWT_SECRET=
```

---

## Run Project

```bash
npm start
```

---

# Default Admin Credentials

```txt
Email: admin@gmail.com
Password: Admin@123
```

---

# API Endpoints

## Auth APIs

### Admin/Seller Login

```http
POST /api/auth/login
```

---

## User APIs

### Create Seller

```http
POST /api/users/create-seller
```

### Seller Listing

```http
GET /api/users/sellers?page=1&limit=10
```

---

## Product APIs

### Add Product

```http
POST /api/products/add
```

### Product Listing

```http
GET /api/products/list?page=1&limit=10
```

### View Product PDF

```http
GET /api/products/pdf/:id
```

### Delete Product

```http
DELETE /api/products/delete/:id
```

---

# Authentication

Use Bearer Token:

```txt
Authorization: Bearer YOUR_TOKEN
```

---

# Folder Structure

```txt
src/
├── config/
├── constants/
├── controllers/
├── helpers/
├── middlewares/
├── models/
├── routes/
├── seeders/
├── uploads/
├── utils/
├── validations/
```

---

# Developed By

Sourabh Porwal
