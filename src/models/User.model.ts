/**
 * This contains the user model
 */

import { Schema, Document, model } from 'mongoose';
import { Regex } from '../common/constants/regex.constants';

//types
export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  profileImg: string;
  walletBalance: number;
}

// schema
const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: Regex.email,
    },
    profileImg: {
      type: String,
      required: false,
      default: '',
    },
    walletBalance: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

// create model from the schema and export
const User = model('User', UserSchema);
export default User;
