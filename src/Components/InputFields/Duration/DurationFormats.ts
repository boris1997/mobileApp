let pattern: RegExp;
let stringPattern: string;

const Patterns = {
  DurationHMSTime: "[0-9][0-5][0-9][0-5][0-9]",
  DurationHMTime: "[0-9][0-5][0-9]",
  DurationHM: "[0-2][0-3][0-5][0-9]",
  DurationHMS: "[0-2][0-3][0-5][0-9][0-5][0-9]",
  DurationFullShort: "[0-9][0-9][0-2][0-3][0-5][0-9][0-5][0-9]",
  DurationFullLong: "[0-9][0-9][0-2][0-3][0-5][0-9][0-5][0-9]",
  DurationISO: "[0-9][0-9][0-1][0-1][0-3][0-1][0-2][0-3][0-5][0-9][0-5][0-9]",
  DurationInvariant:
    "[0-9][0-9][0-2][0-3][0-5][0-9][0-5][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]",
  DurationD8HM: "[0-7][0-5][0-9][0-5][0-9]",
  DurationD24HM: "[0-2][0-3][0-5][0-9][0-5][0-9]",
};
const Masks = {
  DurationHMSTime: "9:99:99",
  DurationHMTime: "9:99",
  DurationHM: "99:99",
  DurationHMS: "99:99:99",
  DurationFullShort: "99 99:99:99",
  DurationFullLong: "99 days 99 hours 99 minutes 99 seconds",
  DurationISO: "P99Y99M99DT99H99M99s",
  DurationInvariant: "99.99:99:99.9999999",
  DurationD8HM: "9:99:99",
  DurationD24HM: "99:99:99",
};

export function setMask(format: string) {
  switch (format) {
    case Format.DurationHMSTime:
      stringPattern = Patterns.DurationHMSTime;
      return Masks.DurationHMSTime;
    case Format.DurationHMTime:
      stringPattern = Patterns.DurationHMTime;
      return Masks.DurationHMTime;
    case Format.DurationHM:
      stringPattern = Patterns.DurationHM;
      return Masks.DurationHM;
    case Format.DurationHMS:
      stringPattern = Patterns.DurationHMS;
      return Masks.DurationHMS;
    case Format.DurationFullShort:
      stringPattern = Patterns.DurationFullShort;
      return Masks.DurationFullShort;
    case Format.DurationFullLong:
      stringPattern = Patterns.DurationFullLong;
      return Masks.DurationFullLong;
    case Format.DurationISO:
      stringPattern = Patterns.DurationISO;
      return Masks.DurationISO;
    case Format.DurationInvariant:
      stringPattern = Patterns.DurationInvariant;
      return Masks.DurationInvariant;
    case Format.DurationD8HM:
      stringPattern = Patterns.DurationD8HM;
      return Masks.DurationD8HM;
    case Format.DurationD24HM:
      stringPattern = Patterns.DurationD24HM;
      return Masks.DurationD24HM;
    default:
      return "9:99:99";
  }
}

export const validateTime = (
  rawSymbol: string,
  text: string,
  format: string
): string => {
  if (typeof rawSymbol != "undefined" && typeof text != "undefined") {
    let index: number = rawSymbol.replace(/\D+/g, "").length;
    let currentStringPattern = stringPattern.substr(0, 5 * index);
    pattern = new RegExp("^" + currentStringPattern + "$");
    let test: boolean;

    if (Format.DurationFullLong) {
      test = pattern.test(rawSymbol.replace(/\D+/g, ""));
    } else {
      test = pattern.test(rawSymbol.substr(0, index).replace(/\D+/g, ""));
    }

    if (test) {
      return text;
    } else {
      if (setMask(format).length == text.length) {
        return text;
      } else {
        return text.substring(0, text.length - 1);
      }
    }
  } else {
    return "";
  }
};

export const onEndValidation = (format: string, text: string): boolean => {
  if (format == Format.DurationISO || format == Format.DurationFullLong) {
    if (setMask(format).length == text.length) {
      let pattern = new RegExp("^" + stringPattern + "$");
      return pattern.test(text.replace(/\D+/g, ""));
    } else {
      return false;
    }
  } else {
    if (setMask(format).length > text.length) {
      return false;
    } else {
      let pattern = new RegExp("^" + stringPattern + "$");
      return pattern.test(text.replace(/\D+/g, ""));
    }
  }
};

export enum Format {
  DurationHMSTime = "DurationHMSTime",
  DurationHMTime = "DurationHMTime",
  DurationHM = "DurationHM",
  DurationHMS = "DurationHMS",
  DurationFullShort = "DurationFullShort",
  DurationFullLong = "DurationFullLong",
  DurationISO = "DurationISO",
  DurationInvariant = "DurationInvariant",
  DurationD8HM = "DurationD8HM",
  DurationD24HM = "DurationD24HM",
}
