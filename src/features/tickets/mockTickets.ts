import {Ticket} from '../../shared/types/ticket';

export const MOCK_TICKETS: Ticket[] = [
  {
    id: '1042',
    title: 'No puedo iniciar sesión en la app',
    requester: 'Davy Jones',
    priority: 'Alta',
    status: 'OPEN',
    statusLabel: 'Abierto',
    createdAt: '12.01.2024',
  },
  {
    id: '1043',
    title: 'Error al procesar pago con Mastercard',
    requester: 'Guy Hawkins',
    priority: 'Crítica',
    status: 'RESOLVED',
    statusLabel: 'Resuelto',
    createdAt: '12.01.2024',
  },
  {
    id: '1044',
    title: 'Correos de restablecer contraseña no llegan',
    requester: 'Brooklyn Simmons',
    priority: 'Media',
    status: 'IN_PROGRESS',
    statusLabel: 'En progreso',
    createdAt: '12.01.2024',
  },
  {
    id: '1045',
    title: 'No puedo adjuntar archivos en Chrome',
    requester: 'Courtney Henry',
    priority: 'Alta',
    status: 'OPEN',
    statusLabel: 'Abierto',
    createdAt: '12.01.2024',
  },
  {
    id: '1046',
    title: 'La app se cierra al abrir detalle de ticket',
    requester: 'Bessie Cooper',
    priority: 'Crítica',
    status: 'OPEN',
    statusLabel: 'Abierto',
    createdAt: '12.01.2024',
  },
];
