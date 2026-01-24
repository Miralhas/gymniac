export const buildQueryString = <T extends Record<string, string | number | boolean | undefined>>(
  params: T
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

export const capitalize = (val: string) => {
  val = val.trim().toLowerCase().replace("  ", " ")
  const val1 = val.split(":").map(w => w[0].toUpperCase() + w.slice(1)).join(":")
  return val1.split(" ").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
}