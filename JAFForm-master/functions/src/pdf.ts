import * as path from 'path';

import * as handlebars from 'handlebars';
import * as Puppeteer from 'puppeteer';

import { getApp, sendError } from './helpers/express-helper';
import { readPartials, readTemplate, registerHelpers } from './helpers/handlebars-helper';
import { PdfData } from './interfaces/pdf-data.interface';
import { validatePdfData } from './validators/pdf-data.validator';

const partialsDir = path.resolve(__dirname, '..', 'static', 'template', 'partials');
const templatePath = path.resolve(__dirname, '..', 'static', 'template', 'index.hbs');
const app = getApp();

registerHelpers();

const generatePdf = async (data: PdfData): Promise<Buffer> => {
  await readPartials(partialsDir);
  const templateFile =await readTemplate(templatePath);
  const template =handlebars.compile(templateFile);
  const html =template(data);
  const browser =await Puppeteer.launch({ args: ['--no-sandbox'] });
  const page =await browser.newPage();
  await page.setContent(html);
  const pdf =await page.pdf();
  await browser.close();
  return pdf;
};

export const Pdf = app.post('/', async (req, res) => {
  const { error, value } =validatePdfData(req.body);

  if (error) {
    sendError(res, error);
    return;
  }

  try {
    const pdf =await generatePdf(value);
    res.status(200)
      .attachment(`form-${value.formName}.pdf`)
      .send(pdf);
  } catch (e) {
    sendError(res, e);
  }
});