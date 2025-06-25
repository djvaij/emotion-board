import { cn } from "@/utils/cn";
import { memo } from "react";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        `px-4 py-2 text-foreground rounded-md border cursor-pointer hover:bg-background`,
        className
      )}
    >
      {children}
    </button>
  );
};

export default memo(Button);
