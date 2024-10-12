import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { favouriteValidation } from './favourite.validation';
import { FavouriteControllers } from './favourite.controller';

const router = express.Router();

router.post(
  '/create-favourite',
  validateRequest(favouriteValidation.createFavouriteValidationSchema),
  FavouriteControllers.createGardening,
);

router.get(
  '/:userId',

  FavouriteControllers.getUserAllGardening,
);

export const favouriteRoutes = router;
