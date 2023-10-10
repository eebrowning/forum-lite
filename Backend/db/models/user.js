// import mongoose from "mongoose";
const mongoose = require('mongoose');
const Post = require('./post');
const Comment = require('./comment');

const Schema = mongoose.Schema;
//will have user creation: need to incorporate passport and oauth


const UserSchema = Schema({
    password: {//will be hashed or handled with oAuth, will test to prove before deploying
        type: String,
        minLength: 2,
        required: true,
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
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }]

}, { timestamps: true });

UserSchema.pre('findOneAndDelete', function (next) {
    let userId = this.getQuery()._id;
    Post.deleteMany({ user: userId }).exec();
    Comment.deleteMany({ user: userId }).exec();
    next();
})


const User = mongoose.model("Users", UserSchema);

module.exports = User;
