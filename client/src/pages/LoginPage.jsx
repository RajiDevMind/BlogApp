import { useState, useContext } from "react"
import {Navigate} from 'react-router-dom'
import { UserContext } from "../UserContext"

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [redirect, setRedirect] = useState(false)
    const {setUserInfo} = useContext(UserContext)

    const login = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:4000/login', {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        })
        if(response.ok){
            response.json().then(userInfo => {
                setUserInfo(userInfo)
                setRedirect(true)
            })
        }else{
            alert('Invalid login details')
        }   
    }
    if (redirect){
         return <Navigate to={'/'}/>   
    }

    return (
        <>
        <form onSubmit={login} className="login">
        <h1>LOGIN PAGE</h1>
            <input type="email" placeholder="yourmail@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Enter secret password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign-In</button>
        </form>
        </>
    )
}

export default LoginPage