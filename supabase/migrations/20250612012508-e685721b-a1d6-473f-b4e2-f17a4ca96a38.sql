
-- Add onboarding_completed column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN onboarding_completed BOOLEAN DEFAULT FALSE;

-- Add additional onboarding fields to store user preferences
ALTER TABLE public.profiles 
ADD COLUMN knowledge_level TEXT,
ADD COLUMN financial_goals TEXT,
ADD COLUMN priorities TEXT,
ADD COLUMN referral_source TEXT;
