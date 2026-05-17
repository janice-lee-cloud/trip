import { Plus, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useMemo } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { formatJPY, formatLocal, uid } from "../../utils/format";

const FINANCE_KEY = "japan-trip-finance";

const CATEGORIES = ["Food", "Transit", "Hotel", "Shopping", "Other"];

const DEFAULT_FINANCE = {
  budgetJPY: 350000,
  currencyCode: "USD",
  exchangeRate: 0.0067,
  expenses: [],
};

const inputClass =
  "w-full rounded-xl border border-border bg-cream px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-sakura/40 focus:border-sakura";

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
    <section className="space-y-6" aria-labelledby="finance-heading">
      <div>
        <h2 id="finance-heading" className="font-display text-2xl font-semibold text-ink">
          Financial tracker
        </h2>
        <p className="text-sm text-ink-muted mt-1">
          Track spending in yen with automatic conversion to your home currency.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
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
          accent="sakura"
        />
        <BudgetCard
          label="Remaining"
          value={formatJPY(remaining)}
          icon={TrendingUp}
          accent={remaining >= 0 ? "gold" : "sakura"}
          warn={remaining < 0}
        />
      </div>

      <div className="rounded-2xl border border-border bg-white/90 p-4 shadow-card">
        <div className="flex justify-between text-xs font-medium text-ink-muted mb-2">
          <span>Budget used</span>
          <span>{spentPct.toFixed(0)}%</span>
        </div>
        <div className="h-2 rounded-full bg-cream overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-matcha to-sakura transition-all duration-500"
            style={{ width: `${spentPct}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white/90 p-4 sm:p-5 shadow-card">
        <h3 className="text-sm font-semibold text-ink mb-3">Currency settings</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="block">
            <span className="text-xs font-medium text-ink-muted">Budget (¥ JPY)</span>
            <input
              type="number"
              min={0}
              step={1000}
              value={finance.budgetJPY}
              onChange={(e) =>
                updateFinance({ budgetJPY: Number(e.target.value) || 0 })
              }
              className={`${inputClass} mt-1`}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-ink-muted">Local currency</span>
            <select
              value={finance.currencyCode}
              onChange={(e) => updateFinance({ currencyCode: e.target.value })}
              className={`${inputClass} mt-1`}
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
            <span className="text-xs font-medium text-ink-muted">
              Rate (1 ¥ → {finance.currencyCode})
            </span>
            <input
              type="number"
              min={0}
              step={0.0001}
              value={finance.exchangeRate}
              onChange={(e) =>
                updateFinance({ exchangeRate: Number(e.target.value) || 0 })
              }
              className={`${inputClass} mt-1`}
            />
          </label>
        </div>
      </div>

      <form
        onSubmit={handleAddExpense}
        className="rounded-2xl border border-border bg-white/90 p-4 sm:p-5 shadow-card"
      >
        <h3 className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
          <Plus className="h-4 w-4 text-matcha" strokeWidth={2} />
          Quick-add expense
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 items-end">
          <label className="block sm:col-span-2">
            <span className="text-xs font-medium text-ink-muted">Expense name</span>
            <input
              name="name"
              required
              placeholder="e.g. Nakasu ramen"
              className={`${inputClass} mt-1`}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-ink-muted">Amount (¥)</span>
            <input
              name="amount"
              type="number"
              min={1}
              required
              placeholder="1200"
              className={`${inputClass} mt-1`}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-ink-muted">Category</span>
            <select name="category" className={`${inputClass} mt-1`}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="sm:col-span-2 lg:col-span-4 flex items-center justify-center gap-2 rounded-xl bg-ink text-cream py-2.5 text-sm font-semibold hover:bg-ink/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add expense
          </button>
        </div>
      </form>

      <div className="rounded-2xl border border-border bg-white/90 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[520px]">
            <thead>
              <tr className="border-b border-border bg-cream/80 text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-4 py-3 font-semibold">Expense</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold text-right">¥ JPY</th>
                <th className="px-4 py-3 font-semibold text-right">
                  {finance.currencyCode}
                </th>
                <th className="px-4 py-3 w-10" />
              </tr>
            </thead>
            <tbody>
              {finance.expenses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-ink-muted">
                    No expenses yet — add your first one above.
                  </td>
                </tr>
              ) : (
                finance.expenses.map((ex) => {
                  const local = ex.amountJPY * finance.exchangeRate;
                  return (
                    <tr
                      key={ex.id}
                      className="border-b border-border last:border-0 hover:bg-cream/50"
                    >
                      <td className="px-4 py-3 font-medium text-ink">{ex.name}</td>
                      <td className="px-4 py-3">
                        <CategoryPill category={ex.category} />
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums font-medium">
                        {formatJPY(ex.amountJPY)}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-ink-muted">
                        {formatLocal(local, finance.currencyCode)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => removeExpense(ex.id)}
                          className="text-xs text-ink-muted hover:text-sakura font-medium"
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
    sakura: "text-[#b0706a] bg-sakura-soft",
    gold: "text-gold bg-gold-soft",
  };
  return (
    <div className="rounded-2xl border border-border bg-white/90 p-4 shadow-card">
      <div
        className={`inline-flex h-9 w-9 items-center justify-center rounded-xl mb-3 ${accents[accent]}`}
      >
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <p className="text-xs font-medium text-ink-muted uppercase tracking-wide">
        {label}
      </p>
      <p
        className={[
          "mt-1 font-display text-xl sm:text-2xl font-semibold tabular-nums",
          warn ? "text-sakura" : "text-ink",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}

function CategoryPill({ category }) {
  const colors = {
    Food: "bg-sakura-soft text-[#b0706a]",
    Transit: "bg-gold-soft text-[#9a7b1a]",
    Hotel: "bg-[#f0eeeb] text-ink-muted",
    Shopping: "bg-matcha-soft text-matcha",
    Other: "bg-cream text-ink-muted border border-border",
  };
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${colors[category] ?? colors.Other}`}
    >
      {category}
    </span>
  );
}
