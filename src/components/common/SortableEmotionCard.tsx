import { FC, useState } from "react";
import { EmotionEntityType } from "@/types/common";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/utils/cn";
import { CircleX, GripVertical } from "lucide-react";
import { useSwipeable } from "react-swipeable";

interface Props {
  emotion: EmotionEntityType;
  onRemove: (id: string) => void;
  isMobile: boolean;
}

const SortableEmotionCard: FC<Props> = ({ emotion, onRemove, isMobile }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: emotion.id });

  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDelta, setSwipeDelta] = useState(0); // Динамічний зсув під час свайпу

  const swipeHandlers = useSwipeable({
    onSwiping: ({ deltaX }) => {
      if (isMobile) {
        // Оновлюємо зсув під час руху пальця (лише вліво)
        setSwipeDelta(Math.min(deltaX, 0));
      }
    },
    onSwipedLeft: () => {
      if (isMobile) {
        setIsSwiping(true);
        setTimeout(() => {
          onRemove(emotion.id);
          setIsSwiping(false);
          setSwipeDelta(0);
        }, 300); // Затримка для завершення анімації
      }
    },
    onSwiped: () => {
      // Скидаємо зсув, якщо свайп не завершився видаленням
      if (!isSwiping) {
        setSwipeDelta(0);
      }
    },
    trackMouse: false,
    delta: 50, // Чутливість свайпу
    preventScrollOnSwipe: true, // Запобігає скролу під час свайпу
  });

  const style = {
    transform: isSwiping
      ? "translateX(-100%)"
      : swipeDelta !== 0
      ? `translateX(${swipeDelta}px)`
      : CSS.Transform.toString(transform), // dnd-kit або свайп
    transition: isDragging
      ? transition
      : isSwiping
      ? "transform 0.3s ease, opacity 0.3s ease"
      : "none", // Без transition під час динамічного свайпу
    opacity: isDragging ? 0.5 : isSwiping ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative flex flex-col gap-2 p-4 border border-foreground text-black rounded",
        emotion.color,
        {
          "cursor-grab": isDragging && !isSwiping,
          "-translate-x-full opacity-0 transition-transform duration-300 ease-in-out":
            isSwiping,
        }
      )}
    >
      {!isMobile && (
        <button
          className="absolute top-2 right-2 z-10 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(emotion.id);
          }}
          aria-label={`Видалити емоцію ${emotion.label}`}
        >
          <CircleX size={18} />
        </button>
      )}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-10 cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
        aria-label={`Перетягнути емоцію ${emotion.label}`}
      >
        <GripVertical size={18} />
      </div>
      <div
        {...(isMobile ? swipeHandlers : {})}
        className="flex flex-col items-center gap-2 mt-4"
      >
        <span className="text-3xl">{emotion.icon}</span>
        <span>{emotion.label}</span>
      </div>
      <div className="text-center text-sm">{emotion.comment}</div>
    </div>
  );
};

export default SortableEmotionCard;
