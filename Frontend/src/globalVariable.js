let API = "http://localhost:8080";
export const setGlobalVariable = (value) => {
  API = value;
};

export const getGlobalVariable = () => {
  return API;
};
