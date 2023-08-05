import {useState} from 'react'

const RegisterPage = () => {
    // setting states for users input
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // UsersInput with events
    /*
    const handleUsersInput = (e) => {
        let name = e.target.name
        let value = e.target.value
        
        setUsers({...users, [name]: value})
        
    }
    */

    const register = async (e) => {
        e.preventDefault()
            const response = await fetch('http://localhost:4000/register', {
                method: "POST",
                body: JSON.stringify({username, email, password}),
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })
            
            if(response.status === 200){
                alert("Successfully Registered!")
            }else{
                alert("Registration failed! Try again.")
            }

    }
  return (
    <>
        <form className="register" onSubmit={register}>
            <h1>REGISTER PAGE</h1>
            <input type="text" placeholder="your username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="yourmail@mail.com" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign-Up</button>
        </form>
        </>
  )
}
export default RegisterPage