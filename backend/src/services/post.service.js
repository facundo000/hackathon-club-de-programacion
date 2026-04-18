const Post = require('../models/Post');
const Forum = require('../models/Forum');

const create = async (userId, { forumId, title, content, image }) => {
  const forum = await Forum.findById(forumId);
  if (!forum) throw new Error('Forum not found');
  return Post.create({ title, content, image, author: userId, forum: forumId });
};

const getById = async (id) => {
  return Post.findById(id)
    .populate('author', 'username avatar')
    .populate('forum', 'name')
    .populate('comments.author', 'username avatar');
};

const upvote = async (userId, postId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error('Post not found');
  const already = post.upvotes.includes(userId);
  if (already) {
    post.upvotes.pull(userId);
  } else {
    post.upvotes.push(userId);
  }
  await post.save();
  return { upvotes: post.upvotes.length, voted: !already };
};

const addComment = async (userId, postId, content) => {
  const post = await Post.findByIdAndUpdate(
    postId,
    { $push: { comments: { author: userId, content } } },
    { new: true }
  ).populate('comments.author', 'username avatar');
  return post.comments;
};

const getFeed = async (userId, page = 1) => {
  const limit = 20;
  const forums = await Forum.find({ members: userId }).select('_id');
  const forumIds = forums.map((f) => f._id);

  const [posts, total] = await Promise.all([
    Post.find({ forum: { $in: forumIds } })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'username avatar')
      .populate('forum', 'name avatar')
      .lean(),
    Post.countDocuments({ forum: { $in: forumIds } }),
  ]);

  const enriched = posts.map((post) => ({
    ...post,
    upvoteCount: post.upvotes.length,
    commentCount: post.comments.length,
    hasUpvoted: post.upvotes.map(String).includes(String(userId)),
    upvotes: undefined,
    comments: undefined,
  }));

  return {
    posts: enriched,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    total,
  };
};

const remove = async (userId, postId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error('Post not found');
  if (post.author.toString() !== userId) throw new Error('Unauthorized');
  await post.deleteOne();
};

module.exports = { create, getById, upvote, addComment, getFeed, remove };
