import axios from "axios";

// Base url for all the api calls
const baseUrl = 'http://localhost:3001/persons';

// GET all the people from the db
const getAll = () => {
  const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// Persist a new person in the db
const create = newNote => {
  const request = axios.post(baseUrl, newNote)
    return request.then(response => response.data);
};

const destroy = (p) => {
  if (confirm(`Do you really want to destroy ${p.name}?`)) {
    const request = axios.delete(`${baseUrl}/${p.id}`)
    return request.then(response => response.status)
  }
}

export default { getAll, create, destroy };
