const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

/**
 * Whether a Postgres connection string points at this machine. An empty host
 * is a Unix socket, which is local too. An unparsable string is not local.
 */
export const isLocalDatabase = (connectionString: string) => {
  try {
    const { hostname } = new URL(connectionString);
    return hostname === "" || LOCAL_HOSTS.has(hostname);
  } catch {
    return false;
  }
};
