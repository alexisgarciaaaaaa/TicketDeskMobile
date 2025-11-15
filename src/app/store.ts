// src/app/store.ts
import {configureStore} from '@reduxjs/toolkit';

// De momento no usamos Redux para tickets,
// pero dejamos el store preparado para futuros slices.
export const store = configureStore({
  reducer: {
    // ej: tickets: ticketsReducer,
  },
});

// Tipos inferidos para usar en hooks tipados
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
