import { Router } from "express";
import * as Controller from './Controller.js';
import fileUpload, {FileTypes} from "../../../Services/Multer.js";
import { Handle } from "../../Middleware/ErrorHandling.js";
import { Validation } from "../../Middleware/ValidationMiddleware.js";
import * as Validators from './Validation.js'
import { Auth, Roles } from "../../Middleware/AuthMiddleware.js";
import { Endpoint } from "./Endpoint.js";

const R = Router({mergeParams:true});

R.get('/',Auth(Object.values(Roles)),Handle(Controller.GetCities));
R.post("/create",Auth(Endpoint.create),fileUpload(FileTypes.image).fields([
    {name:"images",maxCount:4},
]),Validation(Validators.CreateCitySchema),Handle(Controller.CreateCity));
R.get('/:id',Auth(Object.values(Roles)),Handle(Controller.GetSpecificCity));
R.put('/update/:id',Auth(Endpoint.update),Validation(Validators.UpdateCitySchema),Handle(Controller.UpdateCity));
R.delete('/:id',Auth(Endpoint.delete),Handle(Controller.DeleteCity));

export default R;