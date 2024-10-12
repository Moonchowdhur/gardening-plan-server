import httpStatus from 'http-status';
import { AuthServices } from './auth.service';

import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUserFromDB(req.body);

  const { userData, accessToken } = result;

  const { _id, name, email, phone, role, address } = userData;

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: accessToken,
    data: { _id, name, email, phone, role, address },
  });
});

const changePassword = catchAsync(async (req, res) => {
  console.log(req, 'req');
  const result = await AuthServices.changePasswordFromDB(req.user, req.body);
  console.log(req.user, req.body, 'user');
  sendResponse(res, {
    statusCode: httpStatus.OK,
    sucess: true,
    message: `Password change successfully! `,
    data: result,
  });
});

export const authController = {
  loginUser,
  changePassword,
};
