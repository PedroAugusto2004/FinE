import { useMemo } from 'react';
import { useUserProgress, useUserStats } from './useUserProgress';
import { financialCourse } from '@/data/financialCourse';

interface UnitProgress {
  unitId: string;
  completedLessons: number;
  totalLessons: number;
  percentageComplete: number;
  earnedXP: number;
  totalXP: number;
}

export const useProgressCalculations = () => {
  const { data: userProgress } = useUserProgress();
  const { data: userStats } = useUserStats();

  const calculations = useMemo(() => {
    const completedLessonIds = new Set(userProgress?.map(p => p.lesson_id) || []);
    
    // Calculate unit progress
    const unitProgress: Record<string, UnitProgress> = {};
    let totalCompletedLessons = 0;
    let totalLessons = 0;
    let totalEarnedXP = 0;
    let totalPossibleXP = 0;

    financialCourse.forEach(unit => {
      const unitCompletedLessons = unit.lessons.filter(lesson => 
        completedLessonIds.has(lesson.id)
      ).length;

      totalCompletedLessons += unitCompletedLessons;
      totalLessons += unit.lessons.length;
      
      const unitEarnedXP = unit.lessons
        .filter(lesson => completedLessonIds.has(lesson.id))
        .reduce((sum, lesson) => sum + lesson.xpReward, 0);
      
      const unitTotalXP = unit.lessons
        .reduce((sum, lesson) => sum + lesson.xpReward, 0);

      totalEarnedXP += unitEarnedXP;
      totalPossibleXP += unitTotalXP;

      unitProgress[unit.id] = {
        unitId: unit.id,
        completedLessons: unitCompletedLessons,
        totalLessons: unit.lessons.length,
        percentageComplete: Math.round((unitCompletedLessons / unit.lessons.length) * 100),
        earnedXP: unitEarnedXP,
        totalXP: unitTotalXP
      };
    });

    // Calculate streak
    const currentStreak = userStats?.current_streak || 0;
    const lastStudyDate = userStats?.last_study_date ? new Date(userStats.last_study_date) : null;
    const isStreakActive = lastStudyDate ? 
      new Date().toDateString() === lastStudyDate.toDateString() : 
      false;

    return {
      unitProgress,
      totalProgress: {
        completedLessons: totalCompletedLessons,
        totalLessons,
        percentageComplete: Math.round((totalCompletedLessons / totalLessons) * 100),
        earnedXP: totalEarnedXP,
        totalPossibleXP
      },
      streak: {
        current: currentStreak,
        isActive: isStreakActive
      }
    };
  }, [userProgress, userStats]);

  return calculations;
};
