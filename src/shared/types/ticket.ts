// src/shared/types/ticket.ts

// Estado interno de negocio
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

// Prioridad en texto (en español, como en el UI)
export type TicketPriority = 'Baja' | 'Media' | 'Alta' | 'Crítica';

export type Ticket = {
  id: number;
  title: string;
  description: string;
  requester: string;

  // Prioridad y estado
  priority: TicketPriority;
  status: TicketStatus;

  // Campo usado para mostrar “Resuelto / En progreso / Abierto” en UI
  statusLabel: string;

  // Fecha legible que estás usando en las pantallas (12.01.2024, etc.)
  createdAt: string;
};
