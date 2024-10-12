import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FavouriteServices } from './favourite.service';

export const createGardening = catchAsync(async (req, res) => {
  const { userId, postId } = req.body;

  const result = await FavouriteServices.createFavouriteIntoDB(userId, postId);

  sendResponse(res, {
    statusCode: 200,
    sucess: true,
    message: result.favourited
      ? 'Post favourited successfully'
      : 'Post unfavourited successfully',
    data: result,
  });
});

const getUserAllGardening = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result =
    await FavouriteServices.getUserFavouriteGardeningFromDB(userId);

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
      message: 'User Favourite Gardening retrieved successfully',
      data: result,
    });
  }
});

export const FavouriteControllers = {
  createGardening,
  getUserAllGardening,
};
