const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const validatePost = require('../middleware/validatePost');

// GET / and GET /posts - Display all posts
router.get('/', postController.getAllPosts);
router.get('/posts', postController.getAllPosts);

// GET /posts/new - Display create post form
router.get('/posts/new', postController.getCreatePostForm);

// POST /posts - Create a new post with validation
router.post('/posts', validatePost, postController.createPost);

// GET /posts/:id - Display individual post details
router.get('/posts/:id', postController.getPostById);

// POST /posts/:id/delete - Delete post
router.post('/posts/:id/delete', postController.deletePost);

module.exports = router;
