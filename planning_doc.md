# **Backend Planning Document**

## **Project Overview**

- **Project Name**: expense tracker
- **Technology Stack**:
  - Node.js with TypeScript
  - Express.js as the web framework
  - Mongoose and MongoDB for database management
  - Express Validator for request validation
  - Winston for logging
- **Response Structure**:
  - { + `success`: boolean, + `data`: any (optional in case of error), + `message`: string (optional)
    }

## **Package.json**

> Note: This is only showing the main packages and not the complete list.

- **dependencies**:
  - `express`: ^5.1.0
  - `mongoose`: ^8.16.1
  - `express-validator`: ^7.2.1
  - `winston`: ^3.17.0
- **devDependencies**:
  - `typescript`: ^5.8.3
  - `@types/node`: ^22.15.18
  - `@types/express`: ^5.0.3
  - `@types/mongoose`: ^5.11.96
  - `ts-node`: ^10.9.2
  - `nodemon`: ^3.1.10

## **Project Structure (Overview)**

This is a simplified overview of the project structure. There might be more folders and files not mentioned here.

- `src/`
  - `controllers/`
    - `user.controller.ts`
  - `models/`
    - `user.model.ts`
  - `routes/`
    - `user.route.ts`
  - `utils/`
    - `handle-error.ts`
    - `logger.ts`
  - `validation-schemas/`
    - `users/`
      - `add-user.ts`
  - `app.ts`
  - `index.ts`

## **Database Schema**

- **User Model**:

  - `_id`: string
  - `name`: string
  - `password`: string
  - `email`: string
  - `profileImg`: string
  - `walletBalance`: number (float)

- **Expense Model**:
  - `_id`: string
  - `title`: string
  - `price`: number (float)
  - `category`: string
  - `date`: Date (ISO 8601)
  - `user`: User ref id

## **API Endpoints**

- **Users**

  - **GET /users**: Get the user details
  - **POST /users**: Create a new user
  - **PATCH /users**: Update a user
  - **DELETE /users**: Delete a user

- **Expenses**
  - **GET /expenses**: Get a list of expenses
  - **POST /expenses**: Create a new expense
  - **PATCH /expenses/:id**: Update an expense
  - **DELETE /expenses/:id**: Delete an expense

- **Uploads**
  - **POST /uploads/image**: upload a new image (can be used for profile image)

## **Logging**

- **Winston configuration**:
  - `level`: info
  - `format`: combine(format.colorize(), format.timestamp(), format.printf())
  - `transports`: [new transports.Console(), new DailyRotateFile()]

## **Response Structure**

- **Success Response**:

```js
  {
    success: true,
    data: any,
    message: string (optional)
  }
```

- **Error Response**:

```js
  {
  success: false,
  message: string
  }
```


**Authentication**
================

### Overview

The application uses Passport.js with JWT strategy for authentication.

### Configuration

* `src/common/passport/jwt.strategy.ts`: Defines the JWT strategy for Passport.
* `src/common/passport/index.ts`: Initializes Passport and sets up the JWT strategy.

### Flow

1. **Login**: Verify credentials and generate JWT token.
2. **Authenticate**: Verify JWT token on subsequent requests.

### Adding Other Auth Providers

Create a new strategy file (e.g., `google.strategy.ts`) and import it in `src/common/passport/index.ts`. Add the new strategy to the Passport configuration.

**Example**
```markdown
// src/common/passport/jwt.strategy.ts
import { PassportStatic } from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../../models/User.model';

export default (passport: PassportStatic) => {
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || 'super-secret',
      },
      async (jwtPayload, done) => {
        // Verify JWT token
      }
    )
  );
};
```
