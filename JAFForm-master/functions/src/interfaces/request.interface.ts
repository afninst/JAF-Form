import { Request } from 'express';
import { MappedData, WorkflowField } from '@digitaldealers/typings';


export interface WorkflowRequest extends Request {
  processedBody: MappedData<WorkflowField>;
}
