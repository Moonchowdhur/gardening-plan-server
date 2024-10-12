import { Types } from 'mongoose';

// export type TGardening = {
//   title: string;
//   content: string;
//   category: Types.ObjectId;
//   hash: string[];
//   images: string;

//   userId: Types.ObjectId;

//   isPremium: boolean;
//   isDeleted: boolean;
//   likes: number;
//   dislikes: number;
// };

// export type TGardening = {
//   title: string;
//   content: string;
//   category: Types.ObjectId;
//   hash: string[];
//   images: string[];
//   userId: Types.ObjectId;
//   isPremium: boolean;
//   isDeleted: boolean;
//   likes: number;
//   dislikes: number;
//   tag: 'premium' | 'free';
// };

export type TGardening = {
  title: string;
  content: string;
  category: Types.ObjectId;
  hash: string[];
  images: string[];
  userId: Types.ObjectId;
  isPremium: boolean;
  isDeleted: boolean;
  likes: Types.ObjectId[];
  dislikes: Types.ObjectId[];
  tag: 'premium' | 'free';
};
