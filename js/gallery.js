// Photo gallery lightbox: opens a thumbnail full size and browses the others.
(function () {
  const labels = {
    fr: { close: 'Fermer', prev: 'Photo précédente', next: 'Photo suivante' },
    en: { close: 'Close', prev: 'Previous photo', next: 'Next photo' },
  };
  const dialog = document.getElementById('lightbox');
  const thumbnails = [...document.querySelectorAll('.photo-thumb')];
  if (!dialog || !thumbnails.length) return;

  const image = dialog.querySelector('img');
  const counter = dialog.querySelector('.lightbox-count');
  const control = (name) => dialog.querySelector('[data-lb="' + name + '"]');
  let index = 0;

  function show(i) {
    index = (i + thumbnails.length) % thumbnails.length;
    const thumbnail = thumbnails[index];
    image.src = thumbnail.dataset.full;
    image.alt = thumbnail.querySelector('img').alt;
    counter.textContent = (index + 1) + ' / ' + thumbnails.length;
    const text = labels[document.documentElement.lang] || labels.fr;
    control('close').setAttribute('aria-label', text.close);
    control('prev').setAttribute('aria-label', text.prev);
    control('next').setAttribute('aria-label', text.next);
  }

  thumbnails.forEach((thumbnail, i) => thumbnail.addEventListener('click', () => {
    show(i);
    dialog.showModal();
  }));
  control('close').addEventListener('click', () => dialog.close());
  control('prev').addEventListener('click', () => show(index - 1));
  control('next').addEventListener('click', () => show(index + 1));
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
})();
