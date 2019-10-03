import { array, object, string, validate } from 'joi';
import { PdfData } from '../interfaces/pdf-data.interface';

const schema = object().keys({
assignedOn: string()
.optional()
.trim()
.allow(null),
assignedTo: string()
.optional()
.email()
.trim()
.allow(null),
category: string()
.optional()
.trim()
.allow(null),
data: array()
.required(),
description: string()
.optional()
.trim()
.allow(null),
formId: string()
.trim()
.required(),
formName: string()
.trim()
.required(),
roles: array()
.required()
.items(string()),
status: string()
.optional()
.trim()
.allow(null)
});

export const validatePdfData= (data:PdfData) =>
validate<PdfData>(data, schema, { allowUnknown: true });