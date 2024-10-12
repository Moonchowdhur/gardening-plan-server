import { z } from 'zod';

const createGardeningValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    category: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID format'),
    hash: z.array(z.string()).optional().default([]),
    images: z
      .array(z.string().url('Invalid image URL'))
      .min(1, 'At least one image URL is required'),
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format'),
    // isPremium: z.boolean().optional().default(false), // Default to false
    // isDeleted: z.boolean().optional().default(false), // Default to false
    // likes: z.number().optional().default(0), // Default to 0
    // dislikes: z.number().optional().default(0), // Default to 0
    // tag: z.enum(['premium', 'free']).default('free'), // Default to 'free'
  }),
});

const updateGardeningValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    content: z.string().min(1, 'Content is required').optional(),
    category: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID format')
      .optional(),
    hash: z.array(z.string()).optional().default([]).optional(),
    images: z
      .array(z.string().url('Invalid image URL'))
      .min(1, 'At least one image URL is required')
      .optional(),
  }),
});

export const gardeningValidation = {
  createGardeningValidationSchema,
  updateGardeningValidationSchema,
};
