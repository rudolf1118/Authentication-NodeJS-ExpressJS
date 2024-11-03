
# Auth-Project

This project is an authentication and authorization API built with Node.js, Express, MongoDB, and Mongoose. It supports user registration, login, and role-based access control.

---

## Features
- 🔒 User registration and login with JWT-based authentication
- 🛡️ Role-based access control (RBAC) for endpoints
- 🔑 Secure password handling with bcrypt
- 🧩 Custom role-based middleware

---

## Prerequisites

- [Node.js](https://nodejs.org/) (version 12+)
- [MongoDB](https://www.mongodb.com/) (a MongoDB cluster URI is required)

---

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/auth-project.git
    cd auth-project
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory of your project and add the following:

    ```plaintext
    MONGODB_SRV="mongodb+srv://username:password@cluster0.tosao.mongodb.net/?retryWrites=true&w=majority&appName=ClusterName"
    PORT=3000
    SECRET_KEY="your_jwt_secret_key"
    ```

4. **Run the project**:
    ```bash
    npm start
    ```

---

## Project Structure

- 📁 `models/`: Contains Mongoose models for `User` and `Role`.
- 📁 `controllers/`: Defines logic for user authentication and authorization (`authController.js`).
- 📁 `middleware/`: Custom middleware for authorization.
- 📁 `routes/`: Defines routes for registration, login, and user management.

---

## API Endpoints

| Method | Endpoint            | Description                                        | Authentication Required |
|--------|---------------------|----------------------------------------------------|--------------------------|
| POST   | `auth/registration` | Registers a new user with username and password    | No                       |
| POST   | `auth/login`        | Logs in a user and returns a JWT token             | No                       |
| GET    | `auth/users`        | Retrieves a list of users (admin-only)             | Yes                      |
| GET    | `auth/admin/create` | Creates a new admin role                           | Yes                      |
| GET    | `auth/users/create` | Creates a new user role                            | Yes                      |

---

### Example Requests

#### 1. Register a New User
```http
POST /registration
Content-Type: application/json
{
    "username": "exampleUser",
    "password": "password123"
}
```

#### 2. Login
```http
POST /login
Content-Type: application/json
{
    "username": "exampleUser",
    "password": "password123"
}
```

#### 3. Get Users (Admin-only)
Requires `Bearer <JWT_TOKEN>` in the `Authorization` header.

```http
GET /users
Authorization: Bearer <JWT_TOKEN>
```

---

## Middleware

### `authMiddleware`
Checks if the request contains a valid JWT token.

### `roleAuthMiddleware`
Checks if the user has the required role(s) for accessing a specific route.

Example:
```javascript
router.get('/users', roleAuthMiddleware(["ADMIN"]), controller.getUsers);
```

---

## Environment Variables

- **`MONGODB_SRV`**: MongoDB connection string
- **`PORT`**: Port for the server to run on
---

## License

IDK, it is for official view, ha-ha. R.Harutyunyan
