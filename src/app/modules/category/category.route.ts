import { categoryValidation } from './category.validation';
import express from 'express';

import { validateRequest } from '../../middleware/validateRequest';
import { CateogryControllers } from './category.controller';

const router = express.Router();

router.post(
  '/create-category',
  validateRequest(categoryValidation.createCategoryValidationSchema),
  CateogryControllers.createCateogry,
);

router.delete('/:id', CateogryControllers.deleteCategoryRoom);

router.get('/', CateogryControllers.getAllCategory);

export const categoryRoutes = router;
