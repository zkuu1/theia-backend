export type tFunction = (key: string, replace?: Record<string, string | number>) => string;

export const translations: Record<string, Record<string, any>> = {
  en: {
    validation: {
      required: "{field} is required",
      min: "{field} must be at least {count} characters",
      max: "{field} must be at most {count} characters",
      email: "Invalid email address",
    },
  },
  id: {
    validation: {
      required: "{field} wajib diisi",
      min: "{field} minimal harus {count} karakter",
      max: "{field} maksimal harus {count} karakter",
      email: "Alamat email tidak valid",
    },
  },
};

export function getFixedT(locale: string): tFunction {
  const lang = translations[locale] ? locale : "en";
  const dict = translations[lang];

  return (key: string, replace?: Record<string, string | number>): string => {
    const keys = key.split(".");
    let value: any = dict;
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    if (typeof value !== "string") {
      return key;
    }
    let result = value;
    if (replace) {
      for (const [k, v] of Object.entries(replace)) {
        result = result.replace(new RegExp(`{${k}}`, "g"), String(v));
      }
    }
    return result;
  };
}
