require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User         = require('../models/User');
const Game         = require('../models/Game');
const Forum        = require('../models/Forum');
const Post         = require('../models/Post');
const Event        = require('../models/Event');
const Subscription = require('../models/Subscription');
const UserStats    = require('../models/UserStats');

// ─── helpers ────────────────────────────────────────────────────────────────
const range  = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const future = (days) => new Date(Date.now() + days * 86400000);
const past   = (days) => new Date(Date.now() - days * 86400000);
const byName = (arr, name) => arr.find((g) => g.name === name);
const byNames = (arr, names) => names.map((n) => byName(arr, n)).filter(Boolean);

const getTier = (ranking) => {
  if (ranking >= 2100) return 'Diamante';
  if (ranking >= 1800) return 'Platino';
  if (ranking >= 1500) return 'Oro';
  if (ranking >= 1200) return 'Plata';
  return 'Bronce';
};

// ─── Games ───────────────────────────────────────────────────────────────────
const GAMES = [
  { name: 'Catan',          description: 'Coloniza la isla de Catán intercambiando recursos con otros jugadores.',            categories: ['Estrategia','Comercio','Familiar'],                    minPlayers:3, maxPlayers:4,  minAge:10, duration:90,  complexity:2, publisher:'Devir',               year:1995, language:'Español' },
  { name: 'Carcassonne',    description: 'Coloca losetas para construir ciudades, caminos y monasterios medievales.',         categories: ['Estrategia','Colocación de losetas','Familiar'],        minPlayers:2, maxPlayers:5,  minAge:7,  duration:45,  complexity:2, publisher:'Devir',               year:2000, language:'Español' },
  { name: 'Ticket to Ride', description: 'Conecta ciudades del mapa construyendo rutas de tren antes que tus rivales.',      categories: ['Estrategia','Familiar','Rutas'],                        minPlayers:2, maxPlayers:5,  minAge:8,  duration:60,  complexity:2, publisher:'Days of Wonder',      year:2004, language:'Español' },
  { name: 'Pandemic',       description: 'Cooperativo para detener brotes de enfermedades globales.',                        categories: ['Cooperativo','Estrategia','Temático'],                   minPlayers:2, maxPlayers:4,  minAge:8,  duration:60,  complexity:2, publisher:'Z-Man Games',         year:2008, language:'Español' },
  { name: 'Wingspan',       description: 'Atrae pájaros a tu reserva natural en este juego de motor de cartas.',             categories: ['Motor de cartas','Naturaleza','Familiar'],               minPlayers:1, maxPlayers:5,  minAge:10, duration:70,  complexity:3, publisher:'Stonemaier Games',    year:2019, language:'Español' },
  { name: 'Dixit',          description: 'Asocia frases creativas con ilustraciones oníricas en este juego de narración.',   categories: ['Party','Familiar','Creatividad'],                        minPlayers:3, maxPlayers:6,  minAge:8,  duration:30,  complexity:1, publisher:'Libellud',            year:2008, language:'Español' },
  { name: '7 Wonders',      description: 'Draft de cartas para construir una civilización y levantar maravillas del mundo.', categories: ['Draft','Civilización','Estrategia'],                     minPlayers:2, maxPlayers:7,  minAge:10, duration:30,  complexity:3, publisher:'Repos Production',    year:2010, language:'Español' },
  { name: 'Gloomhaven',     description: 'Dungeon crawler cooperativo con campaña narrativa y combate táctico de cartas.',    categories: ['Dungeon Crawler','Cooperativo','Campaña','RPG'],         minPlayers:1, maxPlayers:4,  minAge:14, duration:120, complexity:4, publisher:'Cephalofair Games',   year:2017, language:'Inglés'  },
  { name: 'Azul',           description: 'Coloca azulejos inspirados en mosaicos portugueses en este abstracto elegante.',   categories: ['Abstracto','Familiar','Colocación'],                     minPlayers:2, maxPlayers:4,  minAge:8,  duration:45,  complexity:2, publisher:'Next Move Games',     year:2017, language:'Español' },
  { name: 'Codenames',      description: 'Da pistas de una sola palabra para que tu equipo adivine las cartas correctas.',   categories: ['Party','Palabras','Equipos'],                            minPlayers:4, maxPlayers:8,  minAge:14, duration:15,  complexity:1, publisher:'Czech Games Edition', year:2015, language:'Español' },
  { name: 'Terra Mystica',  description: 'Facciones fantásticas terraforman el terreno para expandirse estratégicamente.',   categories: ['Estrategia','Fantasía','Avanzado'],                      minPlayers:2, maxPlayers:5,  minAge:12, duration:150, complexity:5, publisher:'Feuerland Spiele',    year:2012, language:'Español' },
  { name: 'Dominion',       description: 'El clásico que inventó el deckbuilding. Construye tu mazo y domina.',              categories: ['Deckbuilding','Cartas','Estrategia'],                    minPlayers:2, maxPlayers:4,  minAge:13, duration:30,  complexity:3, publisher:'Rio Grande Games',    year:2008, language:'Inglés'  },
  { name: 'Splendor',       description: 'Comercia con gemas para contratar artesanos del Renacimiento.',                    categories: ['Familiar','Motor de fichas','Estrategia ligera'],        minPlayers:2, maxPlayers:4,  minAge:10, duration:30,  complexity:2, publisher:'Space Cowboys',       year:2014, language:'Español' },
  { name: 'Arkham Horror',  description: 'Cooperativo lovecraftiano: investiga y combate el despertar de los Antiguos.',     categories: ['Cooperativo','Terror','Temático','RPG'],                 minPlayers:1, maxPlayers:6,  minAge:14, duration:180, complexity:4, publisher:'Fantasy Flight Games', year:2005, language:'Español' },
  { name: 'Scythe',         description: 'Domina una Europa alternativa de los 20s con mecas y recursos únicos.',            categories: ['Estrategia','Motor de recursos','Temático'],             minPlayers:1, maxPlayers:5,  minAge:14, duration:115, complexity:4, publisher:'Stonemaier Games',    year:2016, language:'Español' },
];

// ─── Users (con biblioteca y categorías favoritas específicas) ───────────────
// library y favoriteCategories se asignan después de insertar los juegos
const USERS = [
  {
    username: 'carlitos92',
    email: 'carlitos92@mail.com',
    displayName: 'Carlos Ruiz',
    bio: 'Eurogamer empedernido. Más de 200 partidas de Catan y sigo sin cansarme. Colecciono ediciones especiales.',
    avatar: '',
    location: 'Córdoba',
    libraryNames: ['Catan', 'Carcassonne', 'Ticket to Ride', '7 Wonders', 'Splendor', 'Terra Mystica', 'Azul'],
    favoriteCategories: ['Estrategia', 'Eurogames', 'Comercio', 'Familiar'],
    plan: 'pro',
    stats: [
      { name: 'Catan',          played: 87, won: 42 },
      { name: 'Carcassonne',    played: 54, won: 28 },
      { name: '7 Wonders',      played: 31, won: 15 },
      { name: 'Terra Mystica',  played: 18, won: 7  },
    ],
  },
  {
    username: 'marta_plays',
    email: 'marta@mail.com',
    displayName: 'Marta Gómez',
    bio: 'Especialista en temáticos y terror. Arkham Horror es mi vida. Organizo partidas nocturnas cada mes.',
    avatar: '',
    location: 'Córdoba',
    libraryNames: ['Arkham Horror', 'Gloomhaven', 'Pandemic', 'Scythe', 'Wingspan', 'Dominion'],
    favoriteCategories: ['Terror', 'Cooperativo', 'RPG', 'Temático', 'Campaña'],
    plan: 'premium',
    stats: [
      { name: 'Arkham Horror', played: 62, won: 28 },
      { name: 'Gloomhaven',    played: 45, won: 30 },
      { name: 'Pandemic',      played: 38, won: 25 },
      { name: 'Scythe',        played: 22, won: 11 },
    ],
  },
  {
    username: 'jdiego',
    email: 'jdiego@mail.com',
    displayName: 'Juan Diego',
    bio: 'Organizador de torneos en Córdoba. Liga mensual de Carcassonne y 7 Wonders. ¡Apuntaos!',
    avatar: '',
    location: 'Córdoba',
    libraryNames: ['Carcassonne', '7 Wonders', 'Codenames', 'Catan', 'Dominion', 'Splendor', 'Azul', 'Ticket to Ride'],
    favoriteCategories: ['Competitivo', 'Draft', 'Estrategia', 'Familiar'],
    plan: 'pro',
    stats: [
      { name: 'Carcassonne', played: 110, won: 68 },
      { name: '7 Wonders',   played: 95,  won: 51 },
      { name: 'Dominion',    played: 40,  won: 22 },
      { name: 'Codenames',   played: 33,  won: 18 },
    ],
  },
  {
    username: 'lauraboard',
    email: 'laura@mail.com',
    displayName: 'Laura Sánchez',
    bio: 'Fan de Wingspan y todo lo cooperativo. Si no ganamos juntos, tampoco perdemos juntos.',
    avatar: '',
    location: 'Córdoba',
    libraryNames: ['Wingspan', 'Pandemic', 'Gloomhaven', 'Arkham Horror', 'Dixit', 'Azul'],
    favoriteCategories: ['Cooperativo', 'Motor de cartas', 'Naturaleza', 'Familiar'],
    plan: 'free',
    stats: [
      { name: 'Wingspan',  played: 73, won: 40 },
      { name: 'Pandemic',  played: 55, won: 38 },
      { name: 'Gloomhaven',played: 29, won: 20 },
      { name: 'Azul',      played: 44, won: 21 },
    ],
  },
  {
    username: 'miguelito',
    email: 'miguel@mail.com',
    displayName: 'Miguel Torres',
    bio: 'Streamer y content creator de juegos de mesa. Gloomhaven en campaña completa en directo cada domingo.',
    avatar: '',
    location: 'Córdoba',
    libraryNames: ['Gloomhaven', 'Scythe', 'Terra Mystica', 'Arkham Horror', 'Dominion', '7 Wonders', 'Wingspan'],
    favoriteCategories: ['Dungeon Crawler', 'Campaña', 'RPG', 'Estrategia', 'Avanzado'],
    plan: 'premium',
    stats: [
      { name: 'Gloomhaven',    played: 120, won: 85 },
      { name: 'Scythe',        played: 48,  won: 29 },
      { name: 'Terra Mystica', played: 35,  won: 18 },
      { name: 'Dominion',      played: 60,  won: 38 },
    ],
  },
  {
    username: 'sofi_dice',
    email: 'sofi@mail.com',
    displayName: 'Sofía Díaz',
    bio: 'La reina de los party games. Si hay Dixit o Codenames, cuenten conmigo. Siempre con snacks.',
    avatar: '',
    location: 'Córdoba',
    libraryNames: ['Dixit', 'Codenames', 'Catan', 'Ticket to Ride', 'Azul', 'Splendor'],
    favoriteCategories: ['Party', 'Palabras', 'Creatividad', 'Familiar', 'Equipos'],
    plan: 'free',
    stats: [
      { name: 'Dixit',          played: 95, won: 42 },
      { name: 'Codenames',      played: 80, won: 45 },
      { name: 'Catan',          played: 25, won: 10 },
      { name: 'Ticket to Ride', played: 30, won: 14 },
    ],
  },
  {
    username: 'pablito_gm',
    email: 'pablo@mail.com',
    displayName: 'Pablo Medina',
    bio: 'Game master, diseñador amateur y eterno perdedor de Pandemic. Tengo más juegos que amigos.',
    avatar: '',
    location: 'Córdoba',
    libraryNames: ['Pandemic', 'Arkham Horror', 'Gloomhaven', 'Terra Mystica', 'Scythe', 'Dominion', 'Carcassonne', '7 Wonders', 'Wingspan'],
    favoriteCategories: ['Cooperativo', 'Estrategia', 'RPG', 'Temático', 'Avanzado'],
    plan: 'free',
    stats: [
      { name: 'Pandemic',      played: 90,  won: 35 },
      { name: 'Arkham Horror', played: 42,  won: 15 },
      { name: 'Terra Mystica', played: 28,  won: 12 },
      { name: 'Scythe',        played: 33,  won: 16 },
    ],
  },
  {
    username: 'anaroll',
    email: 'ana@mail.com',
    displayName: 'Ana Flores',
    bio: 'Deckbuilding es mi religión. Dominion primero, luego Dios. También me gustan los drafts.',
    avatar: '',
    location: 'Córdoba',
    libraryNames: ['Dominion', '7 Wonders', 'Splendor', 'Wingspan', 'Codenames', 'Azul'],
    favoriteCategories: ['Deckbuilding', 'Draft', 'Cartas', 'Estrategia', 'Motor de fichas'],
    plan: 'pro',
    stats: [
      { name: 'Dominion',  played: 140, won: 88 },
      { name: '7 Wonders', played: 75,  won: 42 },
      { name: 'Splendor',  played: 60,  won: 35 },
      { name: 'Wingspan',  played: 28,  won: 13 },
    ],
  },
];

// ─── Forums ───────────────────────────────────────────────────────────────────
const FORUMS = [
  { name: 'Eurogames',       description: 'Todo sobre juegos de estrategia europeos: Catan, Carcassonne, Wingspan y más.', avatar: '', creatorIdx: 0, memberIdxs: [0,1,2,3,4,5,6,7] },
  { name: 'Cooperativos',    description: 'Para los que prefieren ganar o perder juntos. Pandemic, Gloomhaven, Arkham...', avatar: '', creatorIdx: 1, memberIdxs: [1,3,4,6,7] },
  { name: 'Party Games',     description: 'Diversión garantizada con Dixit, Codenames y similares. Todos los niveles.',    avatar: '', creatorIdx: 5, memberIdxs: [0,2,3,5,6,7] },
  { name: 'Torneos y Ligas', description: 'Organización de torneos competitivos, ligas y rankings locales.',               avatar: '', creatorIdx: 2, memberIdxs: [0,1,2,3,4,7] },
  { name: 'Novedades 2024',  description: 'Últimas novedades y reseñas de juegos recién salidos al mercado.',              avatar: '', creatorIdx: 4, memberIdxs: [0,1,2,3,4,5,6,7] },
];

// ─── Posts ────────────────────────────────────────────────────────────────────
const POSTS = [
  { title: '¿Cuál es vuestra expansión favorita de Catan?',              content: 'Yo me quedo con Ciudades y Caballeros, le da una profundidad enorme. ¿Y vosotros?',                                                                     forumIdx: 0, authorIdx: 0, upvoteIdxs: [1,2,3,5], comments: [{ authorIdx:1, content:'Marineros para mi. El comercio marítimo lo cambia todo.' }, { authorIdx:3, content:'Sin duda Ciudades y Caballeros, aunque tarda el doble.' }] },
  { title: 'Guía para principiantes en Gloomhaven',                      content: 'Después de 50 horas, aquí va mi guía. Lo más importante: leed bien las cartas de habilidad antes de cada sesión y coordinad con el equipo.',            forumIdx: 1, authorIdx: 4, upvoteIdxs: [1,3,6,7], comments: [{ authorIdx:1, content:'Añadiría que uséis el modo Frosthaven si ya tenéis experiencia.' }, { authorIdx:6, content:'Gracias, llevaba semanas buscando esto.' }] },
  { title: 'Buscamos jugadores para partida de Pandemic en Madrid',      content: 'Somos 2 y buscamos 2 más para una tarde de Pandemic. Nivel medio-alto. Fecha tentativa: próximo sábado.',                                              forumIdx: 1, authorIdx: 6, upvoteIdxs: [1,3], comments: [{ authorIdx:3, content:'¡Me apunto! ¿A qué hora quedáis?' }, { authorIdx:1, content:'Yo también si es por la tarde.' }] },
  { title: 'Reseña: Wingspan es el juego del año sin duda',              content: 'Acabamos de terminar nuestra primera partida de Wingspan y quedamos todos enamorados. La producción es increíble y la mecánica muy satisfactoria.',      forumIdx: 0, authorIdx: 3, upvoteIdxs: [0,1,4,5,6,7], comments: [{ authorIdx:4, content:'Completamente de acuerdo. Ya lo tengo con 3 expansiones.' }, { authorIdx:0, content:'La expansión de Asia es brutal también.' }] },
  { title: 'Tips para ganar en 7 Wonders con Alejandría',               content: 'La clave está en equilibrar ciencia y comercio desde el principio. No os centréis solo en un tipo de cartas, la diversificación es la victoria.',        forumIdx: 3, authorIdx: 7, upvoteIdxs: [0,2,4], comments: [{ authorIdx:2, content:'Yo siempre voy a ciencia pura y suelo ganar 😂' }, { authorIdx:0, content:'Depende mucho de lo que hagan tus vecinos.' }] },
  { title: 'Torneo de Carcassonne - Copa Primavera ¡Apuntaos!',         content: 'Organizamos un torneo informal en la tienda este sábado. 8 participantes máximo, sistema suizo, 3 rondas. Premio: expansión Río. Inscripción gratuita.', forumIdx: 3, authorIdx: 2, upvoteIdxs: [0,1,3,4,5,6,7], comments: [{ authorIdx:0, content:'¡Allí estaré! ¿Hay que llevar juego propio?' }, { authorIdx:7, content:'Me apunto también. ¿Qué expansiones se usan?' }] },
  { title: 'Arkham Horror: ¿demasiado largo o justo?',                  content: 'Nuestra partida de ayer duró casi 4 horas. ¿Os parece demasiado para un juego de mesa o es parte del encanto del temático?',                            forumIdx: 1, authorIdx: 1, upvoteIdxs: [4,6,7], comments: [{ authorIdx:4, content:'Es parte del encanto. Si te gusta el tema, las horas vuelan.' }, { authorIdx:6, content:'A mí me parece perfecto para una tarde de sábado.' }] },
  { title: 'Azul vs Azul Vitral - ¿cuál recomendáis?',                 content: 'Tengo presupuesto para uno solo. ¿El original o el Vitral? He leído que el Vitral tiene una mecánica más interesante pero el original es más accesible.', forumIdx: 4, authorIdx: 5, upvoteIdxs: [0,3,7], comments: [{ authorIdx:0, content:'Original sin dudar. Es más limpio y funciona mejor a 2.' }, { authorIdx:3, content:'El Vitral es más bonito visualmente pero más confuso.' }] },
  { title: 'Mi colección después de 3 años en el hobby',               content: 'Empecé con Catan y ya tengo 47 juegos. El problema: no tengo con quién jugar todos. La maldición del coleccionista es real.',                            forumIdx: 4, authorIdx: 0, upvoteIdxs: [1,2,3,4,5,6,7], comments: [{ authorIdx:5, content:'Jajaja ¡yo tengo el mismo problema! 32 juegos y siempre acabamos jugando al Catan.' }, { authorIdx:2, content:'Organiza quedadas en tiendas locales, así conoces gente nueva.' }] },
  { title: 'Dominion: orden de compra de expansiones',                  content: '¿Por cuál expansión empezarías después del juego base? He oído que Intrigue y Seaside son las mejores de las primeras.',                               forumIdx: 0, authorIdx: 7, upvoteIdxs: [2,4,6], comments: [{ authorIdx:4, content:'Seaside es la mejor con diferencia. Intrigue también pero cambia mucho el ritmo.' }, { authorIdx:2, content:'Yo empezaría por Prosperity, las cartas de Tesoro son muy divertidas.' }] },
  { title: 'Los mejores party games para no jugones',                   content: 'Si vuestros amigos no son jugadores habituales, estos son los títulos que nunca fallan: Dixit, Codenames y Sushi Go. Simples, rápidos y divertidos.',    forumIdx: 2, authorIdx: 5, upvoteIdxs: [0,1,3,6,7], comments: [{ authorIdx:3, content:'Añadiría Dobble y Jungle Speed para los más activos.' }, { authorIdx:7, content:'Dixit es perfecto para romper el hielo con gente nueva.' }] },
  { title: 'Terra Mystica para 2 jugadores: ¿merece la pena?',         content: 'El juego es brutal a 4-5, pero a 2 el mapa queda muy grande. ¿Alguno lo juega regularmente a 2? ¿Usáis alguna variante oficial?',                       forumIdx: 3, authorIdx: 6, upvoteIdxs: [0,4,7], comments: [{ authorIdx:0, content:'Yo uso la variante de mapa reducido y funciona bastante bien.' }, { authorIdx:4, content:'Gaia Project es mejor opción para 2, tiene reglas específicas para ello.' }] },
];

// ─── Events ───────────────────────────────────────────────────────────────────
const EVENTS = [
  { title:'Tarde de Catan en el Café Lúdico',         description:'Partidas abiertas de Catan base y expansiones. Traed dados y ganas de comerciar. Café incluido.',          gameName:'Catan',         organizerIdx:0, playerIdxs:[0,1,2],   location:'Café Lúdico, Córdoba',           isOnline:false, daysFromNow:5,   status:'open'      },
  { title:'Campaña de Gloomhaven - Sesión 1',          description:'Inicio de campaña completa. Necesitamos 4 jugadores comprometidos para sesiones semanales de 3h.',         gameName:'Gloomhaven',    organizerIdx:4, playerIdxs:[4,1,3,6], location:'Local de Miguel, Córdoba',    isOnline:false, daysFromNow:7,   status:'full'      },
  { title:'Torneo de Carcassonne - Copa Primavera',    description:'Torneo informal, 8 plazas, sistema suizo, 3 rondas. Premio: expansión Río. ¡Inscripción gratuita!',       gameName:'Carcassonne',   organizerIdx:2, playerIdxs:[2,0,3,7], location:'Ludoteca El Dragón, Córdoba',  isOnline:false, daysFromNow:10,  status:'open'      },
  { title:'Pandemic en línea - Discord',               description:'Partida online usando Tabletop Simulator. Canal de Discord compartido al apuntarse. Nivel medio.',         gameName:'Pandemic',      organizerIdx:6, playerIdxs:[6,1,3],   location:'Discord',                       isOnline:true,  daysFromNow:3,   status:'open'      },
  { title:'Noche de Party Games',                      description:'Dixit, Codenames, Sushi Go y lo que se apetezca. Ambiente relajado, para todos los niveles.',              gameName:'Dixit',         organizerIdx:5, playerIdxs:[5,0,2,7], location:'Bar La Meeple, Córdoba',        isOnline:false, daysFromNow:14,  status:'open'      },
  { title:'Partida de Arkham Horror - Modo difícil',  description:'Buscamos investigadores valientes para enfrentarnos a Azathoth en dificultad máxima. Solo expertos.',      gameName:'Arkham Horror', organizerIdx:1, playerIdxs:[1,4,6],   location:'Casa de Marta, Córdoba',         isOnline:false, daysFromNow:21,  status:'open'      },
  { title:'Iniciación a Wingspan',                     description:'Primera partida guiada para recién llegados al juego. Explicamos reglas y jugamos sin prisas.',             gameName:'Wingspan',      organizerIdx:3, playerIdxs:[3,5,7],   location:'Biblioteca Central, Córdoba', isOnline:false, daysFromNow:4,   status:'open'      },
  { title:'Draft de 7 Wonders - Liga mensual',         description:'Ronda mensual de nuestra liga. Clasificación actualizada tras la partida. Trae tu maravilla favorita.',    gameName:'7 Wonders',     organizerIdx:7, playerIdxs:[7,0,2,4], location:'Café Lúdico, Córdoba',           isOnline:false, daysFromNow:18,  status:'open'      },
  { title:'Dominion - Torneo relámpago online',        description:'Torneo de Dominion a través de Dominion Online. 8 jugadores, eliminatoria directa. 2h máximo.',            gameName:'Dominion',      organizerIdx:7, playerIdxs:[7,4,2],   location:'Dominion Online',               isOnline:true,  daysFromNow:6,   status:'open'      },
  { title:'Scythe - Partida épica de domingo',         description:'Partida completa de Scythe con las expansiones Invaders from Afar y Wind Gambit. Tarde entera.',           gameName:'Scythe',        organizerIdx:4, playerIdxs:[4,1,0],   location:'Casa de Miguel, Córdoba',    isOnline:false, daysFromNow:-5,  status:'done'      },
  { title:'Azul - Tarde de abstractos',                description:'Varias partidas de Azul original y Azul Vitral. Apto para todos los niveles. Merienda incluida.',          gameName:'Azul',          organizerIdx:3, playerIdxs:[3,5,6,7], location:'Cafetería Central, Córdoba',     isOnline:false, daysFromNow:-3,  status:'done'      },
  { title:'Terra Mystica - Partida cancelada',         description:'Lamentablemente cancelamos por falta de asistentes. Lo reagendaremos para el mes que viene.',               gameName:'Terra Mystica', organizerIdx:0, playerIdxs:[0],       location:'Local de Carlos, Córdoba',       isOnline:false, daysFromNow:-1,  status:'cancelled' },
];

// ─── seed ────────────────────────────────────────────────────────────────────
const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hackaton');
  console.log('MongoDB connected\n');

  await Promise.all([
    User.deleteMany({}), Game.deleteMany({}), Forum.deleteMany({}),
    Post.deleteMany({}), Event.deleteMany({}), Subscription.deleteMany({}),
    UserStats.deleteMany({}),
  ]);
  console.log('All collections cleared');

  // ── Games ──────────────────────────────────────────────────────────────────
  const games = await Game.insertMany(GAMES);
  console.log(`✓ ${games.length} games`);

  // ── Users ──────────────────────────────────────────────────────────────────
  const password = await bcrypt.hash('hackaton123', 8);

  const usersRaw = USERS.map((u) => ({
    username:           u.username,
    email:              u.email,
    displayName:        u.displayName,
    bio:                u.bio,
    avatar:             u.avatar,
    location:           u.location,
    password,
    library:            byNames(games, u.libraryNames).map((g) => g._id),
    favoriteCategories: u.favoriteCategories,
  }));

  const users = await User.insertMany(usersRaw);

  // followers / following cruzados (cada uno sigue a 3-5 personas afines)
  const followMap = [
    [1,2,3,4],   // carlitos92  sigue a marta, jdiego, laura, miguel
    [0,3,4,6],   // marta       sigue a carlos, laura, miguel, pablo
    [0,3,4,7],   // jdiego      sigue a carlos, laura, miguel, ana
    [0,1,4,5],   // lauraboard  sigue a carlos, marta, miguel, sofi
    [1,2,3,6,7], // miguelito   sigue a marta, jdiego, laura, pablo, ana
    [0,2,3,7],   // sofi_dice   sigue a carlos, jdiego, laura, ana
    [1,3,4,7],   // pablito_gm  sigue a marta, laura, miguel, ana
    [0,2,4,5],   // anaroll     sigue a carlos, jdiego, miguel, sofi
  ];

  for (let i = 0; i < users.length; i++) {
    const following = followMap[i].map((j) => users[j]._id);
    await User.findByIdAndUpdate(users[i]._id, { following });
    for (const fid of following) {
      await User.findByIdAndUpdate(fid, { $addToSet: { followers: users[i]._id } });
    }
  }
  console.log(`✓ ${users.length} users`);

  // ── Subscriptions ──────────────────────────────────────────────────────────
  const subs = await Subscription.insertMany(
    USERS.map((u, i) => ({
      user:      users[i]._id,
      plan:      u.plan,
      status:    'active',
      startDate: past(range(10, 90)),
      endDate:   u.plan === 'free' ? null : future(range(30, 365)),
    }))
  );
  console.log(`✓ ${subs.length} subscriptions`);

  // ── Forums ─────────────────────────────────────────────────────────────────
  const forums = await Forum.insertMany(
    FORUMS.map((f) => ({
      name:        f.name,
      description: f.description,
      avatar:      f.avatar,
      creator:     users[f.creatorIdx]._id,
      members:     f.memberIdxs.map((i) => users[i]._id),
    }))
  );
  console.log(`✓ ${forums.length} forums`);

  // ── Posts ──────────────────────────────────────────────────────────────────
  const postsRaw = POSTS.map((p) => ({
    title:    p.title,
    content:  p.content,
    image:    '',
    author:   users[p.authorIdx]._id,
    forum:    forums[p.forumIdx]._id,
    upvotes:  p.upvoteIdxs.map((i) => users[i]._id),
    comments: p.comments.map((c) => ({ author: users[c.authorIdx]._id, content: c.content })),
  }));
  const posts = await Post.insertMany(postsRaw);
  console.log(`✓ ${posts.length} posts`);

  // ── Events ─────────────────────────────────────────────────────────────────
  const eventsRaw = EVENTS.map((e) => {
    const game = byName(games, e.gameName);
    return {
      title:       e.title,
      description: e.description,
      image:       '',
      game:        game._id,
      organizer:   users[e.organizerIdx]._id,
      players:     e.playerIdxs.map((i) => users[i]._id),
      minPlayers:  game.minPlayers,
      maxPlayers:  game.maxPlayers,
      location:    e.location,
      isOnline:    e.isOnline,
      date:        e.daysFromNow >= 0 ? future(e.daysFromNow) : past(-e.daysFromNow),
      status:      e.status,
    };
  });
  const events = await Event.insertMany(eventsRaw);
  console.log(`✓ ${events.length} events`);

  // ── UserStats ──────────────────────────────────────────────────────────────
  const statsRaw = USERS.map((u, i) => {
    let totalPlayed = 0, totalWon = 0;

    const gameStats = u.stats.map((s) => {
      const game    = byName(games, s.name);
      const lost    = s.played - s.won;
      const ranking = Math.max(0, 1000 + s.won * 25 - lost * 20);
      const streak  = range(0, 6);
      totalPlayed  += s.played;
      totalWon     += s.won;
      return {
        game:       game._id,
        played:     s.played,
        won:        s.won,
        lost,
        ranking,
        tier:       getTier(ranking),
        winStreak:  streak,
        bestStreak: streak + range(1, 5),
        lastPlayed: past(range(1, 45)),
      };
    });

    return {
      user:           users[i]._id,
      games:          gameStats,
      totalPlayed,
      totalWon,
      eventsAttended: range(2, 15),
    };
  });

  const stats = await UserStats.insertMany(statsRaw);
  console.log(`✓ ${stats.length} userStats\n`);

  console.log('Seed complete ✓');
  console.log('Password for all users: hackaton123\n');
  console.log('Users:');
  users.forEach((u, i) => {
    const ud = USERS[i];
    console.log(`  [${u._id}] ${u.username} | plan: ${ud.plan} | biblioteca: ${ud.libraryNames.length} juegos | categorías: ${ud.favoriteCategories.join(', ')}`);
  });

  await mongoose.disconnect();
};

seed().catch((e) => { console.error(e); process.exit(1); });
