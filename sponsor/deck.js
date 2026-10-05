// Sponsor deck: slide navigation, progress indicators and the live sponsor count.
(function () {
  const deck = document.getElementById('deck');
  const slides = Array.from(deck.querySelectorAll('.slide'));
  const progressBar = document.getElementById('deckProgress');
  const counter = document.getElementById('deckCounter');
  const dots = document.getElementById('deckDots');
  const previousButton = document.getElementById('prevBtn');
  const nextButton = document.getElementById('nextBtn');
  const total = slides.length;
  let current = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'deck-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dots.appendChild(dot);
  });

  function updateUI() {
    dots.querySelectorAll('.deck-dot').forEach((dot, i) => dot.classList.toggle('active', i === current));
    progressBar.style.width = ((current + 1) / total * 100) + '%';
    counter.textContent = (current + 1) + ' / ' + total;
    previousButton.disabled = current === 0;
    nextButton.disabled = current === total - 1;
  }

  function goTo(index) {
    current = Math.max(0, Math.min(total - 1, index));
    slides[current].scrollIntoView({ behavior: 'smooth' });
    updateUI();
  }

  previousButton.addEventListener('click', () => goTo(current - 1));
  nextButton.addEventListener('click', () => goTo(current + 1));

  document.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'PageDown', 'ArrowRight', ' '].includes(e.key)) { e.preventDefault(); goTo(current + 1); }
    if (['ArrowUp', 'PageUp', 'ArrowLeft'].includes(e.key)) { e.preventDefault(); goTo(current - 1); }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        current = slides.indexOf(entry.target);
        updateUI();
      }
    });
  }, { threshold: 0.6 });
  slides.forEach((slide) => observer.observe(slide));

  // Keep the sponsor count in sync with the logos actually displayed.
  document.getElementById('sponsorCount').textContent = document.querySelectorAll('.sponsor-card').length;

  updateUI();
})();
