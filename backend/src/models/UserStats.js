const mongoose = require('mongoose');

const gameStatsSchema = new mongoose.Schema(
  {
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    played: { type: Number, default: 0 },
    won: { type: Number, default: 0 },
    lost: { type: Number, default: 0 },
    ranking: { type: Number, default: 1000 },        // ELO base
    tier: { type: String, enum: ['Bronce', 'Plata', 'Oro', 'Platino', 'Diamante'], default: 'Bronce' },
    winStreak: { type: Number, default: 0 },
    bestStreak: { type: Number, default: 0 },
    lastPlayed: { type: Date, default: null },
  },
  { _id: false }
);

const userStatsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    games: [gameStatsSchema],
    totalPlayed: { type: Number, default: 0 },
    totalWon: { type: Number, default: 0 },
    eventsAttended: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserStats', userStatsSchema);
