import { MappedData, WorkflowField } from '@digitaldealers/typings/safety/mapped-data';
import { NextFunction, Response } from 'express';
import { WorkflowRequest } from '../interfaces/request.interface';
import { submitted2new } from './status-processor';

export function tmbRemovSvcSegmentId(req: WorkflowRequest, res: Response, next: NextFunction) {
    const workflowData: MappedData<WorkflowField> = req.processedBody;

    try {
        let result: MappedData<WorkflowField>;
        switch (workflowData.status) {
            case 'submitted':
                result = submitted2new(workflowData);
                break;
            default:
                result = workflowData;
        }
        req.processedBody = result;
        next();
        return;
    } catch (e) {
        next(e);
        return;
    }
}
