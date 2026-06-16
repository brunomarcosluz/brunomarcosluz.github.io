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
  // 12. BRUNO PHOTO CTA MODAL
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
  // 11. LOADED CLASS — Prevent FOUC
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
    '%cMotion Design System active with Iframe Previews',
    'font-family: JetBrains Mono, monospace; font-size: 11px; color: #8d90a2;'
  );
})();
