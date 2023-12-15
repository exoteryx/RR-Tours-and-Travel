import UserModel from "../../../Models/UserModel.js";
import bcrypt from 'bcryptjs'
import cloudinary from "../../../Services/Cloudinary.js";
import { SendEmail } from "../../../Services/NodeMailer.js";
import jwt from 'jsonwebtoken';
import { customAlphabet } from "nanoid";

export const Signup = async(req,res,next)=>{  
    const {name,email,password,gender} = req.body;
    const UserEmail = await UserModel.findOne({email});
    if(UserEmail){
        return next(new Error("Email Already in Use"));
    }
    const HashedPass = bcrypt.hashSync(password,parseInt(process.env.SALTROUND));
    
    if(req.file){
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path , {
            folder:`${process.env.APP_NAME}/Users/${req.body.name}`
        })
        const {token} = jwt.sign({email},process.env.LOGIN_SIGNATURE);

        await SendEmail(email,"Email Confirmation",`<a href='${req.protocol}://${req.headers.host}/auth/confirm_email/${token}'>Welcome</a>`)
    
        const CreateAccount = await UserModel.create({name,email,password:HashedPass,gender,pfp:{secure_url,public_id}});
        return res.status(200).json({Message:"Success",CreateAccount});
    }else{
        const secure_url = "https://res.cloudinary.com/dkipqev3m/image/upload/v1702641928/RR_Tours/Templates/e_yskyxz.png";
        const public_id = "RR_Tours/Templates/e_yskyxz";
        const token = jwt.sign({email},process.env.LOGIN_SIGNATURE);

        await SendEmail(email,"Email Confirmation",`<a href='${req.protocol}://${req.headers.host}/auth/confirm_email/${token}'>Welcome</a>`)
    
        const CreateAccount = await UserModel.create({name,email,password:HashedPass,gender,pfp:{secure_url,public_id}}); 
        return res.status(200).json({Message:"Success",CreateAccount});
    }

}

export const Signin = async(req,res,next)=>{
    const {email,password} = req.body;
    const User = await UserModel.findOne({email});
    if(!User){
        return next(new Error("Email Doesn't Exist",{cause:404}));
    }
    if(User.confirmed==false){
        return next(new Error("Please Confirm Your Email First",{cause:400}));
    }
    const Match = bcrypt.compareSync(password,User.password);
    if(!Match){
        return next(new Error("Invalid Password",{cause:400}));
    }
    const Token = jwt.sign({id:User._id,role:User.role,status:User.status},process.env.LOGIN_SIGNATURE,{
        expiresIn:"1h"});
    
    const RefreshToken = jwt.sign({id:User._id,role:User.role,status:User.status},process.env.LOGIN_SIGNATURE,{expiresIn:60*60*24})

    return res.status(200).json({Message:"Success",Token,RefreshToken});
}

export const Confirmation = async(req,res,next)=>{
    const token = req.params.token;
    const VerifyToken = jwt.verify(token,process.env.LOGIN_SIGNATURE);
    if(!VerifyToken){
        return next(new Error("Invalid Token",{cause:404}));
    }
    const User = await UserModel.findOneAndUpdate({email:VerifyToken.email,confirmed:false},{confirmed:true});
    if(!User){
        return next(new Error("Invalid Verification, or Email has been confirmed already"))
    }
    return res.status(200).json({Message:"Successfully Verified this Email"})
}

export const SendPassCode = async(req,res,next)=>{
    const {email} = req.body
    let Code = customAlphabet('12345ABCDE',6);
    Code = Code();
    const Update = await UserModel.findOneAndUpdate({email},{send_code:Code},{new:true});
    const HTML = `<h2>Code is:${Code}<h2>`
    await SendEmail(email,"Reset Password Code",HTML);
    return res.status(200).json({Message:"Success! Check Your Inbox for Verification Code",Update});
}

export const NewPassword = async(req,res,next)=>{
    const {email,password,code} = req.body;
    const User = await UserModel.findOne({email});
    if(!User){
        return next(new Error("Email Not Registered"));
    }
    if(User.send_code !=code){
        return next(new Error("Invalid Code"));
    }
    const Match = await bcrypt.compare(password,User.password);
    if(!Match){
        return next(new Error("New Password Cannot Be The Same As Old Password"));
    }
    User.password = await bcrypt.hash(password,parseInt(process.env.SALTROUND));
    User.send_code = null;
    User.passwordTime = Date.now();
    await User.save();
    return res.status(200).json({Message:"Password Changed Successfully"})
}