import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchImages  = async (value, page = 1) => {
  const response = await axios.get(`/?q=${value}&page=${page}&key=34997790-f8c4a5b7d116715454d2fb294&image_type=photo&orientation=horizontal&per_page=12`);
  return response.data;
};