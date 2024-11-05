import axios from "axios"

const SERVER_URL = "/api/persons"

const createPerson = (newPerson) => {
    return axios.post(SERVER_URL, newPerson).then(response => response.data)
}

const getAllPersons = () => {
    return axios.get(SERVER_URL).then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${SERVER_URL}/${id}`).then(response => response.data)
}

const updatePerson = (id, updatedPerson) => {
    return axios.put(`${SERVER_URL}/${id}`, updatedPerson).then(response => response.data)
}

export default {createPerson, getAllPersons, deletePerson, updatePerson}