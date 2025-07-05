# How to Run the Project

1. **Create a `.env` file**  
  Copy the required environment variables from `.env.example` and update them as needed.

2. **Start in Development Mode**  
  For automatic reloads and TypeScript support, run:
  ```bash
  npm run dev
  ```

3. **Build and Run in Production Mode**  
  First, compile the TypeScript code:
  ```bash
  npm run build
  ```
  This will generate JavaScript files in the `dist` folder.

  Then, start the application:
  ```bash
  npm run start
  ```

> **Tip:**  
> Use `npm run dev` for development and `npm run build && npm run start` for production.

# setup express with typescript

### package sto install

```bash
npm install express
npm install --save-dev jest typescript @types/node @types/express ts-node nodemon
```

### run

```bash
npm init -y
```

### create typescript config

this command will create the tdconfig.json

```bash
npx tsc --init
```

content of tsCotdconfig.jsonnfig file

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "./dist",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitAny": false,
    "resolveJsonModule": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

check th pacakage.josn to be somthing like this if using src folder

```json
{
  "name": "ts-backend",
  "version": "1.0.0",
  "type": "commonjs",
  "main": "src/index.ts",
  "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "watch": "tsc --watch"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@types/express": "^5.0.1",
    "@types/node": "^22.15.18",
    "ts-node": "^10.9.2",
    "typescript": "^5.8.3"
  },
  "dependencies": {
    "express": "^5.1.0"
  }
}
```

### Setup nodemon for continious reload

create nodemon.json

```json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node src/index.ts"
}
```

# Jest set up

```bash
npm install --save-dev jest ts-jest @types/jest supertest
```

run this to create config file

```bash
npx ts-jest config:init
```

add script

```bash
"test": "jest"
```

now run the script

### add prettier

```bash
npm i -D prettier
```

add .prettierrc file if required to change any default configs

```ts
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```
