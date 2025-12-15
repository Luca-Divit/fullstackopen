import axios from "axios";

// Base url for all the api calls
const baseUrl = "/api/phonebook";

// GET all the people from the db
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// Persist a new person in the db
const create = (newNote) => {
  const request = axios.post(baseUrl, newNote);
  return request.then((response) => response.data);
};

const destroy = (p) => {
  axios.delete(`${baseUrl}/${p.id}`);
};

const update = (p) => {
  const request = axios.put(`${baseUrl}/${p.id}`, p);
  return request.then((response) => response.data);
};

export default { getAll, create, destroy, update };
