import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const getOnchainData = async () => {
  const response = await axios.get(`${API_URL}/onchain`);
  console.log("From Services ", response)
  return response.data;
};

export const getOffchainData = async () => {
  const response = await axios.get(`${API_URL}/offchain`);
  console.log("From Services ", response)
  return response.data;
};
