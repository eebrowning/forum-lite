const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
    //association will be similar to this:
    user: {//google api stuff might change this stuff.
        type: String,//this will change, will be Google ID (ex: 101518615856371771990)
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

const Post = mongoose.model("Posts", PostSchema);

module.exports = Post;




//test object for POSTMAN:
// const testPost = {
//     "user": 1,
//     "title": "Test Title",
//     "body": "This is a post about posts and stuff",
//     "isLiked": true,
//     "numLikes": 0,
//     "topic": "test"
// }
