import './App.css';
import { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Index from './components/Index';
import Home from './components/Home';
import PostATrip from './components/PostATrip';
import About from './components/About';
import Contact from './components/Contact';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {
  const [users, setUsers] = useState([]);

  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-in" element={<SignIn users={users} setUsers={setUsers} />} />
        <Route path="/sign-up" element={<SignUp users={users} setUsers={setUsers} />} />
        <Route path="/post-a-trip" element={<PostATrip />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
