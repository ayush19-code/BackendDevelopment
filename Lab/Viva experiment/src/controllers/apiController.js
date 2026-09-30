const Post = require('../models/Post');
const mongoose = require('mongoose');

/**
 * @desc    Get all posts (API)
 * @route   GET /api/posts
 * @access  Public
 */
exports.getPostsAPI = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Posts retrieved successfully',
      count: posts.length,
      data: posts
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single post by ID (API)
 * @route   GET /api/posts/:id
 * @access  Public
 */
exports.getPostByIdAPI = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid post ID format'
      });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post retrieved successfully',
      data: post
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a post (API)
 * @route   POST /api/posts
 * @access  Public
 */
exports.createPostAPI = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;

    const post = new Post({
      title: title.trim(),
      content: content.trim(),
      author: author.trim()
    });

    const savedPost = await post.save();

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: savedPost
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a post (API)
 * @route   PUT /api/posts/:id
 * @access  Public
 */
exports.updatePostAPI = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid post ID format'
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, author },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a post (API)
 * @route   DELETE /api/posts/:id
 * @access  Public
 */
exports.deletePostAPI = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid post ID format'
      });
    }

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
      data: { id: deletedPost._id }
    });
  } catch (error) {
    next(error);
  }
};
