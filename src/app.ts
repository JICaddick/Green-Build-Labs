import express, { Express, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import userRouter from './routes/user';
var projectRouter = require('./routes/project');
var materialsRouter = require('./routes/materials');
import systemPermissionsRouter from './routes/systemPermissions';
var projectMaterialsRouter = require('./routes/projectMaterials');
var projectCarbonEmissionsRouter = require('./routes/projectCarbonEmissions');
const bodyParser = require('body-parser');
const { authenticateUser } = require('./helpers/authMiddleware')

dotenv.config( {path: '.env'})

const PORT = process.env.PORT || 8001;

var app = express();

// we need deez two?
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public')) //Why dis commented out? GPT - if you uncomment it, it will serve any files in the public directory at the root URL of your server.

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

module.exports = app;