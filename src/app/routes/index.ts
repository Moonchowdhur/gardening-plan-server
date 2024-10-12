import express from 'express';
import { userRoute } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { gardeningRoutes } from '../modules/gardening/gardening.route';
import { categoryRoutes } from '../modules/category/category.route';
import { commentRoutes } from '../modules/comment/comment.route';
import { favouriteRoutes } from '../modules/favourite/favourite.route';

const router = express.Router();

const modeuleRoutes = [
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/gardening',
    route: gardeningRoutes,
  },
  {
    path: '/favourite',
    route: favouriteRoutes,
  },
  {
    path: '/category',
    route: categoryRoutes,
  },
  {
    path: '/comment',
    route: commentRoutes,
  },
];

modeuleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
