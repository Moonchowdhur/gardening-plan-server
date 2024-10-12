import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Category name is required')
      .max(30, 'Category name is too long'),
  }),
});

export const categoryValidation = {
  createCategoryValidationSchema,
};
