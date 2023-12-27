import { Roles } from "../../Middleware/AuthMiddleware.js";

export const Endpoint = {
    Create:[Roles.admin],
    Update:[Roles.admin],
    Insert:[Roles.admin],
    Delete:[Roles.admin],
    Get:[Roles.admin],
}
    
