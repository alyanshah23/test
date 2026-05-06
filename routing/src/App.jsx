import { Routes, Route, Link } from "react-router-dom";

import Home from "./Components/Home";
import Contact from "./Components/Contact";
import About from "./Components/About";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/contact">Contact</Link> | 
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;