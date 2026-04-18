const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const c = require('../controllers/forum.controller');

const router = Router();

router.get('/', c.getAll);
router.post('/', auth, c.create);
router.get('/:id', c.getById);
router.get('/:id/posts', c.getPosts);
router.post('/:id/join', auth, c.join);
router.post('/:id/leave', auth, c.leave);

module.exports = router;
