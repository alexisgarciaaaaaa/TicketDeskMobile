import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Ticket, TicketStatus} from '../../../shared/types/ticket';

type Props = {
  ticket: Ticket;
};

type StatusConfig = {
  bg: string;
  iconColor: string;
  icon: string;
};

const STATUS_CONFIG: Record<TicketStatus, StatusConfig> = {
  OPEN: {
    bg: '#FFE4E6',
    iconColor: '#E11D48',
    icon: '⏺',
  },
  IN_PROGRESS: {
    bg: '#FEF3C7',
    iconColor: '#D97706',
    icon: '↻',
  },
  RESOLVED: {
    bg: '#DCFCE7',
    iconColor: '#16A34A',
    icon: '✓',
  },
  CLOSED: {
    bg: '#E5E7EB',
    iconColor: '#4B5563',
    icon: '✕',
  },
};

export const TicketListItem: React.FC<Props> = ({ticket}) => {
  const statusStyles = STATUS_CONFIG[ticket.status];

  return (
    <View style={styles.card}>
      {/* Icono / estado */}
      <View
        style={[
          styles.statusIconContainer,
          {backgroundColor: statusStyles.bg},
        ]}>
        <Text style={[styles.statusIcon, {color: statusStyles.iconColor}]}>
          {statusStyles.icon}
        </Text>
      </View>

      {/* Contenido principal */}
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {ticket.title}
        </Text>
        <Text numberOfLines={1} style={styles.subtitle}>
          {ticket.requester} · {ticket.priority} · #{ticket.id}
        </Text>
      </View>

      {/* Info derecha */}
      <View style={styles.rightContent}>
        <Text style={styles.date}>{ticket.createdAt}</Text>
        <Text style={[styles.statusLabel, getStatusColor(ticket.status)]}>
          {ticket.statusLabel}
        </Text>
      </View>
    </View>
  );
};

const getStatusColor = (status: TicketStatus) => {
  switch (status) {
    case 'RESOLVED':
      return styles.statusResolved;
    case 'IN_PROGRESS':
      return styles.statusInProgress;
    case 'CLOSED':
      return styles.statusClosed;
    case 'OPEN':
    default:
      return styles.statusOpen;
  }
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
    elevation: 2,
  },
  statusIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statusIcon: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  rightContent: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  statusResolved: {
    color: '#16A34A',
  },
  statusOpen: {
    color: '#DC2626',
  },
  statusInProgress: {
    color: '#D97706',
  },
  statusClosed: {
    color: '#4B5563',
  },
});
