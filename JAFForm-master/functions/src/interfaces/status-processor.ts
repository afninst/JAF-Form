import { MappedData, WorkflowField } from '@digitaldealers/typings/safety/mapped-data';
import {
  findFieldByName,
  getAllFormFields,

} from '../helpers/workflow-data.helper';

export function submitted2new(data: MappedData<WorkflowField>): MappedData<WorkflowField> {

  const allFormFields = getAllFormFields(data);

  const projectId1Field = findFieldByName(allFormFields, 'projectId');

  let projectValue = projectId1Field.value as string;

  console.log(`Project Value -> ${projectValue}`);

  if (!projectValue || !projectValue.includes('-')) {
    console.log(`Project Value is null or empty or does not included dash -> ${projectValue}`);
    return data;
  }

  if (projectValue.toLowerCase().startsWith('tmp')) {
    console.log(`tmp project Id -> ${projectValue} , bybass the change`);
  } else {
    const ids = projectValue.split('-');
    if (ids && ids.length > 0) {
      projectValue = ids[0];
      console.log(`Set project Id to first element - svc Id only -> ${projectValue}`);
    }
  }

  projectId1Field.value = projectValue;

  return data;
}
