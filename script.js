document.getElementById('year').textContent = new Date().getFullYear();
const targets = document.querySelectorAll('.service-grid article,.project-card,.about-grid,.section-head');
targets.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); io.unobserve(entry.target); } }), {threshold:.12});
targets.forEach(el => io.observe(el));
