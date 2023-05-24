import express, { Express, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import userRouter from './routes/user';
import projectRouter from './routes/project';
import materialsRouter from './routes/materials';
import systemPermissionsRouter from './routes/systemPermissions';
import projectMaterialsRouter from './routes/projectMaterials';
import projectCarbonEmissionsRouter from './routes/projectCarbonEmissions';
import { authenticateUser } from './helpers/authMiddleware';
// import bodyParser from 'body-parser';

dotenv.config( {path: '.env'})

const PORT: number = parseInt(process.env.PORT as string, 10) || 8001;

var app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))

// Apply the authenticateUser middleware to all routes
app.use(authenticateUser);

//Routes
app.use('/user', userRouter);
app.use('/project', projectRouter);
app.use('/materials', materialsRouter);
app.use('/systemPermissions', systemPermissionsRouter);
app.use('/projectMaterials', projectMaterialsRouter);
app.use('/projectCarbonEmissions', projectCarbonEmissionsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;