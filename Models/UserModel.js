import mongoose, {Schema,Types,model} from "mongoose";

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    confirmed:{
        type:Boolean,
        default:false,
    },
    pfp:{
        type:Object,
        default:"https://res.cloudinary.com/dkipqev3m/image/upload/v1702641928/RR_Tours/Templates/e_yskyxz.png"
    },
    gender:{
        type:String,
        default:"unspecified",
        enum:["male","female","unspecified"],
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"],
    },
    phone:{
        type:Number,
    },
    status:{
        type:String,
        default:"active",
        enum:["active","inactive"],
    },
    send_code:{
        type:String,
        default:null,
    },
    passwordTime:{
        type:Date,
    },
},{
    timestamps:true,
})

const UserModel = mongoose.models.User || model('User',UserSchema);

export default UserModel;