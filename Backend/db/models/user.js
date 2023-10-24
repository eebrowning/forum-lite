// import mongoose from "mongoose";
const mongoose = require('mongoose');
const Post = require('./post');
const Comment = require('./comment');

const Schema = mongoose.Schema;

const UserSchema = Schema({
    password: {//will be hashed or handled with oAuth, will test to prove before deploying
        type: String,
        minLength: 6,
        // required: true, //not true for google and facebook users
    },
    email: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        minLength: 2,
        required: true,
    },
    lastname: {
        type: String,
        minLength: 2,
        required: true,
    },
    googleId: String,
    facebookId: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }]

}, { timestamps: true }, { strict: true, strictQuery: false });

UserSchema.pre('findOneAndDelete', function (next) {
    let userId = this.getQuery()._id;
    Post.deleteMany({ user: userId }).exec();
    Comment.deleteMany({ user: userId }).exec();
    next();
})


const User = mongoose.model("Users", UserSchema);

module.exports = User;
