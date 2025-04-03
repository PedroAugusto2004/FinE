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

  // Feature Popup Functionality
  const featurePopupOverlay = document.getElementById('feature-popup-overlay');
  const featurePopupTitle = document.getElementById('feature-popup-title');
  const featurePopupContent = document.getElementById('feature-popup-content');
  const featurePopupClose = document.querySelector('.feature-popup-close');
  
  // Feature content with more detailed information
  const featureDetails = {
    'Budget Simulator': {
      content: `
        <p>Our Budget Simulator is designed to give you hands-on experience with real financial decision-making in a risk-free environment.</p>
        
        <h4>Key Features:</h4>
        <ul>
          <li class="highlight-item delay-1">Create and manage virtual monthly budgets based on various income levels and lifestyles</li>
          <li class="highlight-item delay-2">Face unexpected financial challenges and learn how to adjust your budget accordingly</li>
          <li class="highlight-item delay-3">Track your spending patterns and receive personalized insights</li>
          <li class="highlight-item delay-4">Compare your budgeting decisions with financial experts' recommendations</li>
          <li class="highlight-item delay-5">Earn achievements as you master different budgeting skills</li>
        </ul>
        
        <h4>How It Helps:</h4>
        <p>By practicing with our simulator, you'll develop practical skills that directly translate to managing your actual finances. You'll learn to anticipate expenses, build emergency funds, and make informed spending decisions—all essential skills for financial stability and growth.</p>
        
        <p>Start with beginner scenarios and work your way up to more complex financial situations as your confidence grows.</p>
      `
    },
    'Investment Playground': {
      content: `
        <p>The Investment Playground provides a realistic, zero-risk environment to learn about investment strategies using real market data and simulated outcomes.</p>
        
        <h4>Key Features:</h4>
        <ul>
          <li class="highlight-item delay-1">Build diversified investment portfolios with stocks, bonds, ETFs, and other assets</li>
          <li class="highlight-item delay-2">Access historical market data to observe how different investments performed over time</li>
          <li class="highlight-item delay-3">Run simulations to see potential long-term outcomes of various investment strategies</li>
          <li class="highlight-item delay-4">Learn about risk tolerance, asset allocation, and portfolio rebalancing</li>
          <li class="highlight-item delay-5">Compete with friends or other users to see whose investment strategy performs best</li>
        </ul>
        
        <h4>How It Helps:</h4>
        <p>Investment can seem intimidating for beginners, but our playground demystifies the process. You'll gain confidence in making investment decisions by understanding concepts like compound interest, dividend reinvestment, and market volatility.</p>
        
        <p>The knowledge you gain here will prepare you to make informed decisions when you're ready to invest real money in your future.</p>
      `
    },
    'Financial Games': {
      content: `
        <p>Our collection of Financial Games transforms complex financial concepts into engaging, interactive experiences that make learning enjoyable and effective.</p>
        
        <h4>Available Games:</h4>
        <ul>
          <li class="highlight-item delay-1"><strong>Debt Destroyer</strong> - Race against time to eliminate debt while managing income and expenses</li>
          <li class="highlight-item delay-2"><strong>Market Mastery</strong> - Test your knowledge of market trends and investment principles</li>
          <li class="highlight-item delay-3"><strong>Budget Hero</strong> - Build the perfect budget to achieve various life goals</li>
          <li class="highlight-item delay-4"><strong>Credit Score Quest</strong> - Navigate financial decisions to boost your credit score</li>
          <li class="highlight-item delay-5"><strong>Retirement Road</strong> - Plan your path to a comfortable retirement</li>
        </ul>
        
        <h4>Benefits of Game-Based Learning:</h4>
        <p>Research shows that gamification significantly improves retention of financial concepts. Our games create memorable experiences that reinforce key principles through active participation rather than passive consumption.</p>
        
        <p>Each game includes beginner to advanced levels, making them suitable for all knowledge levels. Compete with others on leaderboards or track your personal improvement over time.</p>
      `
    }
  };
  
  // Get all feature links
  const featureLinks = document.querySelectorAll('.feature-link');
  
  // Add click event to each feature link
  featureLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get feature title from the parent card's h3
      const featureTitle = this.closest('.feature-card').querySelector('h3').textContent;
      
      // Set popup title
      featurePopupTitle.textContent = featureTitle;
      
      // Set popup content
      if (featureDetails[featureTitle]) {
        featurePopupContent.innerHTML = featureDetails[featureTitle].content;
      } else {
        featurePopupContent.innerHTML = '<p>Details for this feature are coming soon!</p>';
      }
      
      // Show popup
      featurePopupOverlay.classList.add('show');
      
      // Prevent scrolling on the body
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close popup when close button is clicked
  featurePopupClose.addEventListener('click', () => {
    featurePopupOverlay.classList.remove('show');
    document.body.style.overflow = '';
  });
  
  // Close popup when clicking outside the popup
  featurePopupOverlay.addEventListener('click', (e) => {
    if (e.target === featurePopupOverlay) {
      featurePopupOverlay.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
  
  // Close popup when ESC key is pressed
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && featurePopupOverlay.classList.contains('show')) {
      featurePopupOverlay.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
  
  // Translate feature popups
  function updateFeaturePopupTranslations(lang) {
    // This function would be called from the changeLanguage function
    const translations = {
      en: featureDetails,
      es: {
        'Simulador de Presupuesto': {
          content: `
            <p>Nuestro Simulador de Presupuesto está diseñado para darle experiencia práctica con la toma de decisiones financieras reales en un entorno libre de riesgos.</p>
            
            <h4>Características principales:</h4>
            <ul>
              <li class="highlight-item delay-1">Cree y administre presupuestos mensuales virtuales basados en varios niveles de ingresos y estilos de vida</li>
              <li class="highlight-item delay-2">Enfrente desafíos financieros inesperados y aprenda a ajustar su presupuesto en consecuencia</li>
              <li class="highlight-item delay-3">Realice un seguimiento de sus patrones de gasto y reciba información personalizada</li>
              <li class="highlight-item delay-4">Compare sus decisiones de presupuesto con las recomendaciones de expertos financieros</li>
              <li class="highlight-item delay-5">Gane logros a medida que domina diferentes habilidades de presupuesto</li>
            </ul>
            
            <h4>Cómo ayuda:</h4>
            <p>Al practicar con nuestro simulador, desarrollará habilidades prácticas que se traducen directamente en la gestión de sus finanzas reales. Aprenderá a anticipar gastos, crear fondos de emergencia y tomar decisiones de gasto informadas, todas habilidades esenciales para la estabilidad y el crecimiento financieros.</p>
          `
        },
        'Zona de Inversiones': {
          content: `
            <p>La Zona de Inversiones proporciona un entorno realista y sin riesgos para aprender sobre estrategias de inversión utilizando datos de mercado reales y resultados simulados.</p>
            
            <h4>Características principales:</h4>
            <ul>
              <li class="highlight-item delay-1">Construya carteras de inversión diversificadas con acciones, bonos, ETF y otros activos</li>
              <li class="highlight-item delay-2">Acceda a datos históricos del mercado para observar cómo se comportaron diferentes inversiones a lo largo del tiempo</li>
              <li class="highlight-item delay-3">Ejecute simulaciones para ver los posibles resultados a largo plazo de varias estrategias de inversión</li>
              <li class="highlight-item delay-4">Aprenda sobre tolerancia al riesgo, asignación de activos y reequilibrio de cartera</li>
              <li class="highlight-item delay-5">Compita con amigos u otros usuarios para ver qué estrategia de inversión funciona mejor</li>
            </ul>
            
            <h4>Cómo ayuda:</h4>
            <p>La inversión puede parecer intimidante para los principiantes, pero nuestra zona desmitifica el proceso. Ganará confianza en la toma de decisiones de inversión al comprender conceptos como el interés compuesto, la reinversión de dividendos y la volatilidad del mercado.</p>
          `
        },
        'Juegos Financieros': {
          content: `
            <p>Nuestra colección de Juegos Financieros transforma conceptos financieros complejos en experiencias interactivas y atractivas que hacen que el aprendizaje sea agradable y efectivo.</p>
            
            <h4>Juegos disponibles:</h4>
            <ul>
              <li class="highlight-item delay-1"><strong>Destructor de Deudas</strong> - Corra contra el tiempo para eliminar la deuda mientras administra ingresos y gastos</li>
              <li class="highlight-item delay-2"><strong>Maestría del Mercado</strong> - Ponga a prueba su conocimiento de las tendencias del mercado y los principios de inversión</li>
              <li class="highlight-item delay-3"><strong>Héroe del Presupuesto</strong> - Construya el presupuesto perfecto para lograr varios objetivos de vida</li>
              <li class="highlight-item delay-4"><strong>Búsqueda de Puntaje Crediticio</strong> - Navegue por decisiones financieras para aumentar su puntaje crediticio</li>
              <li class="highlight-item delay-5"><strong>Camino a la Jubilación</strong> - Planifique su camino hacia una jubilación cómoda</li>
            </ul>
            
            <h4>Beneficios del aprendizaje basado en juegos:</h4>
            <p>La investigación muestra que la gamificación mejora significativamente la retención de conceptos financieros. Nuestros juegos crean experiencias memorables que refuerzan principios clave mediante la participación activa en lugar del consumo pasivo.</p>
          `
        }
      },
      fr: {
        'Simulateur de Budget': {
          content: `
            <p>Notre Simulateur de Budget est conçu pour vous donner une expérience pratique de la prise de décisions financières réelles dans un environnement sans risque.</p>
            
            <h4>Caractéristiques principales:</h4>
            <ul>
              <li class="highlight-item delay-1">Créez et gérez des budgets mensuels virtuels basés sur différents niveaux de revenus et styles de vie</li>
              <li class="highlight-item delay-2">Faites face à des défis financiers inattendus et apprenez à ajuster votre budget en conséquence</li>
              <li class="highlight-item delay-3">Suivez vos habitudes de dépenses et recevez des informations personnalisées</li>
              <li class="highlight-item delay-4">Comparez vos décisions budgétaires avec les recommandations d'experts financiers</li>
              <li class="highlight-item delay-5">Gagnez des réalisations au fur et à mesure que vous maîtrisez différentes compétences budgétaires</li>
            </ul>
            
            <h4>Comment cela aide:</h4>
            <p>En pratiquant avec notre simulateur, vous développerez des compétences pratiques qui se traduisent directement dans la gestion de vos finances réelles. Vous apprendrez à anticiper les dépenses, à constituer des fonds d'urgence et à prendre des décisions de dépenses éclairées - toutes des compétences essentielles pour la stabilité et la croissance financières.</p>
          `
        },
        'Espace d\'Investissement': {
          content: `
            <p>L'Espace d'Investissement offre un environnement réaliste et sans risque pour apprendre les stratégies d'investissement en utilisant des données de marché réelles et des résultats simulés.</p>
            
            <h4>Caractéristiques principales:</h4>
            <ul>
              <li class="highlight-item delay-1">Construisez des portefeuilles d'investissement diversifiés avec des actions, des obligations, des ETF et d'autres actifs</li>
              <li class="highlight-item delay-2">Accédez aux données historiques du marché pour observer comment différents investissements ont performé au fil du temps</li>
              <li class="highlight-item delay-3">Exécutez des simulations pour voir les résultats potentiels à long terme de diverses stratégies d'investissement</li>
              <li class="highlight-item delay-4">Apprenez sur la tolérance au risque, l'allocation d'actifs et le rééquilibrage de portefeuille</li>
              <li class="highlight-item delay-5">Faites des compétitions avec des amis ou d'autres utilisateurs pour voir quelle stratégie d'investissement fonctionne le mieux</li>
            </ul>
            
            <h4>Comment cela aide:</h4>
            <p>L'investissement peut sembler intimidant pour les débutants, mais notre espace démystifie le processus. Vous gagnerez en confiance dans la prise de décisions d'investissement en comprenant des concepts comme l'intérêt composé, le réinvestissement des dividendes et la volatilité du marché.</p>
          `
        },
        'Jeux Financiers': {
          content: `
            <p>Notre collection de Jeux Financiers transforme des concepts financiers complexes en expériences interactives et engageantes qui rendent l'apprentissage agréable et efficace.</p>
            
            <h4>Jeux disponibles:</h4>
            <ul>
              <li class="highlight-item delay-1"><strong>Destructeur de Dettes</strong> - Faites la course contre le temps pour éliminer les dettes tout en gérant revenus et dépenses</li>
              <li class="highlight-item delay-2"><strong>Maîtrise du Marché</strong> - Testez votre connaissance des tendances du marché et des principes d'investissement</li>
              <li class="highlight-item delay-3"><strong>Héros du Budget</strong> - Construisez le budget parfait pour atteindre divers objectifs de vie</li>
              <li class="highlight-item delay-4"><strong>Quête du Score de Crédit</strong> - Naviguez à travers des décisions financières pour améliorer votre score de crédit</li>
              <li class="highlight-item delay-5"><strong>Route de la Retraite</strong> - Planifiez votre chemin vers une retraite confortable</li>
            </ul>
            
            <h4>Avantages de l'apprentissage par le jeu:</h4>
            <p>La recherche montre que la gamification améliore considérablement la rétention des concepts financiers. Nos jeux créent des expériences mémorables qui renforcent les principes clés par une participation active plutôt que par une consommation passive.</p>
          `
        }
      },
      de: {
        'Budget-Simulator': {
          content: `
            <p>Unser Budget-Simulator ist darauf ausgelegt, Ihnen praktische Erfahrungen mit realen finanziellen Entscheidungen in einer risikofreien Umgebung zu vermitteln.</p>
            
            <h4>Hauptfunktionen:</h4>
            <ul>
              <li class="highlight-item delay-1">Erstellen und verwalten Sie virtuelle Monatsbudgets basierend auf verschiedenen Einkommensniveaus und Lebensstilen</li>
              <li class="highlight-item delay-2">Stellen Sie sich unerwarteten finanziellen Herausforderungen und lernen Sie, Ihr Budget entsprechend anzupassen</li>
              <li class="highlight-item delay-3">Verfolgen Sie Ihre Ausgabenmuster und erhalten Sie personalisierte Einblicke</li>
              <li class="highlight-item delay-4">Vergleichen Sie Ihre Budgetentscheidungen mit Empfehlungen von Finanzexperten</li>
              <li class="highlight-item delay-5">Verdienen Sie Erfolge, während Sie verschiedene Budgetierungsfähigkeiten meistern</li>
            </ul>
            
            <h4>Wie es hilft:</h4>
            <p>Durch das Üben mit unserem Simulator entwickeln Sie praktische Fähigkeiten, die sich direkt auf die Verwaltung Ihrer tatsächlichen Finanzen übertragen lassen. Sie lernen, Ausgaben zu antizipieren, Notfallfonds aufzubauen und informierte Ausgabenentscheidungen zu treffen – alles wesentliche Fähigkeiten für finanzielle Stabilität und Wachstum.</p>
          `
        },
        'Investment-Spielplatz': {
          content: `
            <p>Der Investment-Spielplatz bietet eine realistische, risikofreie Umgebung zum Erlernen von Anlagestrategien mit echten Marktdaten und simulierten Ergebnissen.</p>
            
            <h4>Hauptfunktionen:</h4>
            <ul>
              <li class="highlight-item delay-1">Bauen Sie diversifizierte Anlageportfolios mit Aktien, Anleihen, ETFs und anderen Vermögenswerten auf</li>
              <li class="highlight-item delay-2">Greifen Sie auf historische Marktdaten zu, um zu beobachten, wie verschiedene Anlagen im Laufe der Zeit abgeschnitten haben</li>
              <li class="highlight-item delay-3">Führen Sie Simulationen durch, um potenzielle langfristige Ergebnisse verschiedener Anlagestrategien zu sehen</li>
              <li class="highlight-item delay-4">Lernen Sie über Risikotoleranz, Asset-Allokation und Portfolio-Rebalancing</li>
              <li class="highlight-item delay-5">Wetteifern Sie mit Freunden oder anderen Benutzern, um zu sehen, welche Anlagestrategie am besten funktioniert</li>
            </ul>
            
            <h4>Wie es hilft:</h4>
            <p>Investitionen können für Anfänger einschüchternd wirken, aber unser Spielplatz entmystifiziert den Prozess. Sie gewinnen Vertrauen in Anlageentscheidungen, indem Sie Konzepte wie Zinseszins, Dividendenwiederanlage und Marktvolatilität verstehen.</p>
          `
        },
        'Finanzspiele': {
          content: `
            <p>Unsere Sammlung von Finanzspielen verwandelt komplexe Finanzkonzepte in ansprechende, interaktive Erlebnisse, die das Lernen angenehm und effektiv gestalten.</p>
            
            <h4>Verfügbare Spiele:</h4>
            <ul>
              <li class="highlight-item delay-1"><strong>Schuldenvernichter</strong> - Wettlauf gegen die Zeit, um Schulden zu beseitigen, während Sie Einkommen und Ausgaben verwalten</li>
              <li class="highlight-item delay-2"><strong>Marktbeherrschung</strong> - Testen Sie Ihr Wissen über Markttrends und Anlageprinzipien</li>
              <li class="highlight-item delay-3"><strong>Budget-Held</strong> - Erstellen Sie das perfekte Budget, um verschiedene Lebensziele zu erreichen</li>
              <li class="highlight-item delay-4"><strong>Kreditwürdigkeit-Quest</strong> - Navigieren Sie durch finanzielle Entscheidungen, um Ihren Kreditscore zu verbessern</li>
              <li class="highlight-item delay-5"><strong>Rentenpfad</strong> - Planen Sie Ihren Weg zu einem komfortablen Ruhestand</li>
            </ul>
            
            <h4>Vorteile des spielbasierten Lernens:</h4>
            <p>Forschungen zeigen, dass Gamification die Beibehaltung von Finanzkonzepten erheblich verbessert. Unsere Spiele schaffen unvergessliche Erlebnisse, die Schlüsselprinzipien durch aktive Teilnahme statt passiven Konsum verstärken.</p>
          `
        }
      },
      pt: {
        'Simulador de Orçamento': {
          content: `
            <p>Nosso Simulador de Orçamento foi projetado para dar a você experiência prática com tomada de decisões financeiras reais em um ambiente livre de riscos.</p>
            
            <h4>Principais características:</h4>
            <ul>
              <li class="highlight-item delay-1">Crie e gerencie orçamentos mensais virtuais baseados em vários níveis de renda e estilos de vida</li>
              <li class="highlight-item delay-2">Enfrente desafios financeiros inesperados e aprenda a ajustar seu orçamento de acordo</li>
              <li class="highlight-item delay-3">Acompanhe seus padrões de gastos e receba insights personalizados</li>
              <li class="highlight-item delay-4">Compare suas decisões orçamentárias com recomendações de especialistas financeiros</li>
              <li class="highlight-item delay-5">Ganhe conquistas à medida que domina diferentes habilidades de orçamento</li>
            </ul>
            
            <h4>Como isso ajuda:</h4>
            <p>Ao praticar com nosso simulador, você desenvolverá habilidades práticas que se traduzem diretamente no gerenciamento de suas finanças reais. Você aprenderá a antecipar despesas, construir fundos de emergência e tomar decisões informadas de gastos — todas habilidades essenciais para estabilidade e crescimento financeiro.</p>
          `
        },
        'Ambiente de Investimento': {
          content: `
            <p>O Ambiente de Investimento oferece um ambiente realista e sem riscos para aprender sobre estratégias de investimento usando dados reais de mercado e resultados simulados.</p>
            
            <h4>Principais características:</h4>
            <ul>
              <li class="highlight-item delay-1">Construa carteiras de investimento diversificadas com ações, títulos, ETFs e outros ativos</li>
              <li class="highlight-item delay-2">Acesse dados históricos do mercado para observar como diferentes investimentos se comportaram ao longo do tempo</li>
              <li class="highlight-item delay-3">Execute simulações para ver potenciais resultados a longo prazo de várias estratégias de investimento</li>
              <li class="highlight-item delay-4">Aprenda sobre tolerância ao risco, alocação de ativos e rebalanceamento de carteira</li>
              <li class="highlight-item delay-5">Compita com amigos ou outros usuários para ver qual estratégia de investimento tem melhor desempenho</li>
            </ul>
            
            <h4>Como isso ajuda:</h4>
            <p>Investir pode parecer intimidador para iniciantes, mas nosso ambiente desmistifica o processo. Você ganhará confiança em tomar decisões de investimento ao entender conceitos como juros compostos, reinvestimento de dividendos e volatilidade do mercado.</p>
          `
        },
        'Jogos Financeiros': {
          content: `
            <p>Nossa coleção de Jogos Financeiros transforma conceitos financeiros complexos em experiências interativas e envolventes que tornam o aprendizado agradável e eficaz.</p>
            
            <h4>Jogos disponíveis:</h4>
            <ul>
              <li class="highlight-item delay-1"><strong>Destruidor de Dívidas</strong> - Corra contra o tempo para eliminar dívidas enquanto gerencia receitas e despesas</li>
              <li class="highlight-item delay-2"><strong>Maestria de Mercado</strong> - Teste seu conhecimento sobre tendências de mercado e princípios de investimento</li>
              <li class="highlight-item delay-3"><strong>Herói do Orçamento</strong> - Construa o orçamento perfeito para atingir vários objetivos de vida</li>
              <li class="highlight-item delay-4"><strong>Missão Score de Crédito</strong> - Navegue por decisões financeiras para melhorar seu score de crédito</li>
              <li class="highlight-item delay-5"><strong>Caminho para a Aposentadoria</strong> - Planeje seu caminho para uma aposentadoria confortável</li>
            </ul>
            
            <h4>Benefícios do aprendizado baseado em jogos:</h4>
            <p>Pesquisas mostram que a gamificação melhora significativamente a retenção de conceitos financeiros. Nossos jogos criam experiências memoráveis que reforçam princípios-chave através da participação ativa em vez do consumo passivo.</p>
          `
        }
      }
    };
    
    // Return the translations for the current language or default to English
    return translations[lang] || translations['en'];
  }
  
  // Expand the feature popup handling for all languages
  function getLocalizedFeatureContent(featureTitle, lang) {
    const translationsMap = updateFeaturePopupTranslations(lang);
    
    // Return content if available in selected language
    if (translationsMap[featureTitle]) {
      return translationsMap[featureTitle].content;
    }
    
    // Default message if content not found
    return '<p>Details for this feature are coming soon!</p>';
  }
  
  // Add click event to each feature link with language support
  featureLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get feature title from the parent card's h3
      const featureTitle = this.closest('.feature-card').querySelector('h3').textContent;
      
      // Set popup title
      featurePopupTitle.textContent = featureTitle;
      
      // Get current language
      const currentLang = document.documentElement.lang || 'en';
      
      // Set popup content based on current language
      featurePopupContent.innerHTML = getLocalizedFeatureContent(featureTitle, currentLang);
      
      // Show popup
      featurePopupOverlay.classList.add('show');
      
      // Prevent scrolling on the body
      document.body.style.overflow = 'hidden';
    });
  });

  // Update the changeLanguage function to handle feature popups
  const originalChangeLanguage = changeLanguage;
  changeLanguage = function(lang, showAlert = false) {
    originalChangeLanguage(lang, showAlert);
    
    // Update feature titles based on new language
    if (lang === 'es') {
      document.querySelectorAll('.feature-card h3').forEach((heading, index) => {
        if (index === 0) heading.textContent = 'Simulador de Presupuesto';
        if (index === 1) heading.textContent = 'Zona de Inversiones';
        if (index === 2) heading.textContent = 'Juegos Financieros';
      });
    } else if (lang === 'fr') {
      document.querySelectorAll('.feature-card h3').forEach((heading, index) => {
        if (index === 0) heading.textContent = 'Simulateur de Budget';
        if (index === 1) heading.textContent = 'Espace d\'Investissement';
        if (index === 2) heading.textContent = 'Jeux Financiers';
      });
    } else if (lang === 'de') {
      document.querySelectorAll('.feature-card h3').forEach((heading, index) => {
        if (index === 0) heading.textContent = 'Budget-Simulator';
        if (index === 1) heading.textContent = 'Investment-Spielplatz';
        if (index === 2) heading.textContent = 'Finanzspiele';
      });
    } else if (lang === 'pt') {
      document.querySelectorAll('.feature-card h3').forEach((heading, index) => {
        if (index === 0) heading.textContent = 'Simulador de Orçamento';
        if (index === 1) heading.textContent = 'Ambiente de Investimento';
        if (index === 2) heading.textContent = 'Jogos Financeiros';
      });
    } else if (lang === 'en') {
      document.querySelectorAll('.feature-card h3').forEach((heading, index) => {
        if (index === 0) heading.textContent = 'Budget Simulator';
        if (index === 1) heading.textContent = 'Investment Playground';
        if (index === 2) heading.textContent = 'Financial Games';
      });
    }
    
    // If a popup is currently open, update its content to the new language
    if (featurePopupOverlay.classList.contains('show')) {
      const currentTitle = featurePopupTitle.textContent;
      featurePopupContent.innerHTML = getLocalizedFeatureContent(currentTitle, lang);
    }
  };
});
