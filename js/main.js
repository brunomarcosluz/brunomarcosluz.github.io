/* ═══════════════════════════════════════════════════
   MOTION DESIGN SYSTEM — Clinical Brutalist
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─────────────────────────────────────
  // Easing
  // ─────────────────────────────────────
  const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

  // ─────────────────────────────────────
  // 1. NAV — Scroll background
  // ─────────────────────────────────────
  const nav = document.querySelector('nav');
  if (nav) {
    function updateNav() {
      if (window.scrollY > 40) {
        nav.classList.add('bg-surface/90', 'backdrop-blur-xl', 'border-b', 'border-outline-variant/30');
      } else {
        nav.classList.remove('bg-surface/90', 'backdrop-blur-xl', 'border-b', 'border-outline-variant/30');
      }
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  // ─────────────────────────────────────
  // 2. NAV — Mobile hamburger
  // ─────────────────────────────────────
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav-panel');
  const navLinks = mobileNav ? mobileNav.querySelectorAll('[data-nav-link]') : [];

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('translate-x-0');
      if (isOpen) {
        mobileNav.classList.remove('translate-x-0');
        mobileNav.classList.add('translate-x-full');
        hamburger.children[0].style.transform = '';
        hamburger.children[1].style.opacity = '1';
        hamburger.children[2].style.transform = '';
      } else {
        mobileNav.classList.remove('translate-x-full');
        mobileNav.classList.add('translate-x-0');
        hamburger.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        hamburger.children[1].style.opacity = '0';
        hamburger.children[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('translate-x-0');
        mobileNav.classList.add('translate-x-full');
        hamburger.children[0].style.transform = '';
        hamburger.children[1].style.opacity = '1';
        hamburger.children[2].style.transform = '';
      });
    });
  }

  // ─────────────────────────────────────
  // 3. SCROLL REVEAL — IntersectionObserver
  // ─────────────────────────────────────
  const revealTypes = ['.reveal', '.reveal-scale', '.reveal-left', '.reveal-right'];

  revealTypes.forEach((selector) => {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => observer.observe(el));
  });

  // ─────────────────────────────────────
  // 4. COUNTER ANIMATION
  // ─────────────────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    if (isNaN(target)) return;

    const duration = 1500;
    const startTime = performance.now();
    const startVal = 0;

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      const current = Math.round(startVal + (target - startVal) * eased);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          animateCounter(el);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('[data-counter]').forEach((el) => {
    counterObserver.observe(el);
  });

  // ─────────────────────────────────────
  // 5. CURSOR PREVIEW — Project List
  // ─────────────────────────────────────
  const preview = document.getElementById('cursor-preview');
  const previewName = document.getElementById('preview-name');
  const previewUrl = document.getElementById('preview-url');
  const previewImage = document.getElementById('preview-image');
  const projectItems = document.querySelectorAll('.project-item');

  if (preview && projectItems.length > 0) {
    let hideTimeout = null;

    projectItems.forEach((item) => {
      item.addEventListener('mouseenter', (e) => {
        const name = item.dataset.previewName || '';
        const url = item.dataset.previewUrl || '';
        const img = item.dataset.previewImg || '';

        previewName.textContent = name;
        previewUrl.textContent = url;
        if (previewImage) {
          if (img) {
            previewImage.src = img;
            previewImage.style.display = 'block';
          } else {
            previewImage.style.display = 'none';
          }
        }

        clearTimeout(hideTimeout);
        preview.classList.remove('hidden');
        // Force reflow
        preview.offsetHeight;
        preview.classList.add('opacity-100', 'scale-100');
        preview.classList.remove('scale-95');
        updatePreviewPosition(e);
      });

      item.addEventListener('mousemove', (e) => {
        updatePreviewPosition(e);
      });

      item.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
          preview.classList.remove('opacity-100', 'scale-100');
          preview.classList.add('scale-95');
          setTimeout(() => {
            if (!preview.classList.contains('opacity-100')) {
              preview.classList.add('hidden');
            }
          }, 300);
        }, 120);
      });
    });

    function updatePreviewPosition(e) {
      const x = e.clientX + 20;
      const y = e.clientY + 20;
      const pw = preview.offsetWidth;
      const ph = preview.offsetHeight;
      const maxX = window.innerWidth - pw - 20;
      const maxY = window.innerHeight - ph - 20;

      preview.style.left = Math.min(x, maxX) + 'px';
      preview.style.top = Math.min(y, maxY) + 'px';
    }
  }

  // ─────────────────────────────────────
  // 6. SMOOTH SCROLL — Anchor links
  // ─────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    });
  });

  // ─────────────────────────────────────
  // 7. ACTIVE NAV LINK — Highlight on scroll
  // ─────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('nav ul a');

  function updateActiveNav() {
    let current = '';
    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      if (top < 150) {
        current = section.getAttribute('id');
      }
    });

    navAnchors.forEach((a) => {
      const href = a.getAttribute('href');
      if (href === '#' + current) {
        a.classList.add('text-primary');
        a.classList.remove('text-on-surface-variant');
      } else {
        a.classList.remove('text-primary');
        a.classList.add('text-on-surface-variant');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ─────────────────────────────────────
  // 8. REVEAL CHILDREN — Staggered children
  // ─────────────────────────────────────
  function staggerReveal(container, childSelector, baseDelay = 0, stagger = 80) {
    const children = container.querySelectorAll(childSelector);
    if (!children.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child, i) => {
              const delay = baseDelay + i * stagger;
              child.style.transitionDelay = delay + 'ms';
              child.classList.add('visible');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(container);
  }

  // Stagger project list items
  const projectList = document.getElementById('project-list');
  if (projectList) {
    staggerReveal(projectList, '.project-item', 100, 100);
  }

  // Stagger service cards
  const servicesGrid = document.querySelector('.grid-cols-1');
  if (servicesGrid) {
    staggerReveal(servicesGrid, '.sterile-border', 100, 120);
  }

  // ─────────────────────────────────────
  // 9. HORIZONTAL SCROLL — Portfolio (Sticky track translation on Desktop, Swipe on Mobile)
  // ─────────────────────────────────────
  const sectionTrack = document.getElementById('projetos');
  const projectsTrack = document.getElementById('projects-track');
  const scrollBar = document.getElementById('projects-scroll-bar');

  if (sectionTrack && projectsTrack && scrollBar) {
    function handleHorizontalScroll() {
      // Run only on desktop viewports (>= 768px)
      if (window.innerWidth >= 768) {
        const rect = sectionTrack.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate vertical progress (0 to 1) inside the tall section track
        const startScroll = sectionTop;
        const endScroll = sectionTop + sectionHeight - windowHeight;
        
        let progress = (window.scrollY - startScroll) / (sectionHeight - windowHeight);
        progress = Math.max(0, Math.min(1, progress));
        
        // Calculate max horizontal translation of projects-track
        const trackWidth = projectsTrack.scrollWidth;
        const viewWidth = window.innerWidth;
        const containerMargin = 48; // px margin padding
        const maxTranslation = trackWidth - viewWidth + (containerMargin * 2);
        
        if (maxTranslation > 0) {
          const translation = -progress * maxTranslation;
          projectsTrack.style.transform = `translateX(${translation}px)`;
          scrollBar.style.width = `${progress * 100}%`;
        }
      } else {
        // Reset translate transforms on mobile screens
        projectsTrack.style.transform = '';
      }
    }
    
    window.addEventListener('scroll', handleHorizontalScroll, { passive: true });
    window.addEventListener('resize', handleHorizontalScroll, { passive: true });
    // Execute initially
    handleHorizontalScroll();
  }

  // ─────────────────────────────────────
  // 10. LIVE PREVIEW MODAL — Iframe testing
  // ─────────────────────────────────────
  const previewModal = document.getElementById('preview-modal');
  const modalIframe = document.getElementById('modal-iframe');
  const iframeWrapper = document.getElementById('iframe-wrapper');
  const modalLoader = document.getElementById('modal-loader');
  const modalFallback = document.getElementById('modal-fallback');
  const fallbackTitle = document.getElementById('fallback-title');
  const fallbackDesc = document.getElementById('fallback-desc');
  const modalProjectTitle = document.getElementById('modal-project-title');
  const modalProjectUrl = document.getElementById('modal-project-url');
  const modalBtnExternal = document.getElementById('modal-btn-external');
  const modalFallbackBtn = document.getElementById('modal-fallback-btn');
  const modalBtnClose = document.getElementById('modal-btn-close');
  const modalDeviceToggles = document.getElementById('modal-device-toggles');
  
  const btnDeviceDesktop = document.getElementById('btn-device-desktop');
  const btnDeviceTablet = document.getElementById('btn-device-tablet');
  const btnDeviceMobile = document.getElementById('btn-device-mobile');

  function openPreview(name, url, isExternal) {
    if (!previewModal) return;

    modalProjectTitle.textContent = name;
    modalProjectUrl.textContent = url === 'internal' ? 'SISTEMA INTERNO' : url;
    
    // Set up close and external buttons
    if (url === 'internal') {
      modalBtnExternal.classList.add('hidden');
      modalFallbackBtn.classList.add('hidden');
    } else {
      modalBtnExternal.classList.remove('hidden');
      modalBtnExternal.href = url;
      modalFallbackBtn.classList.remove('hidden');
      modalFallbackBtn.href = url;
    }

    // Reset iframe and wrapper size
    iframeWrapper.style.width = '100%';
    iframeWrapper.style.maxWidth = '100%';
    resetDeviceButtons();
    if (btnDeviceDesktop) {
      btnDeviceDesktop.classList.add('bg-primary-container', 'text-white');
      btnDeviceDesktop.classList.remove('text-on-surface-variant');
    }

    // Show modal
    previewModal.classList.remove('hidden');
    previewModal.classList.add('flex');
    // Force reflow
    previewModal.offsetHeight;
    previewModal.classList.remove('opacity-0');
    previewModal.classList.add('opacity-100');
    
    const modalBox = previewModal.querySelector('.relative');
    modalBox.classList.remove('scale-95');
    modalBox.classList.add('scale-100');
    
    document.body.style.overflow = 'hidden';

    // Load content
    if (url === 'internal') {
      // Internal system: show custom fallback
      modalIframe.classList.add('hidden');
      modalDeviceToggles.classList.add('hidden');
      modalLoader.classList.add('hidden');
      modalFallback.classList.remove('hidden');
      fallbackTitle.textContent = 'Sistema Interno Seguro';
      fallbackDesc.textContent = 'Este projeto é uma ferramenta de gestão interna desenvolvida para o Hospital PUC-Campinas. Por razões de conformidade regulatória (LGPD) e segurança cibernética hospitalar, o sistema é executado exclusivamente em intranet privada e não está aberto a acessos externos.';
    } else {
      // Normal website preview
      modalIframe.classList.remove('hidden');
      modalDeviceToggles.classList.remove('hidden');
      modalFallback.classList.add('hidden');
      modalLoader.classList.remove('hidden');
      modalLoader.classList.add('opacity-100');

      // Set source
      modalIframe.src = url;

      // Handle iframe load
      let loadTimeout = setTimeout(() => {
        if (isExternal) {
          modalFallback.classList.remove('hidden');
          fallbackTitle.textContent = 'Visualização Externa';
          fallbackDesc.textContent = 'Navegadores modernos podem bloquear a exibição de sites externos em frames por segurança (política X-Frame-Options). Caso o preview não carregue na área de teste, você pode acessá-lo clicando no botão abaixo.';
        }
      }, 4000);

      modalIframe.onload = () => {
        clearTimeout(loadTimeout);
        modalLoader.classList.remove('opacity-100');
        setTimeout(() => {
          modalLoader.classList.add('hidden');
        }, 300);
      };
    }
  }

  function closePreview() {
    if (!previewModal) return;
    previewModal.classList.remove('opacity-100');
    previewModal.classList.add('opacity-0');
    
    const modalBox = previewModal.querySelector('.relative');
    modalBox.classList.remove('scale-100');
    modalBox.classList.add('scale-95');
    
    setTimeout(() => {
      previewModal.classList.add('hidden');
      previewModal.classList.remove('flex');
      modalIframe.src = '';
      document.body.style.overflow = '';
    }, 300);
  }

  if (modalBtnClose) {
    modalBtnClose.addEventListener('click', closePreview);
  }

  if (previewModal) {
    previewModal.addEventListener('click', (e) => {
      if (e.target === previewModal) closePreview();
    });
  }

  // Device Responsive Toggles
  function resetDeviceButtons() {
    [btnDeviceDesktop, btnDeviceTablet, btnDeviceMobile].forEach(btn => {
      if (btn) {
        btn.classList.remove('bg-primary-container', 'text-white');
        btn.classList.add('text-on-surface-variant');
      }
    });
  }

  if (btnDeviceDesktop) {
    btnDeviceDesktop.addEventListener('click', () => {
      iframeWrapper.style.width = '100%';
      iframeWrapper.style.maxWidth = '100%';
      resetDeviceButtons();
      btnDeviceDesktop.classList.add('bg-primary-container', 'text-white');
      btnDeviceDesktop.classList.remove('text-on-surface-variant');
    });
  }
  if (btnDeviceTablet) {
    btnDeviceTablet.addEventListener('click', () => {
      iframeWrapper.style.width = '768px';
      iframeWrapper.style.maxWidth = '90%';
      resetDeviceButtons();
      btnDeviceTablet.classList.add('bg-primary-container', 'text-white');
      btnDeviceTablet.classList.remove('text-on-surface-variant');
    });
  }
  if (btnDeviceMobile) {
    btnDeviceMobile.addEventListener('click', () => {
      iframeWrapper.style.width = '375px';
      iframeWrapper.style.maxWidth = '90%';
      resetDeviceButtons();
      btnDeviceMobile.classList.add('bg-primary-container', 'text-white');
      btnDeviceMobile.classList.remove('text-on-surface-variant');
    });
  }

  // Bind Open Trigger to List and Cinema Cards
  const projectListItems = document.querySelectorAll('.project-item');
  projectListItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const name = item.dataset.projectName || '';
      const url = item.dataset.projectUrl || '';
      const isExternal = item.dataset.external === 'true';
      openPreview(name, url, isExternal);
    });
  });

  const cinemaCards = document.querySelectorAll('.cinema-card');
  cinemaCards.forEach((card) => {
    card.addEventListener('click', () => {
      const name = card.dataset.projectName || '';
      const url = card.dataset.projectUrl || '';
      const isExternal = card.dataset.external === 'true';
      openPreview(name, url, isExternal);
    });
  });

  // ─────────────────────────────────────
  // 11. BRUNO PHOTO CTA MODAL
  // ─────────────────────────────────────
  const brunoTrigger = document.getElementById('bruno-photo-trigger');
  const brunoModal = document.getElementById('bruno-cta-modal');
  const brunoClose = document.getElementById('bruno-cta-close');
  const brunoOrcamento = document.getElementById('bruno-cta-orcamento');

  function openBrunoModal() {
    if (!brunoModal) return;
    brunoModal.classList.remove('hidden');
    brunoModal.classList.add('flex');
    brunoModal.offsetHeight;
    brunoModal.classList.remove('opacity-0');
    brunoModal.classList.add('opacity-100');
    const box = brunoModal.querySelector('.relative');
    if (box) {
      box.classList.remove('scale-95');
      box.classList.add('scale-100');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeBrunoModal() {
    if (!brunoModal) return;
    brunoModal.classList.remove('opacity-100');
    brunoModal.classList.add('opacity-0');
    const box = brunoModal.querySelector('.relative');
    if (box) {
      box.classList.remove('scale-100');
      box.classList.add('scale-95');
    }
    setTimeout(() => {
      brunoModal.classList.add('hidden');
      brunoModal.classList.remove('flex');
      document.body.style.overflow = '';
    }, 300);
  }

  if (brunoTrigger) {
    brunoTrigger.addEventListener('click', openBrunoModal);
  }
  if (brunoClose) {
    brunoClose.addEventListener('click', closeBrunoModal);
  }
  if (brunoModal) {
    brunoModal.addEventListener('click', (e) => {
      if (e.target === brunoModal) closeBrunoModal();
    });
  }
  if (brunoOrcamento) {
    brunoOrcamento.addEventListener('click', () => {
      closeBrunoModal();
      setTimeout(() => {
        const contato = document.querySelector('#contato');
        if (contato) {
          const offset = 80;
          const top = contato.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 350);
    });
  }

  // ─────────────────────────────────────
  // 12. INTERNATIONALIZATION — PT-BR / EN-US
  // ─────────────────────────────────────
  const i18n = {
    // Meta
    'meta.title': {
      pt: 'Bruno Luz — Desenvolvimento de Alta Criticidade',
      en: 'Bruno Luz — Mission-Critical Development'
    },
    'meta.desc': {
      pt: 'Desenvolvedor web em Campinas. Crio sites e sistemas para clínicas, consultórios e pequenos negócios. Entrega em 1–3 semanas.',
      en: 'Web developer in Campinas, Brazil. I build high-impact sites and systems for clinics, practices, and small businesses. Delivery in 1–3 weeks.'
    },
    'og.title': {
      pt: 'Bruno Luz — Desenvolvimento Web',
      en: 'Bruno Luz — Web Development'
    },
    'og.desc': {
      pt: 'Sites e sistemas sob medida para clínicas, consultórios e pequenos negócios. Entrega rápida, código limpo.',
      en: 'Custom sites and systems for clinics, practices, and small businesses. Fast delivery, clean code.'
    },

    // Nav
    'nav.projetos': { pt: 'PROJETOS', en: 'PROJECTS' },
    'nav.servicos': { pt: 'SERVIÇOS', en: 'SERVICES' },
    'nav.sobre': { pt: 'SOBRE', en: 'ABOUT' },
    'nav.contato': { pt: 'CONTATO', en: 'CONTACT' },
    'nav.orcamento': { pt: 'ORÇAMENTO', en: 'QUOTE' },
    'nav.hamburger': { pt: 'Abrir Menu', en: 'Open Menu' },

    // Hero
    'hero.title1': { pt: 'Sistemas Críticos.', en: 'Mission-Critical' },
    'hero.title2': { pt: 'Design de', en: 'Systems.' },
    'hero.title3': { pt: 'Autoridade.', en: 'Authority.' },
    'hero.subtitle': {
      pt: 'Transformo complexidade técnica em presença digital de alto impacto para ambientes que não permitem erro.',
      en: 'I turn technical complexity into high-impact digital presence for environments where failure is not an option.'
    },
    'hero.btn.projeto': { pt: 'Iniciar Projeto', en: 'Start Project' },
    'hero.btn.cases': { pt: 'Ver Cases', en: 'View Cases' },
    'hero.label.experiencia': { pt: 'EXPERIÊNCIA', en: 'EXPERIENCE' },
    'hero.label.velocidade': { pt: 'VELOCIDADE', en: 'SPEED' },
    'hero.label.especialidade': { pt: 'ESPECIALIDADE', en: 'SPECIALTY' },
    'hero.stat.anos': { pt: '+ Anos', en: '+ Years' },
    'hero.stat.semanas': { pt: '1-3 Semanas', en: '1-3 Weeks' },
    'hero.stat.empresas': { pt: 'Hospitais, Clínicas e Pequenas empresas', en: 'Hospitals, Clinics & Small Business' },

    // Authority
    'authority.title': {
      pt: 'Desenvolvimento robusto para infraestrutura hospitalar.',
      en: 'Robust development for hospital infrastructure.'
    },
    'authority.desc': {
      pt: 'Atuando no desenvolvimento de sistemas críticos prontos para produção no Hospital PUC-Campinas, onde estabilidade e performance são literais questões de vida ou morte.',
      en: 'Developing production-ready critical systems at Hospital PUC-Campinas, where stability and performance are literal life-or-death matters.'
    },

    // Services section
    'services.label': { pt: '// SERVIÇOS', en: '// SERVICES' },
    'services.title': { pt: 'Engenharia Digital Sob Medida.', en: 'Custom Digital Engineering.' },
    'services.subtitle': { pt: 'Desenvolvimento 0 a 1. Sem templates. Orçamentos fixos.', en: '0 to 1 development. No templates. Fixed pricing.' },

    // Services card 1 - Landing Pages
    'services.card1.title': { pt: 'Landing Pages', en: 'Landing Pages' },
    'services.card1.desc': {
      pt: 'Páginas de alta performance desenhadas especificamente para maximizar conversões, com carregamento otimizado e arquitetura persuasiva.',
      en: 'High-performance pages designed specifically to maximize conversions, with optimized loading and persuasive architecture.'
    },
    'services.card1.list1': { pt: 'Design responsivo (mobile e desktop)', en: 'Responsive design (mobile & desktop)' },
    'services.card1.list2': { pt: 'Integração de WhatsApp / Contato', en: 'WhatsApp / Contact integration' },
    'services.card1.list3': { pt: 'Google Maps integrado', en: 'Google Maps integration' },
    'services.card1.list4': { pt: 'SEO básico configurado', en: 'Basic SEO setup' },
    'services.card1.tag': { pt: 'Design + Code', en: 'Design + Code' },
    'services.card1.price': { pt: 'R$ 800+', en: 'USD 160+' },

    // Services card 2 - Institutional Sites
    'services.card2.badge': { pt: 'Mais Pedido', en: 'Most Requested' },
    'services.card2.title': { pt: 'Sites Institucionais', en: 'Institutional Websites' },
    'services.card2.desc': {
      pt: 'Presença digital autoritária para empresas que exigem sofisticação visual aliada a uma fundação técnica inquebrável.',
      en: 'Authoritative digital presence for businesses that demand visual sophistication paired with an unbreakable technical foundation.'
    },
    'services.card2.list1': { pt: 'Até 5 páginas completas', en: 'Up to 5 full pages' },
    'services.card2.list2': { pt: 'Painel gerenciador de conteúdo', en: 'Content management panel' },
    'services.card2.list3': { pt: 'Integração com agendamento online', en: 'Online scheduling integration' },
    'services.card2.list4': { pt: 'SSL, performance e segurança', en: 'SSL, performance & security' },
    'services.card2.tag': { pt: 'Full-stack Editorial', en: 'Full-stack Editorial' },
    'services.card2.price': { pt: 'R$ 1.500+', en: 'USD 300+' },

    // Services card 3 - Web Systems
    'services.card3.title': { pt: 'Sistemas Web', en: 'Web Systems' },
    'services.card3.desc': {
      pt: 'Aplicações complexas, painéis de gestão e integração de APIs desenvolvidos com o rigor exigido por ambientes críticos.',
      en: 'Complex applications, management dashboards and API integrations built with the rigor demanded by critical environments.'
    },
    'services.card3.list1': { pt: 'Autenticação e controle de acesso', en: 'Authentication & access control' },
    'services.card3.list2': { pt: 'Banco de dados MySQL / Oracle', en: 'MySQL / Oracle databases' },
    'services.card3.list3': { pt: 'Automações integradas com n8n', en: 'n8n integrated automations' },
    'services.card3.list4': { pt: 'Hospedagem segura em servidor Linux', en: 'Secure Linux server hosting' },
    'services.card3.tag': { pt: 'Engenharia Robusta', en: 'Robust Engineering' },
    'services.card3.price': { pt: 'R$ 2.000+', en: 'USD 400+' },

    // Projects / Cases
    'projects.label': { pt: '// CASES', en: '// CASES' },
    'projects.title': { pt: 'Trabalho Recente.', en: 'Recent Work.' },
    'projects.subtitle': {
      pt: 'Clique em um case para abrir o simulador de visualização responsiva diretamente no site.',
      en: 'Click a case to open the responsive preview simulator directly on the site.'
    },
    'projects.project1.name': { pt: 'Letícia Borges — Portfolio', en: 'Letícia Borges — Portfolio' },
    'projects.project1.desc': {
      pt: 'Identidade visual e presença digital focada em alto impacto estético e performance de carregamento para jornalista.',
      en: 'Visual identity and digital presence focused on high aesthetic impact and loading performance for a journalist.'
    },
    'projects.project2.name': { pt: 'Hospital PUC-Campinas', en: 'Hospital PUC-Campinas' },
    'projects.project2.desc': {
      pt: 'Arquitetura de dados resiliente e painéis administrativos para infraestrutura hospitalar de missão crítica.',
      en: 'Resilient data architecture and administrative panels for mission-critical hospital infrastructure.'
    },
    'projects.project3.name': { pt: 'Atitude Som e Luz', en: 'Atitude Som e Luz' },
    'projects.project3.desc': {
      pt: 'Site institucional completo com identidade visual própria e presença digital profissional para sonorização e iluminação de eventos.',
      en: 'Complete institutional website with custom visual identity and professional digital presence for event sound and lighting.'
    },
    'projects.project4.name': { pt: 'Ny Julia Braids', en: 'Ny Julia Braids' },
    'projects.project4.desc': {
      pt: 'Site institucional para estúdio especializado em tranças de cabelo. Foco em experiência mobile, WhatsApp e portfólio visual.',
      en: 'Institutional website for a hair braiding studio. Focus on mobile experience, WhatsApp and visual portfolio.'
    },
    'projects.project5.name': { pt: 'Tô de Trança', en: 'Tô de Trança' },
    'projects.project5.desc': {
      pt: 'Aplicação web moderna para gestão simplificada. Interface limpa, performance otimizada e experiência de usuário fluida.',
      en: 'Modern web application for streamlined management. Clean interface, optimized performance, fluid UX.'
    },

    // Project List
    'list.label': { pt: '// PROJETOS WEB', en: '// WEB PROJECTS' },
    'list.item1.tag': { pt: 'Portfólio', en: 'Portfolio' },
    'list.item1.cta': { pt: 'Portfólio Jornalista →', en: 'Journalist Portfolio →' },
    'list.item2.tag': { pt: 'Site', en: 'Website' },
    'list.item2.cta': { pt: 'atitudesomeluz.com.br →', en: 'atitudesomeluz.com.br →' },
    'list.item3.tag': { pt: 'Site', en: 'Website' },
    'list.item3.cta': { pt: 'nyjuliabraids.com.br →', en: 'nyjuliabraids.com.br →' },
    'list.item4.tag': { pt: 'App Web', en: 'Web App' },
    'list.item4.cta': { pt: 'todetranca.app.br →', en: 'todetranca.app.br →' },

    // Process
    'process.label': { pt: '// PROCESSO', en: '// PROCESS' },
    'process.title': { pt: 'Engenharia Rigorosa.', en: 'Rigorous Engineering.' },
    'process.step1.title': { pt: 'Briefing & Descoberta', en: 'Briefing & Discovery' },
    'process.step1.desc': {
      pt: 'Análise profunda dos requisitos de negócio e restrições técnicas para mapear o escopo exato da solução.',
      en: 'In-depth analysis of business requirements and technical constraints to map the exact solution scope.'
    },
    'process.step2.title': { pt: 'Design & Proposta', en: 'Design & Proposal' },
    'process.step2.desc': {
      pt: 'Estruturação visual brutalista, aprovação de wireframes e definição rigorosa de prazos e valores.',
      en: 'Brutalist visual structuring, wireframe approval, and rigorous definition of deadlines and pricing.'
    },
    'process.step3.title': { pt: 'Desenvolvimento', en: 'Development' },
    'process.step3.desc': {
      pt: 'Codificação limpa, otimizada para performance, com testes contínuos em ambiente de homologação.',
      en: 'Clean, performance-optimized coding with continuous testing in a staging environment.'
    },
    'process.step4.title': { pt: 'Entrega & Suporte', en: 'Delivery & Support' },
    'process.step4.desc': {
      pt: 'Deploy seguro, transferência de documentação técnica e garantia de estabilidade pós-lançamento.',
      en: 'Secure deployment, technical documentation handoff, and post-launch stability guarantee.'
    },

    // About
    'about.title': { pt: 'Sobre o Bruno', en: 'About Bruno' },
    'about.text': {
      pt: 'Enquanto muitos desenvolvedores focam apenas em código, eu foco em resolver problemas reais. Minha rotina como analista no Hospital PUC-Campinas me ensinou a criar ferramentas que funcionam sob pressão e que qualquer pessoa consegue usar.\n\nComo pastor de jovens, entendo que por trás de cada clínica existe um sonho e uma família. Por isso, trato cada projeto com o rigor técnico de um hospital e a dedicação de quem se importa de verdade com o sucesso do próximo. Minha meta é diminuir seu esforço e aumentar sua segurança, entregando tecnologia que você pode confiar de olhos fechados.',
      en: 'While many developers focus only on code, I focus on solving real problems. My routine as an analyst at Hospital PUC-Campinas taught me to build tools that work under pressure and that anyone can use.\n\nAs a youth pastor, I understand that behind every clinic there is a dream and a family. That\'s why I treat each project with the technical rigor of a hospital and the dedication of someone who truly cares about others\' success. My goal is to reduce your effort and increase your security, delivering technology you can trust with your eyes closed.'
    },

    // Contact
    'contact.title1': { pt: 'Iniciar', en: 'Start' },
    'contact.title2': { pt: 'Sistema.', en: 'System.' },
    'contact.subtitle': {
      pt: 'Propostas personalizadas e arquitetura de projeto enviadas em até 24h.',
      en: 'Custom proposals and project architecture delivered within 24 hours.'
    },
    'contact.whatsapp': { pt: 'WhatsApp Direto', en: 'Direct WhatsApp' },
    'form.name': { pt: 'NOME OU EMPRESA', en: 'NAME OR COMPANY' },
    'form.email': { pt: 'EMAIL DE CONTATO', en: 'CONTACT EMAIL' },
    'form.scope': { pt: 'ESCOPO DO PROJETO', en: 'PROJECT SCOPE' },
    'form.placeholder.details': { pt: 'DETALHES DA DEMANDA (OPCIONAL)', en: 'PROJECT DETAILS (OPTIONAL)' },
    'form.btn': { pt: 'SOLICITAR ANÁLISE', en: 'REQUEST ANALYSIS' },
    'form.option.landing': { pt: 'Landing Page', en: 'Landing Page' },
    'form.option.institutional': { pt: 'Site Institucional', en: 'Institutional Website' },
    'form.option.system': { pt: 'Sistema Web Customizado', en: 'Custom Web System' },

    // Footer
    'footer.copyright': { pt: '© 2026 BRUNO LUZ. DESENVOLVIMENTO DE ALTA CRITICIDADE.', en: '© 2026 BRUNO LUZ. MISSION-CRITICAL DEVELOPMENT.' },
    'footer.linkedin': { pt: 'LINKEDIN', en: 'LINKEDIN' },
    'footer.github': { pt: 'GITHUB', en: 'GITHUB' },
    'footer.whatsapp': { pt: 'WHATSAPP', en: 'WHATSAPP' },
    'footer.email': { pt: 'EMAIL', en: 'EMAIL' },

    // Preview Modal
    'modal.preview.loading': { pt: 'Carregando Preview...', en: 'Loading Preview...' },
    'modal.btn.external': { pt: 'Abrir Site', en: 'Open Site' },
    'modal.btn.close': { pt: 'Fechar', en: 'Close' },
    'modal.btn.desktop': { pt: 'Desktop', en: 'Desktop' },
    'modal.btn.tablet': { pt: 'Tablet', en: 'Tablet' },
    'modal.btn.mobile': { pt: 'Mobile', en: 'Mobile' },

    // Fallback
    'modal.fallback.title': { pt: 'Preview Seguro', en: 'Secure Preview' },
    'modal.fallback.desc': {
      pt: 'Para garantir sua segurança e compatibilidade, este site pode precisar ser aberto diretamente em uma nova aba.',
      en: 'To ensure your security and compatibility, this site may need to be opened directly in a new tab.'
    },
    'modal.fallback.btn': { pt: 'Abrir Site em Nova Aba', en: 'Open Site in New Tab' },

    // CTA Modal (Bruno photo)
    'modal.cta.close': { pt: 'Fechar', en: 'Close' },
    'modal.cta.title': { pt: 'Falar com o Bruno', en: 'Talk to Bruno' },
    'modal.cta.desc': {
      pt: 'Vou entender seu projeto, alinhar expectativas e preparar uma proposta personalizada para você.',
      en: 'I\'ll understand your project, align expectations and prepare a custom proposal for you.'
    },
    'modal.cta.whatsapp': { pt: 'Falar no WhatsApp', en: 'Chat on WhatsApp' },
    'modal.cta.orcamento': { pt: 'Pedir Orçamento', en: 'Request Quote' },

    // Todetranca secure preview
    'todetranca.security': {
      pt: 'Por questões de segurança o preview não funciona para esse site, acesse-o aqui:',
      en: 'For security reasons, the preview does not work for this site. Access it here:'
    },
    'todetranca.btn': { pt: 'Acessar App', en: 'Access App' },

    // PUC Dashboard labels
    'puc.title': { pt: 'Ecosistema PUC-HOSPITAL', en: 'PUC-HOSPITAL Ecosystem' },
    'puc.syssec': { pt: 'SYS_SEC: ACTIVE', en: 'SYS_SEC: ACTIVE' },
  };

  function setLang(lang) {
    // Translate text content (skip elements that contain child elements like icons)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (i18n[key] && i18n[key][lang]) {
        // Only replace text if element has no child elements (pure text node)
        // or if it only contains text + <br> (safe to replace)
        const hasComplexChildren = Array.from(el.children).some(c => c.tagName !== 'BR');
        if (!hasComplexChildren) {
          el.textContent = i18n[key][lang];
        }
      }
    });

    // Translate aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.dataset.i18nAria;
      if (i18n[key] && i18n[key][lang]) {
        el.setAttribute('aria-label', i18n[key][lang]);
      }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (i18n[key] && i18n[key][lang]) {
        el.placeholder = i18n[key][lang];
      }
    });

    // Translate select options
    document.querySelectorAll('[data-i18n-value]').forEach(el => {
      const key = el.dataset.i18nValue;
      if (i18n[key] && i18n[key][lang]) {
        el.value = i18n[key][lang];
        el.textContent = i18n[key][lang];
      }
    });

    // Update html lang attribute
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    // Update flag button active states
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('opacity-100', btn.dataset.lang === lang);
      btn.classList.toggle('opacity-50', btn.dataset.lang !== lang);
    });

    // Update meta tags
    const metaTitle = document.querySelector('title');
    if (metaTitle && i18n['meta.title'] && i18n['meta.title'][lang]) {
      metaTitle.textContent = i18n['meta.title'][lang];
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && i18n['meta.desc'] && i18n['meta.desc'][lang]) {
      metaDesc.setAttribute('content', i18n['meta.desc'][lang]);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && i18n['og.title'] && i18n['og.title'][lang]) {
      ogTitle.setAttribute('content', i18n['og.title'][lang]);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && i18n['og.desc'] && i18n['og.desc'][lang]) {
      ogDesc.setAttribute('content', i18n['og.desc'][lang]);
    }

    localStorage.setItem('lang', lang);
  }

  // Load saved language preference
  const savedLang = localStorage.getItem('lang') || 'pt';
  setLang(savedLang);

  // Bind flag buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  // ─────────────────────────────────────
  // 13. CUSTOM CURSOR — Parallax + Click
  // ─────────────────────────────────────
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursorDot && cursorRing) {
    // Center cursor initially so it's visible before first mousemove
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    let targetX = cx, targetY = cy;
    let dotX = cx, dotY = cy;
    let ringX = cx, ringY = cy;

    cursorDot.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
    cursorRing.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;

    document.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    document.addEventListener('mousedown', () => {
      cursorRing.classList.add('clicked');
      cursorDot.classList.add('hidden');
    });

    document.addEventListener('mouseup', () => {
      cursorRing.classList.remove('clicked');
      cursorDot.classList.remove('hidden');
    });

    function animateCursor() {
      dotX += (targetX - dotX) * 1;
      dotY += (targetY - dotY) * 1;
      ringX += (targetX - ringX) * 0.08;
      ringY += (targetY - ringY) * 0.08;

      cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }

  // ─────────────────────────────────────
  // 14. LOADED CLASS — Prevent FOUC
  // ─────────────────────────────────────
  document.documentElement.style.opacity = '0';
  window.addEventListener('load', () => {
    document.documentElement.style.opacity = '1';
    document.documentElement.style.transition = 'opacity 0.3s ease';
  });

  // Fallback: show after 2s regardless
  setTimeout(() => {
    document.documentElement.style.opacity = '1';
    document.documentElement.style.transition = 'opacity 0.3s ease';
  }, 2000);

  console.log(
    '%c⚡ Clinical Brutalist · Bruno Luz',
    'font-family: JetBrains Mono, monospace; font-size: 14px; font-weight: 600; color: #0057FF;'
  );
  console.log(
    '%cMotion Design System — Cursor Parallax active',
    'font-family: JetBrains Mono, monospace; font-size: 11px; color: #8d90a2;'
  );
})();
