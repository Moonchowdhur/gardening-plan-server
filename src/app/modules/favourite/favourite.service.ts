import { Favourite } from './favourite.model';

const createFavouriteIntoDB = async (userId: string, postId: string) => {
  // Check if the post is already favourited by the user
  const existingFavourite = await Favourite.findOne({ userId, postId });

  if (existingFavourite) {
    // If it exists, remove it (unfavourite)
    await Favourite.findByIdAndDelete(existingFavourite._id);
    return { message: 'Post unfavourited', favourited: false };
  } else {
    // Otherwise, add it to favourites
    const newFavourite = new Favourite({ userId, postId });
    await newFavourite.save();
    return { message: 'Post favourited', favourited: true };
  }
};

const getUserFavouriteGardeningFromDB = async (userId: string) => {
  const result = Favourite.find({ userId })
    .populate('postId')
    .populate('userId');
  return result;
};

export const FavouriteServices = {
  createFavouriteIntoDB,
  getUserFavouriteGardeningFromDB,
};
