const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    minPlayers: { type: Number, required: true },
    maxPlayers: { type: Number, required: true },
    location: { type: String, default: '' },
    date: { type: Date, required: true },
    status: { type: String, enum: ['open', 'full', 'cancelled', 'done'], default: 'open' },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
