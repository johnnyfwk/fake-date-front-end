import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import About from "./pages/About";
import Contact from "./pages/Contact";


function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/sign-in" element={<SignIn users={users} setUsers={setUsers} />} />
        <Route path="/sign-up" element={<SignUp users={users} setUsers={setUsers} />} />
        <Route path="/home" element={<Home posts={posts} setPosts={setPosts} />} />
        <Route path="/profile/:user_id" element={<Profile />} />
        <Route path="/posts/:post_id" element={<Post />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
