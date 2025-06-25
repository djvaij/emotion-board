// stores/emotionStore.ts
import { enableStaticRendering } from "mobx-react-lite";
import { EmotionEntityType, EmotionValueType } from "@/types/common";
import { makeAutoObservable, reaction } from "mobx";

const isServer = typeof window === "undefined";
enableStaticRendering(isServer);

type FilterPeriod = "all" | "today" | "week" | "month";

class EmotionStore {
  emotions: EmotionEntityType[] = [];
  isLoading = true;
  filter: FilterPeriod = "all";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    // автозбереження
    reaction(
      () => this.emotions,
      () => this.saveToLocalStorage(),
      { delay: 300 }
    );
  }

  addEmotion(emotion: EmotionEntityType) {
    this.emotions = [emotion, ...this.emotions];
  }

  removeEmotion(id: string) {
    this.emotions = this.emotions.filter((e) => e.id !== id);
  }

  clearAll() {
    this.emotions = [];

    if (!isServer) {
      this.removeFromLocalStorage();
    }
  }

  reorder = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    const updated = [...this.emotions];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    this.emotions = updated;
  };

  setFilter(period: FilterPeriod) {
    this.filter = period;
  }

  get filteredEmotions(): EmotionEntityType[] {
    const now = Date.now();

    const isInPeriod = (createdAt: number) => {
      const ONE_DAY = 1000 * 60 * 60 * 24;
      const diff = now - createdAt;

      switch (this.filter) {
        case "today":
          return (
            new Date(createdAt).toDateString() === new Date().toDateString()
          );
        case "week":
          return diff < ONE_DAY * 7;
        case "month":
          return diff < ONE_DAY * 30;
        default:
          return true;
      }
    };

    return this.emotions.filter((e) => isInPeriod(e.createdAt));
  }

  get stats(): Record<EmotionValueType, number> {
    const result: Record<EmotionValueType, number> = {
      joy: 0,
      sadness: 0,
      anger: 0,
      surprise: 0,
      calm: 0,
      fear: 0,
      disgust: 0,
      excitement: 0,
      shame: 0,
      pride: 0,
      love: 0,
      boredom: 0,
      anxiety: 0,
      contentment: 0,
      envy: 0,
    };

    for (const e of this.filteredEmotions) {
      result[e.value]++;
    }

    return result;
  }

  hydrateFromLocalStorage() {
    if (isServer) return;
    try {
      const raw = localStorage.getItem("emotions");
      if (raw) {
        this.emotions = JSON.parse(raw);
      }
    } catch (e) {
      console.error("Помилка при зчитуванні з localStorage", e);
    } finally {
      this.isLoading = false;
    }
  }

  saveToLocalStorage() {
    if (isServer) return;
    try {
      localStorage.setItem("emotions", JSON.stringify(this.emotions));
    } catch (e) {
      console.error("Помилка при записі в localStorage", e);
    }
  }

  removeFromLocalStorage() {
    if (isServer) return;
    try {
      localStorage.removeItem("emotions");
    } catch (e) {
      console.error("Помилка при видаленні з localStorage", e);
    }
  }

  get timeOfDay(): "morning" | "day" | "evening" | "night" {
    const hour = new Date().getHours();
    if (hour < 6) return "night";
    if (hour < 12) return "morning";
    if (hour < 18) return "day";
    return "evening";
  }
}

export const emotionStore = new EmotionStore();
