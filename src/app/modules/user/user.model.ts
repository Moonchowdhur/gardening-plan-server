import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    required: true,
  },
  address: { type: String, required: true },
  profilePicture: { type: String, required: false },
  verified: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  followers: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
  following: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
});

userSchema.pre('save', function (next) {
  if (!this.followers) {
    this.followers = [];
  }

  if (!this.following) {
    this.following = [];
  }

  next();
});
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias

  // const user = this;
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.statics.IsPasswordMatched = async function (
  plainTextPassword,
  hashPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

export const User = model<TUser>('User', userSchema);
