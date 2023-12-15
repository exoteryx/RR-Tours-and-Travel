import joi from "joi";
import { GeneralFields } from "../../Middleware/ValidationMiddleware.js";

export const SignupSchema = joi.object({
    name: joi.string().required().alphanum().min(3).max(20),
    email: GeneralFields.email.required(),
    file: GeneralFields.file,
    gender: joi.string().valid('male', 'female').required(),
    password: GeneralFields.password.required(),
    cPassword: joi.string().valid(joi.ref('password')).required(),
})

export const SigninSchema = joi.object({
    email:GeneralFields.email.required(),
    password:GeneralFields.password.required(),
})

export const EmailSchema = joi.object({
    email:GeneralFields.email.required(),
});

export const ResetPasswordSchema = joi.object({
    email:GeneralFields.email.required(),
    password:GeneralFields.password.required(),
    code:joi.string().min(6).max(6).required(),
})