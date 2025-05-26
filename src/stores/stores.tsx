import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Afegeix el reducer de l'API
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Afegeix el middleware de RTK Query
});


