// import mongoose from "mongoose";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
    //association will be similar to this:
    user: {//google api stuff might change this stuff.
        type: Number,//this will change
        ref: 'users' //not sure how this will go with google api for users
    },
    text: {
        type: String,
        minLength: 10,
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
        required: false
    }
}, { timestamps: true });

const Comment = mongoose.model("Profile", CommentSchema);

module.exports = Comment;
