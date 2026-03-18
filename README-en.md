# 🚛 TransBras FullStack Platform

![Next.js](https://img.shields.io/badge/Frontend-Next.js-black)
![Spring Boot](https://img.shields.io/badge/Backend-SpringBoot-green)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)
![Docker](https://img.shields.io/badge/DevOps-Docker-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 🌐 Overview

**TransBras** is a modern FullStack web platform designed for a transportation and logistics company.  
It combines a **public-facing institutional website** with a **secure administrative system**, enabling full lifecycle management of freight operations and customer communications.

The platform is built with a **scalable architecture**, leveraging modern technologies such as **Next.js**, **Spring Boot**, and **Docker**.

---

## ✨ Core Features

### 🌍 Public Platform
- Institutional company pages
- Freight listings with proposal submission
- Contact and communication forms:
  - Complaints / Reports
  - Partnership requests
  - Job applications

### 🔐 Admin Dashboard
- Secure authentication (JWT)
- Manage freight listings
- Review and process user submissions
- Update freight statuses
- Manage users

### ⚙️ Backend Capabilities
- RESTful API with Swagger documentation
- JWT-based authentication & authorization
- Modular monorepo architecture
- Data persistence with PostgreSQL
- Fully containerized environment

---

## 🧱 Architecture


```text
transbras /
├── frontend/             # Next.js application
├── backend/              # Spring Boot monorepo 
└── docker-compose.yml    # Container orchestration
```

### 🔄 System Flow

```text
User → Frontend (Next.js) → Backend (Spring Boot API) → PostgreSQL
```

---

## 🛠️ Tech Stack

### Frontend
- React (Next.js)
- Fetch API
- Environment-based configuration

### Backend
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA
- Bean Validation
- Lombok

### DevOps & Tools
- PostgreSQL
- Swagger UI
- Postman

---

## 🚀 Quick Start

### 📦 Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
*Backend API will run on* `http://localhost:8080`

### 💻 Frontend
```bash
cd frontend
npm install
npm run build
npm run dev
```
*Frontend will run on:* `http://localhost:3000`

---


## 🔐 Authentication & Security

The system uses JWT (JSON Web Tokens) for secure authentication.

**Usage:**
`Authorization: Bearer <your_token>`

## ⚠️ Default Admin User

An AdminInitializer automatically creates an admin user at startup:

- **Username:** `admin`
- **Password:** `admin`

> **⚠️ IMPORTANT:** Change these credentials in production environments.

---

## 🌍 Environment Variables
#### Backend (application.properties or .env)

```env
DATABASE_URL
DATABASE_USERNAME
DATABASE_PASSWORD
AUTH_SECRET
ADMIN_PASSWORD
```

#### Frontend (.env)

```env
API_BASE_URL
NEXT_PUBLIC_API_BASE_URL
```

## 📚 API Documentation

[Swagger UI](http://localhost:8080/swagger-ui/index.html) provides full and simple API endpoints

---

## 🔗 API Endpoints
### 🔐 Auth
/auth
| Method | Endpoint  | Description                   |
| :--- | :--- | :--- |
| `POST` | `/login` | Authenticate user |
| `POST` | `/register` | Register user (requires auth) |
| `GET` | `/` | List all users |
| `PUT` | `/{id}` | Update user |
| `DELETE` | `/{id}` | Delete user |


### ✉️ Communications
/communication

#### Job Aplications
*/apply*
| Method | Endpoint | Description        |
| :--- | :--- | :--- |
| `POST` | `/` | Create application |
| `GET` | `/` | List |
| `DELETE` | `/{id}` | Delete |

#### Complaints
*/complaint*
| Method | Endpoint      | Description      |
| :--- | :--- | :--- |
| `POST` | `/` | Create complaint |
| `GET` | `/` | List |
| `PATCH` | `/{id}/resolve` | Mark as resolved |

#### Partnerships
*/partnership*
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/` | Create request |
| `GET` | `/` | List |
| `DELETE` | `/{id}` | Delete |

#### Freight Offers
*/offer*
| Method | Endpoint     | Description   |
| :--- | :--- | :--- |
| `POST` | `/` | Create offer |
| `GET` | `/` | List |
| `PATCH` | `/{id}/status` | Update status |
| `DELETE` | `/{id}` | Delete |

### 🚛 Freights
/shipping
| Method | Endpoint | Description     |
| :--- | :--- | :--- |
| `POST` | `/` | Create Freight |
| `GET` | `/` | List |
| `PATCH` | `/{id}` | Update |
| `DELETE` | `/{id}` | Delete |

---

## 📈 Improvements for Professional Use

- 📊 Dashboard analytics (charts & metrics)

- 📁 File uploads (CVs, attachments)

- 🌍 Internationalization (languages)

- ☁️ Cloud deployment (AWS / Docker Swarm)

---

## Contributing

#### Bug Reports and Contributions
To contribute to this project, please use the dedicated [issues page](https://github.com/Viinicius-Muller/transbras-portfolio/issues).

### Contact

André Vinicius Müller | [LinkedIn](https://www.linkedin.com/in/andré-vinicius-müller-432b17327) | zandreviniciusmuller@gmail.com
