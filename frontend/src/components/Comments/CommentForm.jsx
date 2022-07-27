import axios from "axios";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
const CommentForm = (props) => {
  const [user, token] = useAuth();
  const [text, setText] = useState("");
  const createComment = async () => {
    let newComment = {
      user_id: user.id,
      video_id: props.videoId,
      text: text,
      likes: 0,
      dislikes: 0,
    };
    try {
      await axios.post("http://127.0.0.1:8000/comments/create/", newComment, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setText("");
    } catch (error) {
      alert("NEED TO LOGIN TO CREATE A COMMENT");
      console.log(error.message);
    }
  };
  return (
    <div>
      <input
        value={text}
        type="text"
        onChange={(event) => setText(event.target.value)}
      />
      <button onClick={() => createComment()}>ADD</button>
    </div>
  );
};

export default CommentForm;
