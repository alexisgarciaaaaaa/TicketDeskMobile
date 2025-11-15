import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {TicketsStackParamList} from '../../../app/navigation/TicketsStackNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type TicketDetailRouteProp = RouteProp<TicketsStackParamList, 'TicketDetail'>;
type Nav = NativeStackNavigationProp<TicketsStackParamList, 'TicketDetail'>;

type Props = {
  route: TicketDetailRouteProp;
};

export const TicketDetailScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<Nav>();
  const {ticket} = route.params;

  return (
    <View style={styles.overlay}>
      {/* Wrapper que empuja el sheet hacia abajo, sin respetar safe area bottom */}
      <View style={styles.safeArea}>
        <View style={styles.sheet}>
          {/* handle */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* header */}
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Detalles</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* contenido principal */}
          <View style={styles.card}>
            <Text style={styles.ticketTitle}>{ticket.title}</Text>
            <Text style={styles.ticketSubtitle}>
              {ticket.priority} · {ticket.statusLabel}
            </Text>

            <View style={styles.section}>
              <DetailRow label="Solicitante" value={ticket.requester} />
              <DetailRow label="Ticket" value={`#${ticket.id}`} />
              <DetailRow label="Creado el" value={ticket.createdAt} />
              <DetailRow label="Estado" value={ticket.statusLabel} />
              <DetailRow label="Prioridad" value={ticket.priority} />
              <DetailRow label="Asignado a" value="Sin asignar" />
            </View>

            <View style={styles.sectionFooter}>
              <Text style={styles.transactionText}>
                Número de ticket #{ticket.id}
              </Text>

              <TouchableOpacity style={styles.issueButton}>
                <Text style={styles.issueButtonText}>
                  Reportar un problema con este ticket
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

type DetailRowProps = {
  label: string;
  value: string;
};

const DetailRow: React.FC<DetailRowProps> = ({label, value}) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.35)', // fondo oscuro semi-transparente
    justifyContent: 'flex-end',
  },
  // Ahora es solo un wrapper normal, sin SafeAreaView
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#F3F4F6',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24, // aquí decides qué tan pegado queda el contenido al bottom
  },
  handleContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  closeButton: {
    fontSize: 20,
    color: '#4B5563',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: {width: 0, height: 6},
    shadowRadius: 12,
    elevation: 3,
  },
  ticketTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  ticketSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  section: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
    marginTop: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  detailValue: {
    fontSize: 13,
    color: '#111827',
    maxWidth: '60%',
    textAlign: 'right',
  },
  sectionFooter: {
    marginTop: 16,
  },
  transactionText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  issueButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  issueButtonText: {
    fontSize: 13,
    color: '#EA580C',
    fontWeight: '500',
  },
});

