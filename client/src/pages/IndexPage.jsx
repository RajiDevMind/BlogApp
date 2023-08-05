import Posts from "../posts"
import { useEffect, useState } from "react"

const IndexPage = () => {
  const [postss, setPosts] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/post').then(response => {
      response.json().then(posts => {
        setPosts(posts)
      })
    })
  }, []) 

  return (
    <>
    {postss.length > 0 && postss.map(post => (
      <Posts {...post} key={post._id} />
    ))}
    </>
  )
}
export default IndexPage