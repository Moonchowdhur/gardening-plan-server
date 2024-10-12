import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { TLoginUser } from './auth.interface';
import appError from '../../errors/appError';
import { User } from '../user/user.model';

import config from '../../config';
import { createToken } from './auth.utils';
import { JwtPayload } from 'jsonwebtoken';

const loginUserFromDB = async (payload: TLoginUser) => {
  const userData = await User.findOne({ email: payload?.email });

  if (!userData) {
    throw new appError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    userData?.password,
  );
  if (!isPasswordMatched) {
    throw new appError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }

  //access granted ---->login
  //create token and sent to the client--------->

  const jwtPayload = {
    email: userData?.email,
    role: userData?.role,
  };

  console.log(jwtPayload, 'jwtPayload');

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { accessToken, userData };
};

//change password-->
const changePasswordFromDB = async (
  user: JwtPayload,
  payload: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  console.log(user, 'user');

  //*****bulit in static method that user is exist or not() used in user model-->*****
  const userData = await User.findOne({ email: user?.email });

  if (!userData) {
    throw new appError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  //checking user password is matched or not// Compare old password with the stored hashed password
  const isOldPasswordCorrect = await bcrypt.compare(
    payload.oldPassword,
    userData.password,
  );

  if (!isOldPasswordCorrect) {
    throw new appError(httpStatus.FORBIDDEN, 'Old password is incorrect!');
  }

  // Check if the new password is the same as the old password
  const isSamePassword = await bcrypt.compare(
    payload.newPassword,
    userData.password,
  );

  if (isSamePassword) {
    throw new appError(
      httpStatus.BAD_REQUEST,
      'New password cannot be the same as the old password',
    );
  }
  console.log(payload.newPassword, 'newPassword');
  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  console.log(newHashedPassword);

  //update password-->want not to showiing password , return null, when update i need time when password changed so added passwordChangeAt: new Date(), so i can track.
  await User.findOneAndUpdate(
    {
      email: user.email,
      role: user.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
    { new: true },
  );
  return null;
  // Optionally, you could return some success message or log this action
  // return { message: 'Password changed successfully' };
};

export const AuthServices = {
  loginUserFromDB,
  changePasswordFromDB,
};
