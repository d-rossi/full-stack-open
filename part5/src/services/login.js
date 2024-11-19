import axios from 'axios'

const LOGIN_URL = 'http://localhost:3003/api/login'

const login = (user) => {
    return axios.post(LOGIN_URL, user).then(loggedInUser => loggedInUser.data)
}

export default {login}