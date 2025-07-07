"use strict";
/**
 * This file contains all the expense related routes
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// initialize router
const router = (0, express_1.Router)();
// get all expenses
router.get('/', (_, res) => {
    res.send('get all expenses');
});
// export all the expense Routes
exports.default = router;
