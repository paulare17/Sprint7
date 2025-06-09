import { useParams, Link } from "react-router-dom";
import { useGetFilmByIdQuery, useGetCastByIdQuery } from "../features/apiSlice";
import type { Film } from "../features/apiSlice";
import List from "../components/List/List";
import { useAuth } from "../auth/AuthContext";
import { db } from "../libraries/firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const FilmDetail = () => {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading, isError } = useGetFilmByIdQuery(Number(id));
  const { data: castData } = useGetCastByIdQuery(id || "");
  const [isFavorite, setIsFavorite] = useState(false);

  // favorits
  useEffect(() => {
    const checkFavorite = async () => {
      if (!user || !id) return;
      
      const favoriteRef = doc(db, `users/${user.uid}/favorites`, id);
      const docSnap = await getDoc(favoriteRef);
      setIsFavorite(docSnap.exists());
    };

    checkFavorite();
  }, [user, id]);

  const handleFavoriteClick = async () => {
    if (!user || !movie || !id) return;

    const favoriteRef = doc(db, `users/${user.uid}/favorites`, id);

    //per no esperar resposta
      setIsFavorite(prev => !prev);

    try {
      if (isFavorite) {
        await deleteDoc(favoriteRef);
      } else {
        await setDoc(favoriteRef, {
         movieId: id,
          title: movie.title,
          poster_path: movie.poster_path,
          original_title: movie.original_title,
          overview: movie.overview,
          release_date: movie.release_date,
          addedAt: new Date().toISOString()
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  // Mou les condicions de loading i error després dels hooks
  if (isLoading) return <p>Carregant...</p>;
  if (isError || !movie) return <p>No s'ha trobat la pel·lícula</p>;

  const director = castData?.crew?.find(
    person => person.known_for_department === "Directing" && person.job === "Director"
  );

  return (
    <div className="pg">
      <section className="info-film">
        <img
          className="poster-detail"
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt={`Poster of the film ${movie.original_title}`}
        />
        <div className="title-container">
          <h1 className="title">{movie.title}</h1>
          {user && (
            <IconButton 
              onClick={handleFavoriteClick}
              aria-label="toggle favorite"
              className = "fav"
              sx={{ color: isFavorite ? 'red' : 'grey' 
              }}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          )}
        </div>
        <h5>"{movie.original_title}"</h5>
        <h4>{movie.release_date}</h4>
        <p className="overview">{movie.overview}</p>
        <p>
          {director ? (
            <>
              Director: <Link to={`/person/${director.id}`}>{director.name}</Link>
            </>
          ) : (
            'Director no disponible'
          )}
        </p>
      </section>
      {castData && castData.cast && (
        <List 
          movies={castData.cast}
          cols={7}
          imageSize="w300"
          linkPrefix="/person"
          isActor={true}
        />
      )}
    </div>
  );
};

export default FilmDetail;
