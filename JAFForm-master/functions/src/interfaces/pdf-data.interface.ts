export interface DataItemSection {
    condition: string;
    items: DataItem[];
    value: string;
    }
    
    export interface DataItem {
    controlName: string;
    question: string;
    image?: string;
    title: string;
    type: string;
    value?: any;
    children?: DataItem[];
    sections?: DataItemSection[];
    }
    
    export interface PdfData {
    assignedOn: string;
    assignedTo: string;
    category: string;
    createdBy: string;
    createdOn: string;
    data: DataItem[];
    description: string;
    formId: string;
    formName: string;
    modifiedBy: string;
    modifiedOn: string;
    pdfFunction?: string;
    roles: string[];
    status: string;
    workflowFunction?: string;
    }