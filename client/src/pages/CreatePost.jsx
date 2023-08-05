import { useState } from "react";
// import ReactQuill from "react-quill";    import "react-quill/dist/quill.snow.css"
import { Navigate } from "react-router-dom";
import Editor from "../editor";

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [redirect, setRedirect] = useState(false)

  const [file, setFile] = useState("")

  // const modules = {
  //   toolbar: [
  //     [{ 'header': [1, 2, false] }],
  //     ['bold', 'italic', 'underline','strike', 'blockquote'],
  //     [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
  //     ['link', 'image'],
  //     ['clean']
  //   ],
  // }
  // const formats = [
  //   'header',
  //   'bold', 'italic', 'underline', 'strike', 'blockquote',
  //   'list', 'bullet', 'indent',
  //   'link', 'image'
  // ]


  const handleForm = async (e) => {
    
    const data = new FormData()
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", file[0]);
    
    e.preventDefault()
    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: 'include',
    })
    if (!response.ok){
      return 'There is no exception! Kindly filled all inputs.'
    }
    if (response.ok){
      setRedirect(true)
    }
  }
  if(redirect){
    return <Navigate to={'/'}/>
  }

  return ( <>
            <form onSubmit={handleForm}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="title" placeholder="Title" />
                <input value={summary} onChange={(e) => setSummary(e.target.value)} type="summary" placeholder="summary"/>
                <input type="file" onChange={(e) => setFile(e.target.files)} className="nostyle"/>
                <Editor value={content} onChange={setContent}/>
                {/* <ReactQuill value={content} onChange={(setValue) => setContent(setValue)} modules={modules} formats={formats}/> */}
                <button className="logoutbtn">Create Post</button>
            </form>
    </>
  )
}
export default CreatePost