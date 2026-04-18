const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: '' },
    cover: { type: String, default: '' },
    categories: [{ type: String }],
    minPlayers: { type: Number, default: 1 },
    maxPlayers: { type: Number, default: 10 },
    minAge: { type: Number, default: 8 },
    duration: { type: Number, default: 60 },        // minutos
    complexity: { type: Number, min: 1, max: 5, default: 2 }, // 1 simple → 5 muy complejo
    publisher: { type: String, default: '' },
    year: { type: Number, default: null },
    language: { type: String, default: 'Español' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Game', gameSchema);
