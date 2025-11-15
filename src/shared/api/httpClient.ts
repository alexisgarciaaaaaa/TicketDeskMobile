// import Config from 'react-native-config';  // <- por ahora NO lo usamos

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface HttpRequestConfig<TBody = unknown> {
  method?: HttpMethod;
  path: string;
  body?: TBody;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export interface HttpErrorShape {
  status: number;
  message: string;
  details?: unknown;
}

// ⚠️ IMPORTANTE: usa la IP de tu Mac, no "localhost".
const BASE_URL = 'http://127.0.0.1:3001';
// Si usas dispositivo físico, pon algo tipo:
// const BASE_URL = 'http://192.168.1.23:3001'; // IP de tu Mac en la red

export async function httpRequest<TResponse, TBody = unknown>(
  config: HttpRequestConfig<TBody>,
): Promise<TResponse> {
  const url = `${BASE_URL}${config.path}`;

  const init: RequestInit = {
    method: config.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(config.headers ?? {}),
    },
    signal: config.signal,
  };

  if (config.body !== undefined) {
    init.body = JSON.stringify(config.body);
  }

  try {
    console.log('[HTTP] →', init.method, url);
    const response = await fetch(url, init);

    const contentType = response.headers.get('Content-Type') ?? '';
    const isJson = contentType.includes('application/json');
    const payload = isJson ? await response.json() : await response.text();

    console.log('[HTTP] ←', response.status, payload);

    if (!response.ok) {
      const httpError: HttpErrorShape = {
        status: response.status,
        message:
          (isJson && (payload as any)?.message) ||
          `Error ${response.status} al llamar a ${config.path}`,
        details: payload,
      };
      throw httpError;
    }

    return payload as TResponse;
  } catch (error) {
    console.log('[HTTP] ERROR', error);
    throw {
      status: 0,
      message: 'No se pudo conectar con el servidor',
      details: error,
    } satisfies HttpErrorShape;
  }
}
