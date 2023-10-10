const mongoose = require('mongoose');
const Comment = require('./comment');
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

PostSchema.pre('findOneAndDelete', function (next) {
    // console.log('attempting to cascade delete comments...')
    Comment.deleteMany({ postId: this.getQuery()._id }).exec();
    next();
});

const Post = mongoose.model("Posts", PostSchema);

module.exports = Post;



//test object for POSTMAN:
const testPost = {
    "user": "64ecd3b95408311fe618eb57",
    "title": "Associated to Wendys",
    "body": "This is a post, should be associated to Wendys",
    "isLiked": true,
    "numLikes": 0,
    "topic": "test"
}
