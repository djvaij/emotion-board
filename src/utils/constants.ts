import { EmotionValueType } from "@/types/common";

export const EMOTION_OPTIONS: {
  label: string;
  value: EmotionValueType;
  color: string;
  icon: string;
}[] = [
  { label: "Радість", value: "joy", color: "bg-yellow-300", icon: "😊" },
  { label: "Смуток", value: "sadness", color: "bg-blue-300", icon: "😢" },
  { label: "Злість", value: "anger", color: "bg-red-400", icon: "😣" },
  { label: "Подив", value: "surprise", color: "bg-purple-300", icon: "😮" },
  { label: "Спокій", value: "calm", color: "bg-green-300", icon: "😌" },
  { label: "Страх", value: "fear", color: "bg-blue-400", icon: "😨" },
  { label: "Відраза", value: "disgust", color: "bg-pink-300", icon: "🤢" },
  {
    label: "Захоплення",
    value: "excitement",
    color: "bg-orange-300",
    icon: "🤩",
  },
  { label: "Сором", value: "shame", color: "bg-pink-400", icon: "😳" },
  { label: "Гордість", value: "pride", color: "bg-yellow-400", icon: "😎" },
  { label: "Закоханість", value: "love", color: "bg-red-300", icon: "🥰" },
  { label: "Нудьга", value: "boredom", color: "bg-blue-200", icon: "😒" },
  { label: "Тривога", value: "anxiety", color: "bg-teal-400", icon: "😓" },
  {
    label: "Задоволення",
    value: "contentment",
    color: "bg-lime-300",
    icon: "😊",
  },
  { label: "Заздрість", value: "envy", color: "bg-emerald-400", icon: "😣" },
];
