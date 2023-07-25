//CRUD stuff will go here

const Comment = require('../../db/models/comment');
//users should be able to make a comment
//users should be able to have discussions 
createComment = (req, res) => {//create
    const body = req.body;
    console.log('XXXXXXXX')
    console.log('test: this is the req body', req.body)
    console.log('XXXXXXXX')


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
        .then(() => {
            return res.status(201).json({
                success: true,
                id: comment._id,
                data: comment,
                message: 'Comment created!',
            })

        })

}


getComments = async (req, res) => {//read all comments
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

    let deleted = await Comment.findOneAndDelete({ _id: req.params.id })

    try {
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
