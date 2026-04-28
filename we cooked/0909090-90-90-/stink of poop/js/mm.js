// mm.js - Market Page Functionality (Modal Fixed)

// Product data
const productData = {
  'kingston-nv1': {
    image: 'IMG/m.2.png',
    title: 'Kingston NV1 PCIe M.2 NVMe',
    specs: { Capacity: '500GB-2TB', Interface: 'PCIe 3.0 x4 NVMe', 'Read Speed': 'Up to 2100MB/s', Form: 'M.2 2280', Warranty: '3 years' }
  },
  'samsung-870-evo': {
    image: 'IMG/sssaaataaa.png',
    title: 'Samsung 870 Evo SATA 2.5"',
    specs: { Capacity: '500GB', Interface: 'SATA III 6Gb/s', 'Read/Write': '560/530MB/s', Form: '2.5-inch', Warranty: '5 years' }
  },
  'wd-green-sata': {
    image: 'IMG/HDDdesktop.png',
    title: 'WD Green SATA 2.5"',
    specs: { Capacity: '240GB', Interface: 'SATA III', 'Read Speed': '545MB/s', Form: '2.5-inch', Warranty: '3 years' }
  },
  'team-gx2': {
    image: 'IMG/ssd_drive_img0.jpg',
    title: 'Team Group GX2 SATA 2.5"',
    specs: { Capacity: '512GB', Interface: 'SATA III', 'Read Speed': '520MB/s', Form: '2.5-inch', Warranty: '3 years' }
  },
  'lexar-nm610': {
    image: 'IMG/m.2_nvme_ssd_samsung_990_pro_1tb_3d_model_img0.png',
    title: 'Lexar NM610 Pro 1TB M.2 NVMe',
    specs: { Capacity: '1TB', Interface: 'PCIe 3.0 x4 NVMe', 'Read Speed': '3300MB/s', Form: 'M.2 2280', Warranty: '5 years' }
  },
  'samsung-970': {
    image: 'IMG/rtx-series.png',
    title: 'Samsung 970 Evo Plus 500GB NVMe',
    specs: { Capacity: '500GB', Interface: 'PCIe 3.0 x4 NVMe', 'Read Speed': '3500MB/s', Form: 'M.2 2280', Warranty: '5 years' }
  },
  'crucial-p3': {
    image: 'IMG/ssd_drive_img1.png',
    title: 'Crucial P3 Plus 500GB PCIe 4.0',
    specs: { Capacity: '500GB', Interface: 'PCIe 4.0 x4 NVMe', 'Read Speed': '5000MB/s', Form: 'M.2 2280', Warranty: '5 years' }
  },

  // what this
  'wd-green-m2': {
    image: 'IMAGES-MARKET/dot.webp',
    title: 'Ryzen 5 5600X',
    specs: { Capacity: '240GB', Interface: 'SATA', 'Read Speed': '545MB/s', Form: 'M.2 2242/2280', Warranty: '3 years' }
  },


  // processor
  'ryzen 5': { 
    image: 'IMAGES-MARKET/pop.jpg', style: 'width: 100%; height: 100%;',
      title: 'Ryzen 5 5600X',

    perfectFor: {
      'Budget gaming' : 'builds without dedicated GPU',
      'Content creation' : 'light video editing and streaming',
      'Productivity' : 'multitasking and office workloads',
      'Entry-level gaming' : '1080p gaming at medium settings'
    },

    systemRequirements: {
      'The AMD Ryzen 5 5500GT' : 'is compatible with AM4 motherboards featuring 500-series chipsets (X570, B550, A520) and select 400-series boards with BIOS updates. Please verify motherboard compatibility and update BIOS if necessary before installation.'
    },

    links: {
      'Official Product Page': 'https://www.amd.com/en/products/apu/amd-ryzen-5-5500gt',
      'Specifications': 'https://www.amd.com/en/products/apu/amd-ryzen-5-5500gt#specifications',
      'Buy on Easy Pc': 'https://easypc.com.ph/collections/processor/products/amd-ryzen-5-5500gt-3-6ghz-am4-socket-ddr4-processor-mpk',
      'Reviews': 'https://www.amd.com/en/products/apu/amd-ryzen-5-5500gt#reviews'
    },

    specs: { 
      'Model': 'AMD Ryzen 5 5500GT',
      'Architecture': 'Zen 3 (Cezanne)', 
      'Socket': 'AM4', 
      'Cores / Threads': '	6 / 12', 
      'Base Clock': '3.6 GHz',
      'Max Boost Clock': '4.4 GHz',
      'L3 Cache': '16MB',
      'TDP': '65W',
      'Integrated Graphics': 'AMD Radeon Vega 7',
      'Memory Support': 'DDR4-3200 (Dual Channel)',
      
    
    }
  },


//gpu
  'ASUS Dual Nvidia Geforce RTX 3050 OC Edition': {
    image: 'IMAGES-MARKET/GFX.webp',
    title: 'ASUS Dual Nvidia Geforce RTX 3050 OC Edition',
    perfectFor: {
      '1080p gaming': 'at high settings',
      'Entry-level': 'ray tracing gaming'
    },
    systemRequirements: {
      'Minimum PSU': '550W',
      'PCIe Slot': 'PCIe 4.0 x16',
      'OS': 'Windows 10/11 64-bit',
      'Power Connector': '1x 8-pin',
      'System RAM': '8GB or more'
    },
    links: {
      'Official Product Page': 'https://www.asus.com/motherboards-components/graphics-cards/dual/dual-rtx3050-o6g/',
      'Specifications': 'https://www.asus.com/motherboards-components/graphics-cards/dual/dual-rtx3050-o6g/techspec/',
      'Buy on Easy Pc': 'https://easypc.com.ph/collections/graphic-card/products/asus-dual-nvidia-geforce-rtx-3050-oc-edition-dual-rtx3050-o6g-6gb-96-bit-gdrr6-videocard',
          'Reviews': 'https://www.asus.com/motherboards-components/graphics-cards/dual/dual-rtx3050-o6g/review/'
    },
    specs: {
      'Graphics Processor': 'NVIDIA GeForce RTX 3050',
      'GPU Architecture': 'NVIDIA Ampere (GA107)',
      'CUDA Cores': '2304',
      'Memory': '6GB GDDR6',
      'Memory Speed': '14 Gbps',
      'Memory Size': '6GB GDDR6',
      'Memory Interface': '96-bit',
      'Tensor Cores': '72 (3rd Generation)',
      'Boost Clock (OC Mode)': '1537 MHz',
      'Interface': 'PCI Express 4.0',
      'Display Outputs': '1x DVI-D, 1x HDMI 2.1, 1x DisplayPort 1.4a',
      'Maximum Resolution': '7680 x 4320'
    }
  }

  }

document.addEventListener('DOMContentLoaded', function() {
  // See more buttons open modal
  document.querySelectorAll('.see-more-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      openModal(this.dataset.product);
    });
  });

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    this.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });

  // Load theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
  }

  // Search
  document.querySelector('.search-input')?.addEventListener('input', function() {
    const term = this.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
      const title = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
      card.style.display = title.includes(term) ? '' : 'none';
    });
  });

  // Filter
  document.querySelector('.filter-select')?.addEventListener('change', function() {
    const filter = this.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
      const title = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
      let show = true;
      if (filter === 'nvme m.2') show = title.includes('nvme') || title.includes('m.2');
      else if (filter === 'sata 2.5"') show = title.includes('sata');
      card.style.display = show ? '' : 'none';
    });
  });
});

function openModal(productId) {
  const modal = document.getElementById('product-modal');
  const detailsEl = document.getElementById('modal-product-details');
  const data = productData[productId];
  if (data && detailsEl) {
    const perfectForHtml = data.perfectFor ? `
      <div class="info-card" style="margin-bottom: 20px;">
        <h3>🎯 Perfect For</h3>
        <ul>${Object.entries(data.perfectFor).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}</ul>
      </div>
    ` : '';

    const systemRequirementsHtml = data.systemRequirements ? `
      <div class="info-card" style="margin-bottom: 20px;">
        <h3>💻 System Requirements</h3>
        <ul>${Object.entries(data.systemRequirements).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}</ul>
      </div>
    ` : '';

    const linksHtml = data.links ? `
      <div class="info-card" style="margin-bottom: 20px;">
        <h3>🔗 Links</h3>
        <ul>${Object.entries(data.links).map(([key, value]) => `<li><a href="${value}" target="_blank" rel="noopener noreferrer"><strong>${key}</strong></a></li>`).join('')}</ul>
      </div>
    ` : '';

    detailsEl.innerHTML = `
      <img src="${data.image}" alt="${data.title || productId}" class="modal-product-image">
      <h2>${data.title}</h2>
      ${perfectForHtml}
      ${systemRequirementsHtml}
      ${linksHtml}
      <div class="info-grid">
        <div class="info-card">
          <h3>📋 Specifications</h3>
          <ul>${Object.entries(data.specs).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}</ul>
        </div>
      </div>
    `;
    modal.style.display = 'flex';
    modal.style.padding = '23px';
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('product-modal');
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 300);
  document.body.style.overflow = '';
}

// Close modal on overlay/escape
document.addEventListener('click', function(e) {
  if (e.target.id === 'product-modal') closeModal();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});
