//CRUD stuff will go here

const Comment = require('../../db/models/comment');
const Post = require('../../db/models/post');
//users should be able to make a comment
//users should be able to have discussions 
createComment = (req, res) => {//create
    const body = req.body;
    // console.log('XXXXXXXX')
    // console.log('test: this is the req body', req.body)
    // console.log('XXXXXXXX')


    if (req.errors) {
        return res.status(400).json({
            "success": false,
            "errors": req.errors
        })
    }
    if (!body) {
        return res.status(400).json({
            "success": false,
            "errors": "Please write a comment"
        })
    }
    let comment = new Comment(body);

    if (!comment) {
        return res.status(400).json({ success: false, error: err })
    }

    comment
        .save()
        .then((newComment) => {
            let postObjectId = newComment.postId;
            console.log(newComment, 'newcomment', postObjectId, newComment._id)

            //related to .populate() comments on posts
            Post.findByIdAndUpdate(postObjectId, { $push: { comments: newComment._id } })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({
                        success: false,
                        error: 'Failed to update post with the new user reference.',
                    });
                });

        })
        .then(() => {

            return res.status(201).json({
                success: true,
                id: comment._id,
                data: comment,
                message: 'Comment created!',
            })

        })
        .catch((err) => {

            res.status(500).json({
                success: false,
                message: err
            })
        })
}


getComments = async (req, res) => {//read all comments
    console.log('getting... ')
    let comments = await Comment.find({})
    try {
        res.status(200).json({
            success: true,
            data: {
                comments
            }
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }

}

getCommentById = () => {//read comment by an id 

}



deleteCommentById = async (req, res) => {//delete

    let deleted = await Comment.findOne({ _id: req.params.id })

    try {

        let postObjectId = deleted.postId;
        //related to .populate() logic 
        await Post.findByIdAndUpdate(postObjectId, { $pull: { comments: deleted._id } })
        await Comment.findOneAndDelete({ _id: req.params.id })

        res.status(200).json({
            success: true,
            data: deleted
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }


}

editCommentbyId = () => {//update
}

module.exports = {
    createComment,
    getCommentById,
    getComments,
    deleteCommentById
}
