"use client";
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { observer } from "mobx-react-lite";
// import rootStore from "@/stores";
import { useEffect, useState } from "react";
import SortableEmotionCard from "./SortableEmotionCard";
import { useEmotionStore } from "@/hooks/useEmotionStore";

const EmotionsList = () => {
  const store = useEmotionStore();
  const { emotions, reorder, isLoading } = store;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 }, // Затримка для drag-подій
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = emotions.findIndex((e) => e.id === active.id);
      const newIndex = emotions.findIndex((e) => e.id === over?.id);
      reorder(oldIndex, newIndex);
    }
  };

  const handleRemove = (id: string) => {
    store.removeEmotion(id);
  };

  if (isLoading) {
    return <div>Завантаження...</div>;
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext
        items={emotions.map((e) => e.id)}
        strategy={isMobile ? verticalListSortingStrategy : rectSortingStrategy}
      >
        <div
          className={
            isMobile
              ? "flex flex-col gap-4 px-4"
              : "grid grid-cols-6 gap-4 px-4"
          }
        >
          {emotions.map((emotion) => (
            <SortableEmotionCard
              key={emotion.id}
              emotion={emotion}
              onRemove={handleRemove}
              isMobile={isMobile}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default observer(EmotionsList);
