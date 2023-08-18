
const express = require('express')
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const CommentCtrl = require('../controllers/comments-ctrl');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router()

const validateComment = [//pass as middleware with the correct fields


];


router.post('/', CommentCtrl.createComment)//
router.get('/', CommentCtrl.getComments)
router.delete('/:id', CommentCtrl.deleteCommentById)

// router.put('/:id', CommentCtrl.createComment)//edit can be done later



module.exports = router
