import express from 'express';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser,
);

router.post(
  '/change-password',
  auth('admin', 'user'),
  validateRequest(authValidation.changePasswordValidationSchema),
  authController.changePassword,
);

export const authRoutes = router;
