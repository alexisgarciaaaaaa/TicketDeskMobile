import {useEffect, useState, useCallback} from 'react';
import {fetchTickets, Ticket, TicketsQuery} from '../api/ticketsApi';
import {HttpErrorShape} from '../../../shared/api/httpClient';
import {useAuth} from '../../auth/context/AuthProvider';

type UseTicketsState = {
  data: Ticket[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: HttpErrorShape | null;
};

export function useTickets(initialQuery?: TicketsQuery) {
  const {user} = useAuth();
  const [query, setQuery] = useState<TicketsQuery | undefined>(initialQuery);
  const [state, setState] = useState<UseTicketsState>({
    data: [],
    isLoading: true,
    isRefreshing: false,
    error: null,
  });

  const loadTickets = useCallback(
    async (opts?: {refresh?: boolean; signal?: AbortSignal}) => {
      const isRefresh = opts?.refresh ?? false;

      setState(prev => ({
        ...prev,
        isLoading: !isRefresh && prev.data.length === 0,
        isRefreshing: isRefresh,
        error: isRefresh ? prev.error : null,
      }));

      try {
        // ejemplo de cómo podrías personalizar la query según el usuario logueado
        const effectiveQuery: TicketsQuery = {
          ...query,
        };

        const tickets = await fetchTickets(effectiveQuery);
        if (opts?.signal?.aborted) {
          return;
        }

        setState(prev => ({
          ...prev,
          data: tickets,
          isLoading: false,
          isRefreshing: false,
          error: null,
        }));
      } catch (err) {
        if ((err as any)?.name === 'AbortError') {
          return;
        }

        const httpErr = err as HttpErrorShape;

        setState(prev => ({
          ...prev,
          isLoading: false,
          isRefreshing: false,
          error: httpErr,
        }));
      }
    },
    [query, user?.email],
  );

  useEffect(() => {
    const controller = new AbortController();
    loadTickets({signal: controller.signal});

    return () => {
      controller.abort();
    };
  }, [loadTickets]);

  const refresh = useCallback(() => {
    return loadTickets({refresh: true});
  }, [loadTickets]);

  return {
    tickets: state.data,
    isLoading: state.isLoading,
    isRefreshing: state.isRefreshing,
    error: state.error,
    query,
    setQuery,
    refresh,
  };
}
