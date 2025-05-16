import { TryCatchResult } from "../@types/ITryCatch";

export function catchError<T>(func: T): TryCatchResult<T> {
  try {
    const result = func;
    return [null, result];
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    return [error, null];
  }
}
