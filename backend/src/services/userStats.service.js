const UserStats = require('../models/UserStats');

const TIERS = [
  { name: 'Bronce',   min: 0    },
  { name: 'Plata',    min: 1200 },
  { name: 'Oro',      min: 1500 },
  { name: 'Platino',  min: 1800 },
  { name: 'Diamante', min: 2100 },
];

const getTier = (ranking) => {
  return [...TIERS].reverse().find((t) => ranking >= t.min).name;
};

const getOrCreate = async (userId) => {
  let stats = await UserStats.findOne({ user: userId }).populate('games.game', 'name cover categories');
  if (!stats) stats = await UserStats.create({ user: userId });
  return stats;
};

const recordResult = async (userId, gameId, won) => {
  let stats = await UserStats.findOne({ user: userId });
  if (!stats) stats = await UserStats.create({ user: userId });

  let gameStats = stats.games.find((g) => String(g.game) === String(gameId));

  if (!gameStats) {
    stats.games.push({ game: gameId });
    gameStats = stats.games[stats.games.length - 1];
  }

  gameStats.played += 1;
  stats.totalPlayed += 1;

  if (won) {
    gameStats.won += 1;
    gameStats.winStreak += 1;
    gameStats.ranking += 25;
    stats.totalWon += 1;
    if (gameStats.winStreak > gameStats.bestStreak) {
      gameStats.bestStreak = gameStats.winStreak;
    }
  } else {
    gameStats.lost += 1;
    gameStats.winStreak = 0;
    gameStats.ranking = Math.max(0, gameStats.ranking - 20);
  }

  gameStats.tier = getTier(gameStats.ranking);
  gameStats.lastPlayed = new Date();

  await stats.save();
  return stats.populate('games.game', 'name cover categories');
};

const getLeaderboard = async (gameId) => {
  const all = await UserStats.find({ 'games.game': gameId })
    .populate('user', 'username avatar displayName');

  return all
    .map((s) => {
      const g = s.games.find((g) => String(g.game) === String(gameId));
      return {
        user: s.user,
        ranking: g.ranking,
        tier: g.tier,
        played: g.played,
        won: g.won,
        winStreak: g.winStreak,
        bestStreak: g.bestStreak,
      };
    })
    .sort((a, b) => b.ranking - a.ranking)
    .slice(0, 50);
};

module.exports = { getOrCreate, recordResult, getLeaderboard };
