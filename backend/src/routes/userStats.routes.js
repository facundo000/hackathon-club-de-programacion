const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const c = require('../controllers/userStats.controller');

const router = Router();

router.get('/me', auth, c.getMyStats);
router.post('/record', auth, c.recordResult);
router.get('/leaderboard/:gameId', c.getLeaderboard);
router.get('/:userId', c.getUserStats);

module.exports = router;
