
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/hooks/useOnboarding';
import Welcome from '@/pages/Welcome';
import OnboardingForm from '@/components/OnboardingForm';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const { data: onboardingData, isLoading: onboardingLoading } = useOnboarding();

  if (loading || onboardingLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (!user) {
    return <Welcome />;
  }

  // Check if user needs onboarding
  if (onboardingData && !onboardingData.onboarding_completed) {
    return <OnboardingForm />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
