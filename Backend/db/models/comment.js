// import mongoose from "mongoose";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
    //association will be similar to this:
    user: {//google api stuff might change this stuff.
        type: Schema.Types.ObjectId,//this will change
        ref: 'users' //not sure how this will go with google api for users
    },
    name: {
        type: String,
        minLength: 4,
        required: true,
    },
    text: {
        type: String,
        minLength: 10,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    isLiked: {
        type: Boolean,
        required: false,
    },
    numLikes: {
        type: Number,
        required: false
    }
}, { timestamps: true });

const Comment = mongoose.model("Profile", CommentSchema);

module.exports = Comment;
