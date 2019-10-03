import { MappedData, WorkflowField, ControlState } from '@digitaldealers/typings';

import { ControlStates } from '../interfaces/workflow-data.interface';

interface SetStateOptions {
  exceptNames?: string[];
  exceptHidden?: boolean;
}

export function getAllFormFields(workflowData: MappedData<WorkflowField>): WorkflowField[] {
  return workflowData.fields.reduce(getFieldsRecursive, []) as WorkflowField[];
}

export function findFieldByName(fields: WorkflowField[], fieldName: string): WorkflowField {
  const foundedField = fields.find(field => field.name === fieldName);

  if (!foundedField) { throw new Error(`Field ${fieldName} is not found in the workflow data`); }

  return foundedField;
}

export function getAllFormFieldsByName(workflowData: MappedData<WorkflowField>, fieldsName: string[]): WorkflowField[] {
  const foundedFields: WorkflowField[] = [];
  fieldsName.forEach(fieldName => {
    const foundedField = workflowData.fields.find(field => field.name === fieldName);
    if (foundedField) {
      foundedFields.push(foundedField);
    } else {
      throw new Error(`Field ${fieldName} is not found in the workflow data`);
    }
  });

  return foundedFields;
}

export function sealWorkflowData(workflowData: MappedData<WorkflowField>, ignoreHidden = false): MappedData<WorkflowField> {
  const formFields = getAllFormFields(workflowData);

  formFields
    .filter(field => (!ignoreHidden || (field.state !== ControlStates.HIDDEN)))
    .forEach(field => field.state = ControlStates.READONLY);

  workflowData.canBeDeleted = false;
  workflowData.canBeSubmitted = false;

  return workflowData;
}

export function setFieldsState(fields: WorkflowField[], state: ControlState, options?: SetStateOptions): void {
  fields.forEach(field => {
    if (options && options.exceptNames && options.exceptNames.includes(field.name)) {
      return;
    }

    if (options && options.exceptHidden && field.state === ControlStates.HIDDEN) {
      return;
    }

    field.state = state;
  });
}

export function addRoles(workflowData: MappedData<WorkflowField>, roles: string[]) {
  workflowData.roles = workflowData.roles.concat(roles);
}

export function removeRoles(workflowData: MappedData<WorkflowField>, roles: string[]) {
  workflowData.roles = workflowData.roles.filter(role => !roles.includes(role));
}

function getFieldsRecursive(fields: WorkflowField[], field: WorkflowField): WorkflowField[] {
  fields.push(field);

  if (field.sections && field.sections.length) {
    field.sections
      .reduce((acc: WorkflowField[], section) => [...acc, ...section.items], [])
      .reduce(getFieldsRecursive, fields);
  }

  if (field.children && field.children.length) {
    field.children
      .reduce(getFieldsRecursive, fields);
  }

  return fields;
}
