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
        email: "Email",
        emailPlaceholder: "your@email.com",
        password: "Password",
        passwordPlaceholder: "********",
        rememberMe: "Remember me",
        createAccount: "Create Account",
        fullName: "Full Name",
        fullNamePlaceholder: "John Doe",
        confirmPassword: "Confirm Password",
        termsConditions: "I agree to the Terms and Conditions",
        resetInstructions: "Enter your email address and we'll send you instructions to reset your password.",
        sendResetLink: "Send Reset Link"
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
        email: "Correo Electrónico",
        emailPlaceholder: "tu@correo.com",
        password: "Contraseña",
        passwordPlaceholder: "********",
        rememberMe: "Recuérdame",
        createAccount: "Crear Cuenta",
        fullName: "Nombre Completo",
        fullNamePlaceholder: "Juan Pérez",
        confirmPassword: "Confirmar Contraseña",
        termsConditions: "Acepto los Términos y Condiciones",
        resetInstructions: "Ingrese su dirección de correo electrónico y le enviaremos instrucciones para restablecer su contraseña.",
        sendResetLink: "Enviar Enlace"
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
        email: "E-mail",
        emailPlaceholder: "votre@email.com",
        password: "Mot de Passe",
        passwordPlaceholder: "********",
        rememberMe: "Se souvenir de moi",
        createAccount: "Créer un Compte",
        fullName: "Nom Complet",
        fullNamePlaceholder: "Jean Dupont",
        confirmPassword: "Confirmer le Mot de Passe",
        termsConditions: "J'accepte les Conditions Générales",
        resetInstructions: "Entrez votre adresse e-mail et nous vous enverrons des instructions pour réinitialiser votre mot de passe.",
        sendResetLink: "Envoyer le Lien"
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
        email: "E-Mail",
        emailPlaceholder: "ihre@email.com",
        password: "Passwort",
        passwordPlaceholder: "********",
        rememberMe: "Angemeldet bleiben",
        createAccount: "Konto Erstellen",
        fullName: "Vollständiger Name",
        fullNamePlaceholder: "Max Mustermann",
        confirmPassword: "Passwort Bestätigen",
        termsConditions: "Ich stimme den Geschäftsbedingungen zu",
        resetInstructions: "Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen Anweisungen zum Zurücksetzen Ihres Passworts.",
        sendResetLink: "Link Senden"
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
        email: "Email",
        emailPlaceholder: "seu@email.com",
        password: "Senha",
        passwordPlaceholder: "********",
        rememberMe: "Lembrar-me",
        createAccount: "Criar Conta",
        fullName: "Nome Completo",
        fullNamePlaceholder: "João Silva",
        confirmPassword: "Confirmar Senha",
        termsConditions: "Concordo com os Termos e Condições",
        resetInstructions: "Digite seu endereço de email e enviaremos instruções para redefinir sua senha.",
        sendResetLink: "Enviar Link"
      }
    };
    
    if (!translations[lang]) {
      console.error(`No translations available for: ${lang}`);
      return;
    }
    
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
    document.querySelector('label[for="login-email"]').textContent = translations[lang].email;
    document.querySelector('#login-email').placeholder = translations[lang].emailPlaceholder;
    document.querySelector('label[for="login-password"]').textContent = translations[lang].password;
    document.querySelector('#login-password').placeholder = translations[lang].passwordPlaceholder;
    document.querySelector('label[for="remember"]').textContent = translations[lang].rememberMe;
    document.querySelector('#login-form .auth-btn').textContent = translations[lang].signIn;
    
    // Update signup form
    document.querySelector('#signup-form h2').textContent = translations[lang].createAccount;
    document.querySelector('label[for="signup-name"]').textContent = translations[lang].fullName;
    document.querySelector('#signup-name').placeholder = translations[lang].fullNamePlaceholder;
    document.querySelector('label[for="signup-email"]').textContent = translations[lang].email;
    document.querySelector('#signup-email').placeholder = translations[lang].emailPlaceholder;
    document.querySelector('label[for="signup-password"]').textContent = translations[lang].password;
    document.querySelector('#signup-password').placeholder = translations[lang].passwordPlaceholder;
    document.querySelector('label[for="signup-confirm"]').textContent = translations[lang].confirmPassword;
    document.querySelector('#signup-confirm').placeholder = translations[lang].passwordPlaceholder;
    
    // Update terms - need to preserve the link element
    const termsLabel = document.querySelector('label[for="terms"]');
    const termsLink = termsLabel.querySelector('a');
    termsLabel.childNodes[0].nodeValue = translations[lang].termsConditions.split('Terms')[0];
    termsLink.textContent = 'Terms and Conditions';
    
    // Update signup button
    document.querySelector('#signup-form .auth-btn').textContent = translations[lang].createAccount;
    
    // Update reset password form
    document.querySelector('#reset-form h2').textContent = translations[lang].resetPassword;
    document.querySelector('.reset-instructions').textContent = translations[lang].resetInstructions;
    document.querySelector('label[for="reset-email"]').textContent = translations[lang].email;
    document.querySelector('#reset-email').placeholder = translations[lang].emailPlaceholder;
    document.querySelector('#reset-form .auth-btn').textContent = translations[lang].sendResetLink;
    
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
    languageBtn.innerHTML = savedLanguage.toUpperCase() + ' <span class="arrow-down">▼</span>';
  }
});
