/**
 * This contains the user model
 */

import { Schema, Document, model } from 'mongoose';
import { Regex } from '../common/constants/regex.constants';
import { encrypt } from '../common/utils/hashing';

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
      unique: true,
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

/**
 * Pre-save hook to hash the password if it is modified.
 */
UserSchema.pre<IUser>('save', async function (next) {
  // if not modified, skip
  if (!this.isModified('password')) return next();
  // else we has the password
  const hashedPassword = await encrypt(this.password);
  this.password = hashedPassword;
  // call next once done
  next();
});

// create model from the schema and export
const User = model<IUser>('User', UserSchema);
export default User;
