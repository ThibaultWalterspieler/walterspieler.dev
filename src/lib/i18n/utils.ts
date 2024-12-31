import { TypedLocale } from "payload";

import { DICTIONARIES } from "./constants";

const getDictionary = (locale: TypedLocale) => {
  if (!(locale in DICTIONARIES)) {
    return DICTIONARIES.fallback();
  }

  return DICTIONARIES[locale]();
};

export { getDictionary };
