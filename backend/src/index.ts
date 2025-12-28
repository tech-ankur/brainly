import express from 'express';
import { connectDB, ContentModel, LinkModel, UserModel } from './db.js';
import bcrypt from 'bcrypt';
const app=express();
import dotenv from 'dotenv';
dotenv.config();
import {z} from 'zod';
import { ZodError } from "zod";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config.js';
import { userauth } from './middleware.js';
import { generateHash } from './utils.js';
import cors from 'cors';

connectDB()

app.use(cors());
app.use(express.json());

const signupSchema=z.object({
    username:z.string().min(3),
    password:z.string().min(6)
});

app.get("/", (req, res) => {
    res.json({ message: "Backend is running!", database: "Connected" });
});
app.post("/app/v1/signup", async (req, res) => {
  try {
    // Zod validation
    const { username, password } = signupSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    await UserModel.create({
      username,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User signed up successfully",
    });

  } catch (error) {
    // Zod validation error
    if (error instanceof ZodError) {
      return res.status(422).json({
        message: "Invalid input",
        errors: error.issues,
      });
    }

    // Server error
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.post("/app/v1/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ token });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});


app.post("/app/v1/content",userauth,async(req,res)=>{
const userId=(req as any).userId;
const {link,type,title}=req.body;
await ContentModel.create({
    link,
    type,
    title,
    tags:[],
    userId:userId

})
return res.json({message:"Content created successfully"})

})

app.get("/app/v1/content",userauth,async(req,res)=>{
const userId=(req as any).userId;
const content =await ContentModel.find({userId:userId}).populate("userId","username");
return res.json({content});

})

app.delete("/app/v1/content",userauth,async(req,res)=>{
    const contentId=req.body.contentId;
    await ContentModel.deleteMany(
      {
        contentId,
        userId:(req as any  ).userId

      })
})

app.post("/app/v1/brain/share", userauth, async (req, res) => {
  try {
    const { share } = req.body;
    const userId = (req as any).userId;

    if (typeof share !== "boolean") {
      return res.status(400).json({
        message: "share must be a boolean value",
      });
    }

    // ENABLE SHARING
    if (share) {
      let link = await LinkModel.findOne({ userId });

      if (!link) {
        const hash = generateHash(10);
        link = await LinkModel.create({ userId, hash });
      }

      return res.status(200).json({
        message: link.hash
      });
    }

    // DISABLE SHARING
    await LinkModel.deleteOne({ userId });

    return res.status(200).json({
      message: "Sharing disabled successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});


app.get("/app/v1/brain/:shareLink",async(req,res)=>{
const hash=req.params.shareLink;
const link=await LinkModel.findOne({hash:hash});

if(!link){
  return res.status(411).json({message:"Link not found"});

}
const content=await ContentModel.find({userId:link.userId})
const user=await UserModel.findById(link.userId);
if(!user){
  return res.status(411).json({message:"User not found"});
}
return res.json({
  username:user.username,
  content
})
})

if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
        console.log("Local server started on port 3000");
    });
}

export default app;