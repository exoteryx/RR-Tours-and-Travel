import { Router } from "express";
import * as Controller from "./Controller.js";
import fileUpload, {FileTypes} from "../../../Services/Multer.js";
import { Handle } from "../../Middleware/ErrorHandling.js";
import { Validation } from "../../Middleware/ValidationMiddleware.js";
import * as Validators from './Validation.js'
import { Auth } from "../../Middleware/AuthMiddleware.js";
import { Endpoint } from "./Endpoint.js";

const R = Router();

R.post("/create",Auth(Endpoint.Create),Validation(Validators.CreatePostSchema),fileUpload(FileTypes.image).single('image'),Handle(Controller.CreatePost));
R.get("/",Auth(Endpoint.Get),Handle(Controller.GetPosts));
R.get("/:id",Auth(Endpoint.Get),Handle(Controller.GetSpecificPost));
R.put("/:id",Auth(Endpoint.Update),Validation(Validators.UpdatePostSchema),Handle(Controller.UpdatePost));
R.delete("/:id",Auth(Endpoint.Delete),Handle(Controller.DeletePost));

export default R