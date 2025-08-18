# FinE Email Verification Setup Guide

## Overview
This guide will help you configure Supabase to use custom email templates and redirect URLs for FinE.

## Steps to Configure Supabase

### 1. Configure Email Templates in Supabase Dashboard

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/lnmpbjcccezjfljyiwko
2. Navigate to **Authentication** → **Email Templates**
3. Select **Confirm signup** template
4. Replace the default template with the content from `supabase/email-templates/confirm-signup.html`
5. Update the subject line to: `Welcome to FinE - Verify Your Account 🎉`

### 2. Configure Site URL and Redirect URLs

1. In your Supabase dashboard, go to **Authentication** → **URL Configuration**
2. Set the **Site URL** to your production domain (e.g., `https://your-fine-app.com`)
3. Add the following **Redirect URLs**:
   - Production: `https://your-fine-app.com/verify-email`
   - Development: `http://localhost:5173/verify-email`

### 3. Update Your Sign-Up Implementation

When implementing user registration, use the custom sign-up function:

```typescript
import { signUpWithCustomRedirect } from '@/integrations/supabase/client';

// In your sign-up component
const handleSignUp = async (email: string, password: string) => {
  const { data, error } = await signUpWithCustomRedirect(
    email, 
    password,
    `${window.location.origin}/verify-email`
  );
  
  if (error) {
    console.error('Sign up error:', error);
    return;
  }
  
  // Show success message to user
  console.log('Check your email for verification link!');
};
```

### 4. Environment-Specific Configuration

For different environments, you can set different redirect URLs:

```typescript
const getRedirectUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://your-fine-app.com/verify-email';
  }
  return 'http://localhost:5173/verify-email';
};
```

## Email Template Features

The custom email template includes:
- ✅ FinE branding and colors
- ✅ Professional design with gradient backgrounds
- ✅ Clear call-to-action button
- ✅ Feature highlights for new users
- ✅ Security information
- ✅ Responsive design for mobile devices

## Verification Page Features

The custom verification page includes:
- ✅ FinE logo and branding
- ✅ Loading states during verification
- ✅ Success/error messaging
- ✅ Automatic token handling
- ✅ Redirect to main app after verification
- ✅ Responsive design

## Testing

1. Start your development server: `npm run dev`
2. Navigate to your sign-up page
3. Register with a valid email address
4. Check your email for the custom FinE verification email
5. Click the verification link
6. Verify you're redirected to `/verify-email` with FinE styling
7. Confirm successful verification redirects to the main app

## Troubleshooting

### Email not received
- Check spam/junk folder
- Verify email address is correct
- Check Supabase logs in dashboard

### Verification link not working
- Ensure redirect URLs are properly configured
- Check that the verification page route is accessible
- Verify token is being passed correctly in URL

### Styling issues
- Ensure FinE logo is accessible at `/fine logo.png`
- Check that Tailwind CSS is properly configured
- Verify all UI components are imported correctly

## Production Deployment

Before deploying to production:
1. Update the Site URL in Supabase to your production domain
2. Add your production domain to the redirect URLs
3. Test the entire flow in production environment
4. Monitor email delivery and verification success rates