// Game data from provided JSON
const gameData = {
  "ages": [
    {"name": "Stone Age", "year": "10000 BCE", "description": "Basic tools, fire, shelter", "inventions": ["Fire", "Stone Axe", "Wooden Spear"], "resources": ["Stone", "Wood", "Clay"], "icon": "🗿"},
    {"name": "Bronze Age", "year": "3000 BCE", "description": "Metal working, farming, wheels", "inventions": ["Bronze Sword", "Pottery Wheel", "Plow"], "resources": ["Bronze", "Copper", "Tin"], "icon": "⚔️"},
    {"name": "Industrial Age", "year": "1800 CE", "description": "Steam power, factories, railroads", "inventions": ["Steam Engine", "Railroad", "Telegraph"], "resources": ["Iron", "Coal", "Steel"], "icon": "🏭"},
    {"name": "Digital Age", "year": "1970 CE", "description": "Computers, internet, mobile devices", "inventions": ["Computer", "Internet", "Smartphone"], "resources": ["Silicon", "Lithium", "Rare Earths"], "icon": "💻"},
    {"name": "Space Age", "year": "2050 CE", "description": "Interstellar travel, colonies, fusion", "inventions": ["Fusion Reactor", "Warp Drive", "Space Colony"], "resources": ["Antimatter", "Exotic Matter", "Dark Energy"], "icon": "🚀"}
  ],
  "materials": [
    {"name": "Wood", "type": "organic", "properties": ["flexible", "combustible", "renewable"], "rarity": "common", "icon": "🪵"},
    {"name": "Stone", "type": "mineral", "properties": ["hard", "durable", "heavy"], "rarity": "common", "icon": "🪨"},
    {"name": "Metal", "type": "mineral", "properties": ["conductive", "malleable", "strong"], "rarity": "uncommon", "icon": "⚙️"},
    {"name": "Clay", "type": "organic", "properties": ["moldable", "heat-resistant", "abundant"], "rarity": "common", "icon": "🏺"},
    {"name": "Silicon", "type": "mineral", "properties": ["semiconductor", "abundant", "pure"], "rarity": "rare", "icon": "💎"}
  ],
  "inventions": [
    {"name": "Wheel", "creator": "Player_001", "materials": ["Wood", "Stone"], "date": "2024-08-15", "blockchain_hash": "0x1a2b3c4d5e6f", "uses": "Transportation", "patent_value": 1500, "icon": "🛞"},
    {"name": "Bronze Sword", "creator": "Player_042", "materials": ["Copper", "Tin"], "date": "2024-08-20", "blockchain_hash": "0x7g8h9i0j1k2l", "uses": "Combat", "patent_value": 2500, "icon": "⚔️"},
    {"name": "Steam Engine", "creator": "Player_137", "materials": ["Iron", "Coal", "Water"], "date": "2024-08-22", "blockchain_hash": "0x3m4n5o6p7q8r", "uses": "Power Generation", "patent_value": 15000, "icon": "⚡"}
  ],
  "marketplace_items": [
    {"name": "Fire Starter Kit", "seller": "Player_007", "price": 50, "materials": ["Wood", "Stone"], "quantity": 25},
    {"name": "Metal Tools Set", "seller": "Player_089", "price": 200, "materials": ["Iron", "Wood"], "quantity": 10},
    {"name": "Computer Blueprint", "seller": "Player_256", "price": 5000, "materials": ["Silicon", "Copper"], "quantity": 3}
  ],
  "blockchain_transactions": [
    {"tx_hash": "0x1a2b3c4d5e6f7a8b", "type": "Patent Registration", "item": "Wheel", "timestamp": "2024-08-15T14:30:00Z", "gas_fee": "0.001 ETH"},
    {"tx_hash": "0x9c8b7a6f5e4d3c2b", "type": "Marketplace Sale", "item": "Bronze Sword", "timestamp": "2024-08-20T09:15:00Z", "gas_fee": "0.002 ETH"},
    {"tx_hash": "0x5f4e3d2c1b0a9e8d", "type": "Trade Agreement", "item": "Steam Engine License", "timestamp": "2024-08-22T16:45:00Z", "gas_fee": "0.003 ETH"}
  ]
};

// Current crafting state
let currentCraftingMaterials = [];
let selectedAge = null;

// Navigation functionality - Make this a global function
window.showSection = function(sectionId) {
  console.log('Switching to section:', sectionId);
  
  // Hide all sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Show selected section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
  }
  
  // Update nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.querySelector(`[data-section="${sectionId}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
  
  // Initialize section-specific content
  if (sectionId === 'timeline') {
    initializeTimeline();
  } else if (sectionId === 'crafting') {
    initializeCrafting();
  } else if (sectionId === 'registry') {
    initializeRegistry();
  } else if (sectionId === 'marketplace') {
    initializeMarketplace();
  }
};

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded');
  
  // Nav button listeners
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Nav button clicked:', this.dataset.section);
      showSection(this.dataset.section);
    });
  });
  
  // Start journey button
  const startButton = document.querySelector('.btn.btn--primary');
  if (startButton && startButton.textContent.includes('Start Your Journey')) {
    startButton.addEventListener('click', function(e) {
      e.preventDefault();
      showSection('timeline');
    });
  }
  
  // Initialize with landing page
  showSection('landing');
  
  // Add welcome messages after a delay
  setTimeout(() => {
    if (document.getElementById('ai-messages')) {
      showAIMessage("Welcome to AeonSpace! I'm your AI assistant, ready to help you discover new inventions.");
      setTimeout(() => {
        showAIMessage("Try dragging different materials to the crafting area and see what happens!");
      }, 2000);
    }
  }, 1000);
});

// Timeline functionality
function initializeTimeline() {
  console.log('Initializing timeline');
  const timelineAges = document.getElementById('timeline-ages');
  if (!timelineAges) return;
  
  timelineAges.innerHTML = '';
  
  gameData.ages.forEach((age, index) => {
    const ageElement = document.createElement('div');
    ageElement.className = 'timeline-age';
    ageElement.innerHTML = `
      <span class="timeline-age-icon">${age.icon}</span>
      <span class="timeline-age-name">${age.name}</span>
    `;
    ageElement.addEventListener('click', () => selectAge(index));
    timelineAges.appendChild(ageElement);
  });
  
  // Auto-select first age
  if (gameData.ages.length > 0) {
    selectAge(0);
  }
}

function selectAge(index) {
  console.log('Selecting age:', index);
  const age = gameData.ages[index];
  selectedAge = index;
  
  // Update active age
  document.querySelectorAll('.timeline-age').forEach((el, i) => {
    el.classList.toggle('active', i === index);
  });
  
  // Update age details
  const titleEl = document.getElementById('age-title');
  const descEl = document.getElementById('age-description');
  if (titleEl) titleEl.textContent = `${age.name} (${age.year})`;
  if (descEl) descEl.textContent = age.description;
  
  // Update inventions
  const inventionsList = document.getElementById('age-inventions-list');
  if (inventionsList) {
    inventionsList.innerHTML = '';
    age.inventions.forEach(invention => {
      const inventionElement = document.createElement('div');
      inventionElement.className = 'invention-item';
      inventionElement.textContent = invention;
      inventionsList.appendChild(inventionElement);
    });
  }
  
  // Update resources
  const resourcesList = document.getElementById('age-resources-list');
  if (resourcesList) {
    resourcesList.innerHTML = '';
    age.resources.forEach(resource => {
      const resourceElement = document.createElement('div');
      resourceElement.className = 'resource-item';
      resourceElement.textContent = resource;
      resourcesList.appendChild(resourceElement);
    });
  }
}

// Crafting functionality
function initializeCrafting() {
  console.log('Initializing crafting');
  const materialsGrid = document.getElementById('materials-grid');
  if (!materialsGrid) return;
  
  materialsGrid.innerHTML = '';
  
  gameData.materials.forEach(material => {
    const materialElement = document.createElement('div');
    materialElement.className = 'material-item';
    materialElement.draggable = true;
    materialElement.dataset.material = material.name;
    materialElement.title = `Properties: ${material.properties.join(', ')}`;
    materialElement.innerHTML = `
      <span class="material-icon">${material.icon}</span>
      <div class="material-name">${material.name}</div>
      <div class="material-rarity">${material.rarity}</div>
    `;
    
    materialElement.addEventListener('dragstart', handleDragStart);
    materialsGrid.appendChild(materialElement);
  });
  
  // Reset crafting area
  currentCraftingMaterials = [];
  updateCraftingArea();
}

function handleDragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.dataset.material);
}

// Make these global functions for the HTML onclick handlers
window.allowDrop = function(e) {
  e.preventDefault();
  e.currentTarget.classList.add('drag-over');
};

window.dropMaterial = function(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  
  const materialName = e.dataTransfer.getData('text/plain');
  if (materialName && !currentCraftingMaterials.includes(materialName)) {
    currentCraftingMaterials.push(materialName);
    updateCraftingArea();
    showAIMessage(`Added ${materialName} to crafting area!`);
  }
};

function updateCraftingArea() {
  const dropZone = document.querySelector('.drop-zone');
  const craftButton = document.getElementById('craft-button');
  
  if (!dropZone || !craftButton) return;
  
  if (currentCraftingMaterials.length === 0) {
    dropZone.innerHTML = '<p>Drag materials here to craft</p>';
    craftButton.disabled = true;
  } else {
    const materialsHTML = currentCraftingMaterials.map(material => {
      const materialData = gameData.materials.find(m => m.name === material);
      return `
        <div class="dropped-material">
          <span>${materialData ? materialData.icon : '?'} ${material}</span>
          <button class="remove-material" onclick="removeMaterial('${material}')">×</button>
        </div>
      `;
    }).join('');
    
    dropZone.innerHTML = `<div class="dropped-materials">${materialsHTML}</div>`;
    craftButton.disabled = false;
  }
}

window.removeMaterial = function(materialName) {
  currentCraftingMaterials = currentCraftingMaterials.filter(m => m !== materialName);
  updateCraftingArea();
  showAIMessage(`Removed ${materialName} from crafting area.`);
};

window.attemptCraft = function() {
  if (currentCraftingMaterials.length < 2) {
    showAIMessage("You need at least 2 materials to craft something!", "error");
    return;
  }
  
  showLoadingOverlay();
  
  setTimeout(() => {
    hideLoadingOverlay();
    const result = validateCrafting(currentCraftingMaterials);
    showCraftResult(result);
    showAIMessage(result.message, result.success ? "success" : "error");
  }, 2000);
};

function validateCrafting(materials) {
  // Predefined successful combinations
  const successfulCombinations = [
    {
      materials: ["Wood", "Stone"],
      result: "Wooden Handle Tool",
      message: "Excellent! You've created a basic tool by combining the hardness of stone with the flexibility of wood."
    },
    {
      materials: ["Metal", "Wood"],
      result: "Metal Tool",
      message: "Great invention! The metal provides durability while wood makes it comfortable to handle."
    },
    {
      materials: ["Clay", "Wood"],
      result: "Pottery Kiln",
      message: "Innovative! You've combined moldable clay with combustible wood to create a firing system."
    },
    {
      materials: ["Stone", "Metal"],
      result: "Sharpening Stone",
      message: "Smart combination! Stone can be used to sharpen and maintain metal tools."
    },
    {
      materials: ["Silicon", "Metal"],
      result: "Electronic Component",
      message: "Advanced! You've combined semiconductor properties with conductive materials."
    }
  ];
  
  // Check for successful combinations
  for (let combo of successfulCombinations) {
    if (materials.every(m => combo.materials.includes(m)) && combo.materials.every(m => materials.includes(m))) {
      return {
        success: true,
        result: combo.result,
        message: combo.message
      };
    }
  }
  
  // Generate failure messages based on material properties
  const failureMessages = [
    "These materials don't have compatible properties for crafting.",
    "The combination lacks structural integrity for a practical invention.",
    "While creative, this combination doesn't follow physical laws.",
    "Try combining materials with complementary properties!",
    "Consider how these materials would work together in the real world."
  ];
  
  return {
    success: false,
    result: null,
    message: failureMessages[Math.floor(Math.random() * failureMessages.length)]
  };
}

function showCraftResult(result) {
  const craftResult = document.getElementById('craft-result');
  if (!craftResult) return;
  
  craftResult.className = `craft-result ${result.success ? 'success' : 'failure'}`;
  
  if (result.success) {
    craftResult.innerHTML = `
      <h4>🎉 Invention Successful!</h4>
      <p><strong>${result.result}</strong></p>
      <p>${result.message}</p>
      <button class="btn btn--primary" onclick="registerPatent('${result.result}')">Register Patent</button>
    `;
  } else {
    craftResult.innerHTML = `
      <h4>❌ Invention Failed</h4>
      <p>${result.message}</p>
    `;
  }
}

window.registerPatent = function(inventionName) {
  showLoadingOverlay("Registering patent on blockchain...");
  
  setTimeout(() => {
    hideLoadingOverlay();
    showAIMessage(`Patent for "${inventionName}" has been registered on the blockchain! You now own the intellectual property rights.`, "success");
    
    // Clear crafting area
    currentCraftingMaterials = [];
    updateCraftingArea();
    const craftResult = document.getElementById('craft-result');
    if (craftResult) {
      craftResult.style.display = 'none';
    }
  }, 3000);
};

function showAIMessage(message, type = "info") {
  const aiMessages = document.getElementById('ai-messages');
  if (!aiMessages) return;
  
  const messageElement = document.createElement('div');
  messageElement.className = 'ai-message';
  messageElement.innerHTML = `<p>${message}</p>`;
  
  if (type === "success") {
    messageElement.style.borderLeftColor = 'var(--color-success)';
  } else if (type === "error") {
    messageElement.style.borderLeftColor = 'var(--color-error)';
  }
  
  aiMessages.appendChild(messageElement);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}

// Registry functionality
function initializeRegistry() {
  console.log('Initializing registry');
  const patentsList = document.getElementById('patents-list');
  if (!patentsList) return;
  
  patentsList.innerHTML = '';
  
  gameData.inventions.forEach(invention => {
    const patentElement = document.createElement('div');
    patentElement.className = 'patent-card';
    patentElement.innerHTML = `
      <div class="patent-icon">${invention.icon}</div>
      <div class="patent-info">
        <h4>${invention.name}</h4>
        <div class="patent-creator">Created by ${invention.creator}</div>
        <div class="patent-materials">
          ${invention.materials.map(material => `<span class="patent-material">${material}</span>`).join('')}
        </div>
        <div class="patent-hash">Hash: ${invention.blockchain_hash}</div>
      </div>
      <div class="patent-value">
        <div class="patent-price">${invention.patent_value.toLocaleString()} credits</div>
        <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary);">${invention.uses}</div>
      </div>
    `;
    patentsList.appendChild(patentElement);
  });
  
  // Initialize blockchain transactions
  const transactionsList = document.getElementById('transactions-list');
  if (!transactionsList) return;
  
  transactionsList.innerHTML = '';
  
  gameData.blockchain_transactions.forEach(transaction => {
    const transactionElement = document.createElement('div');
    transactionElement.className = 'transaction-item';
    transactionElement.innerHTML = `
      <div>
        <div class="transaction-hash">${transaction.tx_hash}</div>
        <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-top: 4px;">
          ${transaction.item} - ${new Date(transaction.timestamp).toLocaleDateString()}
        </div>
      </div>
      <div>
        <span class="transaction-type">${transaction.type}</span>
        <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-top: 4px;">
          Gas: ${transaction.gas_fee}
        </div>
      </div>
    `;
    transactionsList.appendChild(transactionElement);
  });
}

// Marketplace functionality
function initializeMarketplace() {
  console.log('Initializing marketplace');
  const marketplaceGrid = document.getElementById('marketplace-grid');
  if (!marketplaceGrid) return;
  
  marketplaceGrid.innerHTML = '';
  
  gameData.marketplace_items.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'market-item';
    itemElement.innerHTML = `
      <div class="market-item-header">
        <h4>${item.name}</h4>
        <div class="market-price">${item.price} credits</div>
      </div>
      <div class="market-seller">Sold by ${item.seller}</div>
      <div class="market-materials">
        ${item.materials.map(material => `<span class="market-material">${material}</span>`).join('')}
      </div>
      <div class="market-quantity">${item.quantity} available</div>
      <button class="btn btn--primary" onclick="purchaseItem('${item.name}', ${item.price})">Purchase</button>
    `;
    marketplaceGrid.appendChild(itemElement);
  });
}

window.purchaseItem = function(itemName, price) {
  showLoadingOverlay("Processing purchase...");
  
  setTimeout(() => {
    hideLoadingOverlay();
    alert(`Successfully purchased ${itemName} for ${price} credits! The item will be added to your inventory.`);
  }, 1500);
};

window.filterMarketplace = function() {
  console.log("Marketplace filtering functionality");
};

// Utility functions
function showLoadingOverlay(message = "Processing...") {
  const overlay = document.getElementById('loading-overlay');
  if (!overlay) return;
  
  const messageElement = overlay.querySelector('p');
  if (messageElement) {
    messageElement.textContent = message;
  }
  overlay.classList.add('active');
}

function hideLoadingOverlay() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
}

// Add drag event listeners after DOM loads
document.addEventListener('DOMContentLoaded', function() {
  const dropZone = document.querySelector('.drop-zone');
  if (dropZone) {
    dropZone.addEventListener('dragleave', function(e) {
      e.currentTarget.classList.remove('drag-over');
    });
  }
});