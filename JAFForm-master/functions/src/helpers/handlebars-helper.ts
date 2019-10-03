import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

import * as handlebars from 'handlebars';
import { DataItemSection } from '../interfaces/pdf-data.interface';
import HelperOptions = Handlebars.HelperOptions;

const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);

export const registerHelpers = () => {
 /* tslint:disable:no-invalid-this */
 handlebars.registerHelper('isArray', function(value:string|any[], options:HelperOptions):string {
  if (Array.isArray(value)) {
    /* @ts-ignore */
    return options.fn(this);
  } else {
    /* @ts-ignore */
    return options.inverse(this);
  }
 });

/* tslint:enable:no-invalid-this */

/* tslint:disable:no-invalid-this */
 handlebars.registerHelper('isNotArray', function(value:string|any[], options:HelperOptions):string {
  if (!Array.isArray(value)) {
    /* @ts-ignore */
    return options.fn(this);
  } else {
    /* @ts-ignore */
    return options.inverse(this);
  }
 });

/* tslint:enable:no-invalid-this */

 handlebars.registerHelper('isSectionVisible', function(logicValue:string, section:DataItemSection):boolean {
  return (section.condition==='is'&& section.value=== logicValue) ||
    (section.condition === 'is Not' && section.value !== logicValue);
  });
 };

export const readPartials = async (partialsDir: string): Promise<any> => {
 try {
   const files =await readDir(partialsDir);
   if (!files) {
     return;
   }
   for (const file of files) {
     const template =await readFile(path.resolve(partialsDir, file), 'utf8');
     handlebars.registerPartial(path.basename(file, '.hbs'), template);
   }
 } catch (e) {
   throw new Error(`Can't get partials`);
 }
};

export const readTemplate = async (templatePath: string): Promise<string> => {
 try {
   return readFile(templatePath, 'utf8');
 } catch (e) {
   throw new Error(`Can't get template`);
 }
};