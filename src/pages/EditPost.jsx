import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config.js";
import { useNavigate, useParams } from "react-router-dom";

function EditPost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
      return;
    }

    const getPost = async () => {
      try {
        const postDoc = doc(db, "posts", id);
        const post = await getDoc(postDoc);
        
        if (post.exists()) {
          const postData = post.data();
          // Check if user owns this post
          if (postData.author?.id !== auth.currentUser?.uid) {
            setError("You can only edit your own posts");
            setLoading(false);
            return;
          }
          
          setTitle(postData.title);
          setContent(postData.content);
        } else {
          setError("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Error loading post");
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [id, isAuth, navigate]);

  const updatePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const postDoc = doc(db, "posts", id);
      await updateDoc(postDoc, {
        title,
        content,
        updatedAt: new Date()
      });
      
      navigate("/");
    } catch (error) {
      console.error("Error updating post:", error);
      setError("Error updating post");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Post</h1>
      
      <form onSubmit={updatePost} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="8"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            required
          />
        </div>
        
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Post"}
          </button>
          
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
