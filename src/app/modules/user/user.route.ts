import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';

import { UserControllers } from './user.controller';
import { authValidation } from '../auth/auth.validation';
import { UserValidation } from './user.validaton';
import { authController } from '../auth/auth.controller';

const router = express.Router();

// // Configure multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + file.originalname);
//   },
// });

// const upload = multer({ storage });

// router.post(
//   '/signup',
//   upload.single('profilePicture'),
//   validateRequest(UserValidation.userValidationSchema),
//   UserControllers.createUser,
// );

router.post(
  '/signup',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser,
);

//login
router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser,
);

router.get('/', UserControllers.getAllUser);

router.get('/:email', UserControllers.getSingleUserByEmail);

router.put(
  '/:email',
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateUser,
);

router.put(
  '/payment/:email',

  UserControllers.paymentUser,
);

router.post(
  '/:action/:userId/:targetUserId',
  UserControllers.followOrUnfollowUser,
);

export const userRoute = router;
