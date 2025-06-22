import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isDark}
        onChange={() => setIsDark(!isDark)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 flex items-center bg-mine-shaft-800 duration-150 dark:bg-mine-shaft-600 rounded-full ">
        <div
          className={`w-5 h-5 bg-white dark:bg-gray-300 rounded-full  transition-all ${
            isDark ? "translate-x-6" : ""
          }`}
        ></div>
      </div>
    </label>
  );
}