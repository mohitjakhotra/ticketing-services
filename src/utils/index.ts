import axios from "axios";

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
      console.log('Retrieved Access token asdsas', accessToken); // Verify token retrieval
      return accessToken;
    } catch (error: any) {
      console.error('Error fetching access token: asdasd', error.response?.data || error.message, error);
      throw error;
    }
  };