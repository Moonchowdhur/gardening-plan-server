import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';

import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';
import notFound from './app/middleware/notFound';
import globalErrorHandler from './app/middleware/globalErrorHandler';

const app: Application = express();
app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api', router);

// app.use((req: Request, res: Response, next: NextFunction) => {
//   const message = 'Not Found ';
//   return res.status(httpStatus.NOT_FOUND).json({
//     success: false,
//     statusCode: 404,
//     message,
//   });
// });

app.use(globalErrorHandler);

// app.use((err:any, req:Request, res:Response, next:NextFunction) => {

// });

app.use(notFound);

export default app;
