import axios from 'axios';

let accessToken: string | null = null;

const tokenInstance = axios.create({
  baseURL: process.env.SERVICENOW_TOKEN_URL,
});

export const getAccessToken = async () => {
  try {
    const response = await tokenInstance.post('', new URLSearchParams({
      grant_type: 'password',
      client_id: process.env.SERVICENOW_CLIENT_ID!,
      client_secret: process.env.SERVICENOW_CLIENT_SECRET!,
      username: process.env.USERNAME!,
      password: process.env.PASSWORD!,
    }));
    accessToken = response.data.access_token;
    console.log('Retrieved Access Token:sioemthign', accessToken); // Verify token retrieval
    return accessToken;
  } catch (error: any) {
    console.error('Error fetching access token:', error.response?.data || error.message);
    throw error;
  }
};

const instance = axios.create({
  baseURL: process.env.SERVICENOW_BASE_URL,
});

instance.interceptors.request.use(config => {
  if (accessToken) {
    console.log('Setting Authorization Header:', `Bearer ${accessToken}`); // Verify token usage
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export const getServiceNowTickets = async () => {
  try {
    const response = await instance.get('/api/now/table/incident');
    console.log('ServiceNow Tickets Response:', response.data); // Verify response
    return response.data;
  } catch (error: any) {
    console.error('Error fetching tickets:', error.response?.data || error.message);
    throw error;
  }
};

export const createServiceNowTicket = async (data: any) => {
  try {
    const response = await instance.post('/api/now/table/incident', data);
    return response.data;
  } catch (error: any) {
    console.error('Error creating ticket:', error.response?.data || error.message);
    throw error;
  }
};
