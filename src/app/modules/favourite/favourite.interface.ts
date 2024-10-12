import { Types } from 'mongoose';

export type TFavourite = {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
};
