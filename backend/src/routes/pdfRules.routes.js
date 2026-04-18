const { Router } = require('express');
const { listPdfs, summarizeRules } = require('../controllers/pdfRules.controller');

const router = Router();

router.get('/', listPdfs);
router.get('/:filename/summary', summarizeRules);

module.exports = router;
