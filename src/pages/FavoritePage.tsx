import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { db } from '../libraries/firebase';
import { collection, getDocs } from 'firebase/firestore';
import List from '../components/List/List';
import type { Film } from '../features/apiSlice';

const FavoritePage = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadFavorites = async () => {
      if (!user) {
        if (isMounted) {
          setFavorites([]);
          setIsLoading(false);
        }
        return;
      }

      try {
        const favRef = collection(db, `users/${user.uid}/favorites`);
        const snapshot = await getDocs(favRef);
        
        if (isMounted) {
          const favs = snapshot.docs.map(doc => ({
            id: Number(doc.id),
            ...doc.data()
          })) as Film[];
          
          setFavorites(favs);
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadFavorites();

    return () => {
      isMounted = false;
    };
  }, [user]);

if (!user) {
    console.log("No user found"); // Debug log
    return <p>Has d'iniciar sessió per veure els preferits</p>;
  }

  if (isLoading) {
    console.log("Loading state"); // Debug log
    return <p>Carregant preferits...</p>;
  }

  if (favorites.length === 0) {
    console.log("No favorites found"); // Debug log
    return <p>No tens cap pel·lícula als preferits</p>;
  }


  return (
    <div className="favorites-page">
      <h1>Les meves pel·lícules preferides ({favorites.length})</h1>
      <List 
        movies={favorites}
        cols={5}
        imageSize="w200"
        linkPrefix="/movie"
      />
    </div>
  );
};

export default FavoritePage;