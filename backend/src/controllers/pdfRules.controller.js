const pdfRulesService = require('../services/pdfRules.service');

const listPdfs = (req, res) => {
  const files = pdfRulesService.listPdfs();
  res.json({ pdfs: files });
};

const summarizeRules = async (req, res) => {
  const { filename } = req.params;
  try {
    const result = await pdfRulesService.summarizeRules(filename);
    res.json(result);
  } catch (error) {
    const status = error.message.includes('not found') ? 404 : 500;
    res.status(status).json({ error: error.message });
  }
};

module.exports = { listPdfs, summarizeRules };
