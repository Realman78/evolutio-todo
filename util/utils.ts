const generateSMSBody = (taskName: string, sender: string) => {
    return `You marked the task '${taskName}' as completed. Congratulations!\n${sender}`
}

export {
    generateSMSBody
}