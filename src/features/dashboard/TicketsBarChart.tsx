import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export type TicketsChartPoint = {
  label: string;
  value: number;
};

type Props = {
  data: TicketsChartPoint[];
};

export const TicketsBarChart: React.FC<Props> = ({data}) => {
  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Sin datos para este período</Text>
      </View>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value), 1);

  return (
    <View style={styles.container}>
      <View style={styles.chartRow}>
        {data.map(point => {
          const heightPercent = (point.value / maxValue) * 100;

          return (
            <View key={point.label} style={styles.barItem}>
              {/* valor arriba */}
              <Text style={styles.valueLabel}>
                {point.value > 0 ? point.value : ''}
              </Text>

              {/* barra */}
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    {height: `${heightPercent}%`},
                  ]}
                />
              </View>

              {/* etiqueta abajo */}
              <Text style={styles.label}>{point.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 140,
  },
  barItem: {
    flex: 1,
    alignItems: 'center',
  },
  valueLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
  },
  barTrack: {
    width: 16,
    height: 100,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    borderRadius: 999,
    backgroundColor: '#4F46E5', // morado corporativo, consistente con look moderno
  },
  label: {
    marginTop: 4,
    fontSize: 11,
    color: '#9CA3AF',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  emptyText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
});
