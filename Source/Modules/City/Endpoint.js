import { Roles } from "../../Middleware/AuthMiddleware.js";

export const Endpoint = {
    create:[Roles.admin],
    update:[Roles.admin],
    delete:[Roles.admin],
}