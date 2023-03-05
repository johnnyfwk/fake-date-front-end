import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Index from './components/Index';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import LogIn from './components/LogIn';

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Index />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/log-in" element={<LogIn />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
