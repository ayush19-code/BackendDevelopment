const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const validatePost = require('../middleware/validatePost');

// GET /api/posts - Get all posts
router.get('/posts', apiController.getPostsAPI);

// GET /api/posts/:id - Get post by ID
router.get('/posts/:id', apiController.getPostByIdAPI);

// POST /api/posts - Create post
router.post('/posts', validatePost, apiController.createPostAPI);

// PUT /api/posts/:id - Update post
router.put('/posts/:id', validatePost, apiController.updatePostAPI);

// DELETE /api/posts/:id - Delete post
router.delete('/posts/:id', apiController.deletePostAPI);

module.exports = router;
