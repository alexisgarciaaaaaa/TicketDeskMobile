// src/features/tickets/api/ticketsApi.ts
import { httpRequest } from "../../../shared/api/httpClient";

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  requester: string;
  status: TicketStatus;
  priority: TicketPriority;
}

export async function getTickets(): Promise<Ticket[]> {
  return httpRequest<Ticket[]>({
    method: 'GET',
    path: '/tickets', // 👈 importante
  });
}
