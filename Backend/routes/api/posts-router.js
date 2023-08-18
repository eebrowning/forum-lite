
const express = require('express')
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const PostCtrl = require('../controllers/posts-ctrl');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router()

const validatePost = [//pass as middleware with the correct fields


];


router.post('/', PostCtrl.createPost)//
router.get('/', PostCtrl.getPosts)
router.delete('/:id', PostCtrl.deletePostById)

// router.put('/:id', PostCtrl.createPost)//edit can be done later



module.exports = router
