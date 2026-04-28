function toggleMenu() {
    const menu = document.getElementById('menu-bar');
    const toggle = document.querySelector('.menu-toggle');
    if (menu.classList.contains('menu-open')) {
        menu.classList.remove('menu-open');
        menu.classList.add('menu-closed');
        toggle.textContent = '☰';
    } else {
        menu.classList.remove('menu-closed');
        menu.classList.add('menu-open');
        toggle.textContent = '✕';
    }
}   
 
// preview sa search bar

const components = [
  {
    name: 'Monitor',
    img: 'IMG/oled.png',
    preview: 'OLED, Curved Ultrawide, 4K monitors for gaming and productivity.',
    category: 'monitor'
  },
  {
    name: 'Keyboard',
    img: 'IMG/qwerty.jpg',
    preview: 'QWERTY, Mechanical, Gaming, Wireless keyboards.',
    category: 'keyboard'
  },
  {
    name: 'Mouse',
    img: 'IMG/optical.png',
    preview: 'Optical, Laser, Wireless, Gaming mice.',
    category: 'mouse'
  },
  {
    name: 'Speaker',
    img: 'IMG/stereo.png',
    preview: 'Stereo, Subwoofer, Bluetooth, Gaming speakers.',
    category: 'speaker'
  },
  {
    name: 'Webcam',
    img: 'IMG/hdwebcam.png',
    preview: 'HD, 4K, USB webcams with ring light.',
    category: 'webcam'
  },
  {
    name: 'Headphones',
    img: 'IMG/overear.png',
    preview: 'Over-ear, In-ear, Wireless, Gaming headphones.',
    category: 'headphones'
  },
  {
    name: 'Microphone',
    img: 'IMG/usbmic.png',
    preview: 'USB, Condenser, Dynamic, Lavalier mics.',
    category: 'microphone'
  },
  {
    name: 'CPU',
    img: 'IMG/intelcore.png',
    preview: 'Intel Core, AMD Ryzen, Mobile, Server CPUs.',
    category: 'cpu'
  },
  {
    name: 'Motherboard',
    img: 'IMG/atx.png',
    preview: 'ATX, Micro ATX, Mini ITX, Server boards.',
    category: 'motherboard'
  },
  {
    name: 'RAM',
    img: 'IMG/DDR4.png',
    preview: 'DDR4, DDR5, RGB, ECC RAM modules.',
    category: 'ram'
  },
  {
    name: 'ROM',
    img: 'IMG/ROm.jpg',
    preview: 'BIOS, Firmware, EPROM, EEPROM chips.',
    category: 'rom'
  },
  {
    name: 'GPU',
    img: 'IMG/rtx-series.png',
    preview: 'NVIDIA GeForce, AMD Radeon, RTX series.',
    category: 'gpu'
  },
  {
    name: 'SSD',
    img: 'IMG/m.2.png',
    preview: 'M.2 NVMe, SATA, Enterprise, External SSDs.',
    category: 'ssd'
  },
  {
    name: 'Power Supply',
    img: 'IMG/psu.png',
    preview: '80+ Bronze, Gold, Modular, SFX PSUs.',
    category: 'powersupply'
  },
  {
    name: 'HDD',
    img: 'IMG/HDDdesktop.png',
    preview: 'Desktop, Laptop hard drives.',
    category: 'hdd'
  }
];

document.addEventListener('DOMContentLoaded', function() {
  initLoader();

  // Typewriter effects
  const typewriter = document.querySelector('.typewriter');
  if (typewriter) {
    typewriter.textContent = typewriter.getAttribute('data-text');
  }

  const descTypewriter = document.querySelector('.description-right');
  if (descTypewriter) {
    const text = descTypewriter.getAttribute('data-text');
    descTypewriter.textContent = ''; 
    let j = 0;
    setTimeout(() => {
      const descInterval = setInterval(() => {
        descTypewriter.textContent += text.charAt(j);
        j++;
        if (j > text.length) {
          clearInterval(descInterval);
        }
      }, 30);
    }, 3500);
  }

  const modelViewer = document.querySelector('#model-viewer');
  if (modelViewer) {
    modelViewer.style.cursor = 'pointer';
    modelViewer.addEventListener('click', function(e) {
      modelViewer.cameraTarget = 'auto';
      modelViewer.classList.add('clicked');
      setTimeout(() => modelViewer.classList.remove('clicked'), 300);
      e.stopPropagation();
    });
  }

  // Search functionality
  const searchBar = document.querySelector('.search-bar');
  const searchBtn = document.querySelector('.search-btn');
  const searchPreview = document.getElementById('search-preview');
  const inventoryBtn = document.querySelector('.inventory-btn');

  let debounceTimer;

  function performSearch(query) {
    const q = query.toLowerCase().trim();
    if (q.length === 0) {
      searchPreview.classList.remove('show');
      return;
    }

    const matches = components.filter(comp => 
      comp.name.toLowerCase().includes(q) || comp.preview.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      searchPreview.innerHTML = '<p style="color: #ccc; text-align: center; grid-column: 1;">No components found.</p>';
    } else {
      searchPreview.innerHTML = matches.map(comp => `
        <div class="preview-card" onclick="window.open('inventory.html#${comp.category}', '_blank')">
          <img src="${comp.img}" alt="${comp.name}" onerror="this.style.display='none'">
          <h4>${comp.name}</h4>
          <p>${comp.preview}</p>
        </div>
      `).join('');
    }
    searchPreview.classList.add('show');
  }

  if (searchBar) {
    searchBar.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => performSearch(e.target.value), 250);
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const query = searchBar ? searchBar.value.trim() : '';
      if (query) {
        window.open(`inventory.html?query=${encodeURIComponent(query)}`, '_blank');
        searchBar.value = '';
        searchPreview.classList.remove('show');
      }
    });
  }

 
  if (inventoryBtn && searchBar) {
    inventoryBtn.addEventListener('click', (e) => {
      const query = searchBar.value.trim();
      if (query) {
        e.preventDefault();
        window.open(`inventory.html?query=${encodeURIComponent(query)}`, '_blank');
      }
    });
  }

  
  const canvas = document.getElementById('starfield-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const stars = [];
    const shootingStars = [];
    const starCount = Math.floor(canvas.width * canvas.height / 5000);
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random(),
        speed: Math.random() * 0.05
      });
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.opacity += Math.random() * 0.1 - 0.05;
        if (star.opacity < 0.1) star.opacity = 0.1;
        if (star.opacity > 1) star.opacity = 1;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      }
      
      if (Math.random() < 0.01) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: 0,
          length: Math.random() * 80 + 20,
          speed: Math.random() * 10 + 10,
          angle: Math.PI / 4 + Math.random() * Math.PI / 4,
          life: 1
        });
      }
      
      for (let i = 0; i < shootingStars.length; i++) {
        const star = shootingStars[i];
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.life -= 0.01;
        
        if (star.life > 0) {
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x - Math.cos(star.angle) * star.length, star.y - Math.sin(star.angle) * star.length);
          ctx.strokeStyle = `rgba(255, 255, 255, ${star.life})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          shootingStars.splice(i, 1);
          i--;
        }
      }
      
      requestAnimationFrame(draw);
    }
    
    requestAnimationFrame(draw);
    
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  function initLoader() {
    const introLoader = document.querySelector('.intro-loader');
    if (introLoader) {
      setTimeout(() => introLoader.classList.add('fade-out'), 2500);
    }
  }
});
