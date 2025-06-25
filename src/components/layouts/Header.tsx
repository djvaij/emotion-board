"use client";
import { usePathname } from "next/navigation";
import React, { useCallback, useState } from "react";
import Button from "../common/Button";
import { AddEmotionModal } from "@/components/common/AddEmotionModal";
import rootStore from "@/stores";
import Link from "next/link";
import { BrushCleaning, Plus } from "lucide-react";
import { cn } from "@/utils/cn";

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleClearEmotions = useCallback(() => {
    rootStore.emotion.clearAll();
  }, []);

  return (
    <header className="flex items-center justify-between p-4 border-b bg-background text-foreground border-b-foreground">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-lg md:text-xl font-bold">
          Дошка емоцій
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/statistics"
                className={cn(
                  "text-sm md:text-base hover:underline",
                  pathname === "/statistics" && "underline"
                )}
              >
                Статистика
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex space-x-2 md:space-x-4">
        <Button onClick={handleOpenModal} className="px-2 md:px-4">
          <span className="hidden md:inline">Додати емоцію</span>
          <Plus className="md:hidden" />
        </Button>
        <Button onClick={handleClearEmotions} className="px-2 md:px-4">
          <span className="hidden md:inline">Очистити емоції</span>
          <BrushCleaning className="md:hidden" />
        </Button>
      </div>
      <AddEmotionModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </header>
  );
};

export default Header;
