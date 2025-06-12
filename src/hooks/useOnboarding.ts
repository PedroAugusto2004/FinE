
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useOnboarding = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['onboarding', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      console.log('Fetching onboarding data for user:', user.id);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching onboarding data:', error);
        throw error;
      }
      
      console.log('Onboarding data fetched:', data);
      return data;
    },
    enabled: !!user,
    refetchOnWindowFocus: true,
    staleTime: 0, // Always refetch to get latest state
  });
};
