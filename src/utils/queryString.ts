export const parseQueryString = () => {
  let query = window.location.search;
  if (!query) return null;

  query = query.replace("?", "");
  const items = query.split("&");

  return items.reduce(
    (acc, curr) => {
      const item = curr.split("=");
      acc[item[0]] = item[1];
      return acc;
    },
    {} as { [key: string]: string },
  );
};
