import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../editor";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [file, setFile] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/post/" + id).then((response) => {
      response.json().then((postInfor) => {
        setTitle(postInfor.title);
        setSummary(postInfor.summary);
        setContent(postInfor.content);
      });
    });
  }, []);

  const updatePost = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);

    if (file?.[0]) {
      data.set("file", file?.[0]);
    }

    const response = await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setTimeout(() => {
        setRedirect(true);
        alert("Updated Successfully!!!");
      }, 2000);
    }
  };

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <>
      <form onSubmit={updatePost}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="title"
          placeholder="Title"
        />
        <input
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          type="summary"
          placeholder="summary"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files)}
          className="nostyle"
        />
        <Editor onChange={setContent} value={content} />
        <button className="logoutbtn">Update Post</button>
      </form>
    </>
  );
};
export default EditPost;
