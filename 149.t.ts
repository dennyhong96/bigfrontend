export function t(translation: string, data?: any): string {
  return translation.replace(/{{(.*?)}}/g, (_, prop) => {
    if (!data || !prop || typeof prop !== "string" || !data[prop]) return "";
    return data[prop];
  });
}
