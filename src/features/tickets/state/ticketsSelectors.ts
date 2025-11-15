// src/features/tickets/state/ticketsSelectors.ts
import { RootState } from "../../../app/store";

// Selecciona todo el slice de tickets
export const selectTicketsState = (state: RootState) => state.tickets;

// Si luego quieres algo más específico, puedes agregar cosas como:
// export const selectTicketsItems = (state: RootState) => state.tickets.items;
// export const selectTicketsLoading = (state: RootState) => state.tickets.loading;
// export const selectTicketsError = (state: RootState) => state.tickets.error;
