import { Model, Types } from 'mongoose';

// export type TUser = {
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
//   role: 'user' | 'admin';
//   address: string;
//   profilePicture?: string;
//   verified: boolean;
//   followers: number;
//   following: number;
// };

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'user' | 'admin';
  address: string;
  profilePicture?: string;
  verified: boolean;
  payment: boolean;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
};

export type TUserRole = 'user' | 'admin';

export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  IsUserExistByCustomId(id: string): Promise<TUser>;

  IsPasswordMatched(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>;

  // isJWTIssuedBeforePasswordChanged(
  //   passwordChangedTimestamp: Date,
  //   jwtIssuedTimestamp: number,
  // ): boolean;
}
