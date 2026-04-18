const gameService = require('../services/game.service');

const create = async (req, res) => {
  try {
    const game = await gameService.create(req.body);
    res.status(201).json(game);
  } catch (e) { res.status(400).json({ error: e.message }); }
};

const getAll = async (req, res) => {
  const games = await gameService.getAll(req.query.q);
  res.json(games);
};

const getById = async (req, res) => {
  try {
    const game = await gameService.getById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json(game);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const update = async (req, res) => {
  try {
    const game = await gameService.update(req.params.id, req.body);
    res.json(game);
  } catch (e) { res.status(400).json({ error: e.message }); }
};

const remove = async (req, res) => {
  try {
    await gameService.remove(req.params.id);
    res.status(204).send();
  } catch (e) { res.status(500).json({ error: e.message }); }
};

module.exports = { create, getAll, getById, update, remove };
