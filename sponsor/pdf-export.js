// Sponsor deck PDF export. Each slide is captured at 16:9 and assembled into a
// PDF so the result matches the screen (dark backgrounds included), which the
// browser's print engine cannot do.
(function () {
  const PDF_WIDTH = 1600;
  const PDF_HEIGHT = 900;

  const labels = {
    fr: {
      preparing: 'Préparation…',
      slide: (i, n) => 'Génération ' + i + ' / ' + n,
      hint: 'Cela prend quelques secondes',
      failure: "La génération du PDF a échoué.\n\nLes librairies sont chargées depuis un CDN externe : "
        + "un pare-feu d'entreprise peut les bloquer.\n\nSolution de repli : Ctrl+P puis « Enregistrer au format PDF ».",
    },
    en: {
      preparing: 'Preparing…',
      slide: (i, n) => 'Rendering ' + i + ' / ' + n,
      hint: 'This takes a few seconds',
      failure: 'PDF generation failed.\n\nThe libraries are loaded from an external CDN: '
        + 'a corporate firewall may be blocking them.\n\nFallback: Ctrl+P then "Save as PDF".',
    },
  };

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.crossOrigin = 'anonymous';
      script.onload = resolve;
      script.onerror = () => reject(new Error('Chargement impossible : ' + src));
      document.head.appendChild(script);
    });
  }

  let librariesReady = false;
  async function ensureLibraries() {
    if (librariesReady) return;
    await Promise.all([
      loadScript('https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/dist/html-to-image.js'),
      loadScript('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js'),
    ]);
    librariesReady = true;
  }

  async function exportPdf() {
    const button = document.getElementById('printBtn');
    const overlay = document.getElementById('pdfOverlay');
    const status = document.getElementById('pdfStatus');
    const hint = document.getElementById('pdfHint');
    const slides = [...document.querySelectorAll('#deck .slide')];
    const text = labels[document.documentElement.lang] || labels.fr;

    button.disabled = true;
    status.textContent = text.preparing;
    hint.textContent = text.hint;
    overlay.classList.add('is-on');

    // Leave out elements that make no sense on a printed page.
    const isPrintable = (node) => !(node.classList && node.classList.contains('scroll-hint'));

    const capture = (slide) => htmlToImage.toJpeg(slide, {
      width: PDF_WIDTH, height: PDF_HEIGHT,
      style: { width: PDF_WIDTH + 'px', height: PDF_HEIGHT + 'px' },
      pixelRatio: 1.5,
      quality: 0.92,
      filter: isPrintable,
    });

    try {
      await ensureLibraries();

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'landscape', unit: 'px',
        format: [PDF_WIDTH, PDF_HEIGHT], compress: true,
      });

      // First capture is thrown away: html-to-image sometimes returns an
      // incomplete image until the fonts and images of the clone are ready.
      await capture(slides[0]);

      for (let i = 0; i < slides.length; i++) {
        status.textContent = text.slide(i + 1, slides.length);
        const image = await capture(slides[i]);
        if (i > 0) pdf.addPage([PDF_WIDTH, PDF_HEIGHT], 'landscape');
        pdf.addImage(image, 'JPEG', 0, 0, PDF_WIDTH, PDF_HEIGHT);
      }

      pdf.save('SAP-Inside-Track-Paris-2026-Sponsors.pdf');
    } catch (err) {
      console.error(err);
      alert(text.failure);
    } finally {
      overlay.classList.remove('is-on');
      button.disabled = false;
    }
  }

  document.getElementById('printBtn').addEventListener('click', exportPdf);
})();
