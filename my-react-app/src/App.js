import {Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/home";
import Contact from "./pages/Contact/contact";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
  );
}

export default App;
