document.addEventListener('DOMContentLoaded', function() {
  // Make logo clickable
  const logoLink = document.getElementById('logoLink');
  if (logoLink) {
    logoLink.addEventListener('click', function() {
      window.location.href = 'index.html';
    });
  }

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
        login: "Login",
        tagline: "Master Your Money. Shape Your Future.",
        subtitle: "Learn financial skills through interactive simulations and games designed to make education both engaging and effective.",
        getStarted: "Get Started",
        exploreFeatures: "Explore Features",
        ourFeatures: "Our Features",
        featureIntro: "Practical tools to build your financial knowledge",
        budgetSimulator: "Budget Simulator",
        budgetDesc: "Practice real-world budget management with scenarios that prepare you for financial success.",
        investmentPlayground: "Investment Playground",
        investmentDesc: "Test investment strategies with virtual portfolios using real market data, with zero financial risk.",
        financialGames: "Financial Games",
        gamesDesc: "Make learning about finance fun through interactive games that reinforce key financial concepts.",
        aboutFinE: "About FinE",
        aboutIntro: "Our mission to transform financial education",
        aboutText1: "FinE is dedicated to making financial education accessible, practical, and engaging. Our platform combines real-world simulations with gamification to help users develop crucial financial skills.",
        aboutText2: "Whether you're a student, young professional, or simply looking to improve your financial literacy, FinE provides the tools you need to succeed in today's complex financial landscape.",
        contactUs: "Contact Us",
        contactIntro: "Questions? We'd love to hear from you",
        yourName: "Your Name",
        yourEmail: "Your Email",
        yourMessage: "Your Message",
        sendMessage: "Send Message",
        learnMore: "Learn more",
        copyright: "All rights reserved.",
        activeUsers: "Active Users",
        financialModules: "Financial Modules",
        userSatisfaction: "User Satisfaction"
      },
      es: {
        home: "Inicio",
        features: "Características",
        about: "Acerca de",
        contact: "Contacto",
        login: "Iniciar Sesión",
        tagline: "Domina tu dinero. Moldea tu futuro.",
        subtitle: "Aprende habilidades financieras a través de simulaciones y juegos interactivos diseñados para hacer que la educación sea atractiva y efectiva.",
        getStarted: "Comenzar",
        exploreFeatures: "Explorar Características",
        ourFeatures: "Nuestras Características",
        featureIntro: "Herramientas prácticas para construir tu conocimiento financiero",
        budgetSimulator: "Simulador de Presupuesto",
        budgetDesc: "Practique la gestión de presupuestos en escenarios del mundo real.",
        investmentPlayground: "Zona de Inversiones",
        investmentDesc: "Aprenda estrategias de inversión con carteras virtuales.",
        financialGames: "Juegos Financieros",
        gamesDesc: "Haga que aprender sobre finanzas sea divertido a través de juegos interactivos.",
        aboutFinE: "Acerca de FinE",
        aboutIntro: "Nuestra misión para transformar la educación financiera",
        aboutText1: "FinE se dedica a hacer que la educación financiera sea accesible, práctica y atractiva. Nuestra plataforma combina simulaciones del mundo real con gamificación para ayudar a los usuarios a desarrollar habilidades financieras cruciales.",
        aboutText2: "Ya sea estudiante, joven profesional o simplemente busque mejorar su educación financiera, FinE proporciona las herramientas que necesita para tener éxito en el complejo panorama financiero actual.",
        contactUs: "Contáctenos",
        contactIntro: "¿Preguntas? Nos encantaría saber de ti",
        yourName: "Su Nombre",
        yourEmail: "Su Correo Electrónico",
        yourMessage: "Su Mensaje",
        sendMessage: "Enviar Mensaje",
        learnMore: "Aprender más",
        copyright: "Todos los derechos reservados.",
        activeUsers: "Usuarios Activos",
        financialModules: "Módulos Financieros",
        userSatisfaction: "Satisfacción del Usuario"
      },
      fr: {
        home: "Accueil",
        features: "Fonctionnalités",
        about: "À Propos",
        contact: "Contact",
        login: "Connexion",
        tagline: "Maîtrisez votre argent. Façonnez votre avenir.",
        subtitle: "Apprenez des compétences financières grâce à des simulations et des jeux interactifs conçus pour rendre l'éducation à la fois engageante et efficace.",
        getStarted: "Commencer",
        exploreFeatures: "Explorer les fonctionnalités",
        ourFeatures: "Nos Fonctionnalités",
        featureIntro: "Des outils pratiques pour construire vos connaissances financières",
        budgetSimulator: "Simulateur de Budget",
        budgetDesc: "Pratiquez la gestion de budget dans des scénarios réels.",
        investmentPlayground: "Espace d'Investissement",
        investmentDesc: "Apprenez les stratégies d'investissement avec des portefeuilles virtuels.",
        financialGames: "Jeux Financiers",
        gamesDesc: "Rendez l'apprentissage de la finance amusant grâce à des jeux interactifs.",
        aboutFinE: "À Propos de FinE",
        aboutIntro: "Notre mission pour transformer l'éducation financière",
        aboutText1: "FinE se consacre à rendre l'éducation financière accessible, pratique et engageante. Notre plateforme combine des simulations réelles avec la gamification pour aider les utilisateurs à développer des compétences financières cruciales.",
        aboutText2: "Que vous soyez étudiant, jeune professionnel ou simplement désireux d'améliorer votre culture financière, FinE vous fournit les outils dont vous avez besoin pour réussir dans le paysage financier complexe d'aujourd'hui.",
        contactUs: "Contactez-Nous",
        contactIntro: "Des questions? Nous aimerions avoir de vos nouvelles",
        yourName: "Votre Nom",
        yourEmail: "Votre Email",
        yourMessage: "Votre Message",
        sendMessage: "Envoyer Message",
        learnMore: "En savoir plus",
        copyright: "Tous droits réservés.",
        activeUsers: "Utilisateurs Actifs",
        financialModules: "Modules Financiers",
        userSatisfaction: "Satisfaction des Utilisateurs"
      },
      de: {
        home: "Startseite",
        features: "Funktionen",
        about: "Über Uns",
        contact: "Kontakt",
        login: "Anmelden",
        tagline: "Beherrschen Sie Ihr Geld. Gestalten Sie Ihre Zukunft.",
        subtitle: "Erlernen Sie Finanzkompetenzen durch interaktive Simulationen und Spiele, die Bildung ansprechend und effektiv gestalten.",
        getStarted: "Loslegen",
        exploreFeatures: "Funktionen erkunden",
        ourFeatures: "Unsere Funktionen",
        featureIntro: "Praktische Werkzeuge zum Aufbau Ihres Finanzwissens",
        budgetSimulator: "Budget-Simulator",
        budgetDesc: "Üben Sie die Verwaltung von Budgets in realen Szenarien.",
        investmentPlayground: "Investment-Spielplatz",
        investmentDesc: "Lernen Sie Anlagestrategien mit virtuellen Portfolios.",
        financialGames: "Finanzspiele",
        gamesDesc: "Machen Sie das Lernen über Finanzen durch interaktive Spiele Spaß.",
        aboutFinE: "Über FinE",
        aboutIntro: "Unsere Mission zur Transformation der Finanzbildung",
        aboutText1: "FinE hat es sich zur Aufgabe gemacht, Finanzbildung zugänglich, praktisch und ansprechend zu gestalten. Unsere Plattform kombiniert reale Simulationen mit Gamification, um Benutzern zu helfen, entscheidende finanzielle Fähigkeiten zu entwickeln.",
        aboutText2: "Ob Sie Student, junger Berufstätiger sind oder einfach nur Ihre Finanzkenntnisse verbessern möchten, FinE bietet Ihnen die Werkzeuge, die Sie benötigen, um in der heutigen komplexen Finanzlandschaft erfolgreich zu sein.",
        contactUs: "Kontaktieren Sie Uns",
        contactIntro: "Fragen? Wir würden gerne von Ihnen hören",
        yourName: "Ihr Name",
        yourEmail: "Ihre E-Mail",
        yourMessage: "Ihre Nachricht",
        sendMessage: "Nachricht Senden",
        learnMore: "Mehr erfahren",
        copyright: "Alle Rechte vorbehalten.",
        activeUsers: "Aktive Nutzer",
        financialModules: "Finanzmodule",
        userSatisfaction: "Nutzerzufriedenheit"
      },
      pt: {
        home: "Início",
        features: "Recursos",
        about: "Sobre",
        contact: "Contato",
        login: "Entrar",
        tagline: "Domine seu dinheiro. Molde seu futuro.",
        subtitle: "Aprenda habilidades financeiras através de simulações e jogos interativos projetados para tornar a educação envolvente e eficaz.",
        getStarted: "Começar",
        exploreFeatures: "Explorar recursos",
        ourFeatures: "Nossos Recursos",
        featureIntro: "Ferramentas práticas para construir seu conhecimento financeiro",
        budgetSimulator: "Simulador de Orçamento",
        budgetDesc: "Pratique a gestão de orçamentos em cenários do mundo real.",
        investmentPlayground: "Ambiente de Investimento",
        investmentDesc: "Aprenda estratégias de investimento com carteiras virtuais.",
        financialGames: "Jogos Financeiros",
        gamesDesc: "Torne o aprendizado sobre finanças divertido através de jogos interativos.",
        aboutFinE: "Sobre FinE",
        aboutIntro: "Nossa missão para transformar a educação financeira",
        aboutText1: "FinE é dedicada a tornar a educação financeira acessível, prática e envolvente. Nossa plataforma combina simulações do mundo real com gamificação para ajudar os usuários a desenvolver habilidades financeiras cruciais.",
        aboutText2: "Seja você estudante, jovem profissional ou simplesmente alguém que busca melhorar sua alfabetização financeira, FinE fornece as ferramentas necessárias para ter sucesso no complexo cenário financeiro atual.",
        contactUs: "Fale Conosco",
        contactIntro: "Perguntas? Adoraríamos ouvir de você",
        yourName: "Seu Nome",
        yourEmail: "Seu Email",
        yourMessage: "Sua Mensagem",
        sendMessage: "Enviar Mensagem",
        learnMore: "Saiba mais",
        copyright: "Todos os direitos reservados.",
        activeUsers: "Usuários Ativos",
        financialModules: "Módulos Financeiros",
        userSatisfaction: "Satisfação do Usuário"
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
    
    // Update login button if it exists
    const loginButton = document.querySelector('.nav-links a.login-button');
    if (loginButton) {
      loginButton.textContent = translations[lang].login;
    }
    
    // Update home section - fix for subtitle not being translated
    const homeSection = document.querySelector('#home');
    if (homeSection) {
      const tagline = homeSection.querySelector('.tagline');
      const subtitle = homeSection.querySelector('.subtitle');
      
      if (tagline) tagline.textContent = translations[lang].tagline;
      if (subtitle) subtitle.textContent = translations[lang].subtitle;
      
      // Update Get Started button and Explore Features link
      const getStartedBtn = homeSection.querySelector('#getStarted');
      const exploreLink = homeSection.querySelector('.text-link');
      
      if (getStartedBtn) getStartedBtn.textContent = translations[lang].getStarted;
      if (exploreLink) {
        // Save the icon element
        const icon = exploreLink.querySelector('i');
        exploreLink.textContent = translations[lang].exploreFeatures + ' ';
        // Re-append the icon
        if (icon) exploreLink.appendChild(icon);
      }
    }
    
    // Update features section
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
      const heading = featuresSection.querySelector('h2');
      const intro = featuresSection.querySelector('.section-intro');
      
      if (heading) heading.textContent = translations[lang].ourFeatures;
      if (intro) intro.textContent = translations[lang].featureIntro;
      
      // Update feature cards
      const featureCards = featuresSection.querySelectorAll('.feature-card');
      if (featureCards.length >= 3) {
        // Card 1
        featureCards[0].querySelector('h3').textContent = translations[lang].budgetSimulator;
        featureCards[0].querySelector('p').textContent = translations[lang].budgetDesc;
        
        // Card 2
        featureCards[1].querySelector('h3').textContent = translations[lang].investmentPlayground;
        featureCards[1].querySelector('p').textContent = translations[lang].investmentDesc;
        
        // Card 3
        featureCards[2].querySelector('h3').textContent = translations[lang].financialGames;
        featureCards[2].querySelector('p').textContent = translations[lang].gamesDesc;
        
        // Update "Learn more" links
        featureCards.forEach(card => {
          const link = card.querySelector('.feature-link');
          if (link) {
            const icon = link.querySelector('i');
            link.textContent = translations[lang].learnMore + ' ';
            if (icon) link.appendChild(icon);
          }
        });
      }
    }
    
    // Update about section
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      const heading = aboutSection.querySelector('h2');
      const intro = aboutSection.querySelector('.section-intro');
      
      if (heading) heading.textContent = translations[lang].aboutFinE;
      if (intro) intro.textContent = translations[lang].aboutIntro;
      
      // Update paragraphs
      const aboutParagraphs = aboutSection.querySelectorAll('.about-content p');
      if (aboutParagraphs.length >= 2) {
        aboutParagraphs[0].textContent = translations[lang].aboutText1;
        aboutParagraphs[1].textContent = translations[lang].aboutText2;
      }
      
      // Update stats labels
      const statLabels = aboutSection.querySelectorAll('.stat-label');
      if (statLabels.length >= 3) {
        statLabels[0].textContent = translations[lang].activeUsers;
        statLabels[1].textContent = translations[lang].financialModules;
        statLabels[2].textContent = translations[lang].userSatisfaction;
      }
    }
    
    // Update contact section
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      const heading = contactSection.querySelector('h2');
      const intro = contactSection.querySelector('.section-intro');
      
      if (heading) heading.textContent = translations[lang].contactUs;
      if (intro) intro.textContent = translations[lang].contactIntro;
      
      // Update form placeholders
      const form = contactSection.querySelector('#contact-form');
      if (form) {
        const nameInput = form.querySelector('input[type="text"]');
        const emailInput = form.querySelector('input[type="email"]');
        const messageInput = form.querySelector('textarea');
        const submitButton = form.querySelector('button');
        
        if (nameInput) nameInput.placeholder = translations[lang].yourName;
        if (emailInput) emailInput.placeholder = translations[lang].yourEmail;
        if (messageInput) messageInput.placeholder = translations[lang].yourMessage;
        if (submitButton) submitButton.textContent = translations[lang].sendMessage;
      }
    }
    
    // Update footer links
    const footerLinks = document.querySelectorAll('.footer-links a');
    if (footerLinks.length >= 5) {
      footerLinks[0].textContent = translations[lang].home;
      footerLinks[1].textContent = translations[lang].features;
      footerLinks[2].textContent = translations[lang].about;
      footerLinks[3].textContent = translations[lang].contact;
      
      // Update login link if present
      if (footerLinks[4].getAttribute('href') === 'login.html') {
        footerLinks[4].textContent = translations[lang].login;
      }
    }
    
    // Update copyright
    const copyright = document.querySelector('.copyright');
    if (copyright) {
      copyright.textContent = `© 2025 ${translations[lang].copyright}`;
    }
    
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
