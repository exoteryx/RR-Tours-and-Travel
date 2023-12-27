import CityModel from "../../../Models/CityModel.js";
import TourModel from "../../../Models/TourModel.js";
import Cloudinary from "../../../Services/Cloudinary.js";
import slugify from "slugify";

export const GetTours = async(req,res,next)=>{
    const Find = await TourModel.find().populate("City");
    return res.status(200).json({Message:"Showing All Tours:",Find});
}

export const GetActiveTours = async(req,res,next)=>{
    const Tour = await TourModel.find({status:"Active"}).select("name mainImage");
    return res.status(200).json({Message:"Success! Displaying All Active Categories",Tour});
}
export const GetSpecificTour = async(req,res,next)=>{
    const Tour = await TourModel.findById(req.params.id);
    if(!Tour){
        return next(new Error("404 Not Found"));
    }
    return res.status(200).json({Message:"Success",Tour});
}

export const CreateTour = async(req,res,next)=>{
    const {name} = req.body;
    req.body.slug = slugify(name);


if(req.files && req.files.mainImage){
        const {secure_url,public_id} = await Cloudinary.uploader.upload(req.files.mainImage[0].path,
            {folder:`${process.env.APP_NAME}/Tour/${req.body.name}/Main_Image`});
                req.body.mainImage = {secure_url,public_id};
}
if(req.files && req.files.subImages){
        const images = []
        for (let image of req.files.subImages) {
            const {secure_url,public_id } = await Cloudinary.uploader.upload(image.path, 
                {folder: `${process.env.APP_NAME}/Tour/${req.body.name}/Sub_Images`});
                    images.push({ secure_url, public_id })};
                       req.body.subImages = images;
};

const Save = await TourModel.create(req.body);
if(!Save){
        return next(new Error("Error while creating tour"));
    }
    return res.status(200).json({Message:"Success",Save});
}

/*export const InsertCityinTour = async(req,res,next)=>{
const tourID = req.params.id
const {citiesIDs} = req.body;
for(const id of citiesIDs){
    const loop = await CityModel.findById(id);
    if(!loop){
        return next(new Error("Invalid City",{cause:404}));
    }
}     
const Check = await TourModel.findById(tourID);
    if(!Check){
        return next(new Error("Invalid Tour ID"))
    }
     await TourModel.findByIdAndUpdate(tourID,{citiesIDs})
    for(const id of citiesIDs){
        await CityModel.findByIdAndUpdate(id,{toursIDs:tourID},{new:true})
    }
    return res.json({Message:"success"});
}*/


export const UpdateTour = async(req,res,next)=>{
    const Tour = await TourModel.findById(req.params.id);
        if(!Tour){
        return next(new Error("Invalid Tour ID"))
        }
    if(req.body.name){
        Tour.name = req.body.name;
        Tour.slug = slugify(req.body.name);
    }
    if(req.body.desc){
        Tour.desc = req.body.desc;
    }
    
    if(req.body.status){
        Tour.status = req.body.status;
    }
    if(req.body.length){
        Tour.length = req.body.length;
    }
    if(req.body.cost){
        Tour.cost = req.body.cost;
    }
    if(req.files && req.files.mainImage){
        const {secure_url,public_id} = await Cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.APP_NAME}/Tour/${Tour.name}/Main_Image`});
            await Cloudinary.uploader.destroy(Tour.mainImage.public_id);
            Tour.mainImage = {secure_url,public_id};
    }
    if(req.body.citiesIDs){
        const {citiesIDs} = req.body;
        for(const id of citiesIDs){
            const loop = await CityModel.findById(id);
                if(!loop){
                    return next(new Error("Invalid City",{cause:404}));
            }
        }
        await TourModel.findByIdAndUpdate(Tour,{citiesIDs});
        for(const id of citiesIDs){
            await CityModel.findByIdAndUpdate(id,{toursIDs:Tour},{new:true})
        }     
    }
    Tour.updated_by = req.user._id
    await Tour.save()
    return res.status(200).json({Message:"Success",Tour});
}

export const DeleteTour = async(req,res,next)=>{
    const TourID = req.params.id;
    const Tour = await TourModel.findByIdAndDelete(TourID);
    if(!Tour){
        return next(new Error("404 Not Found",{cause:404}))
    }
    return res.status(200).json({Message:"Success"});
}
