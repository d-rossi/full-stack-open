import axios from 'axios'

const BASE_URL = 'http://localhost:3001/anecdotes'

const generateRandomId = () => Date.now()

const getAll = async () => {
    const response = await axios.get(BASE_URL)
    return response.data
}

const create = async (anecdote) => {
    const response = await axios.post(BASE_URL, {id: generateRandomId, content: anecdote, votes: 0})
    return response.data
}

const update = async (anecdote) => {
    const response = await axios.put(`${BASE_URL}/${anecdote.id}`, anecdote)
    return response.data
}

export default { getAll, create, update }