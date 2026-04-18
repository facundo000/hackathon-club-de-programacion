const Event = require('../models/Event');
const Game  = require('../models/Game');
const User  = require('../models/User');

const populate = (q) =>
  q.populate('game', 'name cover categories minPlayers maxPlayers')
   .populate('organizer', 'username avatar')
   .populate('players', 'username avatar');

const create = async (userId, data) => {
  const event = await Event.create({ ...data, organizer: userId, players: [userId] });
  return populate(Event.findById(event._id));
};

const getAll = async ({ gameId, status, page = 1 } = {}) => {
  const limit = 20;
  const filter = { date: { $gte: new Date() } };
  if (gameId) filter.game = gameId;
  if (status) filter.status = status;

  const [events, total] = await Promise.all([
    populate(Event.find(filter).sort({ date: 1 }).skip((page - 1) * limit).limit(limit)),
    Event.countDocuments(filter),
  ]);

  return { events, page: Number(page), totalPages: Math.ceil(total / limit), total };
};

const getById = async (id) => populate(Event.findById(id));

const join = async (userId, eventId) => {
  const event = await Event.findById(eventId);
  if (!event) throw new Error('Event not found');
  if (event.status !== 'open') throw new Error('Event is not open');
  if (event.players.map(String).includes(String(userId))) throw new Error('Already joined');
  if (event.players.length >= event.maxPlayers) throw new Error('Event is full');

  event.players.push(userId);
  if (event.players.length >= event.maxPlayers) event.status = 'full';
  await event.save();
  return populate(Event.findById(eventId));
};

const leave = async (userId, eventId) => {
  const event = await Event.findById(eventId);
  if (!event) throw new Error('Event not found');
  if (String(event.organizer) === String(userId)) throw new Error('Organizer cannot leave');

  event.players.pull(userId);
  if (event.status === 'full') event.status = 'open';
  await event.save();
  return populate(Event.findById(eventId));
};

const updateStatus = async (userId, eventId, status) => {
  const event = await Event.findById(eventId);
  if (!event) throw new Error('Event not found');
  if (String(event.organizer) !== String(userId)) throw new Error('Only organizer can update');
  event.status = status;
  await event.save();
  return event;
};

/**
 * Feed personalizado de eventos.
 *
 * Defaults: ubicación del usuario, categorías favoritas y biblioteca.
 * Overrides via params: location, categories (array), gameIds (array).
 *
 * Cada evento incluye `recommendedBy`: ['location','category','library']
 */
const getFeed = async (userId, { location, categories, gameIds, page = 1 } = {}) => {
  const limit = 20;

  // Cargar perfil del usuario para obtener defaults
  const user = await User.findById(userId).populate('library', '_id categories');

  const resolvedLocation   = location   || user.location || '';
  const resolvedCategories = categories || user.favoriteCategories || [];
  const resolvedGameIds    = gameIds    || user.library.map((g) => String(g._id));

  // Obtener IDs de juegos que matchean las categorías (partial, case-insensitive)
  const categoryRegexes = resolvedCategories.map((c) => new RegExp(c, 'i'));
  const gamesByCategory = await Game.find({
    categories: { $in: categoryRegexes },
  }).select('_id');
  const categoryGameIds = gamesByCategory.map((g) => String(g._id));

  // Construir $or: el evento debe cumplir al menos uno de los criterios
  const orClauses = [];

  if (resolvedLocation) {
    orClauses.push({ location: { $regex: resolvedLocation, $options: 'i' } });
  }
  if (categoryGameIds.length) {
    orClauses.push({ game: { $in: categoryGameIds } });
  }
  if (resolvedGameIds.length) {
    orClauses.push({ game: { $in: resolvedGameIds } });
  }

  // Si no hay ningún criterio, devolver todos los eventos abiertos
  const filter = {
    status: { $in: ['open', 'full'] },
    date:   { $gte: new Date() },
    ...(orClauses.length ? { $or: orClauses } : {}),
  };

  const [events, total] = await Promise.all([
    populate(Event.find(filter).sort({ date: 1 }).skip((page - 1) * limit).limit(limit)).lean(),
    Event.countDocuments(filter),
  ]);

  // Agregar flag recommendedBy y datos útiles a cada evento
  const librarySet  = new Set(resolvedGameIds.map(String));
  const categorySet = new Set(categoryGameIds.map(String));

  const enriched = events.map((event) => {
    const gameId        = String(event.game?._id);
    const recommendedBy = [];

    if (resolvedLocation && new RegExp(resolvedLocation, 'i').test(event.location)) {
      recommendedBy.push('location');
    }
    if (categorySet.has(gameId)) {
      recommendedBy.push('category');
    }
    if (librarySet.has(gameId)) {
      recommendedBy.push('library');
    }

    return {
      ...event,
      spotsLeft:     event.maxPlayers - (event.players?.length || 0),
      hasJoined:     event.players?.map((p) => String(p._id)).includes(String(userId)),
      recommendedBy,
    };
  });

  return {
    events: enriched,
    page:   Number(page),
    totalPages: Math.ceil(total / limit),
    total,
    appliedFilters: {
      location:   resolvedLocation,
      categories: resolvedCategories,
      gameIds:    resolvedGameIds,
    },
  };
};

module.exports = { create, getAll, getById, join, leave, updateStatus, getFeed };
