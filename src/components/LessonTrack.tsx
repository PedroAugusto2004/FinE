import { useRef, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { financialCourse } from "@/data/financialCourse";
import { Lock, ArrowRight, BookOpen, NotebookPen, Circle, CheckCircle2, PiggyBank, BarChart2, CreditCard, Star, Flame, Zap, Wallet } from "lucide-react";
import { useUserProgress, useUserStats } from "@/hooks/useUserProgress";
import { useProgressCalculations } from "@/hooks/useProgressCalculations";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import MetricsBar from "@/components/MetricsBar";
import { useSidebar } from "@/components/ui/sidebar";

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
  Wallet,    // Financial Basics (changed from BarChart2 to Wallet for a more relevant icon)
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
  const { isMobile: sidebarMobile, setOpenMobile } = useSidebar();

  const completedLessons = new Set(userProgress?.map(p => p.lesson_id) || []);
  const nodes = getTrackNodes(financialCourse);

  // Section navigation state
  const [activeUnitIdx, setActiveUnitIdx] = useState(0);
  const units = financialCourse;
  const activeUnit = units[activeUnitIdx];

  // Section modal state
  const [showSectionModal, setShowSectionModal] = useState(false);

  // Find the index of the "What is Money?" lesson
  const whatIsMoneyIdx = nodes.findIndex(
    (node) => node.type === 'lesson' && node.lesson.title === 'What is Money?'
  );

  // Find the last completed lesson index
  const lastCompletedIdx = nodes.reduce((acc, node, idx) => {
    if (node.type === 'lesson' && completedLessons.has(node.lesson.id)) {
      return idx;
    }
    return acc;
  }, -1);

  // Helper to determine color for each segment
  const getLineColor = (idx) => {
    // The segment connects nodes[idx] to nodes[idx+1]
    // If the node at idx is a lesson and is completed, color green
    const node = nodes[idx];
    if (node.type === 'lesson' && completedLessons.has(node.lesson.id)) {
      return '#22c55e';
    }
    // Otherwise, dark grey after 'What is Money?'
    if (idx >= whatIsMoneyIdx) return '#262626';
    return '#22c55e';
  };

  const unitRef = useRef<HTMLDivElement>(null);
  const lessonRef = useRef<HTMLDivElement>(null);
  const [lineEnd, setLineEnd] = useState(112); // default fallback
  const [selectedLesson, setSelectedLesson] = useState(null); // Track selected lesson for popup

  useEffect(() => {
    if (unitRef.current && lessonRef.current && isMobile) {
      const unitRect = unitRef.current.getBoundingClientRect();
      const lessonRect = lessonRef.current.getBoundingClientRect();
      // Calculate the distance from the bottom of the unit to the top of the lesson
      const offset = lessonRect.top - unitRect.bottom;
      // The SVG starts at 0, so add the height of the unit card
      setLineEnd(unitRect.height + offset);
    } else if (!isMobile) {
      setLineEnd(112); // fallback for desktop
    }
  }, [isMobile]);

  // Handler for lesson click
  const handleLessonClick = (node) => {
    if (!node.lesson.isUnlocked) {
      setSelectedLesson({ ...node.lesson, isLocked: true });
      return;
    }
    setSelectedLesson(node.lesson);
  };

  // Handler for starting lesson from popup
  const handleStartLesson = () => {
    if (selectedLesson && !selectedLesson.isLocked) {
      navigate(`/lesson/${selectedLesson.id}`);
      setSelectedLesson(null);
    }
  };

  // Handler for closing popup
  const handleClosePopup = () => setSelectedLesson(null);

  // Close popup on outside click
  useEffect(() => {
    if (!selectedLesson) return;
    const handleClick = (e) => {
      if (e.target.classList.contains('lesson-popup-overlay')) {
        setSelectedLesson(null);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [selectedLesson]);

  // Helper: check if a unit is completed
  const isUnitCompleted = (unit) =>
    unit.lessons.every(lesson => completedLessons.has(lesson.id));

  useEffect(() => {
    if (!isMobile) return;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let isTracking = false;
    const EDGE_THRESHOLD = 90; // px from left edge (adjusted for easier swipe)
    const SWIPE_THRESHOLD = 100; // px to trigger sidebar
    const handleTouchStart = (e: TouchEvent) => {
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      if (x <= EDGE_THRESHOLD) {
        isTracking = true;
        touchStartX = x;
        touchEndX = x; // Reset endX to startX on touch start
        touchStartY = y;
      } else {
        isTracking = false;
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isTracking) return;
      touchEndX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!isTracking) return;
      const deltaX = touchEndX - touchStartX;
      // Only open if the user actually swiped horizontally enough (not just tapped)
      if (deltaX > SWIPE_THRESHOLD) {
        setOpenMobile(true);
      }
      isTracking = false;
    };
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, setOpenMobile]);

  return (
    <>
      {/* Decorative backgrounds for both light and dark mode */}
      {/* Dark mode solid background */}
      <div
        className="fixed inset-0 w-full h-full z-0 pointer-events-none hidden dark:block bg-[#151c23]"
        aria-hidden="true"
      />
      {/* Light mode solid background */}
      <div
        className="fixed inset-0 w-full h-full z-0 pointer-events-none block dark:hidden bg-white"
        aria-hidden="true"
      />
      <div className={cn(
        "min-h-screen p-4 md:p-8 max-w-3xl mx-auto flex flex-col items-center relative",
        isMobile && "pt-16"
      )}>
        {/* Section Navigation Button */}
        <div className="w-full flex justify-center mb-8 z-50">
          <button
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-2xl",
              // Dark green background, now with transparency
              "backdrop-blur-md bg-[rgba(13,45,26,0.85)] dark:bg-[rgba(13,45,26,0.85)]",
              "transition-all duration-200",
              isMobile ? "text-base min-w-[90vw] max-w-[98vw]" : "text-lg min-w-[340px] max-w-[420px]"
            )}
            aria-label="Show all sections"
            onClick={() => setShowSectionModal(true)}
          >
            <div className="flex flex-col flex-1 min-w-0">
              <span className="uppercase text-xs font-bold text-[#e5e7eb] dark:text-[#e5e7eb] tracking-wide mb-0.5 flex items-center" style={{letterSpacing: '0.04em'}}>
                <ArrowRight className="w-4 h-4 mr-1 text-green-300 dark:text-green-200" style={{ transform: 'scaleX(-1)' }} />
                SECTION {activeUnitIdx + 1}, UNIT {activeUnitIdx + 1}
              </span>
              <span className="font-semibold text-white dark:text-white truncate text-left">
                {activeUnit.title}
              </span>
            </div>
            <span className="flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold text-xs ml-2 backdrop-blur-md bg-white/30 dark:bg-neutral-900/30 border border-[#09331a] text-white dark:text-white" style={{ WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)', borderWidth: 1, borderColor: '#09331a' }}>
              <NotebookPen className="w-4 h-4 mr-1" />
              GUIDEBOOK
            </span>
          </button>
        </div>

        {/* Section Modal Overlay */}
        {showSectionModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onMouseDown={e => {
              if (e.target === e.currentTarget) setShowSectionModal(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 40 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="bg-[#18232e] dark:bg-[#151c23] border border-[#233040] rounded-2xl shadow-2xl p-4 w-full max-w-md mx-auto relative animate-fadeIn"
              onMouseDown={e => e.stopPropagation()}
            >
              {/* Remove the X button for closing */}
              <div className="flex flex-col gap-4">
                {units.map((unit, idx) => {
                  const isLocked = idx === 1 || idx === 2; // Lock section 2 and 3 (0-based)
                  return (
                    <div
                      key={unit.id}
                      className={cn(
                        "flex items-center justify-between border border-[#233040] rounded-xl px-5 py-4 mb-1 bg-[#1e293b] dark:bg-[#1a232e] relative overflow-hidden",
                        idx === activeUnitIdx ? "ring-2 ring-green-500" : "",
                        isLocked ? "opacity-60" : ""
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold text-white mb-1">Section {String(Number(idx) + 1)}</div>
                        {isLocked && (
                          <Lock className="w-5 h-5 text-muted-foreground ml-1" />
                        )}
                      </div>
                      <div>
                        {isUnitCompleted(unit) && !isLocked && (
                          <div className="flex items-center gap-1 text-green-400 font-semibold text-sm mb-1">
                            <svg width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><polyline points="20 6 9 17 4 12" /></svg>
                            COMPLETED!
                          </div>
                        )}
                        <button
                          className={cn(
                            "border px-4 py-1.5 rounded-lg font-bold text-sm transition",
                            isLocked ? "border-gray-400 text-gray-400 cursor-not-allowed bg-gray-700/30" : "border-blue-400 text-blue-400 hover:bg-blue-400/10"
                          )}
                          onClick={() => {
                            if (!isLocked) {
                              setActiveUnitIdx(idx);
                              setShowSectionModal(false);
                            }
                          }}
                          disabled={isLocked}
                        >
                          {isLocked ? 'LOCKED' : 'REVIEW'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}

        {/* Progress Overview */}
        {/* <motion.div variants={itemVariants} className="mb-12">
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground pb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="font-medium text-foreground">{progress.totalProgress.earnedXP}</span>
              <span className="sr-only">XP</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="font-medium text-foreground">{progress.streak.current}</span>
              <span className="sr-only">Day Streak</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-green-500" />
              <span className="font-medium text-foreground">{progress.totalProgress.completedLessons}/{progress.totalProgress.totalLessons}</span>
              <span className="sr-only">Lessons</span>
            </div>
          </div>
        </motion.div> */}

        {/* SVG Path connecting all nodes */}
        <svg
          className="absolute left-1/2 -translate-x-1/2 z-0"
          width="32" height={nodes.length * 96 + (isMobile ? 64 : 0)}
          style={{ top: 180, height: nodes.length * 96 + (isMobile ? 64 : 0), pointerEvents: 'none', zIndex: 0 }}
        >
          {/* Green line from unit to just after the lesson card, responsive for mobile */}
          <path
            d={`M16 0 V${isMobile ? lineEnd + 12 : lineEnd + 32}`}
            stroke="#22c55e"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="1"
            fill="none"
          />
          {/* Solid gray line from after the green line to the end, no overlap or opacity blending */}
          <path
            d={`M16 ${isMobile ? lineEnd + 12 : lineEnd + 32} V${nodes.length * 96 + (isMobile ? 64 : 0)}`}
            stroke="#6b7280" // Tailwind gray-600
            strokeWidth="6"
            strokeLinecap="round"
            opacity="1"
            fill="none"
          />
        </svg>

        {/* Render nodes (modules and lessons) */}
        <div className="flex flex-col items-center gap-12 relative z-10 w-full">
          {nodes.map((node, idx) => {
            if (node.type === 'unit') {
              const UnitIcon = unitIcons[node.unitIdx] || BookOpen;
              // Accent the active unit (Financial Basics) only by size, no glow
              const isActive = node.unitIdx === activeUnitIdx;
              return (
                <motion.div
                  key={node.unit.id}
                  variants={itemVariants}
                  className={cn(
                    "flex flex-col items-center relative",
                    isActive && "z-40"
                  )}
                  style={{ minHeight: 80 }}
                  ref={idx === 0 ? unitRef : undefined}
                >
                  <div
                    className={cn(
                      "bg-background border-4 rounded-2xl flex flex-col items-center px-6 py-3 min-w-[120px] relative",
                      isActive ? "border-green-500 scale-105" : "border-green-500 shadow-md",
                      "unit-card-gradient"
                    )}
                    style={{
                      ...(isActive ? { transform: 'scale(1.07)' } : {}),
                      fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
                      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18), 0 1.5px 0 0 #22c55e inset',
                      border: '2.5px solid #22c55e',
                      transition: 'box-shadow 0.2s cubic-bezier(.4,2,.6,1), background 0.2s cubic-bezier(.4,2,.6,1)',
                    }}
                  >
                    <UnitIcon className="w-7 h-7 text-green-500 mb-1" />
                    <span className="text-lg font-bold text-green-600" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif', textShadow: '0 2px 8px rgba(34,197,94,0.10)' }}>{node.unit.title}</span>
                    <span className="text-xs text-muted-foreground text-center" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif', textShadow: '0 1px 4px rgba(0,0,0,0.12)' }}>{node.unit.description}</span>
                  </div>
                </motion.div>
              );
            } else if (node.type === 'lesson') {
              const isCompleted = completedLessons.has(node.lesson.id);
              const isLocked = !node.lesson.isUnlocked;
              // Color-code: green border if completed, charcoal border if not, green icon (20% opacity if locked)
              // Hover: enlarge, show tooltip
              return (
                <motion.div
                  key={node.lesson.id}
                  variants={itemVariants}
                  className="flex flex-col items-center relative group"
                  style={{ minHeight: 80 }}
                  ref={idx === 1 ? lessonRef : undefined}
                >
                  <div
                    className={cn(
                      "rounded-2xl border-2 flex items-center px-6 py-2 min-w-[120px] transition-all cursor-pointer relative z-30 bg-background",
                      isCompleted ? "border-green-500 bg-green-50" : "border-[rgba(38,38,38,0.7)]",
                      isLocked && !isCompleted && "bg-background border-[rgba(38,38,38,0.3)]"
                    )}
                    style={{
                      boxShadow: isCompleted ? '0 2px 8px 0 rgba(34,197,94,0.08)' : undefined,
                      transition: 'transform 0.18s cubic-bezier(.4,2,.6,1)',
                    }}
                    onClick={() => handleLessonClick(node)}
                  >
                    <motion.span
                      className="flex items-center justify-center mr-2"
                      initial={false}
                      whileHover={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      style={{
                        display: 'inline-flex',
                        transition: 'scale 0.18s cubic-bezier(.4,2,.6,1)'
                      }}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className={cn(
                          "w-5 h-5",
                          isLocked ? "text-green-500/20" : "text-green-500"
                        )} />
                      )}
                    </motion.span>
                    <span className={cn("font-medium", isLocked && "text-muted-foreground")}>{node.lesson.title}</span>
                    {isLocked && <Lock className="w-4 h-4 ml-2 text-muted-foreground" />}
                    {/* Tooltip on hover */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50">
                      <div className="bg-white dark:bg-neutral-900 border border-border rounded-md shadow-lg px-3 py-1 text-xs text-foreground whitespace-nowrap">
                        {isLocked ? 'Locked' : (node.lesson.length ? `${node.lesson.length} min` : 'Start')}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }
            return null;
          })}
        </div>

        {/* Lesson Description Popup */}
        {selectedLesson && (
          <div className="lesson-popup-overlay fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30 transition-all duration-300 animate-fadeIn">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-white/70 dark:bg-neutral-900/70 rounded-xl shadow-xl p-6 max-w-sm w-full relative border border-border backdrop-blur-md"
              style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)' }}
            >
              <button
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground text-2xl font-light focus:outline-none"
                onClick={handleClosePopup}
                aria-label="Close"
                style={{ background: 'none', border: 'none' }}
              >
                ×
              </button>
              <div className="flex flex-col items-center gap-3">
                <h2 className="text-lg font-semibold text-center mb-1 text-foreground tracking-tight">
                  {selectedLesson.title}
                </h2>
                <p className="text-sm text-muted-foreground text-center mb-4 px-2">
                  {selectedLesson.isLocked
                    ? 'Complete other levels to unlock this!'
                    : selectedLesson.description}
                </p>
                {selectedLesson.isLocked ? (
                  <motion.button
                    className="w-full rounded-lg shadow-none text-base font-medium bg-gray-400 text-white py-2 cursor-not-allowed opacity-80"
                    style={{ outline: 'none', border: 'none' }}
                    disabled
                  >
                    LOCKED
                  </motion.button>
                ) : (
                  <motion.button
                    className="w-full rounded-lg shadow-none text-base font-medium bg-green-700 hover:bg-green-800 text-white py-2 transition-colors focus:outline-none active:scale-95"
                    whileTap={{ scale: 0.93, y: 2 }}
                    onClick={handleStartLesson}
                    style={{ outline: 'none', border: 'none' }}
                  >
                    START
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* MetricsBar in the top right corner */}
        <div className="absolute right-4 top-4 z-50">
          <MetricsBar xp={progress.totalProgress.earnedXP} streak={progress.streak.current} lessons={`${progress.totalProgress.completedLessons}/${progress.totalProgress.totalLessons}`} />
        </div>
      </div>
    </>
  );
};

export default LessonTrack;
