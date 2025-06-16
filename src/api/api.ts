import axios from 'axios';

axios.interceptors.request.use((config) => {
  const userTokens = localStorage.getItem('userTokens');
  const token = userTokens ? JSON.parse(userTokens).token : null;
  if (token) {
    config.params = {
      ...config.params,
      auth: token,
    };
  }
  return config;
});
