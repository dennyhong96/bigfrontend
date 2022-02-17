export const trim = (str: string): string => {
  return str.replace(/^\s+|\s+$/g, "");
};

export const trim1 = (str: string): string => {
  const spaces = [" ", "", "s", "\t", "\n", "\u3000"];

  if (spaces.includes(str[0])) {
    return trim1(str.slice(1));
  }

  if (spaces.includes(str[str.length - 1])) {
    return trim1(str.slice(0, str.length - 1));
  }

  return str;
};

// "   abc   "
