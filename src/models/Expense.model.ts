/**
 * This contains the expense model
 */

import { model, Schema, Types } from 'mongoose';

//Expense Schema
const ExpenseSchema: Schema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    category: {
      required: false,
      type: String,
    },
    Date: {
      required: false,
      type: String,
      default: new Date().toISOString(),
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

//create model for expense from schema and export
const Expense = model('Expense', ExpenseSchema);
export default Expense;
