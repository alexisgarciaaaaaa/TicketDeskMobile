// src/features/tickets/api/ticketsApi.ts
import {httpRequest} from '../../../shared/api/httpClient';
import {Ticket, TicketPriority, TicketStatus} from '../../../shared/types/ticket';

export type TicketsQuery = {
  status?: TicketStatus;
  priority?: TicketPriority;
};

// Por ahora ignoramos el query (lo dejamos sólo tipado)
// para no complicar el mock server.
export async function fetchTickets(_query?: TicketsQuery): Promise<Ticket[]> {
  return httpRequest<Ticket[]>({
    method: 'GET',
    path: '/tickets',
  });
}
