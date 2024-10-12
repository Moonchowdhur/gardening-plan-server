import httpStatus from 'http-status';

import { TGardening } from './gardening.interface';
import { Gardening } from './gardening.model';
import appError from '../../errors/appError';

const createGardeningIntoDB = async (payload: TGardening) => {
  // const userData = await User.findOne({ email: payload });

  // if (!userData) {
  //   throw new appError(httpStatus.NOT_FOUND, 'This user is not found');
  // }
  const result = Gardening.create(payload);
  return result;
};

const getAllTypeGardeningFromDB = async () => {
  const result = Gardening.find({ isDeleted: false })
    .populate('category')
    .populate('userId');
  return result;
};

//specifc user
const getAllTypeUserGardeningFromDB = async (userId: string) => {
  const result = await Gardening.find({ userId, isDeleted: false })
    .populate('category')
    .populate('userId');

  return result; // Return the filtered gardening posts
};

//specifc remium Gardening
const getAllPremiumGardeningFromDB = async () => {
  const result = await Gardening.find({ tag: 'free', isDeleted: false })
    .populate('category')
    .populate('userId');
  return result;
};

const getSingleGardeningFromDB = async (id: string) => {
  const result = await Gardening.findById(id)
    .populate('category')
    .populate('userId');
  return result;
};

const deleteSingleGardeningFromDB = async (id: string) => {
  const isGardeningExist = await Gardening.findById(id);

  if (!isGardeningExist) {
    throw new appError(httpStatus.NOT_FOUND, 'Gardening not found');
  }

  const result = await Gardening.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

// const updateGardeningById = async (
//   id: string,
//   payload: Partial<TGardening>,
// ) => {
//   const gardening = await Gardening.findById(id);

//   if (!gardening) {
//     throw new Error('Gardening post not found');
//   }

//   // Prevent adding duplicate hashes
//   const updatedHash = payload.hash
//     ? [...new Set([...gardening.hash, ...payload.hash])]
//     : gardening.hash;

//   // Update other fields
//   const updatedGardening = await Gardening.findByIdAndUpdate(
//     id,
//     {
//       $set: {
//         ...payload,
//         hash: updatedHash,
//       },
//     },
//     { new: true, runValidators: true },
//   );

//   return updatedGardening;
// };

const updateGardeningById = async (
  id: string,
  payload: Partial<TGardening>,
) => {
  const gardening = await Gardening.findById(id);

  if (!gardening) {
    throw new Error('Gardening post not found');
  }

  const updatedHash = payload.hash
    ? [...new Set([...gardening.hash, ...payload.hash])]
    : gardening.hash;

  const updatedImages = payload.images
    ? [...new Set([...gardening.images, ...payload.images])]
    : gardening.images;

  const updatedGardening = await Gardening.findByIdAndUpdate(
    id,
    {
      $set: {
        ...payload,
        hash: updatedHash,
        images: updatedImages,
      },
    },
    { new: true, runValidators: true },
  );

  return updatedGardening;
};

const getUserGardeningPostsAndLikes = async (userId: string) => {
  const gardeningPosts = await Gardening.find({ userId });

  if (!gardeningPosts.length) {
    throw new Error('No gardening posts found for this user');
  }

  // Sum all the likes from the user's posts

  const totalLikes = gardeningPosts.reduce(
    (acc, post) => acc + post.likes.length,
    0,
  );

  console.log(totalLikes, 'totalLikes');

  return { posts: gardeningPosts, totalLikes };
};

const likeGardeningPost = async (postId: string, userId: string) => {
  const gardeningPost = await Gardening.findById(postId);

  console.log(gardeningPost?.userId, 'gardeningPost');

  // const gardeningUser = await Gardening.find({ userId });

  // // console.log(gardeningUser, 'gardeningUser');

  // if (gardeningUser.length > 0) {
  //   throw new Error('This is your post, you cannot like your own post');
  // }

  // Check if the user trying to like the post is the same user who created the post
  if (gardeningPost?.userId.toString() === userId) {
    throw new Error('You cannot like your own post');
  }

  if (!gardeningPost) throw new Error('Gardening post not found');

  // Check if user has already liked the post
  // @ts-expect-error: error might happen
  if (gardeningPost.likes.includes(userId)) {
    return { message: 'User already liked the post' };
  }

  // Remove user from dislikes array if present
  gardeningPost.dislikes = gardeningPost.dislikes.filter(
    (id) => id.toString() !== userId,
  );

  // Add user to likes array
  // @ts-expect-error: error might happen

  gardeningPost.likes.push(userId);

  await gardeningPost.save();
  return { message: 'Post liked successfully', post: gardeningPost };
};

// Service for disliking a gardening post
const dislikeGardeningPost = async (postId: string, userId: string) => {
  const gardeningPost = await Gardening.findById(postId);

  if (!gardeningPost) throw new Error('Gardening post not found');

  // const gardeningUser = await Gardening.find({ userId });

  // if (gardeningUser.length > 0) {
  //   throw new Error('This is your post, you cannot dislike your own post');
  // }

  if (gardeningPost?.userId.toString() === userId) {
    throw new Error('You cannot like your own post');
  }

  if (!gardeningPost) throw new Error('Gardening post not found');

  // Check if user has already disliked the post
  // @ts-expect-error: error might happen
  if (gardeningPost.dislikes.includes(userId)) {
    return { message: 'User already disliked the post' };
  }

  gardeningPost.likes = gardeningPost.likes.filter(
    (id) => id.toString() !== userId,
  );

  // @ts-expect-error: error might happen
  gardeningPost.dislikes.push(userId);

  await gardeningPost.save();
  return { message: 'Post disliked successfully', post: gardeningPost };
};

export const GardeningServices = {
  createGardeningIntoDB,
  getSingleGardeningFromDB,
  getAllTypeGardeningFromDB,
  getAllTypeUserGardeningFromDB,
  deleteSingleGardeningFromDB,
  updateGardeningById,
  getUserGardeningPostsAndLikes,
  getAllPremiumGardeningFromDB,
  likeGardeningPost,
  dislikeGardeningPost,
};
