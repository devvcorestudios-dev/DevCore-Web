
    (() => {
      if (!window.gsap || !window.ScrollTrigger || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.registerPlugin(ScrollTrigger);

      // Preserve the existing markup while making each heading ready for a readable word reveal.
      document.querySelectorAll('h1, h2').forEach((heading) => {
        if (heading.querySelector('em')) return;
        const words = heading.textContent.trim().split(/\s+/);
        heading.innerHTML = words.map(word => `<span class="reveal-word">${word}&nbsp;</span>`).join('');
      });

      const mm = gsap.matchMedia();

      gsap.from('.hero .eyebrow', { opacity: 0, y: 18, duration: .7, ease: 'power3.out' });
      gsap.from('h1', { opacity: 0, y: 52, duration: 1, delay: .12, ease: 'power4.out' });
      gsap.from('.hero-bottom > *', { opacity: 0, y: 24, duration: .7, stagger: .14, delay: .55, ease: 'power3.out' });
      gsap.from('.stat', { opacity: 0, y: 20, duration: .55, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: '.stats', start: 'top 87%' } });

      document.querySelectorAll('.section-head').forEach((head) => {
        const followingCopy = head.nextElementSibling?.matches('p') ? head.nextElementSibling : null;
        const timeline = gsap.timeline({ scrollTrigger: { trigger: head, start: 'top 78%' } });
        timeline.from(head.querySelector('.eyebrow'), { opacity: 0, x: -18, duration: .5, ease: 'power2.out' })
          .from(head.querySelectorAll('h2 .reveal-word'), { opacity: 0, yPercent: 105, duration: .7, stagger: .045, ease: 'power4.out' }, '-=.22');
        if (followingCopy) timeline.from(followingCopy, { opacity: 0, y: 18, duration: .55, ease: 'power2.out' }, '-=.25');
      });

      gsap.from('.project', { opacity: 0, y: 44, duration: .75, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: '.work-grid', start: 'top 79%' } });
      gsap.from('.cta .eyebrow, .cta h2, .cta .button', { opacity: 0, y: 25, duration: .65, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: '.cta', start: 'top 72%' } });

      mm.add('(min-width: 768px)', () => {
        const services = document.querySelector('.services');
        const rows = gsap.utils.toArray('.service');
        gsap.set(rows, { opacity: .25, x: 48 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: services,
            start: 'top top',
            end: '+=900',
            pin: true,
            scrub: .7,
            anticipatePin: 1
          }
        });
        rows.forEach((row) => timeline.to(row, { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }));
      });
    })();
 
    (() => {
      const menu = document.querySelector('.user-menu');
      const toggle = document.querySelector('.user-toggle');
      const panel = document.querySelector('.user-panel');
      if (!menu || !toggle || !panel) return;

      const closeMenu = () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      };
      toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        if (isOpen) panel.querySelector('[role="menuitem"]').focus();
      });
      document.addEventListener('click', (event) => {
        if (!menu.contains(event.target)) closeMenu();
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          closeMenu();
          toggle.focus();
        }
      });
      panel.querySelector('.logout').addEventListener('click', () => {
        closeMenu();
        window.alert('You have been logged out.');
      });
    })();