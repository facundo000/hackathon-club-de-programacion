const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const c = require('../controllers/game.controller');

const router = Router();

router.get('/', c.getAll);
router.post('/', auth, c.create);
router.get('/:id', c.getById);
router.put('/:id', auth, c.update);
router.delete('/:id', auth, c.remove);

module.exports = router;
