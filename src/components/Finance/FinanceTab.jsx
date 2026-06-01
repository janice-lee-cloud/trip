import { Download, Loader2, Plus, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useMemo } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { translateFinanceCategory } from "../../i18n/ui";
import { useExchangeRate, homeToJpy, jpyToHome } from "../../hooks/useExchangeRate";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { formatJPY, formatLocal, uid } from "../../utils/format";
import { buildBudgetCsv, downloadBudgetCsv } from "../../utils/exportBudgetCsv";
import { btnPrimary, btnSecondary, inputClass, sectionHeading, sectionLead } from "../../utils/ui";

const FINANCE_KEY = "japan-trip-finance-v2";

const CATEGORIES = ["Food", "Transit", "Hotel", "Shopping", "Other"];

/** Seed rate so default HKD amounts round-trip cleanly in the UI (~May 2026). */
const SEED_HKD_PER_JPY = 0.0492;

function hkdToJpy(hkd) {
  return Math.round(hkd / SEED_HKD_PER_JPY);
}

const DEFAULT_FINANCE = {
  budgetJPY: hkdToJpy(30000),
  currencyCode: "HKD",
  budgetInputMode: "home",
  expenses: [
    {
      id: "exp-default-onsen-hotel",
      name: "福岡天然温泉博多運河城前多米高級酒店",
      amountJPY: hkdToJpy(845.53),
      category: "Hotel",
      createdAt: "2026-05-13T10:00:00.000Z",
    },
    {
      id: "exp-default-flight-trad",
      name: "flight ticket + Hotel Trad Hakata",
      amountJPY: hkdToJpy(10914.49),
      category: "Hotel",
      createdAt: "2026-05-13T10:30:00.000Z",
    },
  ],
};

function normalizeFinance(stored) {
  const merged = { ...DEFAULT_FINANCE, ...stored };
  const mode = merged.budgetInputMode;
  if (mode === "JPY") merged.budgetInputMode = "jpy";
  else if (!["jpy", "home"].includes(mode)) {
    merged.budgetInputMode = DEFAULT_FINANCE.budgetInputMode;
  }
  delete merged.exchangeRate;
  return merged;
}

export default function FinanceTab() {
  const { locale, t } = useLanguage();
  const [rawFinance, setRawFinance] = useLocalStorage(FINANCE_KEY, DEFAULT_FINANCE);
  const finance = useMemo(() => normalizeFinance(rawFinance), [rawFinance]);

  const { rate, rateDate, status: rateStatus, isFallback } = useExchangeRate(
    finance.currencyCode,
  );

  const setFinance = (patch) => {
    setRawFinance((prev) => {
      const current = normalizeFinance(prev);
      const next =
        typeof patch === "function" ? patch(current) : { ...current, ...patch };
      return normalizeFinance(next);
    });
  };

  const totalSpent = useMemo(
    () => finance.expenses.reduce((sum, e) => sum + (Number(e.amountJPY) || 0), 0),
    [finance.expenses],
  );

  const remaining = finance.budgetJPY - totalSpent;
  const spentPct = finance.budgetJPY
    ? Math.min(100, (totalSpent / finance.budgetJPY) * 100)
    : 0;

  const budgetHome = jpyToHome(finance.budgetJPY, rate);
  const spentHome = jpyToHome(totalSpent, rate);
  const remainingHome = jpyToHome(remaining, rate);

  const updateFinance = (patch) => setFinance(patch);

  const handleBudgetChange = (value) => {
    if (value === "") return;
    const num = Number(value);
    if (Number.isNaN(num) || num < 0) return;

    if (finance.budgetInputMode === "home" && rate) {
      updateFinance({ budgetJPY: homeToJpy(num, rate) });
    } else {
      updateFinance({ budgetJPY: Math.round(num) });
    }
  };

  const budgetInputValue =
    finance.budgetInputMode === "home" && rate
      ? Math.round(budgetHome) || ""
      : finance.budgetJPY || "";

  const budgetConversionHint =
    rate && finance.budgetInputMode === "jpy"
      ? t.budgetEquals(formatLocal(budgetHome, finance.currencyCode))
      : rate && finance.budgetInputMode === "home"
        ? t.budgetEquals(formatJPY(finance.budgetJPY))
        : null;

  const handleAddExpense = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = fd.get("name")?.toString().trim();
    const amount = Number(fd.get("amount"));
    const category = fd.get("category")?.toString();

    if (!name || !amount || amount <= 0) return;

    updateFinance({
      expenses: [
        {
          id: uid(),
          name,
          amountJPY: amount,
          category: category || "Other",
          createdAt: new Date().toISOString(),
        },
        ...finance.expenses,
      ],
    });
    e.target.reset();
  };

  const removeExpense = (id) => {
    updateFinance({
      expenses: finance.expenses.filter((ex) => ex.id !== id),
    });
  };

  const handleExportCsv = () => {
    const csv = buildBudgetCsv({
      finance,
      rate,
      rateDate,
      isFallback,
      rateStatus,
      totalSpent,
      remaining,
      spentPct,
      locale,
      labels: t.csvExport,
    });
    const dateStamp = new Date().toISOString().slice(0, 10);
    downloadBudgetCsv(csv, `kyushu-trip-budget-${dateStamp}.csv`);
  };

  return (
    <section className="space-y-8" aria-labelledby="finance-heading">
      <div>
        <h2 id="finance-heading" className={sectionHeading}>
          {t.financeHeading}
        </h2>
        <p className={sectionLead}>{t.financeLead}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <BudgetCard
          label={t.totalBudget}
          primary={formatJPY(finance.budgetJPY)}
          secondary={
            rate ? formatLocal(budgetHome, finance.currencyCode) : null
          }
          icon={Wallet}
          accent="matcha"
        />
        <BudgetCard
          label={t.totalSpent}
          primary={formatJPY(totalSpent)}
          secondary={rate ? formatLocal(spentHome, finance.currencyCode) : null}
          icon={TrendingDown}
          accent="accent"
        />
        <BudgetCard
          label={t.remaining}
          primary={formatJPY(remaining)}
          secondary={
            rate ? formatLocal(remainingHome, finance.currencyCode) : null
          }
          icon={TrendingUp}
          accent={remaining >= 0 ? "gold" : "accent"}
          warn={remaining < 0}
        />
      </div>

      <div className="card p-4 sm:p-5">
        <div className="flex justify-between text-xs font-semibold text-ink-muted mb-2">
          <span>{t.budgetUtilization}</span>
          <span className="tabular-nums">{spentPct.toFixed(0)}%</span>
        </div>
        <div
          className="h-2.5 rounded-full bg-cream overflow-hidden"
          role="progressbar"
          aria-valuenow={spentPct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-matcha to-accent transition-all duration-500"
            style={{ width: `${spentPct}%` }}
          />
        </div>
      </div>

      <div className="card p-4 sm:p-6 space-y-4">
        <h3 className="text-sm font-semibold text-ink">{t.currencySettings}</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
              {t.homeCurrency}
            </span>
            <select
              value={finance.currencyCode}
              onChange={(e) => updateFinance({ currencyCode: e.target.value })}
              className={`${inputClass} mt-1.5`}
            >
              <option value="HKD">HKD</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="AUD">AUD</option>
              <option value="SGD">SGD</option>
            </select>
          </label>

          <div className="block">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
              {t.liveExchangeRate}
            </span>
            <div className="mt-1.5 rounded-xl border border-border bg-cream/80 px-3 py-2.5 text-sm text-ink-muted min-h-[42px] flex items-center gap-2">
              {rateStatus === "loading" && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden />
                  {t.rateLoading}
                </>
              )}
              {rateStatus === "ready" && rate != null && (
                <span>
                  {t.rateLine(finance.currencyCode, rate, rateDate)}
                  {isFallback && (
                    <span className="block text-[11px] mt-0.5 text-gold">
                      {t.rateFallback}
                    </span>
                  )}
                </span>
              )}
              {rateStatus === "error" && (
                <span>{t.rateUnavailable}</span>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-end gap-3">
            <label className="block flex-1">
              <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
                {finance.budgetInputMode === "home"
                  ? t.budgetHome(finance.currencyCode)
                  : t.budgetJpy}
              </span>
              <input
                type="number"
                min={0}
                step={finance.budgetInputMode === "home" ? 100 : 1000}
                value={budgetInputValue}
                onChange={(e) => handleBudgetChange(e.target.value)}
                className={`${inputClass} mt-1.5`}
              />
            </label>
            <div className="shrink-0">
              <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide block mb-1.5">
                {t.budgetInputAs}
              </span>
              <div className="flex gap-1 p-1 rounded-xl border border-border bg-cream/60">
                <button
                  type="button"
                  onClick={() => updateFinance({ budgetInputMode: "jpy" })}
                  className={[
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                    finance.budgetInputMode === "jpy"
                      ? "bg-ink text-cream"
                      : "text-ink-muted hover:text-ink",
                  ].join(" ")}
                >
                  JPY
                </button>
                <button
                  type="button"
                  onClick={() => updateFinance({ budgetInputMode: "home" })}
                  className={[
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                    finance.budgetInputMode === "home"
                      ? "bg-ink text-cream"
                      : "text-ink-muted hover:text-ink",
                  ].join(" ")}
                >
                  {finance.currencyCode}
                </button>
              </div>
            </div>
          </div>
          {budgetConversionHint && (
            <p className="mt-2 text-xs text-ink-muted tabular-nums">
              {budgetConversionHint}
            </p>
          )}
        </div>
      </div>

      <form onSubmit={handleAddExpense} className="card p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-ink mb-4 flex items-center gap-2">
          <Plus className="h-4 w-4 text-matcha" strokeWidth={2} aria-hidden />
          {t.addExpense}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
          <label className="block sm:col-span-2">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
              {t.description}
            </span>
            <input
              name="name"
              required
              placeholder={t.expensePlaceholder}
              className={`${inputClass} mt-1.5`}
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
              {t.amountJpy}
            </span>
            <input
              name="amount"
              type="number"
              min={1}
              required
              placeholder="1200"
              className={`${inputClass} mt-1.5`}
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
              {t.category}
            </span>
            <select name="category" className={`${inputClass} mt-1.5`}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {translateFinanceCategory(locale, c)}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className={`${btnPrimary} sm:col-span-2 lg:col-span-4`}>
            <Plus className="h-4 w-4" aria-hidden />
            {t.addExpense}
          </button>
        </div>
      </form>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto -mx-px">
          <table className="w-full text-sm text-left min-w-[520px]">
            <thead>
              <tr className="border-b border-border bg-cream/90 text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-4 py-3.5 font-semibold">{t.description}</th>
                <th className="px-4 py-3.5 font-semibold">{t.category}</th>
                <th className="px-4 py-3.5 font-semibold text-right">JPY</th>
                <th className="px-4 py-3.5 font-semibold text-right">
                  {finance.currencyCode}
                </th>
                <th className="px-4 py-3.5 w-16" />
              </tr>
            </thead>
            <tbody>
              {finance.expenses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-ink-muted">
                    {t.noExpenses}
                  </td>
                </tr>
              ) : (
                finance.expenses.map((ex) => {
                  const local = jpyToHome(ex.amountJPY, rate);
                  return (
                    <tr
                      key={ex.id}
                      className="border-b border-border last:border-0 hover:bg-cream/60 transition-colors"
                    >
                      <td className="px-4 py-3.5 font-medium text-ink">{ex.name}</td>
                      <td className="px-4 py-3.5">
                        <CategoryPill category={ex.category} locale={locale} />
                      </td>
                      <td className="px-4 py-3.5 text-right tabular-nums font-medium">
                        {formatJPY(ex.amountJPY)}
                      </td>
                      <td className="px-4 py-3.5 text-right tabular-nums text-ink-muted">
                        {rate
                          ? formatLocal(local, finance.currencyCode)
                          : "—"}
                      </td>
                      <td className="px-4 py-3.5">
                        <button
                          type="button"
                          onClick={() => removeExpense(ex.id)}
                          className="text-xs font-semibold text-ink-muted hover:text-accent transition-colors focus:outline-none focus-visible:underline"
                          aria-label={t.removeExpenseAria(ex.name)}
                        >
                          {t.remove}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={handleExportCsv}
          className={btnSecondary}
        >
          <Download className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          {t.exportCsv}
        </button>
      </div>
    </section>
  );
}

function BudgetCard({ label, primary, secondary, icon: Icon, accent, warn }) {
  const accents = {
    matcha: "text-matcha bg-matcha-soft",
    accent: "text-accent-muted bg-accent-soft",
    gold: "text-gold bg-gold-soft",
  };
  return (
    <div className="card p-4 sm:p-5">
      <div
        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl mb-3 ${accents[accent]}`}
      >
        <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      </div>
      <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
        {label}
      </p>
      <p
        className={[
          "mt-1 font-display text-xl sm:text-2xl font-semibold tabular-nums",
          warn ? "text-accent" : "text-ink",
        ].join(" ")}
      >
        {primary}
      </p>
      {secondary != null && (
        <p className="mt-0.5 text-sm text-ink-muted tabular-nums">{secondary}</p>
      )}
    </div>
  );
}

function CategoryPill({ category, locale }) {
  const colors = {
    Food: "bg-accent-soft text-accent-muted",
    Transit: "bg-gold-soft text-gold",
    Hotel: "bg-cream text-ink-muted border border-border",
    Shopping: "bg-matcha-soft text-matcha",
    Other: "bg-cream text-ink-muted border border-border",
  };
  const label = translateFinanceCategory(locale, category);
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[category] ?? colors.Other}`}
    >
      {label}
    </span>
  );
}
