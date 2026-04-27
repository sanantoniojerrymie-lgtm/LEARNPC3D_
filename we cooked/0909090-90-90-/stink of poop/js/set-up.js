var arr = [
  {
    name: "Low Spec Office Desktop",
    tier: "low",
    image: "./IMAGES-set-up/low-end.webp",
    price: "₱21,750.00",
    specs: {
      processor: "AMD RYZEN 5 3400G MPK (AM4) WITH WRAITH STEALTH COOLER (TRAY TYPE)",
      motherboard: "MSI A520M-A PRO DDR4 MATX AM4",
      gpu: "RADEON RX580 BIOSTAR 8GB GDDR5 DUAL FAN",
      ram: "LEXAR LD4AU008G 8GBX1=8GB 2666MHZ DDR4",
      storage: "LEXAR NS10 LITE 120GB 2.5 SATA SSD",
      psu: "GALAX OMEGA GL500S 500W 80+ CYBENETICS BRONZE ATX NON MODULAR",
      use: "https://www.pcworth.com/diy-builder"
    },
    model: "./IMAGES-set-up/diy_pc_builder_1777194510288.png"
  },
  {
    name: "Mid Spec Gaming Desktop", 
    tier: "mid",
    image: "IMAGES-set-up/midrange.webp",
    price: "₱36,395.00",
    specs: {
      motherboard: "Asrock A520M-HVS AMD Socket AM4 DDR4",
      processor: "AMD Ryzen 5 5500 Processor - MPK",
      gpu: " Gigabyte GeForce RTX 3050 Windforce V2 6GB GDDR6",
      ram: "Lexar Thor 8GB DDR4 3600MHz CL18 Intel XMP 2.0 Gaming Desktop Memory",
      storage: "Adata Legend 710 512GB PCIE Gen3 X4 M.2 2280 Internal SSD",
      psu: "MSI MAG A500N-H 500W 1200mm Non Modula",
      use: "1080p gaming, video editing, streaming"
    },
    model: "IMAGES-set-up/midrangeinside.webp"
  },
  {
    name: "Aurora Spectra, High End Gaming Workstation", 
    tier: "high",
    image: "IMAGES-set-up/yep.webp",
    price: "₱76,950.00",
    specs: {
      motherboard:"Gigabyte B650M D3HP DDR5 AM5 Motherboard",
      processor: "AMD Ryzen 7 7700",
      gpu: "AMD Ryzen 7 7700",
      ram: "G.Skill Flare X5 16GB (16GBx1) DDR5 Desktop",
      storage: " Patriot P300 1TB M.2 2280 PCIe Gen3 x4 SSD",
      psu: "Sama G750 750W 80+ Gold ATX 3.1 PCIe 5.1 Ready Fully Modular",
      use: "4K gaming, 3D rendering, professional workloads"

    },
    model: "IMAGES-set-up/pwede.webp"
  },
  {
    name: "Alpha Eris TG ,Budget Gaming Rig",
    tier: "low/mid",
    image: "IMAGES-set-up/rig.webp",
    price: "₱37,500.00",
    specs: {
      motherboard: "Colorful Battle-AX B450M-T M.2 V14 DDR4 AMD Motherboard",
     processor: "AMD Ryzen 5 5500 Processor",
      gpu: "Gigabyte GeForce RTX 3050 Windforce V2 6GB GDDR6 ",
      ram: "T-Force Delta TUF Gaming Alliance RGB 16GB (2X8GB) DDR4",
      storage: "Patriot P210 512GB 2.5 SSD SATA III",
      psu: "DeepCool PF500X 500W Cybenetics 80+ Bronze ATX 2.52",
      use: "Entry-level 1080p gaming, content creation"
    },
    model: "IMAGES-set-up/budget.webp"
  },
  {
    name: "Workstation",
    tier: "could depend in type of workstation",
    image: "IMAGES-set-up/workstation.webp",
    price: "Contact for price",
    specs: {
      processor: "Intel® Xeon® Silver 4516Y+ (up to 3.7 GHz with Intel® Turbo Boost Technology, 45 MB L3 cache, 24 cores, 48 threads) ",      cpu: "AMD Ryzen 7 7700X",
      gpu: "Discrete,NVIDIA RTX™ 6000 Ada Generation (48 GB GDDR6 dedicated)",
      ram: "128 GB DDR5-5600 MT/s ECC (4 x 32 GB)",
      storage: "1 TB HP Z Turbo Drive PCIe® Gen4 TLC SED M.2 SSD",
      psu: "1125 W internal power supply, up to 90% efficiency, active PFC",
      use: "Video editing, 3D modeling, streaming"
    },
    model: "/IMG/rtx-series.png"
  },
  {
    name: "Optima X5M Gaming PC",
    tier: "high",
    image: "IMAGES-set-up/gamingpc.webp",
    price: "₱133,150,00",
    specs: {
      processor: 'AMD Ryzen 7 7800X3D Tray Processor',
      gpu: "Colorful iGame GeForce RTX 5070 Ultra W OC 12GB-V GDDR7 Graphics Card",
      ram: "RGB ECO 32GB (2x16GB) DDR5 6000MHz CL38 Gaming Memory (Silver)",
      storage: "Hiksemi Wave(P) 1024GB PCIe 3.0 NVMe M.2 3D NAND SSD",
      psu: "DeepCool PN850M WH 850W 80+ Gold Native ATX 3.1 Modular (White)",
      motherboard: "Gigabyte X870M Aorus Elite WiFi7 Ice DDR5 AMD Gaming Motherboard",
      
    },
    model: "./IMAGES-set-up/loop.webp"
  }
];



function renderFeaturedGrid(filteredArr = arr) {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  
  let clutter = '';
  filteredArr.forEach((build, index) => {
    clutter += `
      <article class="setup-card ${build.tier} cursor-pointer group relative" data-index="${index}" tabindex="0">
        <img class="setup-img w-full object-cover rounded-t-3xl" src="${build.image}" alt="${build.name}" loading="lazy">
        <div class="card-actions absolute top-4 right-4 opacity-0 group-hover:opacity-100 flex gap-2 z-10">
          <button class="favorite-btn ri-heart-line text-white hover:bg-red-500/30 p-2 rounded-full transition-all" data-index="${index}" aria-label="Favorite ${build.name}"></button>
        </div>

        <div class="p-6">
          <div class="caption text-xl font-bold mb-2">${build.name}<br><span class="text-2xl text-red-400 font-black">${build.price}</span></div>
          <div class="specs mb-4">
            <h4 class="text-red-400 font-bold mb-3 text-lg">Key Specs:</h4>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <span>Processor:</span><span>${build.specs.processor}</span>
              <span>GPU:</span><span>${build.specs.gpu}</span>
              <span>RAM:</span><span>${build.specs.ram}</span>
              <span>Storage:</span><span>${build.specs.storage}</span>
              <span>Motherboard:</span><span>${build.specs.motherboard}</span>
              <span>PSU:</span><span>${build.specs.psu}</span>
            </div>
          </div>
          <button class="view-3d-btn w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 px-6 rounded-xl font-bold transition-all shadow-lg hover:shadow-red-500/25" data-index="${index}">See more Information</button>
        </div>
      </article>`;
  });
  grid.innerHTML = clutter;
}

//up nanjan outer modal

function handleSearchFunctionality(){
  var input = document.querySelector("#searchinput");
  var overlay = document.querySelector(".overlay");
  var searchdata = document.querySelector(".searchdata");
  if (!input || !overlay || !searchdata) return;
  
  input.addEventListener("focus", function(){
    overlay.style.display = "block"; 
  })
  input.addEventListener("blur", function(){
    overlay.style.display = "none"; 
  })
  input.addEventListener("input",function(){
    const q = input.value.toLowerCase();
    const filteredArray = arr.filter(obj => 
      obj.name.toLowerCase().includes(q) || 
      obj.tier.toLowerCase().includes(q) ||
      obj.specs.use.toLowerCase().includes(q)
    );
    var clutter = "";
    filteredArray.forEach(function(obj) {
      clutter +=`<div class="res flex px-8 py-3 cursor-pointer" onclick="showSetup(${arr.indexOf(obj)})">
        <i class="ri-computer-line font-semibold mr-5"></i>
        <h3 class="font-semibold">${obj.name} (${obj.tier.toUpperCase()})</h3>
      </div>`
    })
    searchdata.style.display = "block";
    searchdata.innerHTML = clutter || '<div class="px-8 py-3 text-gray-500">No setups found</div>';
  })
}

document.addEventListener('DOMContentLoaded', function() {
  // Render initial featured grid
  renderFeaturedGrid();
  
  // Existing search functionality
  handleSearchFunctionality();
  
  // Universal click handler for cards/buttons
  document.addEventListener('click', function(e) {
    const card = e.target.closest('.setup-card');
    if (!card) return;
    const indexStr = card.dataset.index;
    const index = parseInt(indexStr);
    if (isNaN(index)) return;
    
    if (e.target.closest('.view-3d-btn')) {
      show3DModal(index);
    } else if (e.target.closest('.favorite-btn')) {
      e.target.closest('.favorite-btn').classList.toggle('filled');
    } else if (e.target.closest('.compare-btn')) {
      // Compare placeholder
    }
  });
  
  // Close modals
  const closeModalBtn = document.getElementById('close-modal');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      const modal = document.getElementById('3d-modal');
      if (modal) modal.style.display = 'none';
    });
  }
  
  const closeModalBtn2 = document.getElementById('close-modal-btn');
  if (closeModalBtn2) {
    closeModalBtn2.addEventListener('click', () => {
      const modal = document.getElementById('3d-modal');
      if (modal) modal.style.display = 'none';
    });
  }
});

function showSpecs(index) {
  const specs = document.querySelectorAll('.specs');
  specs.forEach(s => s.classList.add('hidden'));
  const article = document.querySelector(`article[data-index="${index}"]`);
  if (article) {
    const targetSpecs = article.querySelector('.specs');
    if (targetSpecs) targetSpecs.classList.remove('hidden');
  }
}

function show3DModal(index) {
  const setup = arr[index];
  if (!setup) return;
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  if (modalTitle) modalTitle.textContent = setup.name;
  if (modalDesc) {
    const useValue = setup.specs.use;
    if (useValue && useValue.startsWith('http')) {
      modalDesc.innerHTML = `<a href="${useValue}" target="_blank" rel="noopener noreferrer" class="text-red-400 hover:text-red-300 underline">${useValue}</a>`;
    } else {
      modalDesc.textContent = useValue;
    }
  }
  const viewer = document.getElementById('setup-viewer');
  if (viewer) {
    viewer.src = setup.model;
  }
  const modal = document.getElementById('3d-modal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

function showSetup(index) {
  showSpecs(index);
  const searchinput = document.querySelector('#searchinput');
  const searchdata = document.querySelector(".searchdata");
  if (searchinput) searchinput.blur();
  if (searchdata) searchdata.style.display = "none";
}

// Modal close
document.addEventListener('click', function(e) {
  if (e.target.id === 'close-modal' || e.target.id === '3d-modal') {
    const modal = document.getElementById('3d-modal');
    if (modal) modal.style.display = 'none';
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('3d-modal');
    if (modal && modal.style.display === 'flex') {
      modal.style.display = 'none';
    }
  }
});

