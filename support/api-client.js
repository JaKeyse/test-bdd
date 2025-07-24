const axios = require('axios');
const baseURL = 'https://dummyjson.com/products';

module.exports = {
  getProducts: async (params = {}) => {
    try {
      const response = await axios.get(baseURL, {
        params: {
          limit: 5,  // Ограничиваем выборку для тестов
          ...params
        }
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
};