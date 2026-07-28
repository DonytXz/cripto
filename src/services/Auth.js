import axios from "axios";

const API_LOGIN = import.meta.env.VITE_API_LOGIN;

export const login = async (values) => {
  try {
    const response = await axios.post(`${API_LOGIN}/users/login`, {
      username: values.username,
      password: values.password,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
