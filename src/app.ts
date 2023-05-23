import express, { Express, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
// import userRouter from './routes/user';
// import projectRouter from './routes/project';
// import materialsRouter from './routes/materials';
// import systemPermissionsRouter from './routes/systemPermissions';
// import projectMaterialsRouter from './routes/projectMaterials';
// import projectCarbonEmissionsRouter from './routes/projectCarbonEmissions';
// import bodyParser from 'body-parser';
// import { authenticateUser } from './helpers/authMiddleware';

dotenv.config({ path: '.env' });

const PORT: number = parseInt(process.env.PORT as string, 10) || 8001;

const app: Express = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public')); // You can uncomment this line if you want to serve files in the public directory at the root URL of your server.

// app.use(authenticateUser);

// // Routes
// app.use('/user', userRouter);
// app.use('/project', projectRouter);
// app.use('/materials', materialsRouter);
// app.use('/systemPermissions', systemPermissionsRouter);
// app.use('/projectMaterials', projectMaterialsRouter);
app.use('/projectCarbonEmissions', projectCarbonEmissionsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
