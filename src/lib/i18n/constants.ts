const DICTIONARIES = {
  en: () =>
    import("./dictionaries/en-gb.json").then((module) => module.default),
};

export { DICTIONARIES };
