import { z } from 'zod';

// const userValidationSchema = z.object({
//   body: z.object({
//     name: z.string().min(1, 'Name is required'),
//     email: z.string().email('Invalid email address'),
//     password: z.string().min(1, 'Password is required'),
//     phone: z.string().min(1, 'Phone number is required'),
//     address: z.string().min(1, 'Address is required'),
//   }),
// });

// Define the user validation schema
const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(4, 'Password must be at least 4 characters long'),
    phone: z.string().min(1, 'Phone number is required'),
    role: z.enum(['user', 'admin']).default('user'),
    address: z.string().min(1, 'Address is required'),
    profilePicture: z.string().url('Invalid URL').optional(),

    verified: z.boolean().default(false),
    // followers: z.array(
    //   z
    //     .string()
    //     .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId')
    //     .optional(),
    // ),
    // following: z.array(
    //   z
    //     .string()
    //     .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId')
    //     .optional(),
    // ),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    profilePicture: z.string().url('Invalid URL').optional(),
    address: z.string().min(1, 'Address is required').optional(),
    phone: z
      .string()
      .regex(/^\d+$/, 'Phone number must contain only digits')
      .optional(),
  }),
});

export const UserValidation = {
  userValidationSchema,
  updateUserValidationSchema,
};
