require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Game = require('../models/Game');

const games = [
  {
    name: 'Catan',
    description: 'Juego de construcción y comercio donde los jugadores colonizan la isla de Catán intercambiando recursos.',
    cover: '',
    categories: ['Estrategia', 'Comercio', 'Familiar'],
    minPlayers: 3, maxPlayers: 4,
    minAge: 10, duration: 90, complexity: 2,
    publisher: 'Devir', year: 1995, language: 'Español',
  },
  {
    name: 'Carcassonne',
    description: 'Juego de colocación de losetas para construir ciudades, caminos y monasterios medievales.',
    cover: '',
    categories: ['Estrategia', 'Colocación de losetas', 'Familiar'],
    minPlayers: 2, maxPlayers: 5,
    minAge: 7, duration: 45, complexity: 2,
    publisher: 'Devir', year: 2000, language: 'Español',
  },
  {
    name: 'Ticket to Ride',
    description: 'Conecta ciudades del mapa construyendo rutas de tren antes que tus rivales.',
    cover: '',
    categories: ['Estrategia', 'Familiar', 'Rutas'],
    minPlayers: 2, maxPlayers: 5,
    minAge: 8, duration: 60, complexity: 2,
    publisher: 'Days of Wonder', year: 2004, language: 'Español',
  },
  {
    name: 'Pandemic',
    description: 'Juego cooperativo donde el equipo trabaja junto para detener brotes de enfermedades globales.',
    cover: '',
    categories: ['Cooperativo', 'Estrategia', 'Temático'],
    minPlayers: 2, maxPlayers: 4,
    minAge: 8, duration: 60, complexity: 2,
    publisher: 'Z-Man Games', year: 2008, language: 'Español',
  },
  {
    name: 'Wingspan',
    description: 'Juego de cartas sobre coleccionar y atraer pájaros a tu reserva natural.',
    cover: '',
    categories: ['Motor de cartas', 'Naturaleza', 'Familiar'],
    minPlayers: 1, maxPlayers: 5,
    minAge: 10, duration: 70, complexity: 3,
    publisher: 'Stonemaier Games', year: 2019, language: 'Español',
  },
  {
    name: 'Dixit',
    description: 'Juego de imaginación y narración donde los jugadores asocian frases creativas con ilustraciones oníricas.',
    cover: '',
    categories: ['Party', 'Familiar', 'Creatividad'],
    minPlayers: 3, maxPlayers: 6,
    minAge: 8, duration: 30, complexity: 1,
    publisher: 'Libellud', year: 2008, language: 'Español',
  },
  {
    name: '7 Wonders',
    description: 'Draft de cartas para construir una civilización antigua y levantar una de las maravillas del mundo.',
    cover: '',
    categories: ['Draft', 'Civilización', 'Estrategia'],
    minPlayers: 2, maxPlayers: 7,
    minAge: 10, duration: 30, complexity: 3,
    publisher: 'Repos Production', year: 2010, language: 'Español',
  },
  {
    name: 'Gloomhaven',
    description: 'Dungeon crawler cooperativo con campaña narrativa larga y combate táctico basado en cartas.',
    cover: '',
    categories: ['Dungeon Crawler', 'Cooperativo', 'Campaña', 'RPG'],
    minPlayers: 1, maxPlayers: 4,
    minAge: 14, duration: 120, complexity: 4,
    publisher: 'Cephalofair Games', year: 2017, language: 'Inglés',
  },
  {
    name: 'Azul',
    description: 'Juego de colocación de azulejos inspirado en los mosaicos portugueses. Sencillo y muy elegante.',
    cover: '',
    categories: ['Abstracto', 'Familiar', 'Colocación'],
    minPlayers: 2, maxPlayers: 4,
    minAge: 8, duration: 45, complexity: 2,
    publisher: 'Next Move Games', year: 2017, language: 'Español',
  },
  {
    name: 'Codenames',
    description: 'Juego de palabras en equipo donde el agente jefe da pistas de una palabra para revelar identidades secretas.',
    cover: '',
    categories: ['Party', 'Palabras', 'Equipos'],
    minPlayers: 4, maxPlayers: 8,
    minAge: 14, duration: 15, complexity: 1,
    publisher: 'Czech Games Edition', year: 2015, language: 'Español',
  },
  {
    name: 'Terra Mystica',
    description: 'Juego de estrategia profundo donde facciones fantásticas terraforman el terreno para expandirse.',
    cover: '',
    categories: ['Estrategia', 'Fantasía', 'Avanzado'],
    minPlayers: 2, maxPlayers: 5,
    minAge: 12, duration: 150, complexity: 5,
    publisher: 'Feuerland Spiele', year: 2012, language: 'Español',
  },
  {
    name: 'Dominion',
    description: 'El clásico que inventó el deckbuilding. Construye tu mazo para ganar puntos de victoria.',
    cover: '',
    categories: ['Deckbuilding', 'Cartas', 'Estrategia'],
    minPlayers: 2, maxPlayers: 4,
    minAge: 13, duration: 30, complexity: 3,
    publisher: 'Rio Grande Games', year: 2008, language: 'Inglés',
  },
  {
    name: 'Splendor',
    description: 'Comercia con gemas para contratar artesanos y construir rutas comerciales del Renacimiento.',
    cover: '',
    categories: ['Familiar', 'Motor de fichas', 'Estrategia ligera'],
    minPlayers: 2, maxPlayers: 4,
    minAge: 10, duration: 30, complexity: 2,
    publisher: 'Space Cowboys', year: 2014, language: 'Español',
  },
  {
    name: 'Arkham Horror',
    description: 'Cooperativo de terror lovecraftiano donde los investigadores luchan contra el despertar de los Antiguos.',
    cover: '',
    categories: ['Cooperativo', 'Terror', 'Temático', 'RPG'],
    minPlayers: 1, maxPlayers: 6,
    minAge: 14, duration: 180, complexity: 4,
    publisher: 'Fantasy Flight Games', year: 2005, language: 'Español',
  },
  {
    name: 'Scythe',
    description: 'Juego de dominio en una Europa alternativa de los años 20 con mecas y facciones únicas.',
    cover: '',
    categories: ['Estrategia', 'Motor de recursos', 'Temático'],
    minPlayers: 1, maxPlayers: 5,
    minAge: 14, duration: 115, complexity: 4,
    publisher: 'Stonemaier Games', year: 2016, language: 'Español',
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hackaton');
    console.log('MongoDB connected');

    await Game.deleteMany({});
    console.log('Games cleared');

    const inserted = await Game.insertMany(games);
    console.log(`${inserted.length} games inserted:`);
    inserted.forEach((g) => console.log(`  [${g._id}] ${g.name}`));
  } catch (e) {
    console.error('Seed error:', e.message);
  } finally {
    await mongoose.disconnect();
    console.log('Done');
  }
};

seed();
