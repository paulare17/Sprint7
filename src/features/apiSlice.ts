import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Film from "../components/List/List"

export const apiKey: string = "38aec9dcc915b82585b7be878fba2d4b";
// const page: number = 1;
// const language: string = "&language=ca"
const baseUrl: string = `https://api.themoviedb.org/3/`


//interface de la pel·lícula concreta 
export interface Film {
  id: number;
  poster_path: string;
  title: string;
  original_title: string;
  overview: string;
  name: string;
  profile_path: string;
  release_date: string;
  character?: string;
}
//interface actors
export interface Actor {
  id: number;
  name: string;
  profile_path: string;
  known_for: Film[];
}



//interface dels elements de la API
export interface MovieResponse {
  page: number;
  results: Film[];
  total_pages: number;
  total_results: number;
}

//interface per accedir als detalls de l'actor
export interface CastResponse {
  id: number;
  cast: Actor[];
  crew: {
    id: number;
    name: string;
    known_for_department: string;
    job: string;
  }[];
}


// Defineix el servei de l'API
export const apiSlice = createApi({
  reducerPath: 'api', 
  baseQuery: fetchBaseQuery({ baseUrl}), 
  endpoints: (builder) => ({
    //construcció "dels links"
    getDades: builder.query<MovieResponse, number>({
      query: (page = 1) => `movie/popular?api_key=${apiKey}&page=${page}`, //llista pelicules
    }),
    getFilmById: builder.query<Film, number>({
      query: (id) => `movie/${id}?api_key=${apiKey}`, //pelis individuals
    }),
    getCastById: builder.query<Film, string>({
      query: (id) => `movie/${id}/credits?api_key=${apiKey}`, //actors que participen de la peli
    }),
    getActorById: builder.query<Actor, string>({ //actor individual
      query: (id) => `person/${id}?api_key=${apiKey}`,
    }),
    getActorMovies: builder.query<MovieResponse, string>({
      query: (id) => `person/${id}/movie_credits?api_key=${apiKey}`, 
    }),
    getMoviesByGenre: builder.query<MovieResponse, {page: number}>({
      query: (page = 1) => 
        `discover/movie?api_key=${apiKey}&with_genres=27,53&page=${page}&sort_by=popularity.desc`,
    }),
})})

// Exporta els hooks generats automàticament
export const {
  useGetDadesQuery,
  useGetFilmByIdQuery,
  useGetCastByIdQuery,
  useGetActorByIdQuery,
  useGetActorMoviesQuery,
  useGetMoviesByGenreQuery
} = apiSlice;