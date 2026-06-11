window.addEventListener('load', () => {
  const loading = document.getElementById('loading');

  setTimeout(() => {
    if (loading) loading.classList.add('hidden');
    document.body.style.overflow = '';
  }, 2200);
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'hidden';

  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  const hamburger = document.getElementById('hamburger');
  const globalNav = document.getElementById('global-nav');

  if (hamburger && globalNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = globalNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    globalNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        globalNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }

  const animTargets = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  if ('IntersectionObserver' in window) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animTargets.forEach(el => scrollObserver.observe(el));
  } else {
    animTargets.forEach(el => el.classList.add('visible'));
  }

  document.querySelectorAll('.marquee-track').forEach(track => {
    track.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    track.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  });

  const heroSection = document.getElementById('hero');
  const spotlight = document.querySelector('.hero-spotlight');

  if (heroSection && spotlight) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlight.style.transition = 'none';
      spotlight.style.left = x + 'px';
      spotlight.style.top = (y - 400) + 'px';
      spotlight.style.transform = 'translateX(-50%)';
    });

    heroSection.addEventListener('mouseleave', () => {
      spotlight.style.transition = 'all 1s ease';
      spotlight.style.left = '50%';
      spotlight.style.top = '-200px';
      spotlight.style.transform = 'translateX(-50%)';
    });
  }

  document.querySelectorAll('.business-card').forEach(card => {
    const num = card.querySelector('.num');
    if (!num) return;

    card.addEventListener('mouseenter', () => {
      num.style.color = 'var(--gold-light)';
    });

    card.addEventListener('mouseleave', () => {
      num.style.color = 'var(--gold)';
    });
  });

  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (!item) return;

      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  document.querySelectorAll('.area-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.borderColor = 'var(--gold)';
      tag.style.color = 'var(--gold)';
    });

    tag.addEventListener('mouseleave', () => {
      tag.style.borderColor = '';
      tag.style.color = '';
    });
  });

  const applyForm = document.getElementById('apply-form');
  const formFields = document.getElementById('form-fields');
  const formSuccess = document.getElementById('form-success');

  if (applyForm && formFields && formSuccess) {
    applyForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = applyForm.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
      }

      const data = {
        name: document.getElementById('name')?.value || '',
        kana: document.getElementById('kana')?.value || '',
        email: document.getElementById('email')?.value || '',
        tel: document.getElementById('tel')?.value || '',
        location: document.getElementById('location')?.value || '',
        message: document.getElementById('message')?.value || '',
        submitted_at: new Date().toISOString()
      };

      try {
        await fetch('tables/applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } catch (err) {
        console.error('API save error:', err);
      }

      formFields.style.display = 'none';
      formSuccess.style.display = 'block';
      applyForm.reset();
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  if ('IntersectionObserver' in window) {
    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.backgroundSize = '100% 2px';
          titleObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.section-title').forEach(title => {
      title.style.backgroundImage = 'linear-gradient(var(--gold), var(--gold))';
      title.style.backgroundRepeat = 'no-repeat';
      title.style.backgroundPosition = '0 100%';
      title.style.backgroundSize = '0 2px';
      title.style.transition = 'background-size 0.8s ease 0.3s';
      titleObserver.observe(title);
    });
  }
});
