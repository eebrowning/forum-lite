//CRUD stuff will go here

const Post = require('../../db/models/post');
//users should be able to make a post
//users should be able to have discussions 
createPost = (req, res) => {//create
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
            "errors": "Please write a post"
        })
    }
    let post = new Post(body);

    if (!post) {
        return res.status(400).json({ success: false, error: err })
    }

    post
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: post._id,
                data: post,
                message: 'Post created!',
            })

        })

}


getPosts = async (req, res) => {//read all posts
    let posts = await Post.find({})
    try {
        res.status(200).json({
            success: true,
            data: {
                posts
            }
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }

}

// getpostById = () => {//read post by an id 

// }



deletePostById = async (req, res) => {//delete

    let deleted = await Post.findOneAndDelete({ _id: req.params.id })

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

// editpostbyId = () => {//update
// }

module.exports = {
    createPost,
    // getPostById,
    getPosts,
    deletePostById
}
