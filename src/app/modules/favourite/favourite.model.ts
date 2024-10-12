import { model } from 'mongoose';
import { TFavourite } from './favourite.interface';
import { Schema } from 'mongoose';

const favouriteSchema = new Schema<TFavourite>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: Schema.Types.ObjectId, ref: 'Gardening', required: true },
});

export const Favourite = model<TFavourite>('Favourite', favouriteSchema);
