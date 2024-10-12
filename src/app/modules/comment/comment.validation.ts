import { z } from 'zod';

const createCommentValidation = z.object({
  body: z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format'),
    postId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid post ID format'),
    description: z
      .string()
      .min(3, 'Description should be at least 3 characters long'),
  }),
});

const updateCommentValidation = z.object({
  body: z.object({
    description: z
      .string()
      .min(3, 'Description should be at least 3 characters long')
      .optional(),
  }),
});

export const commentValidation = {
  createCommentValidation,
  updateCommentValidation,
};
