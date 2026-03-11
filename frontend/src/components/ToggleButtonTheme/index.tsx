"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const ToggleButtonTheme = () => {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;

    if (savedTheme) {
      setTheme(savedTheme);
      html.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const newTheme = theme === "dark" ? "light" : "dark";

    html.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const isDark = theme === "dark";

  return (
    <button onClick={toggleTheme} className="relative flex items-center w-14 h-7 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors">

      <Sun size={14} className="absolute left-2 text-yellow-500" />
      <Moon size={14} className="absolute right-2 text-blue-400" />

      <motion.div layout transition={{ type: "spring", stiffness: 500, damping: 30 }} className="w-6 h-6 bg-(--background) rounded-full shadow-md flex items-center justify-center" style={{
        position: "absolute",
        left: isDark ? "calc(100% - 26px)" : "2px",
      }}
      />
    </button>
  );
};