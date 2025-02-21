import { createClient } from "@/utils/supabase/server";

export enum LeadStatus {
    NEW = 'new',
    IN_PROGRESS = 'in_progress',
    LOST = 'lost',
    SUCCESS = 'success'
}

export enum FormType {
    CONSULTANT = 'consultant',
    CONTACT = 'contact'
}

interface LeadData {
    name: string;
    email: string;
    phone?: string;
    form_type: FormType;
    content?: string;
}

const createLead = async (data: LeadData): Promise<void> => {
    try {
        const supabase = await createClient();

        const { error } = await supabase
            .from('leads')
            .insert([{
                ...data,
                status: LeadStatus.NEW
            }]);

        if (error) {
            console.error('Error creating lead:', error);
            throw error;
        }
    } catch (error) {
        console.error('Failed to create lead:', error);
        throw error;
    }
}

export { createLead }; 