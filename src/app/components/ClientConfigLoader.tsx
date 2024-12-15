import { ReactNode, useCallback, useEffect, useState } from 'react';
import { AsyncStatus, useAsyncCallback } from '../hooks/useAsyncCallback';
import { ClientConfig } from '../hooks/useClientConfig';
import { trimTrailingSlash } from '../utils/common';

const getClientConfig = async (): Promise<ClientConfig> => {
  let url = `${trimTrailingSlash(import.meta.env.BASE_URL)}/config.${window.location.hostname}.json`;
  let config = await fetch(url, { method: 'GET' });

  let loadedConfig = null;
  try {
    if(config.ok && import.meta.env.MODE != "development") {
      loadedConfig = await config.json();
    }
  } catch (e) {}

  if(!loadedConfig) {
    url = `${trimTrailingSlash(import.meta.env.BASE_URL)}/config.json`;
    config = await fetch(url, { method: 'GET' });
    try {
      loadedConfig = await config.json();
    } catch (e) {
      return {};
    }
  }
  return loadedConfig;
};

type ClientConfigLoaderProps = {
  fallback?: () => ReactNode;
  error?: (err: unknown, retry: () => void, ignore: () => void) => ReactNode;
  children: (config: ClientConfig) => ReactNode;
};
export function ClientConfigLoader({ fallback, error, children }: ClientConfigLoaderProps) {
  const [state, load] = useAsyncCallback(getClientConfig);
  const [ignoreError, setIgnoreError] = useState(false);

  const ignoreCallback = useCallback(() => setIgnoreError(true), []);

  useEffect(() => {
    load();
  }, [load]);

  if (state.status === AsyncStatus.Idle || state.status === AsyncStatus.Loading) {
    return fallback?.();
  }

  if (!ignoreError && state.status === AsyncStatus.Error) {
    return error?.(state.error, load, ignoreCallback);
  }

  const config: ClientConfig = state.status === AsyncStatus.Success ? state.data : {};

  return children(config);
}
