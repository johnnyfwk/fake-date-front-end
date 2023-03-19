import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import Messages from "./pages/Messages";
import DirectMessage from "./pages/DirectMessage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error404 from "./pages/Error404";


function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/sign-in" element={<SignIn users={users} setUsers={setUsers} />} />
        <Route path="/sign-up" element={<SignUp users={users} setUsers={setUsers} />} />
        <Route path="/home" element={<Home posts={posts} setPosts={setPosts} />} />
        <Route path="/profile/:user_id" element={<Profile />} />
        <Route path="/posts/:post_id" element={<Post />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/profile/:user_id/messages" element={<Messages />} />
        <Route path="/profile/:logged_in_user_id/messages/:other_user_id" element={<DirectMessage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
