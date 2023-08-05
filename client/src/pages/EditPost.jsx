import { useEffect, useState } from "react"
import {Navigate, useParams } from "react-router-dom"
import Editor from "../editor"

const EditPost = () => {
    const {id} = useParams()
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [redirect, setRedirect] = useState('')

  const [file, setFile] = useState("")

  useEffect(() => {
    fetch('http://localhost:4000/post/'+id)
    .then(response => {
      response.json().then(postInfor => {
        setTitle(postInfor.title)
        setSummary(postInfor.summary)
        setContent(postInfor.content)
      })
    })
  }, [])
  
  const updatePost = (e) => {
    e.preventDefault()

  }

  if(redirect){
    return <Navigate to={'/'}/>
  }

  return ( <>
            <form onSubmit={updatePost}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="title" placeholder="Title" />
                <input value={summary} onChange={(e) => setSummary(e.target.value)} type="summary" placeholder="summary"/>
                <input type="file" onChange={(e) => setFile(e.target.files)} className="nostyle"/>
                <Editor onChange={setContent} value={content} />
                <button className="logoutbtn">Update Post</button>
            </form>
    </>
  )
}
export default EditPost