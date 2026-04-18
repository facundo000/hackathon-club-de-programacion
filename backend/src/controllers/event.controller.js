const eventService = require('../services/event.service');

const create = async (req, res) => {
  try {
    const event = await eventService.create(req.user.id, req.body);
    res.status(201).json(event);
  } catch (e) { res.status(400).json({ error: e.message }); }
};

const getAll = async (req, res) => {
  try {
    const result = await eventService.getAll(req.query);
    res.json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const getFeed = async (req, res) => {
  try {
    const { page, location, categories, gameIds } = req.query;
    const result = await eventService.getFeed(req.user.id, {
      page,
      location,
      categories: categories ? categories.split(',').map((c) => c.trim()) : undefined,
      gameIds:    gameIds    ? gameIds.split(',').map((id) => id.trim())  : undefined,
    });
    res.json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const getById = async (req, res) => {
  try {
    const event = await eventService.getById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const join = async (req, res) => {
  try {
    const event = await eventService.join(req.user.id, req.params.id);
    res.json(event);
  } catch (e) { res.status(400).json({ error: e.message }); }
};

const leave = async (req, res) => {
  try {
    const event = await eventService.leave(req.user.id, req.params.id);
    res.json(event);
  } catch (e) { res.status(400).json({ error: e.message }); }
};

const updateStatus = async (req, res) => {
  try {
    const event = await eventService.updateStatus(req.user.id, req.params.id, req.body.status);
    res.json(event);
  } catch (e) { res.status(400).json({ error: e.message }); }
};

module.exports = { create, getAll, getFeed, getById, join, leave, updateStatus };
