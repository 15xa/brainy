    import express from "express";
    import jwt from "jsonwebtoken";
    import cors from 'cors'
    import { UserModel, LinkModel, ContentModel } from "./db";
    import { JWT_secret } from "./config";
import { userMiddleware } from "./middleware";


    const app = express();
    app.use(express.json());
    app.use(cors());


    app.post("/api/signup", async(req, res)=> {
        const username = req.body.username;
        const password = req.body.password;

        const existingUser = await UserModel.findOne({
            username
        })
        if (existingUser){
            res.status(411).json({
                message: "Username already exits"
            })
        }
        else{

            await UserModel.create({
                username: username,
                password: password
            })
            res.json({
                message: "user signed up"
            })
        }
        
    })
    app.post("/api/signin", async(req, res)=> {
        const username = req.body.username;
        const password = req.body.password;

        const existingUser = await UserModel.findOne({
            username,
            password
        })
        if (existingUser){
            //@ts-ignore
            const token = jwt.sign({
                id: existingUser._id,
            },JWT_secret);

            res.json({
                message: "Signed in"
            })
        }else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    })
    app.post("/api/content", userMiddleware, async(req, res)=> {
        const link = req.body.link;
        const type = req.body.type;

        await ContentModel.create({
            link,
            type,
            title: req.body.title,
            userId: req.body.userId,
            tags: [],


        })

        res.json({
            message: "Content added"
        })
    })

    app.get("/api/content", async(req, res)=> {
        // @ts-ignore
        const userId = req.userId;
        const content = await ContentModel.findOne({
            userId: userId,
        }).populate("userId", "username")
        res.json({
            content
        })
    })
    app.delete("/api/content", async(req, res)=> {
        const contentId = req.body.contentId;
        const userId = req.body.userId;

        await ContentModel.deleteMany({
            contentId,
            userId
        })
        res.json({
        messege: "deleted"
        })
    })

    app.listen(4110);
    console.log("started 4110")