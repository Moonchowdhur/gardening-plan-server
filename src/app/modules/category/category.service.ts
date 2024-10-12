import httpStatus from 'http-status';
import appError from '../../errors/appError';
import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (payload: TCategory) => {
  const existingCategory = await Category.findOne({ name: payload.name });

  if (existingCategory) {
    throw new appError(
      httpStatus.NOT_FOUND,
      `Category with the name "${payload.name}" already exists.`,
    );
  }
  const result = Category.create(payload);
  return result;
};

//delete
const deleteSingleCategoryromDB = async (id: string) => {
  const isCategoryExist = await Category.findById(id);

  if (!isCategoryExist) {
    throw new appError(httpStatus.NOT_FOUND, 'Category not found');
  }

  const result = await Category.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const getAllTypeCategoryFromDB = async () => {
  const result = Category.find({});
  return result;
};

export const CateogryServices = {
  createCategoryIntoDB,
  deleteSingleCategoryromDB,
  getAllTypeCategoryFromDB,
};
