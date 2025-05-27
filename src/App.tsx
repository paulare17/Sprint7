// import { useState } from 'react'
import "./styles/App.css";
import Navbar from "./components/Navbar/Navbar";
import List from "./components/List/List";
import FilmDetail from "./pages/FilmDetail";
import {Route, Routes } from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/movie/:id" element={<FilmDetail />} /> {/* nova ruta */}
      </Routes>
    </>

  );
}

export default App;
