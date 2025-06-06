import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Film from "../components/List/List"

const apiKey: string = "38aec9dcc915b82585b7be878fba2d4b";
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
}


//interface dels elements de la API
export interface MovieResponse {
  page: number;
  results: Film[];
  total_pages: number;
  total_results: number;
}


// Defineix el servei de l'API
export const apiSlice = createApi({
  reducerPath: 'api', // Nom de l'espai al store
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
      query: (id) => `movie/${id}/credits?api_key=${apiKey}`,
    })
  }),
});

// Exporta els hooks generats automàticament
export const { useGetDadesQuery, useGetFilmByIdQuery, useGetCastByIdQuery } = apiSlice;