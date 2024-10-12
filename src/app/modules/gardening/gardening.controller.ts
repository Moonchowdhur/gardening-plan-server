import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { GardeningServices } from './gardening.service';

const createGardening = catchAsync(async (req, res) => {
  const result = await GardeningServices.createGardeningIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    sucess: true,
    message: 'Gardening  added successfully',
    data: result,
  });
});

const getSingleGardening = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await GardeningServices.getSingleGardeningFromDB(id);

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
      message: 'Single Gardening retrieved successfully',
      data: result,
    });
  }
});

const getAllGardening = catchAsync(async (req, res) => {
  const result = await GardeningServices.getAllTypeGardeningFromDB();

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
      message: 'All Gardening retrieved successfully',
      data: result,
    });
  }
});

const getUserAllGardening = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await GardeningServices.getAllTypeUserGardeningFromDB(userId);

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
      message: 'User All Gardening retrieved successfully',
      data: result,
    });
  }
});

const updateGardening = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await GardeningServices.updateGardeningById(id, req.body);

  if (!result) {
    sendResponse(res, {
      statusCode: 404,
      sucess: false,
      message: 'No Data updated',
      data: [],
    });
  } else {
    sendResponse(res, {
      statusCode: 200,
      sucess: true,
      message: 'Single Gardening updated successfully',
      data: result,
    });
  }
});

const deleteSingleGardening = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await GardeningServices.deleteSingleGardeningFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    sucess: true,
    message: 'Gardening deleted successfully',
    data: result,
  });
});

const getUserGardeningPostsAndLikes = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await GardeningServices.getUserGardeningPostsAndLikes(userId);
  sendResponse(res, {
    statusCode: 200,
    sucess: true,
    message: 'Gardening posts retrieved successfully',
    data: {
      posts: result.posts,
      totalLikes: result.totalLikes,
    },
  });
});

const getAllPremiumGardening = catchAsync(async (req, res) => {
  const result = await GardeningServices.getAllPremiumGardeningFromDB();

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
      message: 'All premium Gardening retrieved successfully',
      data: result,
    });
  }
});

const likePostController = catchAsync(async (req, res) => {
  const { postId, userId } = req.params;

  const result = await GardeningServices.likeGardeningPost(postId, userId);
  sendResponse(res, {
    statusCode: 200,
    sucess: true,
    message: 'Gardening like successfully',
    data: result,
  });
});

const dislikePostController = catchAsync(async (req, res) => {
  const { postId, userId } = req.params;

  const result = await GardeningServices.dislikeGardeningPost(postId, userId);
  sendResponse(res, {
    statusCode: 200,
    sucess: true,
    message: 'Gardening dislike successfully',
    data: result,
  });
});

export const GardeningControllers = {
  createGardening,
  getSingleGardening,
  getAllGardening,
  deleteSingleGardening,
  updateGardening,
  getUserGardeningPostsAndLikes,
  getUserAllGardening,
  getAllPremiumGardening,
  dislikePostController,
  likePostController,
};
