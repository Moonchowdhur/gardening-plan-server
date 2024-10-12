import { Schema, model } from 'mongoose';

import { TGardening } from './gardening.interface';

const gardeningSchema = new Schema<TGardening>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },

    hash: { type: [String], default: [] },
    images: { type: [String], required: true }, // Now an array of strings

    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    isPremium: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    likes: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
    dislikes: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
    tag: { type: String, enum: ['premium', 'free'], default: 'free' },
  },
  {
    timestamps: true,
  },
);

export const Gardening = model<TGardening>('Gardening', gardeningSchema);
