document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const el=document.querySelector(a.getAttribute('href')); if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'});}
}));


// Fondo parallax ligado al desplazamiento de la página.
(() => {
  let current = window.scrollY;
  let target = window.scrollY;
  let raf = null;

  function render(){
    current += (target - current) * 0.085;
    const root = document.documentElement;
    root.style.setProperty('--scroll-y', current + 'px');
    root.style.setProperty('--scroll-y-soft', (current * 0.055) + 'px');
    root.style.setProperty('--scroll-rotate', (current * 0.0012) + 'deg');

    if (Math.abs(target - current) > 0.15) {
      raf = requestAnimationFrame(render);
    } else {
      current = target;
      root.style.setProperty('--scroll-y', current + 'px');
      root.style.setProperty('--scroll-y-soft', (current * 0.055) + 'px');
      root.style.setProperty('--scroll-rotate', (current * 0.0012) + 'deg');
      raf = null;
    }
  }

  window.addEventListener('scroll', () => {
    target = window.scrollY;
    if (!raf) raf = requestAnimationFrame(render);
  }, {passive:true});

  render();
})();


// ===== DM MOTION+ =====
(() => {
  const revealSelectors = [
    '.section-head',
    '.service-grid article',
    '.self-grid',
    '.project-card',
    '.steps article',
    '.maintenance-card',
    '.about-grid > div',
    '.contact'
  ];

  const revealEls = document.querySelectorAll(revealSelectors.join(','));
  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay', ((i % 4) * 75) + 'ms');
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.12, rootMargin:'0px 0px -6% 0px'});

  revealEls.forEach(el => observer.observe(el));

  // Más movimiento ligado al scroll, con suavizado.
  let targetY = window.scrollY;
  let smoothY = targetY;

  function motionLoop(){
    smoothY += (targetY - smoothY) * .075;
    const root = document.documentElement;
    root.style.setProperty('--scroll-y', smoothY + 'px');
    root.style.setProperty('--scroll-y-soft', (smoothY * .105) + 'px');
    root.style.setProperty('--scroll-rotate', (smoothY * .0021) + 'deg');

    document.querySelectorAll('.parallax-soft').forEach((el, index) => {
      const amount = ((index % 3) + 1) * -0.012 * smoothY;
      el.style.setProperty('--element-parallax', amount + 'px');
    });
    requestAnimationFrame(motionLoop);
  }

  window.addEventListener('scroll', () => {
    targetY = window.scrollY;
  }, {passive:true});

  // Elementos grandes con parallax sutil
  document.querySelectorAll('.real-cover,.autogestion-demo,.maintenance-card').forEach(el => {
    el.classList.add('parallax-soft');
  });

  requestAnimationFrame(motionLoop);
})();
