
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useUserProgress = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['userProgress', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useUserStats = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['userStats', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useCompleteLesson = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ lessonId, score, xpEarned }: { lessonId: string; score: number; xpEarned: number }) => {
      if (!user) throw new Error('User not authenticated');
      
      // Insert lesson progress
      const { error: progressError } = await supabase
        .from('user_progress')
        .insert({
          user_id: user.id,
          lesson_id: lessonId,
          score,
          xp_earned: xpEarned,
        });
      
      if (progressError) throw progressError;
      
      // Update user stats
      const { data: currentStats } = await supabase
        .from('user_stats')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (currentStats) {
        const { error: statsError } = await supabase
          .from('user_stats')
          .update({
            total_xp: (currentStats.total_xp || 0) + xpEarned,
            lessons_completed: (currentStats.lessons_completed || 0) + 1,
            last_study_date: new Date().toISOString().split('T')[0],
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
        
        if (statsError) throw statsError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
      queryClient.invalidateQueries({ queryKey: ['userStats'] });
    },
  });
};
