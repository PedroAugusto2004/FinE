import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { financialCourse } from "@/data/financialCourse";
import { Lock, ArrowRight, BookOpen, Circle, CheckCircle2, PiggyBank, BarChart2, CreditCard } from "lucide-react";
import { useUserProgress, useUserStats } from "@/hooks/useUserProgress";
import { useProgressCalculations } from "@/hooks/useProgressCalculations";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};

// Map each unit to a Lucide icon related to its subject
const unitIcons = [
  BookOpen,    // Financial Basics
  PiggyBank,   // Saving & Investing
  CreditCard   // Credit & Debt
];

// Helper: flatten units and lessons into a single array for rendering the path
const getTrackNodes = (course) => {
  const nodes = [];
  course.forEach((unit, unitIdx) => {
    nodes.push({ type: 'unit', unit, unitIdx });
    unit.lessons.forEach((lesson, lessonIdx) => {
      nodes.push({ type: 'lesson', lesson, lessonIdx, unit, unitIdx });
    });
  });
  return nodes;
};

const LessonTrack = () => {
  const navigate = useNavigate();
  const { data: userProgress } = useUserProgress();
  const { data: userStats } = useUserStats();
  const progress = useProgressCalculations();
  const isMobile = useIsMobile();

  const completedLessons = new Set(userProgress?.map(p => p.lesson_id) || []);
  const nodes = getTrackNodes(financialCourse);

  return (
    <div className={cn(
      "min-h-screen bg-background p-4 md:p-8 max-w-3xl mx-auto flex flex-col items-center relative",
      isMobile && "pt-16"
    )}>
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-12 space-y-2">
        <h1 className="text-2xl md:text-3xl font-medium tracking-tight">
          Your Financial Journey
        </h1>
        <p className="text-sm text-muted-foreground">
          Master your finances, secure your future
        </p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="flex items-center gap-8 text-sm text-muted-foreground border-b pb-4">
          <div>
            <span className="font-medium text-foreground">{progress.totalProgress.earnedXP}</span> XP
          </div>
          <div>
            <span className="font-medium text-foreground">{progress.streak.current}</span> Day Streak
          </div>
          <div>
            <span className="font-medium text-foreground">{progress.totalProgress.completedLessons}/{progress.totalProgress.totalLessons}</span> Lessons
          </div>
        </div>
      </motion.div>

      {/* SVG Path connecting all nodes */}
      <svg
        className="absolute left-1/2 -translate-x-1/2 z-0"
        width="32" height={nodes.length * 96}
        style={{ top: 180 + 96, height: nodes.length * 96, pointerEvents: 'none' }} // shift down by 1 node
      >
        <path
          d={`M16 0 V${(nodes.length - 1) * 96}`}
          stroke="#22c55e"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.7"
          fill="none"
        />
      </svg>

      {/* Render nodes (modules and lessons) */}
      <div className="flex flex-col items-center gap-12 relative z-10 w-full">
        {nodes.map((node, idx) => {
          if (node.type === 'unit') {
            const UnitIcon = unitIcons[node.unitIdx] || BookOpen;
            return (
              <motion.div
                key={node.unit.id}
                variants={itemVariants}
                className="flex flex-col items-center relative"
                style={{ minHeight: 80 }}
              >
                {/* Mask the line only inside the card area */}
                <div className="absolute left-1/2 -translate-x-1/2 z-20"
                  style={{ width: 140, height: 64, top: 0 }}
                >
                  <div className="w-full h-full bg-background rounded-2xl" />
                </div>
                <div className="bg-background border-4 border-green-500 rounded-2xl shadow-lg flex flex-col items-center px-6 py-3 min-w-[120px] relative z-30">
                  <UnitIcon className="w-6 h-6 text-green-500 mb-1" />
                  <span className="text-lg font-bold text-green-600">{node.unit.title}</span>
                  <span className="text-xs text-muted-foreground text-center">{node.unit.description}</span>
                </div>
              </motion.div>
            );
          } else if (node.type === 'lesson') {
            const isCompleted = completedLessons.has(node.lesson.id);
            const isLocked = !node.lesson.isUnlocked;
            return (
              <motion.div
                key={node.lesson.id}
                variants={itemVariants}
                className="flex flex-col items-center relative"
                style={{ minHeight: 80 }}
              >
                {/* Mask the line only inside the card area */}
                <div className="absolute left-1/2 -translate-x-1/2 z-20"
                  style={{ width: 140, height: 40, top: 0 }}
                >
                  <div className="w-full h-full bg-background rounded-2xl" />
                </div>
                <div
                  className={cn(
                    "rounded-2xl border-2 flex items-center px-6 py-2 min-w-[120px] transition-colors cursor-pointer relative z-30",
                    isCompleted ? "border-green-500 bg-green-50" : "border-border bg-background",
                    isLocked && "opacity-60 cursor-not-allowed"
                  )}
                  onClick={() => !isLocked && navigate(`/lesson/${node.lesson.id}`)}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground mr-2" />
                  )}
                  <span className={cn("font-medium", isLocked && "text-muted-foreground")}>{node.lesson.title}</span>
                  {isLocked && <Lock className="w-4 h-4 ml-2 text-muted-foreground" />}
                </div>
              </motion.div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default LessonTrack;
