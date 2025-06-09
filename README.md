# 🎬 MovieApp

Aplicació web desenvolupada amb **React**, **TypeScript**, **Firebase** i **React Router**, que utilitza l'API de **TMDB**.

## 🧩 Funcionalitats

- Registre i login d'usuari (Firebase Auth)
- Guardar pel·lícules com a preferides
- Filtre especial "Scary Mode" per veure només pel·lícules de por
- Vista detallada de pel·lícules amb els seus actors únicament amb autenticació d'usuari
- Vista de cada actor amb totes les pel·lícules on ha participat

## 🛠️ Tecnologies

- React
- TypeScript
- Firebase (auth + firestore)
- React Router
- TMDB API

## ⚙️ Requisits

- Node.js (versió LTS recomanada)
- npm o yarn
- Clau d'API de [TMDB](https://www.themoviedb.org/)

## 🚀 Instal·lació

1. Clona el repositori:

```bash
git clone https://github.com/usuari/nom-del-repositori.git
cd nom-del-repositori
```

2. Instal·la les dependències:

```bash
npm install
```

3. Revisa que a firebase.ts hi hagi aquestes credencials (imprescindibles per accedir a les dades de TMDB):
```bash
const firebaseConfig = {
  apiKey: 'AIzaSyCrxYaWTVZizCoJAtnZAZYQceQH9oNAXDY',
  authDomain: 'sprint7-580bb.firebaseapp.com',
  projectId: 'sprint7-580bb',
  storageBucket: 'sprint7-580bb.appspot.com',
  messagingSenderId: '862284021863',
  appId: '1:862284021863:web',
};
```

4. Inicia el servidor de desenvolupament:

```bash
npm run dev
```
