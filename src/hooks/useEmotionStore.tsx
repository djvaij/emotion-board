import { useEffect } from "react";
import { emotionStore } from "@/stores/emotionStore";

export const useEmotionStore = () => {
  useEffect(() => {
    if (emotionStore.isLoading) {
      emotionStore.hydrateFromLocalStorage();
    }
  }, []);

  return emotionStore;
};
