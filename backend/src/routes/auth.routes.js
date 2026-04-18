const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const c = require('../controllers/auth.controller');

const router = Router();

router.post('/register', c.register);
router.post('/login', c.login);
router.post('/logout', auth, c.logout);

router.get('/me', auth, c.getProfile);
router.put('/me', auth, c.updateProfile);

router.get('/library', auth, c.getLibrary);
router.post('/library/:gameId', auth, c.addToLibrary);
router.delete('/library/:gameId', auth, c.removeFromLibrary);

router.get('/users/search', c.searchUsers);
router.get('/users/:id', c.getProfile);
router.post('/users/:id/follow', auth, c.follow);
router.post('/users/:id/unfollow', auth, c.unfollow);

module.exports = router;
