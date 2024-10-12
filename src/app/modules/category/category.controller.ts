import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CateogryServices } from './category.service';

const createCateogry = catchAsync(async (req, res) => {
  const result = await CateogryServices.createCategoryIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    sucess: true,
    message: 'Cateogry added successfully',
    data: result,
  });
});

const deleteCategoryRoom = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CateogryServices.deleteSingleCategoryromDB(id);
  sendResponse(res, {
    statusCode: 200,
    sucess: true,
    message: 'Cateogry deleted successfully',
    data: result,
  });
});

const getAllCategory = catchAsync(async (req, res) => {
  const result = await CateogryServices.getAllTypeCategoryFromDB();

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
      message: 'All Category retrieved successfully',
      data: result,
    });
  }
});

export const CateogryControllers = {
  createCateogry,
  deleteCategoryRoom,
  getAllCategory,
};
