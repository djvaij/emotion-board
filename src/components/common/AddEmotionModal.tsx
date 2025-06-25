"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { motion, AnimatePresence } from "framer-motion";
import { emotionStore } from "@/stores/emotionStore";
import { v4 as uuidv4 } from "uuid";
import { EMOTION_OPTIONS } from "@/utils/constants";
import { EmotionEntityType } from "@/types/common";
import { cn } from "@/utils/cn";

interface AddEmotionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type EmotionOption = Pick<
  EmotionEntityType,
  "value" | "label" | "color" | "icon"
>;

export const AddEmotionModal = observer(
  ({ isOpen, onClose }: AddEmotionModalProps) => {
    const [selectedEmotion, setSelectedEmotion] =
      useState<EmotionOption | null>(null);
    const [comment, setComment] = useState("");

    useEffect(() => {
      if (isOpen) {
        setSelectedEmotion(null);
        setComment("");
      }
    }, [isOpen]);

    const handleAdd = () => {
      if (!selectedEmotion) return;
      emotionStore.addEmotion({
        id: uuidv4(),
        value: selectedEmotion.value,
        comment,
        createdAt: Date.now(),
        label: selectedEmotion.label,
        color: selectedEmotion.color,
        icon: selectedEmotion.icon,
      });
      setSelectedEmotion(null);
      setComment("");
      onClose();
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-background/90 text-foreground border border-foreground/50 rounded-xl shadow-lg max-w-md w-full p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-center">
                Додати емоцію
              </h2>

              <div className="flex flex-wrap gap-2 justify-center">
                {EMOTION_OPTIONS.map((emotion) => (
                  <button
                    key={emotion.value}
                    onClick={() => setSelectedEmotion(emotion)}
                    className={cn(
                      "flex px-3 py-2 rounded-lg text-sm font-medium border border-foreground/50 text-foreground/70 cursor-pointer",
                      {
                        "border-foreground/100 text-foreground/100 bg-background/100":
                          !!selectedEmotion &&
                          selectedEmotion.value === emotion.value,
                      }
                    )}
                  >
                    {emotion.label}
                    <div
                      className={`inline-flex w-4.5 ml-2 rounded ${emotion.color}`}
                    ></div>
                  </button>
                ))}
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Коментар (необов'язково)"
                className="w-full border border-gray-300 rounded-md p-2"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition text-black cursor-pointer"
                >
                  Скасувати
                </button>
                <button
                  onClick={handleAdd}
                  disabled={!selectedEmotion}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 cursor-pointer"
                >
                  Додати
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
