import * as functions from 'firebase-functions';

import { Pdf as testPdf4Middleware } from './pdf';

export const Pdf = functions
  .runWith({ memory: '512MB' }) /* to launch headless chrome and get pdf */
  .https.onRequest(testPdf4Middleware);
