const { Router } = require('express');
const exampleRoutes = require('./example.routes');
const pdfRulesRoutes = require('./pdfRules.routes');
const authRoutes = require('./auth.routes');
const forumRoutes = require('./forum.routes');
const postRoutes = require('./post.routes');
const subscriptionRoutes = require('./subscription.routes');
const gameRoutes = require('./game.routes');
const eventRoutes = require('./event.routes');
const userStatsRoutes = require('./userStats.routes');

const router = Router();

router.use('/example', exampleRoutes);
router.use('/pdf-rules', pdfRulesRoutes);
router.use('/auth', authRoutes);
router.use('/forums', forumRoutes);
router.use('/posts', postRoutes);
router.use('/subscription', subscriptionRoutes);
router.use('/games', gameRoutes);
router.use('/events', eventRoutes);
router.use('/stats', userStatsRoutes);

module.exports = router;
