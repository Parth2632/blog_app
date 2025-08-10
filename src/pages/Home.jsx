import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config.js"; // Combined import
import { FaTrash, FaEdit } from "react-icons/fa"; // Icons for delete & edit
import { useNavigate } from "react-router-dom"; // For redirecting on edit

function Home({ isAuth }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const data = await getDocs(postsCollection);
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) {
    return (
      <p className="mt-10 text-lg text-gray-500 font-sans">
        Loading posts...
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {posts.length === 0 ? (
        <p className="text-gray-500 text-lg font-sans">
          No posts yet. Be the first to share something!
        </p>
      ) : (
        posts.map((post) => (
          <article
            key={post.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm hover:shadow-lg transition-shadow duration-200 font-sans text-left relative"
          >
            {/* Author-only edit & delete buttons - Fixed positioning */}
            {isAuth && post.author?.id === auth.currentUser?.uid && (
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => navigate(`/edit/${post.id}`)}
                  className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all duration-200 flex items-center justify-center"
                  title="Edit Post"
                >
                  <FaEdit size={16} />
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 flex items-center justify-center"
                  title="Delete Post"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            )}

            <div className="pr-20">
              <h2 className="text-2xl font-bold mb-1 text-gray-900">
                {post.title}
              </h2>
              {post.author?.name && (
                <p className="text-sm text-gray-500 mb-4">
                  By {post.author.name}
                </p>
              )}

              <p className="text-gray-700 leading-relaxed">
                {post.content}
              </p>
            </div>
          </article>
        ))
      )}
    </div>
  );
}

export default Home;