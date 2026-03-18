# 🚛 Plataforma FullStack TransBras

![Next.js](https://img.shields.io/badge/Frontend-Next.js-black)
![Spring Boot](https://img.shields.io/badge/Backend-SpringBoot-green)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)
![Docker](https://img.shields.io/badge/DevOps-Docker-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 🌐 Visão Geral

**TransBras** é uma plataforma web FullStack moderna projetada para uma empresa de transporte e logística.  
Ela combina um **site institucional público** com um **sistema administrativo seguro**, permitindo o gerenciamento completo do ciclo de vida das operações de frete e das comunicações com os clientes.

A plataforma é construída com uma **arquitetura escalável**, utilizando tecnologias modernas como **Next.js**, **Spring Boot** e **Docker**.

---

## ✨ Principais Funcionalidades

### 🌍 Plataforma Pública
- Páginas institucionais da empresa
- Listagem de fretes com envio de propostas
- Formulários de contato e comunicação:
  - Reclamações / Denúncias
  - Solicitações de parceria
  - Candidaturas a vagas de emprego

### 🔐 Painel Administrativo (Dashboard)
- Autenticação segura (JWT)
- Gerenciamento de listagens de fretes
- Análise e processamento de envios de usuários
- Atualização de status de fretes
- Gerenciamento de usuários

### ⚙️ Capacidades do Backend
- API RESTful com documentação no Swagger
- Autenticação e autorização baseadas em JWT
- Arquitetura monorepo modular
- Persistência de dados com PostgreSQL
- Ambiente totalmente conteinerizado

---

## 🧱 Arquitetura

```text
transbras /
├── frontend/             # Aplicação Next.js
├── backend/              # Monorepo Spring Boot 
└── docker-compose.yml    # Orquestração de contêineres
```

### 🔄 Fluxo do Sistema

```text
Usuário → Frontend (Next.js) → Backend (API Spring Boot) → PostgreSQL
```

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- React (Next.js)
- Fetch API
- Configuração baseada em ambiente (Environment)

### Backend
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA
- Bean Validation
- Lombok

### DevOps & Ferramentas
- Docker & Docker Compose
- PostgreSQL
- Swagger UI
- Postman

---

## 🚀 Guia Rápido e Instalação

### 🐳 Configuração com Docker (Recomendado)
```bash
# Clonar o repositório
git clone https://github.com/Viinicius-Muller/transbras-portfolio.git
cd transbras-portfolio

# Iniciar contêineres (banco de dados + backend)
docker-compose up --build
```
Serviços iniciados:
- Banco de Dados PostgreSQL
- API Spring Boot

### 📦 Backend (Execução Local)
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
*A API do Backend rodará em:* `http://localhost:8080`

### 💻 Frontend
```bash
cd frontend
npm install
npm run build
npm run dev
```
*O Frontend rodará em:* `http://localhost:3000`

---

## 🔐 Autenticação e Segurança

O sistema utiliza JWT (JSON Web Tokens) para autenticação segura.

**Uso:**
`Authorization: Bearer <seu_token>`

## ⚠️ Usuário Administrador Padrão

Um `AdminInitializer` cria automaticamente um usuário administrador na inicialização do sistema:

- **Username:** `admin`
- **Password:** `admin`

> **⚠️ IMPORTANTE:** Altere essas credenciais em ambientes de produção.

---

## 🌍 Variáveis de Ambiente

#### Backend (`application.properties` ou `.env`)
```env
DATABASE_URL
DATABASE_USERNAME
DATABASE_PASSWORD
AUTH_SECRET
ADMIN_PASSWORD
```

---

## 📚 Documentação da API

O [Swagger UI](http://localhost:8080/swagger-ui/index.html) fornece a documentação completa e simples dos endpoints da API.

---

## 🔗 Endpoints da API

### 🔐 Autenticação
/auth
| Método | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/login` | Autenticar usuário |
| `POST` | `/register` | Registrar usuário (requer autenticação) |
| `GET` | `/` | Listar todos os usuários |
| `PUT` | `/{id}` | Atualizar usuário |
| `DELETE` | `/{id}` | Deletar usuário |

### ✉️ Comunicações
/communication

#### Aplicações de Vaga
*/apply*
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/` | Cria uma aplicação |
| `GET` | `/` | Lista todas |
| `DELETE` | `/{id}` | Deleta |

#### Reclamações
*/complaint*
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/` | Cria uma reclamação |
| `GET` | `/` | Lista todas |
| `PATCH` | `/{id}/resolve` | Marca como resolvida |

#### Parcerias
*/partnership*
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/` | Cria |
| `GET` | `/` | Lista todas |
| `DELETE` | `/{id}` | Deleta |

#### Ofertas de Frete
*/offer*
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/` | Cria oferta |
| `GET` | `/` | Lista todas |
| `PATCH` | `/{id}/status` | Atualiza o status |
| `DELETE` | `/{id}` | Deleta |

### 🚛 Fretes
/shipping
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/` | Cria o frete |
| `GET` | `/` | List todos |
| `PATCH` | `/{id}` | Atualiza |
| `DELETE` | `/{id}` | Deleta |

---

## 📈 Melhorias para Uso Profissional

- 📊 Analíses no Dashboard (gráficos e métricas)
- 📁 Upload de arquivos (currículos, anexos)
- 🌍 Internacionalização (idiomas)
- ☁️ Implantação em Nuvem (AWS / Docker Swarm)

---

## 🤝 Contribuição

#### Relatos de Bugs e Contribuições
Para contribuir com este projeto, por favor utilize a [página de issues](https://github.com/Viinicius-Muller/transbras-portfolio/issues) dedicada.

### 📞 Contato

André Vinicius Müller | [LinkedIn](https://www.linkedin.com/in/andré-vinicius-müller-432b17327) | zandreviniciusmuller@gmail.com
