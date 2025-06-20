import { BookOpen, Flame, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// Props: pass metrics or fetch from context/hook if available
const MetricsBar = ({ xp = 0, streak = 0, lessons = "0/0", className = "" }) => {
  return (
    <div
      className={cn(
        // Mobile: smaller, more compact, lower top, less padding
        "fixed top-2 right-2 z-50 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md rounded-xl shadow-md flex items-center gap-3 px-3 py-1.5 text-xs",
        "sm:top-4 sm:right-4 sm:gap-5 sm:px-5 sm:py-2 sm:text-base",
        className
      )}
      style={{ minWidth: 140 }}
    >
      <div className="flex items-center gap-0.5 sm:gap-1">
        <Zap className="w-4 h-4 sm:w-4 sm:h-4 text-yellow-400" />
        <span className="font-medium text-foreground">{xp}</span>
      </div>
      <div className="flex items-center gap-0.5 sm:gap-1">
        <Flame className="w-4 h-4 sm:w-4 sm:h-4 text-orange-500" />
        <span className="font-medium text-foreground">{streak}</span>
      </div>
      <div className="flex items-center gap-0.5 sm:gap-1">
        <BookOpen className="w-4 h-4 sm:w-4 sm:h-4 text-green-500" />
        <span className="font-medium text-foreground">{lessons}</span>
      </div>
    </div>
  );
};

export default MetricsBar;
