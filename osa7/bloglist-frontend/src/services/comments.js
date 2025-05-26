import axios from 'axios';
const baseUrl = '/api/blogs';

const getAllComments = (blogId) => {
  const request = axios.get(`${baseUrl}/${blogId}/comments`);
  return request.then((response) => response.data);
};

const createComment = async (id, newObject) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject);
  return response.data;
};

export default { getAllComments, createComment };
