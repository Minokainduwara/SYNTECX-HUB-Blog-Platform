import type { AxiosError } from "axios";

/** Backend may return non-JSON bodies when middleware throws. */
export function getApiErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === "object" && "response" in err) {
    const ax = err as AxiosError<{ message?: string }>;
    const msg = ax.response?.data?.message;
    if (typeof msg === "string" && msg.length > 0) return msg;
    if (typeof ax.message === "string" && ax.message.length > 0)
      return ax.message;
  }
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}
