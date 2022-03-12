async function fetchWithAutoRetry(
  fetcher: (...args: any[]) => Promise<any>,
  maximumRetryCount: number
): Promise<any> {
  try {
    return await fetcher();
  } catch (err) {
    if (maximumRetryCount <= 0) throw err;
    return fetchWithAutoRetry(fetcher, maximumRetryCount - 1);
  }
}

async function fetchWithAutoRetry1(
  fetcher: (...args: any[]) => Promise<any>,
  maximumRetryCount: number
): Promise<any> {
  let err;
  while (maximumRetryCount >= 0) {
    try {
      return await fetcher();
    } catch (error) {
      err = error;
      maximumRetryCount--;
    }
  }
  throw err;
}

export {};
