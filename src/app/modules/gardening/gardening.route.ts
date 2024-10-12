import express from 'express';

import { validateRequest } from '../../middleware/validateRequest';
import { gardeningValidation } from './gardening.validation';
import { GardeningControllers } from './gardening.controller';

const router = express.Router();

router.post(
  '/create-gardening',
  validateRequest(gardeningValidation.createGardeningValidationSchema),
  GardeningControllers.createGardening,
);

router.get('/', GardeningControllers.getAllGardening);

// premium
router.get('/premium', GardeningControllers.getAllPremiumGardening);

// specific user
router.get('/puser/:userId', GardeningControllers.getUserAllGardening);

router.get('/:id', GardeningControllers.getSingleGardening);

router.put(
  '/:id',

  validateRequest(gardeningValidation.updateGardeningValidationSchema),
  GardeningControllers.updateGardening,
);

router.delete('/:id', GardeningControllers.deleteSingleGardening);

router.get('/user/:userId', GardeningControllers.getUserGardeningPostsAndLikes);

//like or dislike
// Route for liking a post
router.post('/like/:postId/:userId', GardeningControllers.likePostController);

// Route for disliking a post
router.post(
  '/dislike/:postId/:userId',
  GardeningControllers.dislikePostController,
);

export const gardeningRoutes = router;
