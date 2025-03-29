document.addEventListener('DOMContentLoaded', function() {
  // Get Started Button
  document.getElementById("getStarted").addEventListener("click", function() {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
  });

  // Mobile Navigation
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

  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      if(nav.classList.contains('nav-active')) {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        navLinks.forEach(link => {
          link.style.animation = '';
        });
      }
      
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Scroll animation for sections
  const sectionContent = document.querySelectorAll('.section-content');
  
  function checkSections() {
    sectionContent.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if(sectionTop < windowHeight * 0.75) {
        section.classList.add('appear');
      }
    });
  }
  
  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }
  
  window.addEventListener('scroll', checkSections);
  checkSections(); // Check on initial load

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
  
  // Custom Alert Function
  const customAlertOverlay = document.getElementById('custom-alert-overlay');
  const customAlertMessage = document.getElementById('custom-alert-message');
  const customAlertButton = document.getElementById('custom-alert-button');
  
  function showCustomAlert(message) {
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

  // Function to change the language
  function changeLanguage(lang, showAlert = false) {
    console.log(`Changing language to: ${lang}`);
    
    // This is where you would implement the actual language change
    // For a real implementation, you would need translations stored in objects or fetched from a server
    
    const translations = {
      en: {
        home: "Home",
        features: "Features",
        about: "About",
        contact: "Contact",
        tagline: "Transforming financial education with gamification and real-world simulations.",
        getStarted: "Get Started",
        ourFeatures: "Our Features",
        budgetSimulator: "Budget Simulator",
        budgetDesc: "Practice managing budgets in real-world scenarios.",
        investmentPlayground: "Investment Playground",
        investmentDesc: "Learn investing strategies with virtual portfolios.",
        financialGames: "Financial Games",
        gamesDesc: "Make learning about finance fun through interactive games.",
        aboutFinE: "About FinE",
        aboutText1: "FinE is dedicated to making financial education accessible, practical, and engaging. Our platform combines real-world simulations with gamification to help users develop crucial financial skills.",
        aboutText2: "Whether you're a student, young professional, or simply looking to improve your financial literacy, FinE provides the tools you need to succeed in today's complex financial landscape.",
        contactUs: "Contact Us",
        yourName: "Your Name",
        yourEmail: "Your Email",
        yourMessage: "Your Message",
        sendMessage: "Send Message",
      },
      es: {
        home: "Inicio",
        features: "Características",
        about: "Acerca de",
        contact: "Contacto",
        tagline: "Transformando la educación financiera con gamificación y simulaciones del mundo real.",
        getStarted: "Comenzar",
        ourFeatures: "Nuestras Características",
        budgetSimulator: "Simulador de Presupuesto",
        budgetDesc: "Practique la gestión de presupuestos en escenarios del mundo real.",
        investmentPlayground: "Zona de Inversiones",
        investmentDesc: "Aprenda estrategias de inversión con carteras virtuales.",
        financialGames: "Juegos Financieros",
        gamesDesc: "Haga que aprender sobre finanzas sea divertido a través de juegos interactivos.",
        aboutFinE: "Acerca de FinE",
        aboutText1: "FinE se dedica a hacer que la educación financiera sea accesible, práctica y atractiva. Nuestra plataforma combina simulaciones del mundo real con gamificación para ayudar a los usuarios a desarrollar habilidades financieras cruciales.",
        aboutText2: "Ya sea estudiante, joven profesional o simplemente busque mejorar su educación financiera, FinE proporciona las herramientas que necesita para tener éxito en el complejo panorama financiero actual.",
        contactUs: "Contáctenos",
        yourName: "Su Nombre",
        yourEmail: "Su Correo Electrónico",
        yourMessage: "Su Mensaje",
        sendMessage: "Enviar Mensaje",
      },
      fr: {
        home: "Accueil",
        features: "Fonctionnalités",
        about: "À Propos",
        contact: "Contact",
        tagline: "Transformer l'éducation financière avec la gamification et des simulations réelles.",
        getStarted: "Commencer",
        ourFeatures: "Nos Fonctionnalités",
        budgetSimulator: "Simulateur de Budget",
        budgetDesc: "Pratiquez la gestion de budget dans des scénarios réels.",
        investmentPlayground: "Espace d'Investissement",
        investmentDesc: "Apprenez les stratégies d'investissement avec des portefeuilles virtuels.",
        financialGames: "Jeux Financiers",
        gamesDesc: "Rendez l'apprentissage de la finance amusant grâce à des jeux interactifs.",
        aboutFinE: "À Propos de FinE",
        aboutText1: "FinE se consacre à rendre l'éducation financière accessible, pratique et engageante. Notre plateforme combine des simulations réelles avec la gamification pour aider les utilisateurs à développer des compétences financières cruciales.",
        aboutText2: "Que vous soyez étudiant, jeune professionnel ou simplement désireux d'améliorer votre culture financière, FinE vous fournit les outils dont vous avez besoin pour réussir dans le paysage financier complexe d'aujourd'hui.",
        contactUs: "Contactez-Nous",
        yourName: "Votre Nom",
        yourEmail: "Votre Email",
        yourMessage: "Votre Message",
        sendMessage: "Envoyer Message",
      },
      de: {
        home: "Startseite",
        features: "Funktionen",
        about: "Über Uns",
        contact: "Kontakt",
        tagline: "Transformation der Finanzbildung durch Gamification und reale Simulationen.",
        getStarted: "Loslegen",
        ourFeatures: "Unsere Funktionen",
        budgetSimulator: "Budget-Simulator",
        budgetDesc: "Üben Sie die Verwaltung von Budgets in realen Szenarien.",
        investmentPlayground: "Investment-Spielplatz",
        investmentDesc: "Lernen Sie Anlagestrategien mit virtuellen Portfolios.",
        financialGames: "Finanzspiele",
        gamesDesc: "Machen Sie das Lernen über Finanzen durch interaktive Spiele Spaß.",
        aboutFinE: "Über FinE",
        aboutText1: "FinE hat es sich zur Aufgabe gemacht, Finanzbildung zugänglich, praktisch und ansprechend zu gestalten. Unsere Plattform kombiniert reale Simulationen mit Gamification, um Benutzern zu helfen, entscheidende finanzielle Fähigkeiten zu entwickeln.",
        aboutText2: "Ob Sie Student, junger Berufstätiger sind oder einfach nur Ihre Finanzkenntnisse verbessern möchten, FinE bietet Ihnen die Werkzeuge, die Sie benötigen, um in der heutigen komplexen Finanzlandschaft erfolgreich zu sein.",
        contactUs: "Kontaktieren Sie Uns",
        yourName: "Ihr Name",
        yourEmail: "Ihre E-Mail",
        yourMessage: "Ihre Nachricht",
        sendMessage: "Nachricht Senden",
      },
      pt: {
        home: "Início",
        features: "Recursos",
        about: "Sobre",
        contact: "Contato",
        tagline: "Transformando a educação financeira com gamificação e simulações do mundo real.",
        getStarted: "Começar",
        ourFeatures: "Nossos Recursos",
        budgetSimulator: "Simulador de Orçamento",
        budgetDesc: "Pratique a gestão de orçamentos em cenários do mundo real.",
        investmentPlayground: "Ambiente de Investimento",
        investmentDesc: "Aprenda estratégias de investimento com carteiras virtuais.",
        financialGames: "Jogos Financeiros",
        gamesDesc: "Torne o aprendizado sobre finanças divertido através de jogos interativos.",
        aboutFinE: "Sobre FinE",
        aboutText1: "FinE é dedicada a tornar a educação financeira acessível, prática e envolvente. Nossa plataforma combina simulações do mundo real com gamificação para ajudar os usuários a desenvolver habilidades financeiras cruciais.",
        aboutText2: "Seja você estudante, jovem profissional ou simplesmente alguém que busca melhorar sua alfabetização financeira, FinE fornece as ferramentas necessárias para ter sucesso no complexo cenário financeiro atual.",
        contactUs: "Fale Conosco",
        yourName: "Seu Nome",
        yourEmail: "Seu Email",
        yourMessage: "Sua Mensagem",
        sendMessage: "Enviar Mensagem",
      }
    };

    if (!translations[lang]) {
      console.error(`No translations available for: ${lang}`);
      return;
    }

    // Update navigation links
    document.querySelector('.nav-links a[href="#home"]').textContent = translations[lang].home;
    document.querySelector('.nav-links a[href="#features"]').textContent = translations[lang].features;
    document.querySelector('.nav-links a[href="#about"]').textContent = translations[lang].about;
    document.querySelector('.nav-links a[href="#contact"]').textContent = translations[lang].contact;
    
    // Update home section
    document.querySelector('#home p').textContent = translations[lang].tagline;
    document.querySelector('#getStarted').textContent = translations[lang].getStarted;
    
    // Update features section
    document.querySelector('#features h2').textContent = translations[lang].ourFeatures;
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards[0].querySelector('h3').textContent = translations[lang].budgetSimulator;
    featureCards[0].querySelector('p').textContent = translations[lang].budgetDesc;
    featureCards[1].querySelector('h3').textContent = translations[lang].investmentPlayground;
    featureCards[1].querySelector('p').textContent = translations[lang].investmentDesc;
    featureCards[2].querySelector('h3').textContent = translations[lang].financialGames;
    featureCards[2].querySelector('p').textContent = translations[lang].gamesDesc;
    
    // Update about section
    document.querySelector('#about h2').textContent = translations[lang].aboutFinE;
    const aboutParagraphs = document.querySelectorAll('.about-content p');
    aboutParagraphs[0].textContent = translations[lang].aboutText1;
    aboutParagraphs[1].textContent = translations[lang].aboutText2;
    
    // Update contact section
    document.querySelector('#contact h2').textContent = translations[lang].contactUs;
    document.querySelector('#contact-form input[type="text"]').placeholder = translations[lang].yourName;
    document.querySelector('#contact-form input[type="email"]').placeholder = translations[lang].yourEmail;
    document.querySelector('#contact-form textarea').placeholder = translations[lang].yourMessage;
    document.querySelector('#contact-form button').textContent = translations[lang].sendMessage;
    
    // Set html lang attribute
    document.documentElement.lang = lang;
    
    // You could also store the selected language in localStorage for persistence
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
