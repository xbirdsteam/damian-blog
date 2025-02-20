export const generateSuccessTemplate = (steps: { title: string; description: string }[]) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body style="margin: 0; padding: 20px; background-color: #f3f4f6;">
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 16px; background-color: #ffffff;">
        <div>
            <p style="font-size: 42px; font-weight: 700; color: #0D0D0D; margin: 0 0 40px 0;">Form Successfully Submitted!</p>
            
            <table cellpadding="0" cellspacing="0" style="width: 100%; position: relative;">
                <tr>
                    <td style="position: relative; z-index: 1;">
                        <!-- Steps -->
                        ${steps.map((step, index) => `
                            <div style="margin-bottom: 40px;">
                                <table cellpadding="0" cellspacing="0" style="width: 100%;">
                                    <tr>
                                        <td style="width: 29px; vertical-align: top;">
                                            ${index <= 1 
                                                ? `<img src="https://grutknomyoqofrtzppnw.supabase.co/storage/v1/object/public/images/check.png" 
                                                         alt="✓" 
                                                         style="display: block; margin: 7px auto;"  
                                                    />`
                                                : `<table cellpadding="0" cellspacing="0" style="width: 28px; height: 28px; border: 4px solid #6B7280; border-radius: 28px;">
                                                    <tr>
                                                        <td></td>
                                                    </tr>
                                                  </table>`
                                            }
                                        </td>
                                        <td style="padding-left: 32px;">
                                            <div style="margin-bottom: 12px;">
                                                <p style="font-size: 24px; font-weight: 700; margin: 0; color: ${index <= 1 ? '#0D0D0D' : '#6B7280'};">
                                                    ${step.title}
                                                </p>
                                            </div>
                                            <div>
                                                <p style="font-size: 16px; font-weight: 500; margin: 0; color: ${index <= 1 ? '#0D0D0D' : '#6B7280'};">
                                                    ${step.description}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        `).join('')}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>
`;