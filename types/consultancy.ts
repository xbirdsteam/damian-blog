/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ConsultancyStep {
    id: number,
    step_number: number,
    title: string,
    description: string,
    fields: any;
    created_at: string;
    updated_at: string;
}

export interface ConsultancyStepBaseField {
    id: number,
    step_number: number,
    title: string,
    description: string,
    created_at: string;
    updated_at: string;
}

export interface OptionsData {
    label: string;
    options: string[]
}

export interface WhyWorkWithUsItem {
    id: string;
    content: string;
}

export interface ProcessStep {
    id: string;
    title: string;
    description: string;
}

export interface HeadParagraph {
    title: string;
    content: string;
}

export interface CallToAction {
    title: string;
    description: string;
}

export interface ConsultancyContent {
    id?: string;
    title: string;
    description: string;
    image_url: string;
    headParagraph: HeadParagraph;
    whyWorkWithUs: WhyWorkWithUsItem[];
    processSteps: ProcessStep[];
    created_at?: string;
    updated_at?: string;
    callToAction: CallToAction;
}

export interface ConsultancySuccessStep {
    id: string;
    title: string;
    description: string;
    order_index: number;
}