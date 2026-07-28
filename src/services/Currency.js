import axios from "axios";

const API_DATA = import.meta.env.VITE_API_DATA;

export const getData = async () => {
  const response = await axios.get(`${API_DATA}/pred_20min`);
  return response.data;
};
