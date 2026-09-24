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

  // Team and era selection: restore the compact feature sheet between the
  // scorecard and drama sections. The existing optional screenshot is already
  // part of the governed website asset set.
  const scorecardCard = document.querySelector('#card-scorecard');
  if (scorecardCard && !document.querySelector('#teams')) {
    const teamCard = document.createElement('article');
    teamCard.className = 'story-card story-card-3';
    teamCard.id = 'teams';
    teamCard.innerHTML = `
      <button class="story-trigger" id="trigger-teams" type="button" aria-expanded="false" aria-controls="panel-teams">
        <span class="story-index">03</span>
        <span class="story-trigger-copy">
          <span class="eyebrow">Choose your cricket</span>
          <span class="story-title">Play across teams and eras</span>
        </span>
        <span class="story-hint">Open</span>
      </button>
      <div class="story-panel" id="panel-teams" role="region" aria-labelledby="trigger-teams">
        <div class="story-panel-inner">
          <div class="story-panel-grid">
            <div class="device-frame story-device">
              <img src="assets/images/07_team_selection_OPTIONAL.png" alt="Wcricket team selection screen showing choices of cricket teams and eras" loading="lazy">
            </div>
            <div class="copy-block">
              <p class="eyebrow">Teams &amp; eras</p>
              <h3>Choose your cricket</h3>
              <p>Play with men's or women's teams, choose from Test-playing nations, and select from current or historic player eras.</p>
              <div class="body-lozenge-group" aria-label="Team selection options">
                <span class="highlight-lozenge">Men's &amp; women's teams</span>
                <span class="highlight-lozenge">Test-playing nations</span>
                <span class="highlight-lozenge">Current &amp; historic eras</span>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    scorecardCard.insertAdjacentElement('afterend', teamCard);

    const renumber = (selector, value) => {
      const index = document.querySelector(`${selector} .story-index`);
      if (index) index.textContent = value;
    };
    renumber('#card-drs', '04');
    renumber('#story', '05');
    renumber('#reel', '06');
    renumber('#character', '07');
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
