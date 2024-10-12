import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CommentServices } from './comment.service';

const createComment = catchAsync(async (req, res) => {
  const result = await CommentServices.createcommentIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    sucess: true,
    message: ' Comment added successfully',
    data: result,
  });
});

const updateComment = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CommentServices.updateCommentById(id, req.body);

  if (!result) {
    sendResponse(res, {
      statusCode: 404,
      sucess: false,
      message: 'Comment not found or not updated',
      data: null,
    });
  } else {
    sendResponse(res, {
      statusCode: 200,
      sucess: true,
      message: 'Comment updated successfully',
      data: result,
    });
  }
});

const deleteComment = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CommentServices.deleteCommentById(id);

  if (!result) {
    sendResponse(res, {
      statusCode: 404,
      sucess: false,
      message: 'Comment not found',
      data: null,
    });
  } else {
    sendResponse(res, {
      statusCode: 200,
      sucess: true,
      message: 'Comment has been deleted ',
      data: result,
    });
  }
});

const getAllCommentsByPost = catchAsync(async (req, res) => {
  const { postId } = req.params;

  const result = await CommentServices.getCommentsByPostId(postId);

  sendResponse(res, {
    statusCode: 200,
    sucess: true,
    message: 'All Comment retrieved successfully',
    data: result,
  });
});

const getSingleComment = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CommentServices.getSingleCommentFromDB(id);

  if (!result) {
    sendResponse(res, {
      statusCode: 404,
      sucess: false,
      message: 'No Data Found',
      data: [],
    });
  } else {
    sendResponse(res, {
      statusCode: 200,
      sucess: true,
      message: 'Single Comment retrieved successfully',
      data: result,
    });
  }
});

export const commentControllers = {
  createComment,
  updateComment,
  deleteComment,
  getAllCommentsByPost,
  getSingleComment,
};
