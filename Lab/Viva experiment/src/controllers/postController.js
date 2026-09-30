const Post = require('../models/Post');
const mongoose = require('mongoose');

/**
 * @desc    Display all posts (Post List Page)
 * @route   GET / or GET /posts
 * @access  Public
 */
exports.getAllPosts = async (req, res, next) => {
  try {
    // Retrieve posts from MongoDB excluding full content as required by specification
    const posts = await Post.find()
      .select('title author createdAt')
      .sort({ createdAt: -1 });

    res.render('index', {
      title: 'Simple CMS - All Blog Posts',
      posts: posts
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Display form to create a new post
 * @route   GET /posts/new
 * @access  Public
 */
exports.getCreatePostForm = (req, res) => {
  res.render('create', {
    title: 'Create New Post - Simple CMS',
    error: null,
    formData: { title: '', content: '', author: '' }
  });
};

/**
 * @desc    Create a new post in MongoDB
 * @route   POST /posts
 * @access  Public
 */
exports.createPost = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;

    // Creation date is generated automatically by server/schema (createdAt: Date.now)
    const newPost = new Post({
      title: title.trim(),
      content: content.trim(),
      author: author.trim()
    });

    await newPost.save();

    // Redirect to post list page as required by assignment specification
    res.redirect('/posts');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Display individual complete post by ID
 * @route   GET /posts/:id
 * @access  Public
 */
exports.getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if provided ID is valid MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).render('error', {
        title: 'Post Not Found',
        statusCode: 404,
        message: 'Invalid post ID format.'
      });
    }

    // Retrieve complete post details including content from MongoDB
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).render('error', {
        title: 'Post Not Found',
        statusCode: 404,
        message: 'Post not found in database.'
      });
    }

    res.render('show', {
      title: `${post.title} - Simple CMS`,
      post: post
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a post by ID
 * @route   POST /posts/:id/delete
 * @access  Public
 */
exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).redirect('/posts');
    }
    await Post.findByIdAndDelete(id);
    res.redirect('/posts');
  } catch (error) {
    next(error);
  }
};
