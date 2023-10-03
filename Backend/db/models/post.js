const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
    //association will be similar to this:
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    title: {
        type: String,
        minLength: 4,
        required: true,
    },
    body: {
        type: String,
        minLength: 1,
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
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }]

}, { timestamps: true });

const Post = mongoose.model("Posts", PostSchema);

module.exports = Post;




//test object for POSTMAN:
const testPost = {
    "user": "64f8adfef9aaa8334b8e9b63",
    "title": "Associated to user",
    "body": "This is a post, should be associated to user",
    "isLiked": true,
    "numLikes": 0,
    "topic": "test"
}
