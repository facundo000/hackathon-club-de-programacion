const Game = require('../models/Game');

const create = async (data) => Game.create(data);

const getAll = async (query = '') => {
  const filter = query
    ? { $or: [{ name: { $regex: query, $options: 'i' } }, { categories: { $regex: query, $options: 'i' } }] }
    : {};
  return Game.find(filter).sort({ name: 1 });
};

const getById = async (id) => Game.findById(id);

const update = async (id, data) => Game.findByIdAndUpdate(id, data, { new: true });

const remove = async (id) => Game.findByIdAndDelete(id);

module.exports = { create, getAll, getById, update, remove };
