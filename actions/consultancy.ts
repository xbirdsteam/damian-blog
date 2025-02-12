'use server'

import { ConsultancyStep, ConsultancySuccessStep } from "@/types/consultancy"
import { createClient } from "@/utils/supabase/server"

export const getConsultancySteps = async (): Promise<ConsultancyStep[]> => {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('consultancy_steps')
        .select('*')
        .order('step_number', { ascending: true })
    if (error) {
        console.error('Error fetching consultancy steps:', error)
        throw new Error('Failed to fetch consultancy steps')
    }

    return data
}

export const getReceiverEmail = async (): Promise<string> => {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('home')
        .select('contact_receiver_email')
        .single()

    if (error) {
        console.error('Error fetching receiver email:', error)
        throw new Error('Failed to fetch receiver email')
    }

    return data?.contact_receiver_email || ''
}

export const getConsultancySuccessSteps = async (): Promise<ConsultancySuccessStep[]> => {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('consultancy_success_steps')
        .select('*')
        .order('order_index', { ascending: true })

    if (error) {
        console.error('Error fetching consultancy success steps:', error)
        throw new Error('Failed to fetch consultancy success steps')
    }

    return data
}
