import httpStatus from 'http-status';
import appError from '../../errors/appError';
import { Gardening } from '../gardening/gardening.model';
import { TComment } from './comment.interface';
import { Comment } from './comment.model';

const createcommentIntoDB = async (payload: TComment) => {
  const postData = await Gardening.findById(payload.postId);

  if (!postData) {
    throw new appError(
      httpStatus.NOT_FOUND,
      'This gardening post is not found',
    );
  }

  const result = Comment.create(payload);
  return result;
};

const updateCommentById = async (
  id: string,
  payload: Partial<{ description: string }>,
) => {
  const updatedComment = await Comment.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true },
  );
  return updatedComment;
};

const getCommentsByPostId = async (postId: string) => {
  const comments = await Comment.find({ postId, isDeleted: false })
    .populate('postId')
    .populate('userId');
  return comments;
};

const getSingleCommentFromDB = async (id: string) => {
  const result = await Comment.findById(id)
    .populate('postId')
    .populate('userId');
  return result;
};

const deleteCommentById = async (id: string) => {
  const deletedComment = await Comment.findByIdAndUpdate(
    id,
    { $set: { isDeleted: true } },
    { new: true },
  );
  return deletedComment;
};

export const CommentServices = {
  createcommentIntoDB,
  getCommentsByPostId,
  updateCommentById,
  deleteCommentById,
  getSingleCommentFromDB,
};
