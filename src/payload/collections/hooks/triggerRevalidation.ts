import type { Payload } from "payload";

type TriggerRevalidationArgs = {
  payload: Payload;
  paths: string[];
};

const resolveEndpoint = () => {
  const explicitEndpoint = process.env.NEXT_REVALIDATE_URL;

  if (explicitEndpoint) {
    return explicitEndpoint;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return `${baseUrl.replace(/\/$/, "")}/api/revalidate`;
};

const uniquePaths = (paths: string[]) => [...new Set(paths.filter(Boolean))];

export const triggerRevalidation = async ({
  payload,
  paths,
}: TriggerRevalidationArgs) => {
  const endpoint = resolveEndpoint();
  const normalizedPaths = uniquePaths(paths);

  if (!normalizedPaths.length) {
    return;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.NEXT_REVALIDATE_SECRET
          ? { authorization: `Bearer ${process.env.NEXT_REVALIDATE_SECRET}` }
          : {}),
      },
      body: JSON.stringify({ paths: normalizedPaths }),
    });

    if (!response.ok) {
      const errorBody = await response.text();

      payload.logger.error(
        `Failed to revalidate paths ${normalizedPaths.join(", ")} (status ${response.status}): ${errorBody}`,
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.stack || error.message
        : JSON.stringify(error ?? "Unknown error");

    payload.logger.error(
      `Failed to trigger revalidation for paths ${normalizedPaths.join(", ")}: ${errorMessage}`,
    );
  }
};
