const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const OpenAI = require('openai');

const getClient = () => new OpenAI({ apiKey: process.env.OpenAiApiKey });
const MODEL = () => process.env.OpenAiModel || 'gpt-4o-mini';
const PDF_DIR = path.join(__dirname, '../../pdfs');

const extractTextFromPdf = async (filename) => {
  const filePath = path.join(PDF_DIR, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`PDF not found: ${filename}`);
  }
  const buffer = fs.readFileSync(filePath);
  const { text } = await pdfParse(buffer);
  return text;
};

const summarizeRules = async (filename) => {
  const pdfText = await extractTextFromPdf(filename);

  const response = await getClient().chat.completions.create({
    model: MODEL(),
    messages: [
      {
        role: 'system',
        content:
          'You are an expert at analyzing documents and extracting rules. Given the text of a document, extract all rules, regulations, or guidelines and return them as a clear, numbered summary. Group related rules under headers if applicable.',
      },
      {
        role: 'user',
        content: `Extract and summarize all the rules from the following document:\n\n${pdfText}`,
      },
    ],
  });

  return {
    filename,
    summary: response.choices[0].message.content.trim(),
  };
};

const listPdfs = () => {
  if (!fs.existsSync(PDF_DIR)) return [];
  return fs.readdirSync(PDF_DIR).filter((f) => f.endsWith('.pdf'));
};

module.exports = { summarizeRules, listPdfs };
