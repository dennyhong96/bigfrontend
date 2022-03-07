export async function myFinally<T>(
  promise: Promise<T>,
  onFinally: () => Promise<void> | void
) {
  try {
    const res = await promise;
    await onFinally(); // errors/rejections thrown by onFinally will be caught in catch block
    return res;
  } catch (err) {
    await onFinally(); // errors/rejections thrown by onFinally will be propagted
    throw err; // err here is the error thrown from await promise
  }
}
