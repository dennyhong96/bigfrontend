export async function myFinally<T>(
  promise: Promise<T>,
  onFinally: () => Promise<void> | void
) {
  try {
    const res = await promise;
    await onFinally(); // errors/rejections thrown by onFinally will be caught in catch block as well
    return res;
  } catch (err) {
    await onFinally(); // if onFinally throws, it will propagate to where myFinally is called, line 11 will not run
    throw err; // if onFinally doesn't throw, it will throw the err caught from try block
  }
}
