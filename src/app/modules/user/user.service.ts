import httpStatus from 'http-status';
import appError from '../../errors/appError';

import { TUser } from './user.interface';
import { User } from './user.model';
import { Types } from 'mongoose';

const createUserIntoDB = async (payload: TUser) => {
  const result = User.create(payload);
  return result;
};

// const createUserIntoDB = async (payload: TUser) => {
//   let profilePictureUrl = '';
//   console.log(payload, 'payload');

//   if (payload?.profilePicture) {
//     const imageBBResponse = await uploadImageToImageBB(payload?.profilePicture);
//     console.log(imageBBResponse.data);
//     profilePictureUrl = imageBBResponse.data.url;
//   }

//   const newUserPayload = {
//     ...payload,
//     profilePicture: profilePictureUrl,
//     verified: false,
//   };

//   const result = await User.create(newUserPayload);
//   return result;
// };

const getAllUserFromDb = async () => {
  const result = User.find({ role: 'user' });

  return result;
};

const getSingleUser = async (email: string) => {
  const result = await User.findOne({ email: email });
  return result;
};

const updateUserByEmail = async (email: string, payload: Partial<TUser>) => {
  const userData = await User.findOne({ email: email });

  if (!userData) {
    throw new appError(httpStatus.NOT_FOUND, 'This user is not found');
  }
  const updatedUser = await User.findOneAndUpdate(
    { email },
    { $set: payload },
    { new: true, runValidators: true },
  );

  return updatedUser;
};

const followUser = async (userId: string, targetUserId: string) => {
  const user = await User.findById(userId);
  const targetUser = await User.findById(targetUserId);

  if (!user || !targetUser) {
    return {
      success: false,
      message: 'User not found',
      data: null,
    };
  }

  const isAlreadyFollowing = user.following.includes(
    new Types.ObjectId(targetUserId),
  );
  const isAlreadyFollower = targetUser.followers.includes(
    new Types.ObjectId(userId),
  );

  if (isAlreadyFollowing || isAlreadyFollower) {
    return {
      success: false,
      message: 'You are already following this user',
      data: null,
    };
  }

  user.following.push(new Types.ObjectId(targetUserId));
  targetUser.followers.push(new Types.ObjectId(userId));

  await user.save();
  await targetUser.save();

  return {
    success: true,
    message: 'User followed successfully',
    data: { following: user.following, followers: targetUser.followers },
  };
};

const unfollowUser = async (userId: string, targetUserId: string) => {
  const user = await User.findById(userId);
  const targetUser = await User.findById(targetUserId);

  if (!user || !targetUser) {
    return {
      success: false,
      message: 'User not found',
      data: null,
    };
  }

  const isFollowing = user.following.includes(new Types.ObjectId(targetUserId));
  const isFollower = targetUser.followers.includes(new Types.ObjectId(userId));

  if (!isFollowing || !isFollower) {
    return {
      success: false,
      message: 'You are not following this user',
      data: null,
    };
  }

  user.following = user.following.filter(
    (id) => !id.equals(new Types.ObjectId(targetUserId)),
  );
  targetUser.followers = targetUser.followers.filter(
    (id) => !id.equals(new Types.ObjectId(userId)),
  );

  await user.save();
  await targetUser.save();

  return {
    success: true,
    message: 'User unfollowed successfully',
    data: { following: user.following, followers: targetUser.followers },
  };
};

const updateUserIntoDB = async (
  userEmail: string,
  updateData: Partial<TUser>,
) => {
  const updatedUser = await User.findOneAndUpdate(
    { email: userEmail },
    updateData,
    {
      new: true,
    },
  );
  return updatedUser;
};

const paymentupdateUserIntoDB = async (userEmail: string) => {
  const updatedUser = await User.findOneAndUpdate(
    { email: userEmail },
    { verified: true, payment: true },
    {
      new: true,
    },
  );
  return updatedUser;
};

export const UserServices = {
  createUserIntoDB,
  getSingleUser,
  updateUserByEmail,
  unfollowUser,
  followUser,
  getAllUserFromDb,
  updateUserIntoDB,
  paymentupdateUserIntoDB,
};
