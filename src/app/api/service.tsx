import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts/';

export const getAllPosts = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
}

export const getPostById = async (id: any) => {
  const response = await axios.get(`${API_URL}${id}`);
  return response.data;

};

export const createPost = async (postData: any) => {
  const response = await axios.post(API_URL, postData);
  return response.data;
};

export const updatePost = async (id: any, postData: any) => {
  const response = await axios.put(`${API_URL}${id}`, postData);
  return response.data;
};

export const deletePost = async (id: any) => {
  await axios.delete(`${API_URL}${id}`);
};