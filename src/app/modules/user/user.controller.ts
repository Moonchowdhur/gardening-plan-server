import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

// const createUser = catchAsync(async (req, res) => {
//   const result = await UserServices.createUserIntoDB(req.body);

//   const { name, email, phone, role, address, _id } = result;
//   sendResponse(res, {
//     statusCode: 200,
//     sucess: true,
//     message: 'User registered successfully',
//     data: {
//       _id,
//       name,
//       email,
//       phone,
//       role,
//       address,
//     },
//   });
// });

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  // const result = await UserServices.createUserIntoDB(req.body, imageFilePath);

  const {
    _id,
    name,
    email,
    phone,
    address,
    profilePicture,
    verified,
    following,
    followers,
  } = result;

  sendResponse(res, {
    statusCode: 200,
    sucess: true,
    message: 'User registered successfully',
    data: {
      _id,
      name,
      email,
      phone,
      address,
      profilePicture,
      followers,
      following,
      verified,
    },
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDb();

  if (result.length === 0) {
    sendResponse(res, {
      statusCode: 404,
      sucess: false,
      message: 'No Data Found',
      data: [],
    });
  } else {
    sendResponse(res, {
      statusCode: 200,
      sucess: true,
      message: 'All user retrieved successfully',
      data: result,
    });
  }
});

const getSingleUserByEmail = catchAsync(async (req, res) => {
  const { email } = req.params;

  const result = await UserServices.getSingleUser(email);

  if (!result) {
    sendResponse(res, {
      statusCode: 404,
      sucess: false,
      message: 'No Data Found',
      data: [],
    });
  } else {
    sendResponse(res, {
      statusCode: 200,
      sucess: true,
      message: 'User retrieved successfully',
      data: result,
    });
  }
});

const updateUser = catchAsync(async (req, res) => {
  const { email } = req.params;
  const updateData = req.body;

  const result = await UserServices.updateUserByEmail(email, updateData);

  if (!result) {
    return sendResponse(res, {
      statusCode: 400,
      sucess: false,
      message: 'User not found',
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: 200,
    sucess: true,
    message: 'User updated successfully',
    data: result,
  });
});

const followOrUnfollowUser = catchAsync(async (req, res) => {
  const { userId, targetUserId, action } = req.params;

  let result;
  if (action === 'follow') {
    result = await UserServices.followUser(userId, targetUserId);
  } else if (action === 'unfollow') {
    result = await UserServices.unfollowUser(userId, targetUserId);
  } else {
    return sendResponse(res, {
      statusCode: 400,
      sucess: false,
      message: 'Invalid action, expected "follow" or "unfollow"',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: result.success ? 200 : 400,
    sucess: result.success,
    message: result.message,
    data: result.data,
  });
});

const paymentUser = catchAsync(async (req, res) => {
  const { email } = req.params;

  const result = await UserServices.paymentupdateUserIntoDB(email);

  if (!result) {
    return sendResponse(res, {
      statusCode: 400,
      sucess: false,
      message: 'User not found',
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: 200,
    sucess: true,
    message: 'payment successfull',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getSingleUserByEmail,
  updateUser,
  followOrUnfollowUser,
  getAllUser,
  paymentUser,
};
