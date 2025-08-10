import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import EditPost from "./pages/EditPost";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const navigate = useNavigate();

  const SignOut = () => {
    localStorage.removeItem("isAuth");
    setIsAuth(false);
    navigate("/");
  };

  return (
    <>
      {/* Dark Modern Navbar */}
      <nav className="bg-[#121212] border-b border-gray-800 shadow-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="text-white text-xl font-semibold tracking-wide hover:text-gray-300 transition"
          >
            MyBlog
          </Link>

          {/* Navigation Links */}
          <ul className="flex gap-6 items-center">
            <li>
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition duration-200"
              >
                Home
              </Link>
            </li>
            {isAuth && (
              <li>
                <Link
                  to="/createPost"
                  className="text-gray-300 hover:text-white transition duration-200"
                >
                  Create Post
                </Link>
              </li>
            )}
            {!isAuth ? (
              <li>
                <Link
                  to="/login"
                  className="bg-gray-800 text-gray-200 px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-700 transition"
                >
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <button
                  onClick={SignOut}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/createPost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/edit/:id" element={<EditPost isAuth={isAuth} />} />
      </Routes>
    </>
  );
}

export default App;
