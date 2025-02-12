import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { EmailData, ContactFormData } from "@/types/email";
import { generateSuccessTemplate } from "./templates/successTemplate";
import { ConsultancySuccessStep } from "@/types/consultancy";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

const generateContactTemplate = (data: ContactFormData) => `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 16px; background-color: #ffffff;">
        <h1 style="color: #111827; text-align: center; margin-bottom: 40px; font-size: 24px; font-weight: 600;">Contact Form Submission</h1>
        
        <table style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
            <tr>
                <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; width: 200px; background-color: #f9fafb; color: #4b5563; font-weight: 500;">Name</td>
                <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #111827;">${data.name}</td>
            </tr>
            <tr>
                <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; width: 200px; background-color: #f9fafb; color: #4b5563; font-weight: 500;">Email</td>
                <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #111827;">${data.email}</td>
            </tr>
            <tr>
                <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; width: 200px; background-color: #f9fafb; color: #4b5563; font-weight: 500;">Industry</td>
                <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #111827;">${data.industry || "Not specified"}</td>
            </tr>
            <tr>
                <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; width: 200px; background-color: #f9fafb; color: #4b5563; font-weight: 500;">Message</td>
                <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #111827; white-space: pre-wrap;">${data.message}</td>
            </tr>
        </table>
    </div>
`;

// Function to generate table rows from step data
const generateTableRows = (stepData: Record<string, string>) => {
    return Object.entries(stepData)
        .map(
            ([key, value]) => `
            <tr>
                <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; width: 300px; background-color: #f9fafb; color: #4b5563; font-weight: 500;">${key}</td>
                <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #111827;">${value || "Not provided"}</td>
            </tr>
        `
        )
        .join("");
};

// Create HTML content from form data with table layout
const generateConsultancyTemplate = (formData: Record<number, Record<string, string>>) => {
    return `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 900px; margin: 0 auto; padding: 32px 16px; background-color: #ffffff;">
            <h1 style="color: #111827; text-align: center; margin-bottom: 40px; font-size: 24px; font-weight: 600;">Consultancy Form Submission</h1>
            
            <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; margin-bottom: 32px;">
                <div style="background-color: #f3f4f6; padding: 16px 24px;">
                    <h2 style="color: #111827; margin: 0; font-size: 18px; font-weight: 600;">Basic Information</h2>
                </div>
                <table style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
                    ${generateTableRows(formData[1])}
                </table>
            </div>

            <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; margin-bottom: 32px;">
                <div style="background-color: #f3f4f6; padding: 16px 24px;">
                    <h2 style="color: #111827; margin: 0; font-size: 18px; font-weight: 600;">Project Details</h2>
                </div>
                <table style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
                    ${generateTableRows(formData[2])}
                </table>
            </div>

            <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; margin-bottom: 32px;">
                <div style="background-color: #f3f4f6; padding: 16px 24px;">
                    <h2 style="color: #111827; margin: 0; font-size: 18px; font-weight: 600;">Goals & Challenges</h2>
                </div>
                <table style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
                    ${generateTableRows(formData[3])}
                </table>
            </div>

            <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; margin-bottom: 32px;">
                <div style="background-color: #f3f4f6; padding: 16px 24px;">
                    <h2 style="color: #111827; margin: 0; font-size: 18px; font-weight: 600;">Budget & Timeline</h2>
                </div>
                <table style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
                    ${generateTableRows(formData[4])}
                </table>
            </div>

            <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; margin-bottom: 32px;">
                <div style="background-color: #f3f4f6; padding: 16px 24px;">
                    <h2 style="color: #111827; margin: 0; font-size: 18px; font-weight: 600;">Experience & Preferences</h2>
                </div>
                <table style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
                    ${generateTableRows(formData[5])}
                </table>
            </div>

            <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; margin-bottom: 32px;">
                <div style="background-color: #f3f4f6; padding: 16px 24px;">
                    <h2 style="color: #111827; margin: 0; font-size: 18px; font-weight: 600;">Additional Information</h2>
                </div>
                <table style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
                    ${generateTableRows(formData[6] || { "Additional Information": "None provided" })}
                </table>
            </div>
        </div>
    `;
};

const generateConsultancySuccessTemplate = (steps: ConsultancySuccessStep[]) => {
    return generateSuccessTemplate(steps);
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { template, formData, receiver_email, successSteps } = body as EmailData;

        if (!receiver_email) {
            return NextResponse.json(
                { error: "No email address provided" },
                { status: 400 }
            );
        }

        let htmlContent: string;
        let subject: string;
        switch (template) {
            case 'contact':
                if (!('name' in formData) || !('email' in formData) || !('message' in formData)) {
                    return NextResponse.json(
                        { error: "Invalid contact form data" },
                        { status: 400 }
                    );
                }
                htmlContent = generateContactTemplate(formData as ContactFormData);
                subject = "New Contact Form Submission";

                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: receiver_email,
                    subject,
                    html: htmlContent,
                };

                // Validate email configuration
                if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
                    console.error("Missing email configuration");
                    return NextResponse.json(
                        { error: "Email configuration missing" },
                        { status: 500 }
                    );
                }

                await transporter.sendMail(mailOptions);

                return NextResponse.json(
                    { message: "Email sent successfully" },
                    { status: 200 }
                );
            case 'consultancy':
                if (!('1' in formData)) {
                    return NextResponse.json(
                        { error: "Invalid consultancy form data" },
                        { status: 400 }
                    );
                }

                // Send two emails: one with form data and one with success steps
                const formHtml = generateConsultancyTemplate(formData as Record<number, Record<string, string>>);
                const successHtml = generateConsultancySuccessTemplate(successSteps || [])

                // Get email from form data section 1
                const userEmail = (formData as Record<number, Record<string, string>>)[1]?.['Email address'];
                if (!userEmail) {
                    return NextResponse.json(
                        { error: "User email not found in form data" },
                        { status: 400 }
                    );
                }

                await Promise.all([
                    transporter.sendMail({
                        from: process.env.EMAIL_USER,
                        to: receiver_email,
                        subject: "Consultancy Form Submission",
                        html: formHtml,
                    }),
                    transporter.sendMail({
                        from: process.env.EMAIL_USER,
                        to: userEmail,
                        subject: "Thank You for Your Submission",
                        html: successHtml,
                    }),
                ]);

                return NextResponse.json(
                    { message: "Emails sent successfully" },
                    { status: 200 }
                );
            default:
                return NextResponse.json(
                    { error: "Invalid template type" },
                    { status: 400 }
                );
        }
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}