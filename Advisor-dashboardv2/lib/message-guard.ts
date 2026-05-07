export class OffPlatformContactError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OffPlatformContactError";
  }
}

export function isOffPlatformContactError(err: unknown): err is OffPlatformContactError {
  return err instanceof OffPlatformContactError;
}
