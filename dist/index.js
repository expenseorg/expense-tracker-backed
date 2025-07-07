"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// main starting point
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./routes/index"));
const request_logger_1 = require("./common/middlewares/request-logger");
const logger_1 = require("./common/utils/logger");
const index_2 = __importDefault(require("./common/passport/index"));
// configure .env
dotenv_1.default.config();
const app = (0, express_1.default)();
//connect to mongo db
mongoose_1.default
    .connect((_a = process.env.MONGO_URI) !== null && _a !== void 0 ? _a : '')
    .then(() => {
    console.log('Connected to DB ');
})
    .catch((err) => {
    logger_1.logger.info('DB connection failed');
    (0, logger_1.devLogger)(JSON.stringify(err, null, 2));
});
// Middleware for parsing JSON request bodies
app.use(express_1.default.json());
// in initialize passport
app.use(index_2.default.initialize());
/**
 * Middleware to log all request
 * using winston
 */
app.use(request_logger_1.requestLogger);
// base Route
app.get('/', (_, res) => {
    res.send('Hello TypeScript with Express! for Expense Tracker App');
});
// all routes
app.use('/api', index_1.default);
// Start the server
exports.default = app.listen(process.env.PORT, () => {
    console.log(`Server running at PORT:${process.env.PORT}`);
});
