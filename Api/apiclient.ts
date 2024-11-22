
import { create } from 'apisauce';

const apiClient = create({
  baseURL: 'https://your-api-base-url.com', // here we can integrate our api/mockapi
  timeout: 10000,
});


apiClient.addRequestTransform((request) => {
  const token = 'your-token-here'; // token
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }
});

apiClient.addResponseTransform((response) => {
  if (!response.ok) {
    console.error('API Error:', response.problem);
    alert('An error occurred: ' + response.problem); // alert for the user
  }
});

export default apiClient;
