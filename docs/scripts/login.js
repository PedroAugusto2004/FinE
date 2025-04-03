document.addEventListener('DOMContentLoaded', function() {
  // Form navigation
  const formNavItems = document.querySelectorAll('.form-nav-item');
  const forms = document.querySelectorAll('.auth-form');
  
  // Custom alert function from script.js
  function showCustomAlert(message) {
    const customAlertOverlay = document.getElementById('custom-alert-overlay');
    const customAlertMessage = document.getElementById('custom-alert-message');
    const customAlertButton = document.getElementById('custom-alert-button');
    
    customAlertMessage.textContent = message;
    customAlertOverlay.classList.add('show');
    
    // Close alert when OK button is clicked
    customAlertButton.addEventListener('click', function closeAlert() {
      customAlertOverlay.classList.remove('show');
      customAlertButton.removeEventListener('click', closeAlert);
    });
    
    // Close alert when clicking outside
    customAlertOverlay.addEventListener('click', function closeOnOverlay(e) {
      if (e.target === customAlertOverlay) {
        customAlertOverlay.classList.remove('show');
        customAlertOverlay.removeEventListener('click', closeOnOverlay);
      }
    });
  }
  
  // Switch between forms
  formNavItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class from all nav items and forms
      formNavItems.forEach(nav => nav.classList.remove('active'));
      forms.forEach(form => form.classList.remove('active'));
      
      // Add active class to clicked nav item and corresponding form
      item.classList.add('active');
      const formId = item.getAttribute('data-form');
      document.getElementById(formId).classList.add('active');
    });
  });
  
  // Back to login link
  const backToLoginLink = document.getElementById('back-to-login-link');
  if (backToLoginLink) {
    backToLoginLink.addEventListener('click', (e) => {
      e.preventDefault();
      formNavItems.forEach(nav => nav.classList.remove('active'));
      forms.forEach(form => form.classList.remove('active'));
      
      formNavItems[0].classList.add('active');
      document.getElementById('login-form').classList.add('active');
    });
  }
  
  // Password strength indicator
  const passwordInput = document.getElementById('signup-password');
  const strengthBar = document.querySelector('.strength-bar');
  const strengthValue = document.getElementById('strength-value');
  
  if (passwordInput) {
    passwordInput.addEventListener('input', () => {
      const password = passwordInput.value;
      let strength = 0;
      let status = '';
      
      // Calculate password strength
      if (password.length >= 8) strength += 25;
      if (password.match(/[A-Z]/)) strength += 25;
      if (password.match(/[0-9]/)) strength += 25;
      if (password.match(/[^A-Za-z0-9]/)) strength += 25;
      
      // Update strength bar width and color
      strengthBar.style.width = strength + '%';
      
      if (strength <= 25) {
        status = 'weak';
        strengthBar.style.backgroundColor = '#f44336';
      } else if (strength <= 50) {
        status = 'medium';
        strengthBar.style.backgroundColor = '#ffa726';
      } else if (strength <= 75) {
        status = 'good';
        strengthBar.style.backgroundColor = '#ffeb3b';
      } else {
        status = 'strong';
        strengthBar.style.backgroundColor = '#4caf50';
      }
      
      // Update strength text
      strengthValue.textContent = status;
    });
  }
  
  // Social login buttons
  const socialButtons = document.querySelectorAll('.social-btn');
  
  socialButtons.forEach(button => {
    button.addEventListener('click', () => {
      // For demo purposes, show a message
      let platform = '';
      if (button.classList.contains('google')) platform = 'Google';
      if (button.classList.contains('facebook')) platform = 'Facebook';
      if (button.classList.contains('apple')) platform = 'Apple';
      
      showCustomAlert(`${platform} login is not implemented in this demo.`);
    });
  });
  
  // Forgot password link
  const forgotLink = document.querySelector('.forgot-link');
  if (forgotLink) {
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      
      formNavItems.forEach(nav => nav.classList.remove('active'));
      forms.forEach(form => form.classList.remove('active'));
      
      formNavItems[2].classList.add('active');
      document.getElementById('reset-form').classList.add('active');
    });
  }
  
  // Form validation and submission
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const resetForm = document.getElementById('reset-form');
  
  // Login form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Basic validation
    if (!email || !password) {
      showCustomAlert('Please fill in all fields');
      return;
    }
    
    // Here you would typically send the data to your server
    console.log('Login attempt:', { email, password });
    
    // For demo purposes, show success message
    showCustomAlert('Login successful!');
    
    // Clear form
    loginForm.reset();
    
    // Redirect to dashboard (mock)
    // setTimeout(() => window.location.href = 'dashboard.html', 1500);
  });
  
  // Signup form submission
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;
    const termsChecked = document.getElementById('terms').checked;
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      showCustomAlert('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      showCustomAlert('Passwords do not match');
      return;
    }
    
    if (!termsChecked) {
      showCustomAlert('Please agree to the Terms and Conditions');
      return;
    }
    
    // Password strength validation (basic example)
    if (password.length < 8) {
      showCustomAlert('Password must be at least 8 characters long');
      return;
    }
    
    // Here you would typically send the data to your server
    console.log('Signup attempt:', { name, email, password });
    
    // For demo purposes, show success message
    showCustomAlert('Account created successfully!');
    
    // Clear form
    signupForm.reset();
    
    // Switch to login form
    setTimeout(() => {
      formNavItems.forEach(nav => nav.classList.remove('active'));
      forms.forEach(form => form.classList.remove('active'));
      
      formNavItems[0].classList.add('active');
      loginForm.classList.add('active');
    }, 1500);
  });
  
  // Reset password form submission
  resetForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('reset-email').value;
    
    // Basic validation
    if (!email) {
      showCustomAlert('Please enter your email address');
      return;
    }
    
    // Here you would typically send the data to your server
    console.log('Password reset request for:', email);
    
    // For demo purposes, show success message
    showCustomAlert('Password reset instructions sent to your email');
    
    // Clear form
    resetForm.reset();
  });
  
  // Mobile navigation (burger menu)
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');
  
  burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
      if(link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
      }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
  });
  
  // Close mobile nav when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if(nav.classList.contains('nav-active')) {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        navLinks.forEach(link => {
          link.style.animation = '';
        });
      }
    });
  });
  
  // Language Selector
  const languageBtn = document.getElementById('languageBtn');
  const languageDropdown = document.querySelector('.language-dropdown');
  const languageOptions = document.querySelectorAll('.language-dropdown a');
  
  // Toggle language dropdown
  languageBtn.addEventListener('click', () => {
    languageDropdown.classList.toggle('show');
  });
  
  // Close the dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.matches('#languageBtn') && !e.target.closest('.language-dropdown')) {
      languageDropdown.classList.remove('show');
    }
  });
  
  // Language selection
  languageOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = e.target.getAttribute('data-lang');
      changeLanguage(lang, true); // Pass true to indicate user-initiated change
      languageDropdown.classList.remove('show');
      
      // Update button text
      languageBtn.innerHTML = lang.toUpperCase() + ' <span class="arrow-down">▼</span>';
    });
  });
  
  // Function to change the language
  function changeLanguage(lang, showAlert = false) {
    console.log(`Changing language to: ${lang}`);
    
    // Login page translations
    const translations = {
      en: {
        home: "Home",
        features: "Features",
        about: "About",
        contact: "Contact",
        signIn: "Sign In",
        signUp: "Sign Up",
        resetPassword: "Reset Password",
        welcomeBack: "Welcome Back",
        formIntroSignIn: "Sign in to access your financial education dashboard",
        formIntroSignUp: "Join thousands learning to master their finances",
        formIntroReset: "Enter your email address and we'll send you instructions to reset your password.",
        email: "Email",
        emailPlaceholder: "your@email.com",
        password: "Password",
        passwordPlaceholder: "********",
        rememberMe: "Remember me",
        forgotPassword: "Forgot password?",
        createAccount: "Create Account",
        fullName: "Full Name",
        fullNamePlaceholder: "John Doe",
        confirmPassword: "Confirm Password",
        passwordStrength: "Password strength: ",
        termsConditions: "I agree to the Terms and Conditions",
        termsLink: "Terms and Conditions",
        sendResetLink: "Send Reset Link",
        backToLogin: "Back to login",
        orSignInWith: "Or sign in with",
        copyright: "All rights reserved."
      },
      es: {
        home: "Inicio",
        features: "Características",
        about: "Acerca de",
        contact: "Contacto",
        signIn: "Iniciar Sesión",
        signUp: "Registrarse",
        resetPassword: "Restablecer Contraseña",
        welcomeBack: "Bienvenido de Nuevo",
        formIntroSignIn: "Inicia sesión para acceder a tu panel de educación financiera",
        formIntroSignUp: "Únete a miles que aprenden a dominar sus finanzas",
        formIntroReset: "Ingrese su dirección de correo electrónico y le enviaremos instrucciones para restablecer su contraseña.",
        email: "Correo Electrónico",
        emailPlaceholder: "tu@correo.com",
        password: "Contraseña",
        passwordPlaceholder: "********",
        rememberMe: "Recuérdame",
        forgotPassword: "¿Olvidaste tu contraseña?",
        createAccount: "Crear Cuenta",
        fullName: "Nombre Completo",
        fullNamePlaceholder: "Juan Pérez",
        confirmPassword: "Confirmar Contraseña",
        passwordStrength: "Fortaleza de la contraseña: ",
        termsConditions: "Acepto los Términos y Condiciones",
        termsLink: "Términos y Condiciones",
        sendResetLink: "Enviar Enlace",
        backToLogin: "Volver a iniciar sesión",
        orSignInWith: "O inicia sesión con",
        copyright: "Todos los derechos reservados."
      },
      fr: {
        home: "Accueil",
        features: "Fonctionnalités",
        about: "À Propos",
        contact: "Contact",
        signIn: "Connexion",
        signUp: "S'inscrire",
        resetPassword: "Réinitialiser le Mot de Passe",
        welcomeBack: "Bienvenue à Nouveau",
        formIntroSignIn: "Connectez-vous pour accéder à votre tableau de bord d'éducation financière",
        formIntroSignUp: "Rejoignez des milliers de personnes apprenant à maîtriser leurs finances",
        formIntroReset: "Entrez votre adresse e-mail et nous vous enverrons des instructions pour réinitialiser votre mot de passe.",
        email: "E-mail",
        emailPlaceholder: "votre@email.com",
        password: "Mot de Passe",
        passwordPlaceholder: "********",
        rememberMe: "Se souvenir de moi",
        forgotPassword: "Mot de passe oublié?",
        createAccount: "Créer un Compte",
        fullName: "Nom Complet",
        fullNamePlaceholder: "Jean Dupont",
        confirmPassword: "Confirmer le Mot de Passe",
        passwordStrength: "Force du mot de passe: ",
        termsConditions: "J'accepte les Conditions Générales",
        termsLink: "Conditions Générales",
        sendResetLink: "Envoyer le Lien",
        backToLogin: "Retour à la connexion",
        orSignInWith: "Ou connectez-vous avec",
        copyright: "Tous droits réservés."
      },
      de: {
        home: "Startseite",
        features: "Funktionen",
        about: "Über Uns",
        contact: "Kontakt",
        signIn: "Anmelden",
        signUp: "Registrieren",
        resetPassword: "Passwort Zurücksetzen",
        welcomeBack: "Willkommen Zurück",
        formIntroSignIn: "Melden Sie sich an, um auf Ihr Finanzbildungs-Dashboard zuzugreifen",
        formIntroSignUp: "Schließen Sie sich Tausenden an, die lernen, ihre Finanzen zu meistern",
        formIntroReset: "Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen Anweisungen zum Zurücksetzen Ihres Passworts.",
        email: "E-Mail",
        emailPlaceholder: "ihre@email.com",
        password: "Passwort",
        passwordPlaceholder: "********",
        rememberMe: "Angemeldet bleiben",
        forgotPassword: "Passwort vergessen?",
        createAccount: "Konto Erstellen",
        fullName: "Vollständiger Name",
        fullNamePlaceholder: "Max Mustermann",
        confirmPassword: "Passwort Bestätigen",
        passwordStrength: "Passwortstärke: ",
        termsConditions: "Ich stimme den Geschäftsbedingungen zu",
        termsLink: "Geschäftsbedingungen",
        sendResetLink: "Link Senden",
        backToLogin: "Zurück zur Anmeldung",
        orSignInWith: "Oder anmelden mit",
        copyright: "Alle Rechte vorbehalten."
      },
      pt: {
        home: "Início",
        features: "Recursos",
        about: "Sobre",
        contact: "Contato",
        signIn: "Entrar",
        signUp: "Cadastrar",
        resetPassword: "Redefinir Senha",
        welcomeBack: "Bem-vindo de Volta",
        formIntroSignIn: "Faça login para acessar seu painel de educação financeira",
        formIntroSignUp: "Junte-se a milhares aprendendo a dominar suas finanças",
        formIntroReset: "Digite seu endereço de email e enviaremos instruções para redefinir sua senha.",
        email: "Email",
        emailPlaceholder: "seu@email.com",
        password: "Senha",
        passwordPlaceholder: "********",
        rememberMe: "Lembrar-me",
        forgotPassword: "Esqueceu a senha?",
        createAccount: "Criar Conta",
        fullName: "Nome Completo",
        fullNamePlaceholder: "João Silva",
        confirmPassword: "Confirmar Senha",
        passwordStrength: "Força da senha: ",
        termsConditions: "Concordo com os Termos e Condições",
        termsLink: "Termos e Condições",
        sendResetLink: "Enviar Link",
        backToLogin: "Voltar ao login",
        orSignInWith: "Ou entre com",
        copyright: "Todos os direitos reservados."
      }
    };
    
    if (!translations[lang]) {
      console.error(`No translations available for: ${lang}`);
      return;
    }
    
    // Update language selector text to show current language
    languageBtn.innerHTML = lang.toUpperCase() + ' <span class="arrow-down">▼</span>';
    
    // Update navigation links
    document.querySelector('.nav-links a[href="index.html#home"]').textContent = translations[lang].home;
    document.querySelector('.nav-links a[href="index.html#features"]').textContent = translations[lang].features;
    document.querySelector('.nav-links a[href="index.html#about"]').textContent = translations[lang].about;
    document.querySelector('.nav-links a[href="index.html#contact"]').textContent = translations[lang].contact;
    
    // Update form navigation
    const formNav = document.querySelectorAll('.form-nav-item');
    formNav[0].textContent = translations[lang].signIn;
    formNav[1].textContent = translations[lang].signUp;
    formNav[2].textContent = translations[lang].resetPassword;
    
    // Update login form
    document.querySelector('#login-form h2').textContent = translations[lang].welcomeBack;
    document.querySelector('#login-form .form-intro').textContent = translations[lang].formIntroSignIn;
    document.querySelector('label[for="login-email"]').textContent = translations[lang].email;
    document.querySelector('#login-email').placeholder = translations[lang].emailPlaceholder;
    document.querySelector('label[for="login-password"]').textContent = translations[lang].password;
    document.querySelector('#login-password').placeholder = translations[lang].passwordPlaceholder;
    
    // Fix for custom checkbox label in login form
    const rememberLabel = document.querySelector('.remember-me .custom-checkbox');
    if (rememberLabel) {
      const input = rememberLabel.querySelector('input');
      const checkmark = rememberLabel.querySelector('.checkmark');
      rememberLabel.innerHTML = '';
      rememberLabel.appendChild(input);
      rememberLabel.appendChild(checkmark);
      rememberLabel.appendChild(document.createTextNode(translations[lang].rememberMe));
    }
    
    document.querySelector('.forgot-link').textContent = translations[lang].forgotPassword;
    document.querySelector('#login-form .auth-btn span').textContent = translations[lang].signIn;
    document.querySelector('.social-login p').textContent = translations[lang].orSignInWith;
    
    // Update signup form
    document.querySelector('#signup-form h2').textContent = translations[lang].createAccount;
    document.querySelector('#signup-form .form-intro').textContent = translations[lang].formIntroSignUp;
    document.querySelector('label[for="signup-name"]').textContent = translations[lang].fullName;
    document.querySelector('#signup-name').placeholder = translations[lang].fullNamePlaceholder;
    document.querySelector('label[for="signup-email"]').textContent = translations[lang].email;
    document.querySelector('#signup-email').placeholder = translations[lang].emailPlaceholder;
    document.querySelector('label[for="signup-password"]').textContent = translations[lang].password;
    document.querySelector('#signup-password').placeholder = translations[lang].passwordPlaceholder;
    
    // Update strength text properly
    const strengthTextElement = document.querySelector('.strength-text');
    if (strengthTextElement) {
      const strengthValueElement = document.getElementById('strength-value');
      const currentValue = strengthValueElement ? strengthValueElement.textContent : 'weak';
      
      // Recreate the element with proper structure
      strengthTextElement.innerHTML = '';
      strengthTextElement.textContent = translations[lang].passwordStrength;
      
      // Re-add the strength value span
      const newStrengthValue = document.createElement('span');
      newStrengthValue.id = 'strength-value';
      newStrengthValue.textContent = currentValue;
      strengthTextElement.appendChild(newStrengthValue);
    }
    
    document.querySelector('label[for="signup-confirm"]').textContent = translations[lang].confirmPassword;
    document.querySelector('#signup-confirm').placeholder = translations[lang].passwordPlaceholder;
    
    // Properly update terms checkbox label
    const termsContainer = document.querySelector('.terms');
    if (termsContainer) {
      const customCheckbox = termsContainer.querySelector('.custom-checkbox');
      if (customCheckbox) {
        const input = customCheckbox.querySelector('input');
        const checkmark = customCheckbox.querySelector('.checkmark');
        const link = customCheckbox.querySelector('a');
        
        // Save reference to original elements
        const originalInput = input.cloneNode(true);
        const originalCheckmark = checkmark.cloneNode(true);
        const originalLink = link.cloneNode(true);
        
        // Clear the label content
        customCheckbox.innerHTML = '';
        
        // Add back the input and checkmark
        customCheckbox.appendChild(originalInput);
        customCheckbox.appendChild(originalCheckmark);
        
        // Split the terms text to insert the link in the middle
        const fullTermsText = translations[lang].termsConditions;
        let beforeLink = fullTermsText;
        
        // Check if the text contains the terms phrase
        if (fullTermsText.includes("Terms") || 
            fullTermsText.includes("Términos") || 
            fullTermsText.includes("Conditions") || 
            fullTermsText.includes("Condiciones") ||
            fullTermsText.includes("Générales") ||
            fullTermsText.includes("Geschäftsbedingungen") ||
            fullTermsText.includes("Termos")) {
          
          // Try different splits based on language
          const possibleSplits = [
            "Terms and Conditions", 
            "Términos y Condiciones", 
            "Conditions Générales", 
            "Geschäftsbedingungen",
            "Termos e Condições"
          ];
          
          for (const splitText of possibleSplits) {
            if (fullTermsText.includes(splitText)) {
              beforeLink = fullTermsText.split(splitText)[0];
              break;
            }
          }
        }
        
        // Add text before the link
        customCheckbox.appendChild(document.createTextNode(beforeLink));
        
        // Update and add the link
        originalLink.textContent = translations[lang].termsLink;
        customCheckbox.appendChild(originalLink);
      }
    }
    
    // Update signup button
    document.querySelector('#signup-form .auth-btn span').textContent = translations[lang].createAccount;
    
    // Update reset password form
    const resetForm = document.getElementById('reset-form');
    if (resetForm) {
      // Update all text elements in reset form
      resetForm.querySelector('h2').textContent = translations[lang].resetPassword;
      resetForm.querySelector('.form-intro').textContent = translations[lang].formIntroReset;
      resetForm.querySelector('label[for="reset-email"]').textContent = translations[lang].email;
      resetForm.querySelector('#reset-email').placeholder = translations[lang].emailPlaceholder;
      resetForm.querySelector('.auth-btn span').textContent = translations[lang].sendResetLink;
      
      // Update back to login link
      const backToLoginLink = resetForm.querySelector('.back-to-login a');
      if (backToLoginLink) {
        // Preserve the icon
        const icon = backToLoginLink.querySelector('i');
        backToLoginLink.innerHTML = '';
        if (icon) {
          backToLoginLink.appendChild(icon);
        }
        
        // Add translated text in a span
        const span = document.createElement('span');
        span.textContent = translations[lang].backToLogin;
        backToLoginLink.appendChild(span);
      }
    }
    
    // Update footer links
    const footerLinks = document.querySelectorAll('.footer-links a');
    if (footerLinks.length >= 4) {
      footerLinks[0].textContent = translations[lang].home;
      footerLinks[1].textContent = translations[lang].features;
      footerLinks[2].textContent = translations[lang].about;
      footerLinks[3].textContent = translations[lang].contact;
    }
    
    // Update copyright notice
    const copyright = document.querySelector('.copyright');
    if (copyright) {
      copyright.textContent = `© 2025 ${translations[lang].copyright}`;
    }
    
    // Set html lang attribute
    document.documentElement.lang = lang;
    
    // Store the selected language in localStorage for persistence
    localStorage.setItem('preferredLanguage', lang);
    
    // Only show alert when the change is user-initiated
    if (showAlert) {
      showCustomAlert(`Language changed to ${lang.toUpperCase()}`);
    }
  }
  
  // Check if user has a previously selected language
  const savedLanguage = localStorage.getItem('preferredLanguage');
  if (savedLanguage) {
    changeLanguage(savedLanguage, false); // Pass false to prevent alert on page load
  }
  // No need to update languageBtn here as it's now handled in the changeLanguage function
});
