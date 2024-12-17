import express from 'express';
import type { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { HttpStatus } from './utils/statusCodes';
import { globalErrorHandler } from './utils/globalErrorHAndler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())


const PORT = process.env.PORT || 3000;

app.get('/', (_: Request, res: Response) => {
    res.status(HttpStatus.OK).json({ error: false, message: 'Welcome to TMS...', data: { service: 'task-management-system', version: '1.0' } });
});

app.all('*', (_: Request, res: Response) => {
    res.status(HttpStatus.NOT_FOUND).json({ error: true, message: 'Invalid endpoint or method used, please check and try again' });
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`)
})

app.use(globalErrorHandler);