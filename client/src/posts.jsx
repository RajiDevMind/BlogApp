import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

const Posts = ({ _id, title, summary, content, cover, createdAt, author }) => {
  return (
    <>
      <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={"http://localhost:4000/" + cover} alt="" />
          </Link>
        </div>
        <div className="text">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p className="info">
            <a className="author">raji</a>
            <time>{formatISO9075(new Date(createdAt), "dd-MM-yyyy")}</time>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </div>
    </>
  );
};
export default Posts;

// title: an annual tradition, former US president Barrack Obama has released his summer playlist of 2023, with two Nigerian songs making the cut.
// summary: Debates and conversations have taken over major social media platforms as the former president of the United States of America, Barrack Obama, shared his preferred songs of 2023 so far in his annual tradition in a summer playlist.
//          The playlist contains songs from different parts of the world that have captured the attention of the president, and fans of Burna Boy and Ayra Starr were excited about the announcement of the Summer playlist, which contained a song each from the two superstars.
//
