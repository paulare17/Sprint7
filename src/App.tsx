import { useState, useEffect } from 'react'
import "./styles/App.css";
import Navbar from "./components/Navbar/Navbar";
import List from "./components/List/List";
import FilmDetail from "./pages/FilmDetail";
import Login from "./pages/Login.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRute from "./auth/ProtectedRute.tsx";
import ActorDetail from "./pages/ActorDetail";
import FavoritePage from "./pages/FavoritePage";

function App() {

   const [isScaryMode, setIsScaryMode] = useState(false);
  useEffect(() => {
    if (isScaryMode) {
      document.body.classList.add('scary-mode');
    } else {
      document.body.classList.remove('scary-mode');
    }
  }, [isScaryMode]);
  
  return (
    <BrowserRouter>
      <AuthProvider>
         <Navbar />
         <button 
          className={`scary-mode-button ${isScaryMode ? 'active' : ''}`}
          onClick={() => setIsScaryMode(prev => !prev)}
          >
          {isScaryMode ? "😱 Normal Mode" : "🎃 Scary Mode"}
        </button>
        <Routes>
         <Route
            path="/"
            element={
              <>
                <List 
                  cols={5} 
                  imageSize="w400" 
                  linkPrefix="/movie" 
                  isScaryMode={isScaryMode}
                />
              </>
            }
            />
          <Route
            path="/movie/:id"
            element={
              <ProtectedRute>
                <FilmDetail />
              </ProtectedRute>
            }
            />
          <Route
            path="/person/:id"
            element={
              <ProtectedRute>
                <ActorDetail />
              </ProtectedRute>
            }
            />
          <Route path="/login" element={<Login />} />
          <Route
            path="/favorites"
            element={
              <ProtectedRute>
                <FavoritePage />
              </ProtectedRute>
            }
            />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
