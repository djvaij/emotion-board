"use client";
import { observer } from "mobx-react-lite";
import { useEmotionStore } from "@/hooks/useEmotionStore";
import { EMOTION_OPTIONS } from "@/utils/constants";

type FilterPeriod = "all" | "today" | "week" | "month";

const Statistics: React.FC = observer(() => {
  const store = useEmotionStore();
  const { stats, setFilter, filter } = store;

  const filterOptions: { value: FilterPeriod; label: string }[] = [
    { value: "all", label: "Увесь час" },
    { value: "today", label: "Сьогодні" },
    { value: "week", label: "Тиждень" },
    { value: "month", label: "Місяць" },
  ];

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Статистика емоцій</h2>
      <div className="mb-6">
        <label
          htmlFor="filter"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Обрати період:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value as FilterPeriod)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="bg-background shadow-md rounded-lg p-4">
        {Object.entries(stats).map(([value, count]) => {
          const option = EMOTION_OPTIONS.find((opt) => opt.value === value);
          if (!option || count === 0) return null; // Пропускаємо емоції з нулем
          return (
            <div
              key={value}
              className="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-2">{option.icon}</span>
                <span className="text-lg font-medium text-foreground">
                  {option.label}
                </span>
              </div>
              <span className="text-lg font-semibold text-foreground">
                {count}
              </span>
            </div>
          );
        })}
        {Object.values(stats).every((count) => count === 0) && (
          <p className="text-foreground text-center py-4">
            Немає емоцій за обраний період
          </p>
        )}
      </div>
    </div>
  );
});

export default Statistics;
