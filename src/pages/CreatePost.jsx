import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config.js";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const postsCollectionRef = collection(db, "posts");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  const createPost = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill out both fields");
      return;
    }
    await addDoc(postsCollectionRef, {
      title,
      content,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid
      }
    });
    navigate("/");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}
    >
      <h2 style={{ marginBottom: "1.5rem", color: "#333" }}>Create a New Post</h2>

      <label style={{ fontWeight: "bold", marginBottom: "0.5rem", display: "block" }}>
        Title
      </label>
      <input
        type="text"
        placeholder="Enter your title"
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "12px",
          width: "100%",
          fontSize: "1rem",
          marginBottom: "1rem",
          outline: "none",
          transition: "0.2s",
        }}
        onFocus={(e) => (e.target.style.border = "1px solid #4CAF50")}
        onBlur={(e) => (e.target.style.border = "1px solid #ddd")}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label style={{ fontWeight: "bold", marginBottom: "0.5rem", display: "block" }}>
        Content
      </label>
      <textarea
        placeholder="Write your blog content..."
        style={{
          resize: "vertical",
          minHeight: "150px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "12px",
          width: "100%",
          fontSize: "1rem",
          outline: "none",
          transition: "0.2s",
        }}
        onFocus={(e) => (e.target.style.border = "1px solid #4CAF50")}
        onBlur={(e) => (e.target.style.border = "1px solid #ddd")}
        onChange={(e) => setContent(e.target.value)}
        value={content}
      ></textarea>

      <button
        style={{
          marginTop: "1.5rem",
          padding: "12px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          width: "100%",
          transition: "background-color 0.2s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        onClick={createPost}
      >
        Create Post
      </button>
    </div>
  );
}

export default CreatePost;
