import mongoose from 'mongoose';
import { TerrorSource, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TerrorSource = [{ path: err.path, message: err.message }];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid Id ',
    errorSources,
  };
};

export default handleCastError;
