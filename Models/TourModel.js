import mongoose, { Types , model , Schema } from 'mongoose';

const TourSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
    },
    desc:{
        type:String,
        required:true,
    },
    mainImage:{
        type:Object,
    },
    subImages:{
        type:Object,
    },
    length:{
        type:String,
        required:true,
    },
    cost:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        default:"Active",
        enum:["Active","Inactive"],

    },
    citiesIDs:[{
        type:Types.ObjectId,
        ref:"City",
    }],
    created_by:{
        type:Types.ObjectId,
        ref:"User",
    },
    updated_by:{
        type:Types.ObjectId,
        ref:"User",
    }
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
});
TourSchema.virtual("City",{
    localField:"_id",
    foreignField:"toursIDs",
    ref:"City"
})

const TourModel = mongoose.models.Tour || model("Tour",TourSchema);

export default TourModel;