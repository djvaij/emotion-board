import { useState, useEffect } from "react";

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Встановлюємо початкове значення
    setMatches(mediaQueryList.matches);

    // Додаємо слухача на зміну
    mediaQueryList.addEventListener("change", listener);

    // Прибираємо слухача при розмонтуванні компонента
    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
