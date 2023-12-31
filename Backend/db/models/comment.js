// import mongoose from "mongoose";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Comments will belong to a user, and to a post
const CommentSchema = Schema({
    //association will be similar to this:
    user: {//google api stuff might change this stuff.
        type: mongoose.Schema.Types.ObjectId,//this will change, will be Google ID (ex: 101518615856371771990)
        required: true,
        ref: 'Users' //not sure how this will go with google api for users, probably not necessary
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Posts'
    },
    text: {
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
    // topic: {
    //     type: String,
    //     required: true
    // }
}, { timestamps: true });


const Comment = mongoose.model("Comments", CommentSchema);

module.exports = Comment;




//Test Comment for POSTMAN
const testComment = {
    "user": "64ecd3b95408311fe618eb57",
    "postId": "65256a0bfbda42a6bf52a749",
    "text": "Should be associated to post w/ postId"
}
