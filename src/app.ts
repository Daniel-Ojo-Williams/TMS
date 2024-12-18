import express from 'express';
import type { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { HttpStatus } from './utils/statusCodes';
import { globalErrorHandler } from './utils/globalErrorHAndler';
import connectDB from './db/connection';
import UserRouter from './users/users.routes';
import usersService from './users/users.service';
import TaskRouter from './tasks/tasks.routes';
import RolesRouter from './roles/roles.routes';
import { seedRolesAndPermissions } from './utils/seedRoles&Permissions';

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())

app.use(RolesRouter);
app.use(UserRouter);
app.use(TaskRouter);

const PORT = process.env.PORT || 3000;

app.get('/', (_: Request, res: Response) => {
    res.status(HttpStatus.OK).json({ error: false, message: 'Welcome to TMS...', data: { service: 'task-management-system', version: '1.0' } });
});

app.all('*', (_: Request, res: Response) => {
    res.status(HttpStatus.NOT_FOUND).json({ error: true, message: 'Invalid endpoint or method used, please check and try again' });
});

app.use(globalErrorHandler);

async function initializeApp() {
  try {
    await connectDB().then(() => console.log('connected to db'));
    await seedRolesAndPermissions(); // --| This can be updated later using proper seeders
    await usersService.createFirstAdmin();
    app.listen(PORT, () => {
      console.log(`App listening on ${PORT}`)
    })
  } catch (error) {
    console.log(`An error occured: ${error}`)
    process.exit(1);
  }
}

initializeApp();