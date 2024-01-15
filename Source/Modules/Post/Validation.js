import joi from "joi";
import { GeneralFields } from "../../Middleware/ValidationMiddleware.js";

export const CreatePostSchema = joi.object({
    title:joi.string().min(8).max(30).required(),
    body:joi.string().min(25).max(25000).required(),
    file:joi.object({
        image:joi.array().items(GeneralFields.file.required()).length(1)
    })
})

export const UpdatePostSchema= joi.object({
    id:joi.string().required(),
    title:joi.string().min(8).max(30).required(),
    body:joi.string().min(25).max(25000).required(),
    file:joi.object({
        image:joi.array().items(GeneralFields.file.required()).length(1)
    })
})