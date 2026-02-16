import axios from "axios";

export const N8N_API_URL = 'https://herculeslopes.app.n8n.cloud/webhook';
export const N8N_TEST_API_URL = 'https://herculeslopes.app.n8n.cloud/webhook-test';

const n8nAPI = axios.create({
    baseURL: N8N_API_URL,
    // timeout: 1000,
    headers: {
        // 'X-Quiz-Secret': '',
    }
})

export default n8nAPI;