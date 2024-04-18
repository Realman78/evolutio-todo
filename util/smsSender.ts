import axios from 'axios'

const sendMessage = async (number: string, text: string) => {
    try {
        const baseURL = process.env.INFOBIP_BASE_URL;
        const apiKey = process.env.INFOBIP_API_KEY;
        const sender = process.env.SENDER || "Evolutio team"

        const response = await axios.post(`${baseURL}/sms/2/text/advanced`, {
            messages: [
                {
                    destinations: [{ to: number }],
                    from: sender,
                    text: text
                }
            ]
        }, {
            headers: {
                'Authorization': `App ${apiKey}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        console.log('Response:', response.data);
        return true
    } catch (error) {
        console.error('Error:', error);
        return false
    }
};

export default sendMessage 