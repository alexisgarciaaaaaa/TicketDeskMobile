// src/features/tickets/screens/TicketsListScreen.tsx
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TicketsStackParamList} from '../../../app/navigation/TicketsStackNavigator';
import {Ticket} from '../../../shared/types/ticket';
import {fetchTickets} from '../api/ticketsApi';

type Props = NativeStackScreenProps<TicketsStackParamList, 'TicketsList'>;

type TicketsState = {
  items: Ticket[];
  loading: boolean;
  error: string | null;
};

export const TicketsListScreen: React.FC<Props> = ({navigation}) => {
  const [state, setState] = useState<TicketsState>({
    items: [],
    loading: true,
    error: null,
  });

  const loadTickets = async () => {
    try {
      setState(prev => ({...prev, loading: true, error: null}));

      const data = await fetchTickets();
      console.log('[Tickets] recibidos', data);

      setState({
        items: data,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.log('[Tickets] error', err);

      const message =
        err instanceof Error
          ? err.message
          : 'Ocurrió un problema al obtener los tickets. Intenta de nuevo.';

      setState(prev => ({
        ...prev,
        loading: false,
        error: message,
      }));
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handlePressTicket = (ticket: Ticket) => {
    navigation.navigate('TicketDetail', {ticket});
  };

  const renderItem = ({item}: {item: Ticket}) => (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.9}
      onPress={() => handlePressTicket(item)}>
      <View style={styles.card}>
        <Text style={styles.ticketId}>#{item.id}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.metaRow}>
          <View>
            <Text style={styles.metaLabel}>Solicitante</Text>
            <Text style={styles.metaValue}>{item.requester}</Text>
          </View>

          <View style={styles.metaRight}>
            <View style={[styles.statusPill, getStatusPillStyle(item.status)]}>
              <Text style={styles.statusText}>
                {mapStatusToLabel(item.status)}
              </Text>
            </View>
            <View style={styles.priorityRow}>
              <View
                style={[styles.priorityDot, getPriorityDotStyle(item.priority)]}
              />
              <Text style={styles.priorityText}>
                {mapPriorityToLabel(item.priority)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const {items, loading, error} = state;

  // Estado de carga inicial
  if (loading && items.length === 0) {
    return (
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'left', 'right', 'bottom']}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      </SafeAreaView>
    );
  }

  // Estado de error inicial
  if (error && items.length === 0) {
    return (
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'left', 'right', 'bottom']}>
        <View style={styles.centered}>
          <Text style={styles.errorTitle}>
            No se pudieron cargar los tickets
          </Text>
          <Text style={styles.errorSubtitle}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadTickets}>
            <Text style={styles.retryText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tickets</Text>
          <Text style={styles.headerSubtitle}>
            Revisa y da seguimiento a los tickets más recientes.
          </Text>
        </View>

        {/* Lista */}
        <FlatList
          data={items}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

// Helpers UI
const mapStatusToLabel = (status: Ticket['status']) => {
  switch (status) {
    case 'OPEN':
      return 'Abierto';
    case 'IN_PROGRESS':
      return 'En progreso';
    case 'RESOLVED':
      return 'Resuelto';
    case 'CLOSED':
      return 'Cerrado';
    default:
      return status;
  }
};

const mapPriorityToLabel = (priority: Ticket['priority']) => {
  return priority;
};

const getStatusPillStyle = (status: Ticket['status']) => {
  switch (status) {
    case 'OPEN':
      return {backgroundColor: '#E0ECFF'};
    case 'IN_PROGRESS':
      return {backgroundColor: '#FEF3C7'};
    case 'RESOLVED':
      return {backgroundColor: '#DCFCE7'};
    case 'CLOSED':
      return {backgroundColor: '#E5E7EB'};
    default:
      return {backgroundColor: '#E5E7EB'};
  }
};

const getPriorityDotStyle = (priority: Ticket['priority']) => {
  switch (priority) {
    case 'Baja':
      return {backgroundColor: '#22C55E'};
    case 'Media':
      return {backgroundColor: '#FACC15'};
    case 'Alta':
      return {backgroundColor: '#FB923C'};
    case 'Crítica':
      return {backgroundColor: '#EF4444'};
    default:
      return {backgroundColor: '#9CA3AF'};
  }
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    paddingHorizontal: 20,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: {width: 0, height: 6},
    shadowRadius: 12,
    elevation: 2,
  },
  ticketId: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  metaLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  metaRight: {
    alignItems: 'flex-end',
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  priorityText: {
    fontSize: 13,
    color: '#4B5563',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  errorSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 12,
  },
  retryButton: {
    marginTop: 4,
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
