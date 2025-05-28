// import { useState } from 'react'
import "./styles/App.css";
import Navbar from "./components/Navbar/Navbar";
import List from "./components/List/List";
import FilmDetail from "./pages/FilmDetail";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <List /> 
            </>
          }
        />
        <Route path="/movie/:id" element={<FilmDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
