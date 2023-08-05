import SOURCE from './assets/SOURCE.jpg'
import { json, Link } from "react-router-dom"
import { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext'

const Header = () => {
  // const [email, setEmail] = useState(null)
  const {setUserInfo, userInfo} = useContext(UserContext)

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include'
  }).then(response => {
    response.json().then(userInfo => {
      setUserInfo(userInfo)
    })
  })

  }, [])

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    })
    setUserInfo(null)
  }

  const email = userInfo?.email;

  return (
    <>
    <header>
    <Link to="/" className="logo"><img src={SOURCE} alt="SOURCE Logo" /></Link>
    <nav>
      {email && (
        <>
        <Link to={'/create'}>Create new post</Link>
        <a className='logoutbtnicon' onClick={logout}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
</svg>
LogOut
</a>
        </>
      )}
      {!email && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
          
        </nav>
      </header>
    </>
  )
}
export default Header