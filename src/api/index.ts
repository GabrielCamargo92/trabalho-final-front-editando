import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const apiGet = async (url: string) => {
  const response: AxiosResponse = await axios.get(url);
  return response;
};

const apiLogin = async (url: string, data: any) => {
  const response: AxiosResponse = await axios.post(url, data);
  return response;
};

const apiPut = async (url: string, data: any) => {
  const response: AxiosResponse = await axios.put(url, data);
  return response;
};

const apiCreate = async (url: string, data: any) => {
  const response: AxiosResponse = await axios.post(url, data);
  return response;
};

const apiDelete = async (url: string) => {
  const response: AxiosResponse = await axios.delete(url);
  return response;
};

export { apiGet, apiPut, apiCreate, apiDelete, apiLogin };

const apiGetNotes = async (url: string, data: any) => {
  const response: AxiosResponse = await axios.get(url);
  return response;
};

export { apiGetNotes };
