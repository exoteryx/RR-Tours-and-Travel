import { Router } from "express";
import * as Controller from './Controller.js';
import fileUpload, {FileTypes} from "../../../Services/Multer.js";
import { Handle } from "../../Middleware/ErrorHandling.js";
import { Validation } from "../../Middleware/ValidationMiddleware.js";
import * as Validators from './Validation.js'
import { Auth, Roles } from "../../Middleware/AuthMiddleware.js";
import { Endpoint } from "./Endpoint.js";


const R = Router();

R.get('/',Auth(Endpoint.Get),Handle(Controller.GetTours));
R.get('/active',Auth(Object.values(Roles)),Handle(Controller.GetActiveTours));
R.get('/:id',Auth(Object.values(Roles)),Handle(Controller.GetSpecificTour));
R.post('/create',Auth(Endpoint.Create),fileUpload(FileTypes.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImages',maxCount:3},
]),Validation(Validators.CreateTourSchema),Handle(Controller.CreateTour));
R.put('/update/:id',Auth(Endpoint.Update),Validation(Validators.UpdateTourSchema),Handle(Controller.UpdateTour));
R.delete('/:id',Auth(Endpoint.Delete),Handle(Controller.DeleteTour));

export default R;