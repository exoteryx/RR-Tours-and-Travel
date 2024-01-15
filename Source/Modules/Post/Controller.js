import slugify from "slugify";
import PostModel from "../../../Models/PostMode.js";
import Cloudinary from "../../../Services/Cloudinary.js";

export const CreatePost = async (req,res,next)=>{
    if(req.file && req.file.image){
        const {secure_url,public_id}  =await Cloudinary.uploader.upload(req.files.image.path,{
            folder:`${process.env.APP_NAME}/Posts/${req.user._id}/Images`})
            req.body.image = {secure_url,public_id};
    };
    const Save = await PostModel.create(req.body);
    if(!Save){
        return next(new Error("Error While Saving"));
    }
    return res.status(200).json({Message:"Created Successfully",Save});
};

export const GetPosts = async(req,res,next)=>{
    const Get = await PostModel.find();
    return res.status(200).json({Message:"Success",Get});
};

export const GetSpecificPost = async(req,res,next)=>{
    const Find = await PostModel.findById(req.params.id);
    if(!Find){
        return next(new Error("Invalid Post ID"));
    }
    return res.status(200).json({Message:"Success",Find});
};

export const UpdatePost = async(req,res,next)=>{
    const Post = PostModel.findById(req.params.id);
    if(!Post){
        return next(new Error("Post Not Found"));
    }
    if(req.body.title){
        Post.title = req.body.title;
    };
    if(req.body.body){
        Post.body = req.body.body;
    };
    if(req.file && req.file.image){
        const {secure_url,public_id} = await Cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.APP_NAME}/Post/${req.user._id}/Images`});
            await Cloudinary.uploader.destroy(Post.image.public_id);
            Post.image = {secure_url,public_id};
    }
    Post.updated_by = req.user._id;
    await Post.save();
    return res.status(200).json({Message:"Success"});
}

export const DeletePost = async(req,res,next)=>{
    const PostID = req.params.id
    const Post = await PostModel.findByIdAndDelete(PostID);
    if(!Post){
        return next(new Error("Post Not Found",{cause:404}));
    }
    return res.status(200).json({Message:"Success"});
}