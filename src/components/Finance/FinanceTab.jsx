import { Plus, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useMemo } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { formatJPY, formatLocal, uid } from "../../utils/format";
import { btnPrimary, inputClass, sectionHeading, sectionLead } from "../../utils/ui";

const FINANCE_KEY = "japan-trip-finance";

const CATEGORIES = ["Food", "Transit", "Hotel", "Shopping", "Other"];

const DEFAULT_FINANCE = {
  budgetJPY: 350000,
  currencyCode: "USD",
  exchangeRate: 0.0067,
  expenses: [],
};

export default function FinanceTab() {
  const [finance, setFinance] = useLocalStorage(FINANCE_KEY, DEFAULT_FINANCE);

  const totalSpent = useMemo(
    () => finance.expenses.reduce((sum, e) => sum + (Number(e.amountJPY) || 0), 0),
    [finance.expenses],
  );

  const remaining = finance.budgetJPY - totalSpent;
  const spentPct = finance.budgetJPY
    ? Math.min(100, (totalSpent / finance.budgetJPY) * 100)
    : 0;

  const updateFinance = (patch) => {
    setFinance((prev) => ({ ...prev, ...patch }));
  };

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

  return (
    <section className="space-y-8" aria-labelledby="finance-heading">
      <div>
        <h2 id="finance-heading" className={sectionHeading}>
          Budget tracker
        </h2>
        <p className={sectionLead}>
          Monitor spending in Japanese yen with automatic conversion to your
          selected home currency. All figures persist in local storage.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <BudgetCard
          label="Total budget"
          value={formatJPY(finance.budgetJPY)}
          icon={Wallet}
          accent="matcha"
        />
        <BudgetCard
          label="Total spent"
          value={formatJPY(totalSpent)}
          icon={TrendingDown}
          accent="accent"
        />
        <BudgetCard
          label="Remaining"
          value={formatJPY(remaining)}
          icon={TrendingUp}
          accent={remaining >= 0 ? "gold" : "accent"}
          warn={remaining < 0}
        />
      </div>

      <div className="card p-4 sm:p-5">
        <div className="flex justify-between text-xs font-semibold text-ink-muted mb-2">
          <span>Budget utilization</span>
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

      <div className="card p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-ink mb-4">Currency settings</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
              Budget (JPY)
            </span>
            <input
              type="number"
              min={0}
              step={1000}
              value={finance.budgetJPY}
              onChange={(e) =>
                updateFinance({ budgetJPY: Number(e.target.value) || 0 })
              }
              className={`${inputClass} mt-1.5`}
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
              Home currency
            </span>
            <select
              value={finance.currencyCode}
              onChange={(e) => updateFinance({ currencyCode: e.target.value })}
              className={`${inputClass} mt-1.5`}
            >
              <option value="USD">USD</option>
              <option value="HKD">HKD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="AUD">AUD</option>
              <option value="SGD">SGD</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
              Rate (1 JPY → {finance.currencyCode})
            </span>
            <input
              type="number"
              min={0}
              step={0.0001}
              value={finance.exchangeRate}
              onChange={(e) =>
                updateFinance({ exchangeRate: Number(e.target.value) || 0 })
              }
              className={`${inputClass} mt-1.5`}
            />
          </label>
        </div>
      </div>

      <form onSubmit={handleAddExpense} className="card p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-ink mb-4 flex items-center gap-2">
          <Plus className="h-4 w-4 text-matcha" strokeWidth={2} aria-hidden />
          Add expense
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
          <label className="block sm:col-span-2">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
              Description
            </span>
            <input
              name="name"
              required
              placeholder="e.g. Nakasu ramen dinner"
              className={`${inputClass} mt-1.5`}
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
              Amount (JPY)
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
              Category
            </span>
            <select name="category" className={`${inputClass} mt-1.5`}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className={`${btnPrimary} sm:col-span-2 lg:col-span-4`}>
            <Plus className="h-4 w-4" aria-hidden />
            Add expense
          </button>
        </div>
      </form>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto -mx-px">
          <table className="w-full text-sm text-left min-w-[520px]">
            <thead>
              <tr className="border-b border-border bg-cream/90 text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-4 py-3.5 font-semibold">Description</th>
                <th className="px-4 py-3.5 font-semibold">Category</th>
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
                    No expenses recorded. Add your first entry above.
                  </td>
                </tr>
              ) : (
                finance.expenses.map((ex) => {
                  const local = ex.amountJPY * finance.exchangeRate;
                  return (
                    <tr
                      key={ex.id}
                      className="border-b border-border last:border-0 hover:bg-cream/60 transition-colors"
                    >
                      <td className="px-4 py-3.5 font-medium text-ink">{ex.name}</td>
                      <td className="px-4 py-3.5">
                        <CategoryPill category={ex.category} />
                      </td>
                      <td className="px-4 py-3.5 text-right tabular-nums font-medium">
                        {formatJPY(ex.amountJPY)}
                      </td>
                      <td className="px-4 py-3.5 text-right tabular-nums text-ink-muted">
                        {formatLocal(local, finance.currencyCode)}
                      </td>
                      <td className="px-4 py-3.5">
                        <button
                          type="button"
                          onClick={() => removeExpense(ex.id)}
                          className="text-xs font-semibold text-ink-muted hover:text-accent transition-colors focus:outline-none focus-visible:underline"
                          aria-label={`Remove ${ex.name}`}
                        >
                          Remove
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
    </section>
  );
}

function BudgetCard({ label, value, icon: Icon, accent, warn }) {
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
        {value}
      </p>
    </div>
  );
}

function CategoryPill({ category }) {
  const colors = {
    Food: "bg-accent-soft text-accent-muted",
    Transit: "bg-gold-soft text-gold",
    Hotel: "bg-cream text-ink-muted border border-border",
    Shopping: "bg-matcha-soft text-matcha",
    Other: "bg-cream text-ink-muted border border-border",
  };
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[category] ?? colors.Other}`}
    >
      {category}
    </span>
  );
}
