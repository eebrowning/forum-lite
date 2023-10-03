//CRUD stuff will go here

const Post = require('../../db/models/post');
const User = require('../../db/models/user');
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

    // post.save()
    //     .then(() => {
    //         return res.status(201).json({
    //             success: true,
    //             id: post._id,
    //             data: post,
    //             message: 'Post created!',
    //         })

    //     })

    post.save()
        .then((newPost) => {
            // Add the new post's ID to the user's 'posts' array
            let userObjectId = post.user;
            User.findByIdAndUpdate(userObjectId, { $push: { posts: newPost._id } })
                .then(() => {
                    return res.status(201).json({
                        success: true,
                        id: newPost._id,
                        data: newPost,
                        message: 'Post created!',
                    });
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({
                        success: false,
                        error: 'Failed to update user with the new post reference.',
                    });
                });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                success: false,
                error: 'Failed to create the post.',
            });
        });
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


    let deleted = await Post.findOne({ _id: req.params.id })

    console.log(deleted, 'bleeeeeeh')

    try {

        let userObjectId = deleted.user;
        // User.findByIdAndUpdate(userObjectId, { $pull: { posts: req.params.id } })
        await User.findByIdAndUpdate(userObjectId, { $pull: { posts: deleted._id } })
        // .then(() => {

        //     return res.status(200).json({
        //         success: true,
        //         message: 'Post deleted successfully.',
        //     });
        // })
        // .catch((err) => {
        //     console.error(err);
        //     return res.status(500).json({
        //         success: false,
        //         error: 'Failed to update user after deleting the post.',
        //     });
        // });
        await Post.findOneAndDelete({ _id: req.params.id })



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
