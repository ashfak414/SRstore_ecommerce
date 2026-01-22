import axios from 'axios';

// Using FakeStore API for demo purposes
const API_BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      timeout: 10000, // 10 second timeout
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your internet connection.');
    } else if (error.response) {
      throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('No response from server. Please check your internet connection.');
    } else {
      throw new Error('Failed to fetch products. Please try again later.');
    }
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`, {
      timeout: 10000,
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your internet connection.');
    } else if (error.response) {
      throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('No response from server. Please check your internet connection.');
    } else {
      throw new Error('Failed to fetch product details. Please try again later.');
    }
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/categories`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};

