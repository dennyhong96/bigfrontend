export function isValidIP(str: string) {
  return isValidIPv4(str) || isValidIPv6(str);
}

function isValidIPv6(str: string) {
  const parts = str.split(":");
  if (parts.length !== 8) return false; // 8 parts
  return parts.every(
    (p) =>
      p.length <= 4 && // Each part can have at most 4 chars
      [...p].every((char) => {
        return (
          (char >= "0" && char <= "9") ||
          (char >= "a" && char <= "f") ||
          (char >= "A" && char <= "F")
        );
      })
  );
}

function isValidIPv4(str: string) {
  const parts = str.split(".");
  if (parts.length !== 4) return false; // 4 parts
  return parts.every((p) => {
    const parsed = Number(p);
    if (
      !Number.isFinite(parsed) || // Each char should be a valid number between 0 - 255
      parsed < 0 ||
      parsed > 255 ||
      (p.length > 1 && p[0] === "0") // Cannot have leading 0
    ) {
      return false;
    }
    return true;
  });
}
