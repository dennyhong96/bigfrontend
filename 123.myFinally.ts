export async function myFinally<T>(
  promise: Promise<T>,
  onFinally: (val: T | unknown) => Promise<void>
) {
  try {
    const res = await promise;
    await onFinally(res);
    return res;
  } catch (err) {
    await onFinally(err);
    throw err;
  }
}
