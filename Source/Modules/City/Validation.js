import joi from 'joi';
import { GeneralFields } from '../../Middleware/ValidationMiddleware.js';

export const CreateCitySchema = joi.object({
    name:joi.string().min(5).required(),
    introduction:joi.string().min(5).max(2500).required(),
    file:joi.array().items(GeneralFields.file.required()).min(1).max(4),
})

export const UpdateCitySchema = joi.object({
    id:joi.string().required(),
    name:joi.string().min(5).max(25),
    introduction:joi.string().min(25).max(2500),
})