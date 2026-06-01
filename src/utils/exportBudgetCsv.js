import { TRIP_META } from "../data/itinerary";
import { jpyToHome } from "../hooks/useExchangeRate";
import { translateFinanceCategory } from "../i18n/ui";

function escapeCsvCell(value) {
  const str = String(value ?? "");
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function csvRow(cells) {
  return cells.map(escapeCsvCell).join(",");
}

function formatIsoLocal(iso, locale) {
  if (!iso) return "";
  try {
    const tag = locale === "zh-TW" ? "zh-TW" : "en-GB";
    return new Date(iso).toLocaleString(tag, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function roundMoney(amount) {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

/**
 * @param {object} params
 * @param {object} params.finance
 * @param {number | null} params.rate
 * @param {string | null} params.rateDate
 * @param {boolean} params.isFallback
 * @param {string} params.rateStatus
 * @param {number} params.totalSpent
 * @param {number} params.remaining
 * @param {number} params.spentPct
 * @param {string} params.locale
 * @param {object} params.labels from UI.csvExport
 */
export function buildBudgetCsv({
  finance,
  rate,
  rateDate,
  isFallback,
  rateStatus,
  totalSpent,
  remaining,
  spentPct,
  locale,
  labels,
}) {
  const code = finance.currencyCode;
  const budgetHome = rate ? jpyToHome(finance.budgetJPY, rate) : null;
  const spentHome = rate ? jpyToHome(totalSpent, rate) : null;
  const remainingHome = rate ? jpyToHome(remaining, rate) : null;
  const exportedAt = new Date().toISOString();

  const rateSource =
    rateStatus === "ready"
      ? isFallback
        ? labels.rateApproximate
        : labels.rateLive
      : rateStatus === "loading"
        ? labels.rateLoading
        : labels.rateUnavailable;

  const lines = [];

  lines.push(csvRow([labels.title]));
  lines.push(csvRow([labels.exportedAt, formatIsoLocal(exportedAt, locale)]));
  lines.push(csvRow([labels.trip, TRIP_META.title]));
  lines.push(csvRow([labels.tripDates, TRIP_META.dates]));
  lines.push("");

  lines.push(csvRow([labels.summarySection]));
  lines.push(csvRow([labels.field, labels.value]));

  const summaryRows = [
    [labels.homeCurrency, code],
    [
      labels.exchangeRate(code),
      rate != null ? Number(rate).toFixed(6) : labels.notAvailable,
    ],
    [labels.rateDate, rateDate || labels.notAvailable],
    [labels.rateSource, rateSource],
    [
      labels.budgetInputMode,
      finance.budgetInputMode === "home" ? code : "JPY",
    ],
    [labels.totalBudgetJpy, finance.budgetJPY],
    [
      labels.totalBudgetHome(code),
      budgetHome != null ? roundMoney(budgetHome) : labels.notAvailable,
    ],
    [labels.totalSpentJpy, totalSpent],
    [
      labels.totalSpentHome(code),
      spentHome != null ? roundMoney(spentHome) : labels.notAvailable,
    ],
    [labels.remainingJpy, remaining],
    [
      labels.remainingHome(code),
      remainingHome != null ? roundMoney(remainingHome) : labels.notAvailable,
    ],
    [labels.budgetUtilization, `${spentPct.toFixed(1)}%`],
    [labels.expenseCount, finance.expenses.length],
  ];

  for (const row of summaryRows) {
    lines.push(csvRow(row));
  }

  lines.push("");
  lines.push(csvRow([labels.expensesSection]));
  lines.push(
    csvRow([
      labels.colNumber,
      labels.colDate,
      labels.colDescription,
      labels.colCategory,
      labels.colCategoryKey,
      labels.colAmountJpy,
      labels.colAmountHome(code),
      labels.colEntryId,
    ]),
  );

  const sorted = [...finance.expenses].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  );

  sorted.forEach((ex, index) => {
    const homeAmount = rate ? roundMoney(jpyToHome(ex.amountJPY, rate)) : "";
    lines.push(
      csvRow([
        index + 1,
        formatIsoLocal(ex.createdAt, locale),
        ex.name,
        translateFinanceCategory(locale, ex.category),
        ex.category,
        ex.amountJPY,
        homeAmount !== "" ? homeAmount : labels.notAvailable,
        ex.id,
      ]),
    );
  });

  if (sorted.length > 0) {
    lines.push("");
    lines.push(csvRow([labels.totalsSection]));
    lines.push(csvRow([labels.field, labels.value]));
    lines.push(csvRow([labels.expenseCount, sorted.length]));
    lines.push(csvRow([labels.sumJpy, totalSpent]));
    lines.push(
      csvRow([
        labels.sumHome(code),
        spentHome != null ? roundMoney(spentHome) : labels.notAvailable,
      ]),
    );
  }

  return lines.join("\r\n");
}

export function downloadBudgetCsv(csvContent, filename = "kyushu-trip-budget.csv") {
  const blob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
