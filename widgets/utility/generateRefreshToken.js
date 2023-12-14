import HttpConfig from "../config/HttpConfig";

const baseURL = ${process.env.NEXT_PUBLIC_BASE_URL}api/auth/refresh;

export const post = async (query, formData) => {
  try {
    const { data } = await HttpConfig.post(query, formData);
    return data;
  } catch (error) {
    return error?.response?.data || { error: "An error occurred" };
  }
};

export const refreshToken = async (token) => {
  try { 
     const response = await fetch(baseURL, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'authorization':  Bearer ${token}, 
      },
    });     
     const result = await response.json();
 
     return result;
  } catch (error) {
     return error?.response?.data || { error: "An error occurred" };
  }
 };