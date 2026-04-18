const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const c = require('../controllers/event.controller');

const router = Router();

router.get('/feed', auth, c.getFeed);
router.get('/', c.getAll);
router.post('/', auth, c.create);
router.get('/:id', c.getById);
router.post('/:id/join', auth, c.join);
router.post('/:id/leave', auth, c.leave);
router.patch('/:id/status', auth, c.updateStatus);

module.exports = router;
