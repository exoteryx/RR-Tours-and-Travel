import CityModel from "../../../Models/CityModel.js";
import Cloudinary from "../../../Services/Cloudinary.js";

export const GetCities = async(req,res,next)=>{
const Find = await CityModel.find().populate("Tour");
return res.status(200).json({Message:"Showing All Cities",Find});
}

export const GetSpecificCity = async(req,res,next)=>{
    const City = await CityModel.findById(req.params.id);
    if(!City){
        return next(new Error("404 Not Found",{cause:404}));
    }
    return res.status(200).json({Message:"Success",City})
}

export const CreateCity = async(req,res,next)=>{
    const name = req.body.name.toLowerCase();
    const introduction = req.body.introduction;
    const CheckName = await CityModel.findOne({name});
    if(CheckName){
        return next(new Error("City Name Already Exists In Database",{cause:409}));
    }
    if(req.files && req.files.images){
        const images = []
        for(let image of req.body.images){
            const {secure_url,public_id } = await Cloudinary.uploader.upload(image.path, 
                {folder: `${process.env.APP_NAME}/City/${req.body.name}/Images`});
                    images.push({ secure_url, public_id })};
                       req.body.images = images;
};
    const create = await CityModel.create({name,introduction,images:req.body.images,created_by:req.user._id,updated_by:req.user._id});
    return res.status(200).json({Message:"City Created Successfully",create});
}

export const UpdateCity = async(req,res,next)=>{
    const City = await CityModel.findById(req.params.id);
    if(!City){
        return next(new Error("Invalid City ID",{cause:404}));
    }
    if(req.body.name){
        if(await CityModel.findOne({name:req.body.name}).select("name")){
            return next(new Error("City Name Already In Use"));
        }
        City.name = req.body.name;
    }
    if(req.body.introduction){
        City.introduction = req.body.introduction;
    }
    City.updated_by = req.user._id;
    await City.save();
    return res.status(200).json({Message:"Success",City});
}

export const DeleteCity = async(req,res,next)=>{
    const CityID = req.params.id; 
    const City = await CityModel.findByIdAndDelete(CityID);
    if(!City){
        return next(new Error("Invalid City ID",{cause:404}));
    }
    return res.status(200).json({Message:"Success"})

}