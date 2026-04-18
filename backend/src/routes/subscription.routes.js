const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const c = require('../controllers/subscription.controller');

const router = Router();

router.get('/', auth, c.get);
router.put('/', auth, c.update);

module.exports = router;
