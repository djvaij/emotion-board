import { FC } from "react";
import { EmotionEntityType } from "@/types/common";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/utils/cn";
import { CircleX, GripVertical } from "lucide-react";
import { useSwipeToDelete } from "@/hooks/useSwipeToDelete";

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

  const { swipeHandlers, isSwiping, getSwipeStyle } = useSwipeToDelete({
    onSwipe: () => onRemove(emotion.id),
    enabled: isMobile,
  });

  const dndTransform = CSS.Transform.toString(transform);
  const style = getSwipeStyle(dndTransform);

  // Додаємо transition для dnd-kit, якщо не відбувається свайп
  if (!isSwiping && isDragging) {
    style.transition = transition ?? "transform 0.2s ease";
  }

  // Змінюємо opacity під час перетягування
  if (isDragging) {
    style.opacity = 0.5;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative flex flex-col gap-2 p-4 border border-foreground text-black rounded",
        emotion.color,
        { "cursor-grab": isDragging }
      )}
    >
      {/* Кнопка видалення для десктопу */}
      {!isMobile && (
        <button
          className="absolute top-2 right-2 z-10 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Зупиняємо спливання, щоб не активувати dnd
            onRemove(emotion.id);
          }}
          aria-label={`Видалити емоцію ${emotion.label}`}
        >
          <CircleX size={18} />
        </button>
      )}

      {/* "Ручка" для перетягування */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-10 cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }} // Важливо для TouchSensor
        aria-label={`Перетягнути емоцію ${emotion.label}`}
      >
        <GripVertical size={18} />
      </div>

      {/* Контент картки */}
      <div {...swipeHandlers} className="flex flex-col items-center gap-2 mt-4">
        <span className="text-3xl">{emotion.icon}</span>
        <span>{emotion.label}</span>
      </div>
      <div className="text-center text-sm">{emotion.comment}</div>
    </div>
  );
};

export default SortableEmotionCard;
