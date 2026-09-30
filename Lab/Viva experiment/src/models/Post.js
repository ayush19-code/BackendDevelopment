const mongoose = require('mongoose');

/**
 * Post Schema definition for MongoDB
 * Defines the structure of blog post documents stored in MongoDB
 */
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
      trim: true
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true
    },
    // Creation date generated automatically on server when post is created
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

/**
 * Helper virtual to get human-readable formatted date string (e.g., "26 September 2026")
 */
postSchema.virtual('formattedDate').get(function () {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return this.createdAt.toLocaleDateString('en-GB', options);
});

// Ensure virtual fields are serialized in JSON
postSchema.set('toJSON', { virtuals: true });
postSchema.set('toObject', { virtuals: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
