const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const c = require('../controllers/post.controller');

const router = Router();

router.get('/feed', auth, c.getFeed);
router.post('/', auth, c.create);
router.get('/:id', c.getById);
router.delete('/:id', auth, c.remove);
router.post('/:id/upvote', auth, c.upvote);
router.post('/:id/comments', auth, c.addComment);

module.exports = router;
