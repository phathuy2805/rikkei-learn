export const ASYNC_CONNECTION = 'ASYNC_CONNECTION';

export interface AsyncConnectionConfig {
  host: string;
  port: number;
  status: string;
  connectedAt: string;
}

export const createAsyncConnection = async (): Promise<AsyncConnectionConfig> => {
  console.log('[AsyncProvider] Connecting to external 3rd-party service...');
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log('[AsyncProvider] Connection established after 3000ms delay!');
  return {
    host: 'db.remote-cluster.internal',
    port: 5432,
    status: 'CONNECTED',
    connectedAt: new Date().toISOString(),
  };
};
