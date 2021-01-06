const express = require('express')
const router = express.Router()
const postController = require('../controller/posts')

router.get('/get-posts',postController.getPosts)
router.post('/create-post',postController.createPost)
router.put('/like',postController.likePost)

module.exports = router