# Retail Banking Application

A full-stack banking application built with React, TypeScript, NestJS, and MongoDB. It provides role-based access control and banking operations for Admin and Customer users.

## Features

- JWT-based authentication
- Role-based authorization (Admin and Customer)
- User and account management
- Account freezing and daily transaction limits
- Payee management
- Money transfers and transaction records
- MongoDB database integration

## Tech Stack

**Frontend:** React, TypeScript, Axios, npm

**Backend:** NestJS, TypeScript, MongoDB, Mongoose, JWT, bcrypt

## Project Structure

```text
Retail_Banking_Application/
├── backend/
│   └── banking/
│       ├── src/
│       ├── package.json
│       └── .env
├── frontend/
│   ├── src/
│   ├── package.json
│   └── .env
└── README.md
```

## Prerequisites

- Node.js and npm
- MongoDB running locally or a MongoDB Atlas connection
- Git

## Installation

Clone the repository:

```bash
git clone https://github.com/Akashverma08/Retail_Banking_Application.git
cd Retail_Banking_Application
```

### 1. Backend Setup

```bash
cd backend/banking
npm install
```

Create a `.env` file inside `backend/banking/`:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/retail_banking
JWT_SECRET=your_secure_random_secret
```

Replace the MongoDB URI and JWT secret with your actual configuration. The variable names must match those used in your backend code.

Start the backend:

```bash
npm run start:dev
```

Backend: `http://localhost:3000`

### 2. Frontend Setup

Open a new terminal from the project root:

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:3000
```

Use the environment variable prefix and name expected by your frontend build tool and API service.

Start the frontend:

```bash
npm run dev
```

Open the local URL printed in the terminal.

## Environment Variables

| Variable | Purpose |
|---|---|
| `PORT` | Backend server port |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign and verify JWTs |
| `VITE_API_URL` | Frontend API base URL (Vite example) |

**Note:** If your frontend uses Create React App, Next.js, or another build tool, the API environment variable name may differ.

## Running the Application

1. Start MongoDB.
2. Start the NestJS backend using `npm run start:dev`.
3. Start the frontend using `npm run dev` in a separate terminal.
4. Open the frontend URL shown in the terminal.
5. Log in with an appropriately configured Admin or Customer account.

## Security

- Keep `.env` files and credentials private.
- Add `.env` to `.gitignore`.
- Never commit JWT secrets, database credentials, or real customer information.
- Configure strong secrets before deployment.

## Author

**Akash Verma**

GitHub: https://github.com/Akashverma08
