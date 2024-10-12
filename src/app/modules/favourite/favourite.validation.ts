import { z } from 'zod';

const createFavouriteValidationSchema = z.object({
  body: z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format'),

    postId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format'),
  }),
});

export const favouriteValidation = {
  createFavouriteValidationSchema,
};
