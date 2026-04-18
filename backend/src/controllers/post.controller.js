const postService = require('../services/post.service');

const create = async (req, res) => {
  try {
    const post = await postService.create(req.user.id, req.body);
    res.status(201).json(post);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const getById = async (req, res) => {
  try {
    const post = await postService.getById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const upvote = async (req, res) => {
  try {
    const result = await postService.upvote(req.user.id, req.params.id);
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const addComment = async (req, res) => {
  try {
    const comments = await postService.addComment(req.user.id, req.params.id, req.body.content);
    res.json(comments);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const getFeed = async (req, res) => {
  try {
    const posts = await postService.getFeed(req.user.id, req.query.page);
    res.json(posts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const remove = async (req, res) => {
  try {
    await postService.remove(req.user.id, req.params.id);
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { create, getById, upvote, addComment, getFeed, remove };
