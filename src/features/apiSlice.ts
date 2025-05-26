import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Film from "../components/List/List"

const apiKey: string = "38aec9dcc915b82585b7be878fba2d4b";
const page: number = 1;
const baseUrl: string = `https://api.themoviedb.org/3/`

//interface de la pel·lícula concreta 
export interface Film {
  id: number;
  poster_path: string;
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
  baseQuery: fetchBaseQuery({ baseUrl}), // Canvia l'URL per la teva API
  endpoints: (builder) => ({
    // Exemple d'una consulta (GET)
    getDades: builder.query<Film[], void>({
      query: () => `movie/popular?api_key=${apiKey}&page=${page}`, // Endpoint de l'API
    }),
  }),
});

// Exporta els hooks generats automàticament
export const { useGetDadesQuery } = apiSlice;