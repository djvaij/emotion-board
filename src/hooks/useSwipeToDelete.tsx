import { useState } from "react";
import { useSwipeable } from "react-swipeable";

interface UseSwipeToDeleteProps {
  onSwipe: () => void;
  enabled: boolean;
}

export const useSwipeToDelete = ({
  onSwipe,
  enabled,
}: UseSwipeToDeleteProps) => {
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDelta, setSwipeDelta] = useState(0);

  const handlers = useSwipeable({
    onSwiping: ({ deltaX }) => {
      if (enabled) {
        // Дозволяємо свайп лише вліво
        setSwipeDelta(Math.min(deltaX, 0));
      }
    },
    onSwipedLeft: () => {
      if (enabled) {
        setIsSwiping(true);
        // Виконуємо колбек onSwipe після завершення анімації
        setTimeout(() => {
          onSwipe();
          // Скидаємо стан після видалення
          setIsSwiping(false);
          setSwipeDelta(0);
        }, 300);
      }
    },
    onSwiped: () => {
      // Якщо свайп не завершився видаленням, повертаємо картку
      if (!isSwiping) {
        setSwipeDelta(0);
      }
    },
    trackMouse: false,
    delta: 50, // Чутливість
    preventScrollOnSwipe: true,
  });

  const getSwipeStyle = (transform: string | undefined) => {
    const dynamicSwipeTransform = `translateX(${swipeDelta}px)`;
    const finalSwipeTransform = "translateX(-100%)";

    return {
      transform: isSwiping
        ? finalSwipeTransform
        : swipeDelta !== 0
        ? dynamicSwipeTransform
        : transform,
      transition: isSwiping ? "transform 0.3s ease, opacity 0.3s ease" : "none",
      opacity: isSwiping ? 0 : 1,
    };
  };

  return {
    swipeHandlers: handlers,
    isSwiping,
    getSwipeStyle,
  };
};
