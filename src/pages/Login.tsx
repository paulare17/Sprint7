import React, { useState } from "react";
import { TextField, Button, Typography, Box, Stack } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"; //funcions de Firebase
import { app } from "../libraries/firebase"; // config de Firebase
// import { useNavigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: Location })?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); //
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth(app);

    try {
      if (isRegister) {
        //crear usuari
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (userCredential.user) {
          await updateProfile(userCredential.user, {
            displayName: username,
          });
        }
        alert("Compte creat correctament!");
        navigate(from, { replace: true });
        console.log("Usuari creat correctament");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate(from, { replace: true });
        console.log("Sessió iniciada correctament!");
        setError("");
      }
    } catch (err: any) {
      console.error(err);
      setError("Error en el procés");
    }
  };

  return (
    <section className="login">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300 }}
      >
        <Typography variant="h5">
          {isRegister ? "Registra’t" : "Inicia sessió"}
        </Typography>

 {/* username només en el registre */}
        {isRegister && (
          <TextField
            label="Nom d'usuari"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}

        <TextField
          label="Correu electrònic"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Contrasenya"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained">
            {isRegister ? "Registra’t" : "Entrar"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setIsRegister((prev) => !prev);
              setError("");
              setUsername('')
            }}
          >
            {isRegister ? "Tinc un compte" : "Crear compte nou"}
          </Button>
        </Stack>
      </Box>
    </section>
  );
}
