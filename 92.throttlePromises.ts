export async function throttlePromises(
  funcs: ((...args: any[]) => Promise<any>)[],
  max: number
): Promise<any[]> {
  if (!funcs.length) return [];
  const batch = funcs.slice(0, max);
  const nextBatch = funcs.slice(max);
  const batchRes = await Promise.all(batch.map((f) => f())); // turn funcs into promises
  const nextBatchRes = await throttlePromises(nextBatch, max);
  return [...batchRes, ...nextBatchRes];
}
