export const filterHelper = {
  objToQuery: (obj) => {
    const result = Object.entries(obj).map(
      ([key, values]) => `${key}=${values.toString()}`
    );
    return result.join("&");
  },

  queryToObj: (query) => {
    if (!query) return {};

    const filterItems = query.split("&");

    const obj = filterItems.reduce((acc, item) => {
      const [key, value] = item.split("=");
      const values = value.split(",");
      if (key === "rating") acc[key] = value;
      else acc[key] = values;

      return acc;
    }, {});

    return obj;
  },
};
