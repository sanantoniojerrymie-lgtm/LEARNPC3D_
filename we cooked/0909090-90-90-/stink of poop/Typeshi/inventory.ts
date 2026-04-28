// inventory.ts - TypeScript version of inventory.js
// esc na lang may error 
interface FAQQuestion extends HTMLElement {
  dataset: DOMStringMap;
  nextElementSibling: HTMLElement | null;
}

interface CarouselElement extends HTMLElement {
  dataset: DOMStringMap;
  querySelectorAll(selector: string): NodeListOf<Element>;
  querySelector(selector: string): Element | null;
}

document.addEventListener('DOMContentLoaded', () => {
  const faqContainer = document.querySelector('.faq-container') as HTMLElement | null;
  if (!faqContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('query') || '';
  const iframeMode = urlParams.get('iframe') === 'true';

  const faqQuestions = document.querySelectorAll('.faq-question') as NodeListOf<FAQQuestion>;
  const faqItems = document.querySelectorAll('.faq') as NodeListOf<HTMLElement>;
  const h2 = document.querySelector('h2') as HTMLElement | null;

  // Search input
  const searchInput = document.createElement('input') as HTMLInputElement;
  searchInput.type = 'text';
  searchInput.placeholder = 'Search components...';
  searchInput.className = 'inventory-search';
  if (h2) h2.insertAdjacentElement('afterend', searchInput);

  function filterFaqs(searchQuery: string): void {
    const queryWords = searchQuery.toLowerCase().trim().split(/\s+/).filter((word: string) => word.length > 0);
    if (queryWords.length === 0) {
      faqItems.forEach((item: HTMLElement) => {
        item.style.display = 'block';
        const question = item.querySelector('.faq-question') as HTMLElement | null;
        if (question) question.innerHTML = (question as any).dataset.originalText || question.textContent || '';
      });
      return;
    }

    faqItems.forEach((item: HTMLElement) => {
      const questionEl = item.querySelector('.faq-question') as HTMLElement | null;
      const questionText = questionEl ? (questionEl.textContent || '').toLowerCase() : '';
      const fullText = (item.textContent || '').toLowerCase();

      const matchesQuestion = queryWords.some((word: string) => questionText.includes(word));
      const matchesFull = queryWords.some((word: string) => fullText.includes(word));

      const show = matchesQuestion || matchesFull;
      item.style.display = show ? 'block' : 'none';

      if (show && questionEl) {
        let highlighted = (questionEl as any).dataset.originalText || (questionEl.textContent || '');
        queryWords.forEach((word: string) => {
          const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
          highlighted = highlighted.replace(regex, '<mark style="background: #dc0a0a; color: white; padding: 2px 4px; border-radius: 3px;">$1</mark>');
        });
        questionEl.innerHTML = highlighted;
        (questionEl as any).dataset.originalText = (questionEl as any).dataset.originalText || (questionEl.textContent || '');
      }
    });
  }

  if (query.trim()) {
    searchInput.value = query;
    filterFaqs(query);
    setTimeout(() => {
      const firstMatch = document.querySelector('.faq[style*="block"]:first-of-type') as HTMLElement | null;
      if (firstMatch) firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
  }

  let debounceTimer: number;
  searchInput.addEventListener('input', (e: Event) => {
    const target = e.target as HTMLInputElement;
    clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      filterFaqs(target.value);
    }, 300);
  });

  if (query.trim()) {
    const matchingQuestion = Array.from(faqQuestions).find((q: FAQQuestion) => 
      (q.textContent || '').trim().toLowerCase().includes(query.toLowerCase())
    );
    if (matchingQuestion) {
      setTimeout(() => matchingQuestion.click(), 100);
    }
  }

  faqQuestions.forEach((question: FAQQuestion) => {
    question.tabIndex = 0;
    question.addEventListener("click", () => toggleFaq(question));

    question.addEventListener('keydown', (e: KeyboardEvent) => {
      const currentIndex = Array.from(faqQuestions).indexOf(question);
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % faqQuestions.length;
        (faqQuestions[nextIndex] as HTMLElement).focus();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + faqQuestions.length) % faqQuestions.length;
        (faqQuestions[prevIndex] as HTMLElement).focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFaq(question);
      }
    });

    if (iframeMode) {
      question.addEventListener('dblclick', () => {
        const objectName = question.dataset.object;
        if (objectName) {
          window.parent.postMessage({
            type: 'select-object',
            objectName: objectName
          } as MessageEventInit, '*');
        }
      });
    }
  });

  function toggleFaq(question: FAQQuestion): void {
    const answer = question.nextElementSibling as HTMLElement | null;
    const isOpen = answer ? answer.style.display === "block" : false;

    (document.querySelectorAll('.faq-answer') as NodeListOf<HTMLElement>).forEach((ans: HTMLElement) => ans.style.display = "none");
    faqQuestions.forEach((q: FAQQuestion) => q.classList.remove('active'));

    if (answer && !isOpen) {
      answer.style.display = "block";
      question.classList.add('active');
      setTimeout(initCarousels, 100);
    }
  }

  function initCarousels(): void {
    (document.querySelectorAll('.faq-answer[style*="block"]') as NodeListOf<HTMLElement>).forEach((answer: HTMLElement) => {
      const carousel = answer.querySelector('.carousel') as CarouselElement | null;
      if (carousel && !carousel.dataset.initialized) {
        const slides = carousel.querySelector('.slides') as HTMLElement | null;
        const prevBtn = carousel.querySelector('.carousel-btn.prev') as HTMLButtonElement | null;
        const nextBtn = carousel.querySelector('.carousel-btn.next') as HTMLButtonElement | null;
        const cards = slides ? (slides.querySelectorAll('.card') as NodeListOf<Element>) : [];

        if (cards.length > 1) {
          let currentIndex = 0;
          const totalSlides = cards.length;
          const slideWidth = 260;

          carousel.dataset.initialized = 'true';

          function showSlide(index: number): void {
            currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
            if (slides) slides.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
            if (prevBtn) prevBtn.disabled = currentIndex === 0;
            if (nextBtn) nextBtn.disabled = currentIndex === totalSlides - 1;
          }

          if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
          if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

          carousel.tabIndex = 0;
          carousel.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
              if (prevBtn) prevBtn.click();
            }
            if (e.key === 'ArrowRight') {
              if (nextBtn) nextBtn.click();
            }
          });

          showSlide(0);
        }
      }
    });
  }

  document.addEventListener('fullscreenchange', () => {
    (document.querySelectorAll('model-viewer') as NodeListOf<HTMLElement>).forEach((mv: HTMLElement) => {
      const isFullscreen = !!document.fullscreenElement;
      const btn = mv.querySelector('.mv-fullscreen-btn') as HTMLElement | null;
      if (btn) {
        const enterSvg = btn.querySelector('svg:not(.exit)') as SVGElement | null;
        const exitSvg = btn.querySelector('.exit') as SVGElement | null;
        if (enterSvg) enterSvg.style.display = isFullscreen ? 'none' : 'block';
        if (exitSvg) exitSvg.style.display = isFullscreen ? 'block' : 'none';
      }
    });
  });

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && document.fullscreenElement) {
      if (document.exitFullscreen) (document as any).exitFullscreen(); /*WHAT THE FUNCTION?*/
      else if ((document as any).webkitExitFullscreen) (document as any).webkitExitFullscreen();
      else if ((document as any).msExitFullscreen) (document as any).msExitFullscreen();
    }
  });

  // 3D buttons to gltf-cards doesnt work properly 
  (document.querySelectorAll('.gltf-card') as NodeListOf<HTMLElement>).forEach((card: HTMLElement) => {
    const viewer = card.querySelector('model-viewer') as HTMLElement | null;
    if (viewer && !card.querySelector('.view-3d-btn')) {
      const btn = document.createElement('button') as HTMLButtonElement;
      btn.className = 'view-3d-btn';
      btn.textContent = 'View 3D';
      btn.dataset.modelSrc = (viewer.getAttribute('src') || '');
      btn.dataset.name = '';
      btn.dataset.desc = card.dataset.text || '';
      card.appendChild(btn);
      btn.addEventListener('click', (e: MouseEvent) => {
        e.stopPropagation();
        (window as any).showInventory3DModal(btn.dataset.modelSrc || '', btn.dataset.name || '', btn.dataset.desc || '');
      });
    }
  });

  (document.querySelectorAll('.card .clickable-img, .gltf-card') as NodeListOf<HTMLElement>).forEach((card: HTMLElement) => {
    card.style.cursor = "pointer";

    card.addEventListener('click', (e: MouseEvent) => {
      if ((e.target as Element).classList.contains('view-3d-btn')) return;

      const modelViewer = card.querySelector('model-viewer') as HTMLElement | null;
      if (modelViewer) {
        e.stopPropagation();
        if (document.fullscreenElement) {
          if ((document as any).exitFullscreen) (document as any).exitFullscreen();
        } else {
          if ((modelViewer as any).requestFullscreen) (modelViewer as any).requestFullscreen();
          else if ((modelViewer as any).webkitRequestFullscreen) (modelViewer as any).webkitRequestFullscreen();
          else if ((modelViewer as any).msRequestFullscreen) (modelViewer as any).msRequestFullscreen();
        }
        return;
      }

      const faqAnswer = card.closest('.faq-answer') as HTMLElement | null;
      if (!faqAnswer) return;

      const textEl = faqAnswer.querySelector('p') as HTMLElement | null;
      if (!textEl) return;

      const video = faqAnswer.querySelector('iframe') as HTMLIFrameElement | null;

      const newText = card.dataset.text || "No description available.";

      if ((textEl as any)._typingInterval) {
        clearInterval((textEl as any)._typingInterval);
      }

      if (video) {
        video.style.display = "none";
      }

      textEl.textContent = "";
      textEl.classList.add('typing-cursor');

      let i = 0;
      (textEl as any)._typingInterval = window.setInterval(() => {
        if (i < newText.length) {
          textEl.textContent += newText.charAt(i);
          i++;
        } else {
          clearInterval((textEl as any)._typingInterval);
          textEl.classList.remove('typing-cursor');
        }
      }, 20);
    });
  });

  // 3D Modal functions
  (window as any).showInventory3DModal = function(src: string, name: string, desc: string): void {
    const modalTitle = document.getElementById('inventory-modal-title') as HTMLElement | null;
    const modalDesc = document.getElementById('inventory-modal-desc') as HTMLElement | null;
    const viewer = document.getElementById('inventory-viewer') as HTMLElement | null;
    const modal = document.getElementById('inventory-3d-modal') as HTMLElement | null;
    if (modalTitle) modalTitle.textContent = name;
    if (modalDesc) modalDesc.textContent = desc;
    if (viewer) viewer.setAttribute('src', src);
    if (modal) modal.style.display = 'flex';
  };

  (window as any).closeInventoryModal = function(): void {
    const modal = document.getElementById('inventory-3d-modal') as HTMLElement | null;
    if (modal) modal.style.display = 'none';
  };

  // Modal close handlers
  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === 'close-inventory-modal' || target.id === 'inventory-3d-modal') {
      (window as any).closeInventoryModal();
    }
  });
});
