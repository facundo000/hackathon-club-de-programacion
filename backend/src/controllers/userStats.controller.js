const userStatsService = require('../services/userStats.service');

const getMyStats = async (req, res) => {
  try {
    const stats = await userStatsService.getOrCreate(req.user.id);
    res.json(stats);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const getUserStats = async (req, res) => {
  try {
    const stats = await userStatsService.getOrCreate(req.params.userId);
    res.json(stats);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const recordResult = async (req, res) => {
  try {
    const { gameId, won } = req.body;
    const stats = await userStatsService.recordResult(req.user.id, gameId, won);
    res.json(stats);
  } catch (e) { res.status(400).json({ error: e.message }); }
};

const getLeaderboard = async (req, res) => {
  try {
    const board = await userStatsService.getLeaderboard(req.params.gameId);
    res.json(board);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

module.exports = { getMyStats, getUserStats, recordResult, getLeaderboard };
