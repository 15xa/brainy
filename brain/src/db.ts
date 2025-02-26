import mongoose, {Schema, model} from 'mongoose';
import "dotenv/config"

const connect = async() => {try
{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongo connected");
}
catch(e){
    console.log(" error " + e)
}
}
connect();

const UserSchema = new Schema({
    username: String,
    password: String
});

export const UserModel = model("users", UserSchema);

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref:'Tag'}],
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
})

const LinkSchema =  new Schema({
    hash: String,
    userId: {type:mongoose.Types.ObjectId, ref:'User', required: true, unique: true},

})

export const LinkModel = model("Links", LinkSchema);
export const ContentModel = model("Content", ContentSchema);