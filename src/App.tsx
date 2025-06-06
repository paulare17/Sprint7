// import { useState } from 'react'
import "./styles/App.css";
import Navbar from "./components/Navbar/Navbar";
import List from "./components/List/List";
import FilmDetail from "./pages/FilmDetail";
import Login from "./pages/Login.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRute from "./auth/ProtectedRute.tsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
            <Route path="/movie/:id" element={
          <ProtectedRute>
              <FilmDetail />
          </ProtectedRute>
            }
            />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
