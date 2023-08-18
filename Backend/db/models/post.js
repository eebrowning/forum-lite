// import mongoose from "mongoose";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
    //association will be similar to this:
    user: {//google api stuff might change this stuff.
        type: Number,//this will change, will be Google ID (ex: 101518615856371771990)
        required: true,
        // ref: 'users' //not sure how this will go with google api for users, probably not necessary
    },
    title: {
        type: String,
        minLength: 5,
        required: true,
    },
    body: {
        type: String,
        minLength: 2,
        required: true,
    },
    isLiked: {
        type: Boolean,
        required: false,
    },
    numLikes: {
        type: Number,
        required: false
    },
    topic: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
