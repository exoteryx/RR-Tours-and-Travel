import jwt from "jsonwebtoken";
import UserModel from "../../Models/UserModel.js";

export const roles = {admin:'admin' , user:'user'};

export const Auth = (AccessRoles = [])=>{
    return async (req,res,next)=>{
        try{
        const {authorization} = req.headers;
        if(!authorization?.startsWith(process.env.BEARER)){
            return res.status(400).json({Message:"Invalid Authorization"});
        }
        const token = authorization.split(process.env.BEARER)[1];
        const decoded = jwt.verify(token,process.env.LOGINSIGNATURE);
        if(!decoded){
            return res.status(400).json({Message:"Invalid Token"});
        }
        const FindUser = await UserModel.findById(decoded.id).select("name role passwordTime");
        if(!FindUser){
            return res.status(404).json({Message:'User Nonexistent'});
        }
        if(parseInt(FindUser.passwordTime?.getTime()/1000) > decoded.iat){
            return res.status(400).json({Message:"Expired Token"})
        }
        if(!AccessRoles.includes(FindUser.role)){
            return res.status(403).json({Message:'403 Forbidden'})
        }
        req.user = FindUser;
    }catch(error){
        res.json({Message:"Caught Error",error:error.stack})
    }
    next()
}
}