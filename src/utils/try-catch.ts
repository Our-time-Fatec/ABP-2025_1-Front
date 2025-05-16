import { TryCatchResult } from "../@types/ITryCatch"

export async function asyncCatchError<T>(
  promise: Promise<T>
): Promise<TryCatchResult<T>> {
  try {
    const result = await promise
    return [null, result]
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err))
    return [error, null]
  }
}
