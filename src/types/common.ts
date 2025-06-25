export type EmotionValueType =
  | "joy"
  | "sadness"
  | "anger"
  | "surprise"
  | "calm"
  | "fear"
  | "disgust"
  | "excitement"
  | "shame"
  | "pride"
  | "love"
  | "boredom"
  | "anxiety"
  | "contentment"
  | "envy";

export interface EmotionEntityType {
  id: string;
  value: EmotionValueType;
  comment: string;
  createdAt: number;
  label: string;
  color: string;
  icon: string;
}
