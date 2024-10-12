import express from 'express';

import { validateRequest } from '../../middleware/validateRequest';
import { commentControllers } from './comment.controller';
import { commentValidation } from './comment.validation';

const router = express.Router();

router.post(
  '/create-comment',
  validateRequest(commentValidation.createCommentValidation),
  commentControllers.createComment,
);

// Update an existing comment
router.patch('/:id', commentControllers.updateComment);

// Soft delete a comment
router.delete('/:id', commentControllers.deleteComment);

router.get('/post/:postId', commentControllers.getAllCommentsByPost);

router.get('/:id', commentControllers.getSingleComment);

export const commentRoutes = router;
