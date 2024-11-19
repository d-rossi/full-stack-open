import { useState } from 'react'
import loginService from '../services/login'
import Notification from './Notification'

const LoginForm = ({handleUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        loginService.login({username, password})
        .then(user => {
          window.localStorage.setItem('loggedInUser', JSON.stringify(user))
          handleUser(user)
        })
        .catch(() => {
            setErrorMessage('Username or password provided is invalid!')
            setTimeout(() => setErrorMessage(''), 5000)
        })
    }

    return (
        <div>
            {errorMessage && <Notification type={'error'} message={errorMessage}/>}
            <form onSubmit={(event) => handleLogin(event)}>
                <h2>Login to the Application</h2>
                username: <input value={username} onChange={(event) => setUsername(event.target.value)}/>
                <br/>
                password: <input value={password} onChange={(event) => setPassword(event.target.value)}/>
                <br/>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm