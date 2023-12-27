import mongoose,{Schema,Types,model} from "mongoose";

const CitySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    introduction:{
        type:String,
        required:true,
    },
    images:{
        type:Object,
    },
    toursIDs:[{
        type:Types.ObjectId,
        ref:"Tour",
    }],

},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
});
CitySchema.virtual('Tour',{
    localField:"_id",
    foreignField:"citiesIDs",
    ref:"Tour"
})

const CityModel = mongoose.models.City || model("City",CitySchema);

export default CityModel;