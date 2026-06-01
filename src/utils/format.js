export function formatJPY(amount) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(amount ?? 0);
}

const LOCALES = {
  HKD: "zh-HK",
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  AUD: "en-AU",
  SGD: "en-SG",
};

export function formatLocal(amount, currencyCode = "HKD") {
  const locale = LOCALES[currencyCode] ?? "en-US";
  const zeroDecimal = currencyCode === "HKD" || currencyCode === "JPY";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: zeroDecimal ? 0 : 2,
    maximumFractionDigits: zeroDecimal ? 0 : 2,
  }).format(amount ?? 0);
}

export function formatDateShort(iso, locale = "en") {
  const tag = locale === "zh-TW" ? "zh-TW" : "en-US";
  return new Date(iso + "T12:00:00").toLocaleDateString(tag, {
    month: "short",
    day: "numeric",
  });
}

export function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
