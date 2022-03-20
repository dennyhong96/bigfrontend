export async function throttlePromises(
  funcs: ((...args: any[]) => Promise<any>)[],
  max: number,
  results: any[] = []
): Promise<any[]> {
  if (!funcs.length) return results;
  const currBatch = funcs.slice(0, max);
  const nextBatch = funcs.slice(max);
  const batchResult = await Promise.all(currBatch.map((func) => func()));
  results.push(...batchResult);
  return await throttlePromises(nextBatch, max, results);
}
