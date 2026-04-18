const forumService = require('../services/forum.service');

const create = async (req, res) => {
  try {
    const forum = await forumService.create(req.user.id, req.body);
    res.status(201).json(forum);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const getAll = async (req, res) => {
  const forums = await forumService.getAll();
  res.json(forums);
};

const getById = async (req, res) => {
  try {
    const forum = await forumService.getById(req.params.id);
    if (!forum) return res.status(404).json({ error: 'Forum not found' });
    res.json(forum);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const join = async (req, res) => {
  try {
    await forumService.join(req.user.id, req.params.id);
    res.json({ message: 'Joined' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const leave = async (req, res) => {
  try {
    await forumService.leave(req.user.id, req.params.id);
    res.json({ message: 'Left' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await forumService.getPostsByForum(req.params.id, req.query.page);
    res.json(posts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { create, getAll, getById, join, leave, getPosts };
