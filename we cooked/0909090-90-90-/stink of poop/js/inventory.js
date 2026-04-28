document.addEventListener('DOMContentLoaded', () => {
  const faqContainer = document.querySelector('.faq-container');
  if (!faqContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('query') || '';
  const iframeMode = urlParams.get('iframe') === 'true';

  const faqQuestions = document.querySelectorAll('.faq-question');
  const faqItems = document.querySelectorAll('.faq');
  const h2 = document.querySelector('h2');

  // Search input
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search components...';
  searchInput.className = 'inventory-search';
  if (h2) h2.insertAdjacentElement('afterend', searchInput);

function filterFaqs(searchQuery) {
    const queryWords = searchQuery.toLowerCase().trim().split(/\s+/).filter(word => word.length > 0);
    if (queryWords.length === 0) {
      faqItems.forEach(item => {
        item.style.display = 'block';
        const question = item.querySelector('.faq-question');
        if (question) question.innerHTML = question.dataset.originalText || question.textContent;
      });
      return;
    }

    faqItems.forEach(item => {
      const questionEl = item.querySelector('.faq-question');
      const questionText = (questionEl ? questionEl.textContent : '').toLowerCase();
      const fullText = item.textContent.toLowerCase();

      // Prioritize question match, then full text
      const matchesQuestion = queryWords.some(word => questionText.includes(word));
      const matchesFull = queryWords.some(word => fullText.includes(word));

      const show = matchesQuestion || matchesFull;
      item.style.display = show ? 'block' : 'none';

      if (show && questionEl) {
        // Highlight matches in question
        let highlighted = questionEl.dataset.originalText || questionEl.textContent;
        queryWords.forEach(word => {
          const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
          highlighted = highlighted.replace(regex, '<mark style="background: #dc0a0a; color: white; padding: 2px 4px; border-radius: 3px;">$1</mark>');
        });
        questionEl.innerHTML = highlighted;
        questionEl.dataset.originalText = questionEl.dataset.originalText || questionEl.textContent;
      }
    });
  }

  if (query.trim()) {
    searchInput.value = query;
    filterFaqs(query);
    // Auto-scroll to first match after short delay
    setTimeout(() => {
      const firstMatch = document.querySelector('.faq[style*="block"]:first-of-type');
      if (firstMatch) firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
  }

  
  let debounceTimer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      filterFaqs(e.target.value);
    }, 300);
  });

  if (query.trim()) {
    const matchingQuestion = Array.from(faqQuestions).find(q => 
      q.textContent.trim().toLowerCase().includes(query.toLowerCase())
    );
    if (matchingQuestion) {
      setTimeout(() => matchingQuestion.click(), 100);
    }
  }

  faqQuestions.forEach((question) => {
    question.setAttribute('tabindex', '0');
    question.addEventListener("click", () => toggleFaq(question));

    question.addEventListener('keydown', (e) => {
      let currentIndex = Array.from(faqQuestions).indexOf(question);
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % faqQuestions.length;
        faqQuestions[nextIndex].focus();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + faqQuestions.length) % faqQuestions.length;
        faqQuestions[prevIndex].focus();
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
          }, '*');
        }
      });
    }
  });

  function toggleFaq(question) {
    const answer = question.nextElementSibling;
    const isOpen = answer.style.display === "block";

    document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = "none");
    document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));

    if (!isOpen) {
      answer.style.display = "block";
      question.classList.add('active');
      setTimeout(initCarousels, 100);
    }
  }

  function initCarousels() {
    document.querySelectorAll('.faq-answer[style*="block"]').forEach(answer => {
      const carousel = answer.querySelector('.carousel');
      if (carousel && !carousel.dataset.initialized) {
        const slides = carousel.querySelector('.slides');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const cards = slides ? slides.querySelectorAll('.card') : [];

        if (cards.length > 1) {
          let currentIndex = 0;
          const totalSlides = cards.length;
          const slideWidth = 260;

          carousel.dataset.initialized = 'true';

          function showSlide(index) {
            currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
            slides.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === totalSlides - 1;
          }

          prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
          nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

          carousel.tabIndex = 0;
          carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
          });

          showSlide(0);
        }
      }
    });
  }


  document.addEventListener('fullscreenchange', () => {
    const modelViewers = document.querySelectorAll('model-viewer');
    modelViewers.forEach(mv => {
      const isFullscreen = !!document.fullscreenElement;
      const btn = mv.querySelector('.mv-fullscreen-btn');
      if (btn) {
        btn.querySelector('svg:not(.exit)').style.display = isFullscreen ? 'none' : 'block';
        btn.querySelector('.exit').style.display = isFullscreen ? 'block' : 'none';
      }
    });
  });

  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  });


// Click model-viewer or gltf-card to toggle fullscreen - as per task
document.querySelectorAll('.gltf-card, .gltf-card model-viewer').forEach(element => {
  element.style.cursor = 'pointer';
  element.title = 'Click to toggle fullscreen 3D view';
  
  element.addEventListener('click', (e) => {
    e.stopPropagation();
    const modelViewer = element.tagName === 'MODEL-VIEWER' ? element : element.querySelector('model-viewer');
    if (modelViewer) {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen();
      } else {
        if (modelViewer.requestFullscreen) modelViewer.requestFullscreen();
        else if (modelViewer.webkitRequestFullscreen) modelViewer.webkitRequestFullscreen();
        else if (modelViewer.msRequestFullscreen) modelViewer.msRequestFullscreen();
      }
    }
  });
});

// Removed 👁️ SEE MORE INFO overlays as per task\n        


  document.querySelectorAll('.card .clickable-img, .gltf-card').forEach(card => {
    card.style.cursor = "pointer";

    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('view-3d-btn')) return; // Prevent default for button

      const modelViewer = card.querySelector('model-viewer');
      if (modelViewer) {
        e.stopPropagation();
        if (document.fullscreenElement) {
          if (document.exitFullscreen) document.exitFullscreen();
        } else {
          if (modelViewer.requestFullscreen) modelViewer.requestFullscreen();
          else if (modelViewer.webkitRequestFullscreen) modelViewer.webkitRequestFullscreen();
          else if (modelViewer.msRequestFullscreen) modelViewer.msRequestFullscreen();
        }
        return;
      }

      const faqAnswer = card.closest('.faq-answer');
      if (!faqAnswer) return;

      const textEl = faqAnswer.querySelector('p');
      if (!textEl) return;

      const video = faqAnswer.querySelector('iframe');

      const newText = card.dataset.text || "No description available.";

      if (textEl._typingInterval) {
        clearInterval(textEl._typingInterval);
      }

      if (video) {
        video.style.display = "none";
      }

      textEl.textContent = "";
      textEl.classList.add('typing-cursor'); 

      let i = 0;
      textEl._typingInterval = setInterval(() => {
        if (i < newText.length) {
          textEl.textContent += newText.charAt(i);
          i++;
        } else {
          clearInterval(textEl._typingInterval);
          textEl.classList.remove('typing-cursor');
        }
      }, 20); // Typing speed: 20ms 
    });
  });

  // 3D Modal functions
window.showInventory3DModal = function(src, title, desc) {
    const modal = document.getElementById('inventory-3d-modal');
    const viewer = document.getElementById('inventory-viewer');
    const titleEl = document.getElementById('inventory-modal-title');
    const descEl = document.getElementById('inventory-modal-desc');
    
    titleEl.textContent = title;
    descEl.innerHTML = desc.replace(/\n/g, '<br>');
    viewer.src = src;
    
    modal.showModal();
  };

  window.closeInventoryModal = function() {
    const modal = document.getElementById('inventory-3d-modal');
    modal.close();
  };

  // Global modal handlers
  document.addEventListener('click', (e) => {
    const modal = document.getElementById('inventory-3d-modal');
    if (!modal) return;
    if (e.target.id === 'close-inventory-modal' || (e.target.closest('.inventory-modal') === null && modal.open)) {
      closeInventoryModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('inventory-3d-modal');
      if (modal && modal.open) {
        closeInventoryModal();
      }
      // Also handle fullscreen exit
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  });
});


