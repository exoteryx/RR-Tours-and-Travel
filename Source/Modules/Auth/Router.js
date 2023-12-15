import { Router } from "express";
import * as Controller from './Controller.js';
import fileUpload, {FileTypes} from "../../../Services/Multer.js";
import { Handle } from "../../Middleware/ErrorHandling.js";
import { Validation } from "../../Middleware/ValidationMiddleware.js";
import * as Validators from './Validation.js';
const R = Router();

R.post('/signup',fileUpload(FileTypes.image).single('pfp'),Validation(Validators.SignupSchema),Handle(Controller.Signup));
R.post('/signin',Validation(Validators.SigninSchema),Handle(Controller.Signin));
R.get('/confirm_email/:token',Handle(Controller.Confirmation));
R.patch("/sendcode",Validation(Validators.EmailSchema),Handle(Controller.SendPassCode));
R.patch("/reset_password",Validation(Validators.ResetPasswordSchema),Handle(Controller.NewPassword))

export default R;