import { translations } from "./translations";
import type { tFunction } from "./types";

export function getFixedT(
  locale: string
): tFunction {
  const lang =
    locale in translations
      ? locale
      : "en";

  const dict =
    translations[
      lang as keyof typeof translations
    ];

  return (
    key,
    replace
  ) => {
    const keys = key.split(".");
    let value: any = dict;

    for (const k of keys) {
      if (
        value &&
        typeof value === "object" &&
        k in value
      ) {
        value = value[k];
      } else {
        return key;
      }
    }

    if (
      typeof value !== "string"
    ) {
      return key;
    }

    let result = value;

    if (replace) {
      for (const [
        k,
        v,
      ] of Object.entries(
        replace
      )) {
        result =
          result.replace(
            new RegExp(
              `{${k}}`,
              "g"
            ),
            String(v)
          );
      }
    }

    return result;
  };
}

export type {
  tFunction,
} from "./types";

export {
  translations,
};