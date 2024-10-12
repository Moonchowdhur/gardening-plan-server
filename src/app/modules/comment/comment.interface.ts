import { Types } from 'mongoose';

export type TComment = {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  description: string;
  isDeleted: boolean;
};
