import mongoose, { Schema, model } from 'mongoose';
import { TComment } from './comment.interface';

const CommentSchema = new Schema<TComment>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  postId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Gardening',
  },
  description: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Comment = model<TComment>('Comment', CommentSchema);
