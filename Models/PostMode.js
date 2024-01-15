import mongoose , { Schema,Types,model } from "mongoose";

const PostSchema =new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    image:{
        type:Object,
    },
    author:{
        type:Types.ObjectId,
        ref:"User",
    },
    created_by:{
        type:Types.ObjectId,
        ref:"User",
    },
    updated_by:{
        type:Types.ObjectId,
        ref:"User",
    },
},{
    timestamps:true,
}) 

const PostModel = mongoose.models.Post || model("Post",PostSchema);

export default PostModel;