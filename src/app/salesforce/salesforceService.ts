import axios from 'axios';

let salesforceAccessToken: string | null = null;

const tokenInstance = axios.create({
  baseURL: process.env.SALESFORCE_TOKEN_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
export const getSalesforceAccessToken = async () => {
  try {
    const response = await tokenInstance.post('', new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.SALESFORCE_CLIENT_ID!,
      client_secret: process.env.SALESFORCE_CLIENT_SECRET!
    }));
    console.log(response)
    salesforceAccessToken = response.data.access_token;
    console.log(salesforceAccessToken, '---------------token sales force')
    return salesforceAccessToken;
  } catch (error: any) {
    console.log(error.message,'-------------')
    console.error('Error fetching Salesforce access token:', error.response?.data || error.message);
    throw error;
  }
};

const instance = axios.create({
  baseURL: process.env.SALESFORCE_BASE_URL,
});

instance.interceptors.request.use(config => {
console.log(salesforceAccessToken, '----------------')
  if (salesforceAccessToken) {
    config.headers.Authorization = `Bearer ${salesforceAccessToken}`;
  }
  console.log(config)
  return config;
});

export const getSalesforceData = async () => {
  try {
    const response = await instance.get('/services/data/v52.0/sobjects');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching Salesforce data:', error.response?.data || error.message);
    throw error;
  }
};

export const createSalesforceRecord = async (data: any) => {
  try {
    const response = await instance.post('/services/data/v52.0/sobjects/Account', data);
    return response.data;
  } catch (error: any) {
    console.error('Error creating Salesforce record:', error.response?.data || error.message);
    throw error;
  }
};
