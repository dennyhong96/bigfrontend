interface IItem {
  id: number;
}

interface IFetchListResult {
  items: Array<IItem>;
}

declare function fetchList(id?: number): Promise<IFetchListResult>;

// https://thecodebarbarian.com/async-generator-functions-in-javascript.html
const fetchListWithAmount = async (amount = 5) => {
  let results: IItem[] = [];

  // The cleanest way to loop through an entire async generator function is using a for/await/of loop.
  for await (const items of fetchListGenerator()) {
    if (results.length + items.length > amount) {
      results.push(...items.slice(0, amount - results.length));
    } else {
      results.push(...items);
    }
  }
  return results;
};

async function* fetchListGenerator() {
  let id: number | undefined = undefined;
  while (true) {
    const res: IFetchListResult = await fetchList(id);
    const items = res.items;
    if (!items.length) return;
    id = items[items.length - 1].id;
    yield items;
  }
}

// Recursive
const fetchListWithAmount1 = async (
  amount = 5,
  results: IItem[] = []
): Promise<IItem[]> => {
  if (results.length === amount) return results;
  if (results.length > amount) return results.slice(0, amount);
  if (results.length < amount) {
    const id: number | undefined = results[results.length - 1]?.id;
    const { items } = await fetchList(id);
    if (!items.length) return results;
    results.push(...items);
  }
  return await fetchListWithAmount1(amount, results);
};

// Iterative
const fetchListWithAmount2 = async (amount = 5): Promise<IItem[]> => {
  const result: IItem[] = []; // 5
  while (result.length < amount) {
    const id: number | undefined = result[result.length - 1]?.id;
    const res: IFetchListResult = await fetchList(id); // 5
    if (!res.items.length) break;
    const newItemsCount = result.length + res.items.length; // 10
    if (newItemsCount > amount) {
      result.push(...res.items.slice(0, amount - result.length));
    } else {
      result.push(...res.items);
    }
  }
  return result;
};

export {};
