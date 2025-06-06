import React, { useState } from "react";
import { TextField, Button, Typography, Box, Stack } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";  //funcions de Firebase
import { app } from "../libraries/firebase"; // config de Firebase
// import { useNavigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginForm() {

    const navigate = useNavigate();
    const location = useLocation();


const from = (location.state as { from?: Location })?.from?.pathname || '/';


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth(app);

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
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
      setError("Credencials incorrectes");
    }
  };

  return (
    <section className="login">
          <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}
    >
      <Typography variant="h5">{isRegister ? 'Registra’t' : 'Inicia sessió'}</Typography>
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
          {isRegister ? 'Registra’t' : 'Entrar'}
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setIsRegister((prev) => !prev);
            setError('');
          }}
        >
          {isRegister ? 'Tinc un compte' : 'Crear compte nou'}
        </Button>
      </Stack>
    </Box>
    </section>
  );
}
