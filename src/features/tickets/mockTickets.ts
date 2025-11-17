// src/features/tickets/mockTickets.ts
import {Ticket} from '../../shared/types/ticket';

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 10234,
    title: 'Error 500 al crear usuario desde portal interno',
    description:
      'Al intentar crear un usuario desde /admin/users, la API responde 500 de forma intermitente.',
    requester: 'Ana Morales',
    priority: 'Alta',
    status: 'OPEN',
    statusLabel: 'Abierto',
    createdAt: '12.01.2024',
  },
  {
    id: 10235,
    title: 'Notificaciones push duplicadas en iOS',
    description:
      'Algunos usuarios reportan recibir la misma notificación push dos veces en la app de producción.',
    requester: 'Carlos Rivas',
    priority: 'Media',
    status: 'IN_PROGRESS',
    statusLabel: 'En progreso',
    createdAt: '12.01.2024',
  },
  {
    id: 10236,
    title: 'Reporte de tickets no se descarga en formato CSV',
    description:
      "El botón 'Exportar CSV' descarga un archivo vacío para rangos mayores a 30 días.",
    requester: 'Laura Pérez',
    priority: 'Baja',
    status: 'RESOLVED',
    statusLabel: 'Resuelto',
    createdAt: '12.01.2024',
  },
];
