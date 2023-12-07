//CRUD stuff will go here

const Comment = require('../../db/models/comment');
const Post = require('../../db/models/post');
const User = require('../../db/models/user');
const deleted = require('../../db/models/deletePostById');
const edit = require('../../db/models/editPostById');

createPost = (req, res) => {//create
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
            //related to .populate() 
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
    let posts = await Post.find({}).populate('comments')
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

getPostById = async (req, res) => {//read post by an id 
    // console.log(req.params.id, 'req params')
    let post = await Post.findOne({ _id: req.params.id }).populate('comments');
    console.log(post, 'post')


    try {
        res.status(200).json({
            success: true,
            data: post
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }

}


deletePostById = async (req, res) => {//delete

    let deleted = await Post.findOne({ _id: req.params.id })
    

    try {

        let userObjectId = deleted.user;
        //related to .populate() logic
        //await User.findByIdAndUpdate(userObjectId, { $pull: { posts: deleted._id } })
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

editPostById = async (req, res) => {//Edit the post
    let edit = await Post.findOne({ _id: req.params.id }).populate('comments');
    console.log(edit, 'post')
    //try {
    //    //let userObjectId=edit.user;
    //    // related to populate logic
    //    //await User.findByIdAndUpdate(userObjectId, { $pull: { posts: edit._id } })
    //    res.status(200).json({
    //        success: true,
    //        data: edit
    //    })
    //} catch (err) {
    //    res.status(500).json({
    //        success: false,
    //        message: err
    //    })
    //}
    edit.save()
        .then(async (editPost) => {
            // Edit post's to the existing user's 'posts' array
            try {
                let userObjectId = edit.user;
                //related to .populate()
                //await User.findByIdAndUpdate(userObjectId, { $pull: { posts: editPost._id } })
                // pushing the edited post .populate()
                await User.findByIdAndUpdate(userObjectId, { $push: { posts: editPost._id } })
                    .then(() => {
                        return res.status(201).json({
                            success: true,
                            id: editPost._id,
                            data: editPost,
                            message: 'Post Edited!',
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                        return res.status(500).json({
                            success: false,
                            error: 'Failed to Edit user with the new post reference.',
                        });
                    })
            }
            catch (err) {
                 res.status(500).json({
                 success: false,
                 message: err
                })
            }
        })
}

module.exports = {
    createPost,
    getPostById,
    getPosts,
    deletePostById,
    editPostById
}
