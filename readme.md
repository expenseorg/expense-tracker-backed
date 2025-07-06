# Expense Tracker App

## Introduction

The Expense Tracker App is a web application designed to help users track and manage their expenses. The app is built using a modern tech stack, including Node.js, TypeScript, Express.js, and MongoDB.

## Technologies Used

* Node.js: JavaScript runtime environment
* TypeScript: Superset of JavaScript for building scalable and maintainable applications
* Express.js: Popular Node.js web framework for building web applications
* MongoDB: NoSQL database for storing and retrieving data
* Mongoose: MongoDB object modeling tool for TypeScript
* Express Validator: Middleware for validating user input
* Winston: Logging library for Node.js

## Getting Started

To clone and run the app, follow these steps:

### Clone the Repository

```bash
git clone https://github.com/your-username/expense-tracker-app.git
```

### Install Dependencies

```bash
npm install
```

### Create a .env File

Create a new file named `.env` in the root directory of the project. Copy the required environment variables from `.env.example` and update them as needed.

### Start in Development Mode

For automatic reloads and TypeScript support, run:

```bash
npm run dev
```

### Build and Run in Production Mode

First, compile the TypeScript code:

```bash
npm run build
```

This will generate JavaScript files in the `dist` folder.

Then, start the application:

```bash
npm run start
```

> **Tip:** Use `npm run dev` for development and `npm run build && npm run start` for production.

## API Endpoints

The app provides the following API endpoints:

* **Users**
	+ GET /users: Get the user details
	+ POST /users: Create a new user
	+ PATCH /users: Update a user
	+ DELETE /users: Delete a user
* **Expenses**
	+ GET /expenses: Get a list of expenses
	+ POST /expenses: Create a new expense
	+ PATCH /expenses/:id: Update an expense
	+ DELETE /expenses/:id: Delete an expense

## Project Structure

The project is organized into the following directories:

* `src/`: Source code directory
* `src/controllers/`: Controllers for handling user input and business logic
* `src/models/`: Data models for MongoDB
* `src/routes/`: API endpoints and routing
* `src/utils/`: Utility functions for logging, error handling, and more
* `tests/`: Unit tests and integration tests