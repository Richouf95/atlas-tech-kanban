# Atlas Tech Kanban - Backend Project

## Description

This project is a backend developed with Node.js, Express and MongoDB.
It provides APIs for user management, such as:

- registration
- login
- user retrieval.

## Installation

To install and run this project locally, follow these steps:

1. **Clone the repository :**

   ```bash
   git clone https://github.com/Richouf95/atlas-tech-kanban.git
   cd backend

   ```

2. **Installing dependencies :**

   ```bash
   npm install
   ```

3. **Configuring environment variables :**

```bash
   MONGO_URI=<"Key">

   PORT=<"Key">

   MONGO_URI=<"Key">

   JWT_SECRETE=<"Key">

   DEV_DOMAINE=<"Key">
```

## Launch the project locally

npm run dev

## API Endpoints

Here are the available endpoints:

- GET /all-users: Retrieves all users.
- GET /id: Retrieves a user by its ID.
- POST /signup : Registers a new user. Receives a request body with email, name, and pwd.
- POST /signin : Connects an existing user. Receives a request body with email and pwd.

## Remarks

Please note that there are several features and enhancements to be added, such as :

- **Regular backups**: Integration of automatic and regular backups of data, including Liveblocks, to ensure data longevity.
- **Security measures**: Enhanced security with additional practices to protect data and users.
