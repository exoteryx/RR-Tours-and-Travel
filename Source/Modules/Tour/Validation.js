import joi from "joi";
import { GeneralFields } from "../../Middleware/ValidationMiddleware.js";

export const CreateTourSchema = joi.object({
    name:joi.string().min(8).max(50).required(),
    desc:joi.string().min(25).max(2500).required(),
    length:joi.string().required(),
    cost:joi.number().positive().required(),
    file:joi.object({
        mainImage:joi.array().items(GeneralFields.file.required()).length(1),
        subImages:joi.array().items(GeneralFields.file.required()).min(1).max(4),
    }),
})

export const InsertCitySchema = joi.object({
    id:joi.string().required(),
    citiesIDs:joi.array().required(),
})

export const UpdateTourSchema = joi.object({
    id:joi.string().required(),
    citiesIDs:joi.array(),
    name:joi.string(),
    desc:joi.string(),
    status:joi.string(),
    length:joi.string(),
    cost:joi.number().positive(),
    file:joi.object({
        mainImage:joi.array().items(GeneralFields.file).length(1),
    }),

})