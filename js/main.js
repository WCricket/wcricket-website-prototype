(() => {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  const header = document.querySelector('[data-header]');
  if (header && !header.classList.contains('solid')) {
    const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  const teaserVideo = document.querySelector('.teaser-video');
  const resetTeaser = () => {
    if (!teaserVideo) return;
    teaserVideo.pause();

    // Reloading the media element reliably restores its poster/first-frame
    // presentation on iOS Safari. A currentTime = 0 seek alone can remain
    // visually stuck on the last rendered frame while the page is hidden.
    try {
      teaserVideo.currentTime = 0;
    } catch (_) {
      // Ignore browsers that momentarily reject seeking before metadata is ready.
    }
    teaserVideo.load();
  };

  if (teaserVideo) {
    window.addEventListener('blur', resetTeaser);
    window.addEventListener('pagehide', resetTeaser);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) resetTeaser();
    });
  }

  const stack = document.querySelector('[data-story-stack]');
  if (stack) {
    const cards = [...stack.querySelectorAll('.story-card')];
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    const openCard = (targetCard) => {
      if (targetCard.id !== 'reel') resetTeaser();

      cards.forEach(card => {
        const open = card === targetCard;
        card.classList.toggle('is-open', open);
        const trigger = card.querySelector('.story-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', String(open));
      });

      // Accordion panels change the document height while one panel closes
      // and the next opens. Wait for that movement to finish, then align the
      // active sheet immediately beneath the fixed navigation bar.
      window.setTimeout(() => {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    };

    let hoverTimer = null;

    const cancelHoverOpen = () => {
      if (hoverTimer) {
        window.clearTimeout(hoverTimer);
        hoverTimer = null;
      }
    };

    cards.forEach(card => {
      const trigger = card.querySelector('.story-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        cancelHoverOpen();
        openCard(card);
      });
      trigger.addEventListener('focus', () => {
        cancelHoverOpen();
        openCard(card);
      });

      trigger.addEventListener('mouseenter', () => {
        if (!finePointer.matches || card.classList.contains('is-open')) return;
        cancelHoverOpen();
        hoverTimer = window.setTimeout(() => openCard(card), 650);
      });

      trigger.addEventListener('mouseleave', cancelHoverOpen);
    });

    if (!cards.some(card => card.classList.contains('is-open')) && cards[0]) {
      openCard(cards[0]);
    }
  }
})();
