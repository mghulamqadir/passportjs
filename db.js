import { connect, model, Schema } from "mongoose";

const connectMongoose = () => {
    connect("mongodb://localhost:27017/passport")
        .then((e) => console.log(`Connected to MongoDB:${e.connection.host}`))
        .catch((e) => console.log(e));
};

const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = model("User", userSchema);

export { connectMongoose, User };
