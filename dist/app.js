"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
// import userRouter from './routes/user';
// import projectRouter from './routes/project';
// import materialsRouter from './routes/materials';
// import systemPermissionsRouter from './routes/systemPermissions';
// import projectMaterialsRouter from './routes/projectMaterials';
// import projectCarbonEmissionsRouter from './routes/projectCarbonEmissions';
// import bodyParser from 'body-parser';
// import { authenticateUser } from './helpers/authMiddleware';
dotenv_1.default.config({ path: '.env' });
const PORT = parseInt(process.env.PORT, 10) || 8001;
const app = (0, express_1.default)();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.static('public')); // You can uncomment this line if you want to serve files in the public directory at the root URL of your server.
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
exports.default = app;
