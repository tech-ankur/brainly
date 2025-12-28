import mongoose from 'mongoose';



export async function connectDB() {
  const mongoUrl = process.env.MONGOOSE_URL;

if (!mongoUrl) {
  throw new Error("MONGOOSE_URL is not defined in environment variables");
}

await mongoose.connect(mongoUrl);
}

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
  }
);




const tagSchema=new mongoose.Schema(
    {
        name:{type:String,required:true,unique:true}
    })
   
const contentSchema=new mongoose.Schema(
    {
        link:{type:String,required:true},
        type:{type:String,required:true},
        title:{type:String,required:true},
       
        tags:{type:[mongoose.Schema.Types.ObjectId],ref:"tags"},
        userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    }
)

const LinkSchema=new mongoose.Schema(
    {
       hash:String,
        userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true,unique:true},
    }
)

export const UserModel=mongoose.model("user",UserSchema);
export const ContentModel=mongoose.model("content",contentSchema);
export const TagModel=mongoose.model("tags",tagSchema);
export const LinkModel=mongoose.model("links",LinkSchema); 