export function formatJPY(amount) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(amount ?? 0);
}

export function formatLocal(amount, currencyCode = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
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
