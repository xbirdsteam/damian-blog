export const generateSuccessTemplate = (steps: { title: string; description: string }[]) => `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 16px; background-color: #ffffff;">
        <div style="space-y-10">
            <p style="font-size: 42px; font-weight: 700; color: #0D0D0D; margin: 0 0 40px 0;">Form Successfully Submitted!</p>
            
            <div style="position: relative; padding-bottom: 40px;">
                <!-- Vertical Line -->
                <div style="position: absolute; width: 1px; height: calc(100% - 94px); top: 0; left: 14px; background-color: #E5E7EB; z-index: 0;"></div>

                <!-- Steps -->
                ${steps
        .map(
            (step, index) => `
                        <div style="display: flex; gap: 32px; position: relative; z-index: 1; margin-bottom: 40px;">
                            ${index === 0
                    ? `
                                <span style="flex-shrink: 0;">
                                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.5 0C6.49187 0 0 6.49187 0 14.5C0 22.5081 6.49187 29 14.5 29C22.5081 29 29 22.5081 29 14.5C29 6.49187 22.5081 0 14.5 0ZM20.9563 11.7219L13.4594 19.2188C13.1656 19.5125 12.7781 19.6594 12.3906 19.6594C12.0031 19.6594 11.6156 19.5125 11.3219 19.2188L8.04375 15.9406C7.45625 15.3531 7.45625 14.4 8.04375 13.8125C8.63125 13.225 9.58437 13.225 10.1719 13.8125L12.3906 16.0312L18.8281 9.59375C19.4156 9.00625 20.3687 9.00625 20.9563 9.59375C21.5437 10.1813 21.5437 11.1344 20.9563 11.7219Z" fill="#0D0D0D"/>
                                    </svg>
                                </span>
                                `
                    : `
                                <div style="flex-shrink: 0; width: 28px; height: 28px; background-color: #ffffff; border-radius: 50%; display: flex; justify-content: center; align-items: center;">
                                    <span style="width: 18px; height: 18px; border: 4px solid #6B7280; border-radius: 50%; display: block;"></span>
                                </div>
                                `
                }
                            
                            <p style="display: flex; flex-direction: column; gap: 12px; color: ${index === 0 ? '#0D0D0D' : '#6B7280'};">
                                <span style="font-size: 24px; font-weight: 700;">${step.title}</span>
                                <span style="font-size: 16px; font-weight: 500;">${step.description}</span>
                            </p>
                        </div>
                    `
        )
        .join('')}
            </div>
        </div>
    </div>
`;