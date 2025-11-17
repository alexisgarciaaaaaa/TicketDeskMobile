import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActionSheetIOS,
  Alert,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MOCK_TICKETS} from '../tickets/mockTickets';
import {Ticket, TicketStatus} from '../../shared/types/ticket';
import {TicketsBarChart, TicketsChartPoint} from './TicketsBarChart';

type DateRange = '7d' | '30d' | '90d';

export const DashboardScreen: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>('7d');

  // ---- MÉTRICAS PRINCIPALES ----
  // No dependen realmente de dateRange, así que dejamos [] para evitar el warning
  const stats = useMemo(() => {
    const total = MOCK_TICKETS.length;

    const byStatus: Record<TicketStatus, number> = {
      OPEN: 0,
      IN_PROGRESS: 0,
      RESOLVED: 0,
      CLOSED: 0,
    };

    MOCK_TICKETS.forEach(ticket => {
      byStatus[ticket.status] += 1;
    });

    const resolvedPercentage =
      total === 0 ? 0 : Math.round((byStatus.RESOLVED / total) * 100);

    return {
      total,
      open: byStatus.OPEN,
      inProgress: byStatus.IN_PROGRESS,
      resolved: byStatus.RESOLVED,
      closed: byStatus.CLOSED,
      resolvedPercentage,
    };
  }, []);

  // ---- ACTIVIDAD RECIENTE ----
  // También es independiente del rango, solo mostramos los 3 últimos mock
  const recentTickets = useMemo<Ticket[]>(() => {
    return MOCK_TICKETS.slice(0, 3);
  }, []);

  // ---- DATOS PARA LA GRÁFICA ----
  const chartData: TicketsChartPoint[] = useMemo(() => {
    if (dateRange === '7d') {
      return [
        {label: 'L', value: 3},
        {label: 'M', value: 4},
        {label: 'X', value: 2},
        {label: 'J', value: 5},
        {label: 'V', value: 3},
        {label: 'S', value: 1},
        {label: 'D', value: 2},
      ];
    }

    if (dateRange === '30d') {
      return [
        {label: 'S1', value: 8},
        {label: 'S2', value: 10},
        {label: 'S3', value: 6},
        {label: 'S4', value: 7},
      ];
    }

    return [
      {label: 'Mes 1', value: 18},
      {label: 'Mes 2', value: 22},
      {label: 'Mes 3', value: 15},
    ];
  }, [dateRange]);

  // ---- LABEL DEL BOTÓN ----
  const dateRangeLabel = useMemo(() => {
    switch (dateRange) {
      case '30d':
        return 'Últimos 30 días ▾';
      case '90d':
        return 'Últimos 90 días ▾';
      case '7d':
      default:
        return 'Últimos 7 días ▾';
    }
  }, [dateRange]);

  // ---- MENÚ CONTEXTUAL ----
  const handleChangeRange = () => {
    const options = [
      'Últimos 7 días',
      'Últimos 30 días',
      'Últimos 90 días',
      'Cancelar',
    ];
    const cancelButtonIndex = 3;

    const selectRange = (index: number) => {
      switch (index) {
        case 0:
          setDateRange('7d');
          break;
        case 1:
          setDateRange('30d');
          break;
        case 2:
          setDateRange('90d');
          break;
        default:
          break;
      }
    };

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        buttonIndex => {
          if (buttonIndex != null) {
            selectRange(buttonIndex);
          }
        },
      );
    } else {
      Alert.alert('Rango de fechas', 'Selecciona un rango', [
        {text: 'Últimos 7 días', onPress: () => selectRange(0)},
        {text: 'Últimos 30 días', onPress: () => selectRange(1)},
        {text: 'Últimos 90 días', onPress: () => selectRange(2)},
        {text: 'Cancelar', style: 'cancel'},
      ]);
    }
  };

  // ---- RENDER ----
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.headerRow}>
            <Text style={styles.title}>Resumen</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={handleChangeRange}>
              <Text style={styles.filterText}>{dateRangeLabel}</Text>
            </TouchableOpacity>
          </View>

          {/* MÉTRICAS */}
          <View style={styles.metricsRow}>
            <MetricCard
              label="Abiertos"
              value={stats.open}
              badgeLabel="Tickets activos"
              color="#DC2626"
              bgColor="#FEE2E2"
            />
            <MetricCard
              label="Resueltos"
              value={stats.resolved}
              badgeLabel={`${stats.resolvedPercentage}% este período`}
              color="#16A34A"
              bgColor="#DCFCE7"
            />
          </View>

          <View style={styles.metricsRow}>
            <MetricCard
              label="En progreso"
              value={stats.inProgress}
              badgeLabel="En atención"
              color="#D97706"
              bgColor="#FEF3C7"
            />
            <MetricCard
              label="Cerrados"
              value={stats.closed}
              badgeLabel="Sin acciones pendientes"
              color="#4B5563"
              bgColor="#E5E7EB"
            />
          </View>

          {/* GRÁFICA */}
          <View style={styles.chartCard}>
            <View style={styles.chartHeaderRow}>
              <Text style={styles.sectionTitle}>Tendencia de tickets</Text>
              <Text style={styles.chartSubtitle}>
                Tickets creados por período
              </Text>
            </View>

            <TicketsBarChart data={chartData} />
          </View>

          {/* ACTIVIDAD RECIENTE */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Actividad reciente</Text>
            <Text style={styles.sectionSubtitle}>
              {stats.total} tickets en este período
            </Text>
          </View>

          {recentTickets.map(t => (
            <View key={t.id} style={styles.recentItemWrapper}>
              <RecentTicketItem ticket={t} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/* ------------------------------
      COMPONENTES INTERNOS
--------------------------------*/

type MetricCardProps = {
  label: string;
  value: number;
  badgeLabel: string;
  color: string;
  bgColor: string;
};

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  badgeLabel,
  color,
  bgColor,
}) => {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricValue, {color}]}>{value}</Text>
      <View style={[styles.metricBadge, {backgroundColor: bgColor}]}>
        <Text style={[styles.metricBadgeText, {color}]}>{badgeLabel}</Text>
      </View>
    </View>
  );
};

type RecentTicketItemProps = {
  ticket: Ticket;
};

const RecentTicketItem: React.FC<RecentTicketItemProps> = ({ticket}) => {
  const statusColor =
    ticket.status === 'RESOLVED'
      ? '#16A34A'
      : ticket.status === 'IN_PROGRESS'
      ? '#D97706'
      : '#DC2626';

  return (
    <View style={styles.recentItemCard}>
      <View style={styles.recentItemLeft}>
        <Text numberOfLines={1} style={styles.recentItemTitle}>
          {ticket.title}
        </Text>
        <Text numberOfLines={1} style={styles.recentItemSubtitle}>
          {ticket.requester} · {ticket.priority} · #{ticket.id}
        </Text>
      </View>

      <View style={styles.recentItemRight}>
        <Text style={styles.recentItemDate}>{ticket.createdAt}</Text>
        <Text style={[styles.recentItemStatus, {color: statusColor}]}>
          {ticket.statusLabel}
        </Text>
      </View>
    </View>
  );
};

/* ------------------------------
             ESTILOS
--------------------------------*/

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  /* HEADER */
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  filterText: {
    fontSize: 13,
    color: '#4B5563',
  },

  /* MÉTRICAS */
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 8,
    elevation: 2,
  },
  metricLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  metricBadgeText: {
    fontSize: 11,
    fontWeight: '500',
  },

  /* GRÁFICA */
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
    marginTop: 4,
  },
  chartHeaderRow: {
    marginBottom: 4,
  },
  chartHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  chartSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  /* ACTIVIDAD RECIENTE */
  sectionHeaderRow: {
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
  },

  /* ITEMS LISTA */
  recentItemWrapper: {
    marginBottom: 8,
  },
  recentItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 6,
    elevation: 1,
  },
  recentItemLeft: {
    flex: 1,
    marginRight: 8,
  },
  recentItemRight: {
    alignItems: 'flex-end',
  },
  recentItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  recentItemSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  recentItemDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  recentItemStatus: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default DashboardScreen;