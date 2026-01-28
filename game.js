// === GAME DATA - EMOJI ONLY, NO IMAGES ===
const GAME_DATA = {
    "Animal Kingdom 🦁": {
        "Mammals 🐘": [
            { name: "Elephant", emoji: "🐘" },
            { name: "Lion", emoji: "🦁" },
            { name: "Giraffe", emoji: "🦒" },
            { name: "Monkey", emoji: "🐵" }
        ],
        "Reptiles 🐍": [
            { name: "Snake", emoji: "🐍" },
            { name: "Lizard", emoji: "🦎" },
            { name: "Turtle", emoji: "🐢" },
            { name: "Crocodile", emoji: "🐊" }
        ],
        "Birds 🦅": [
            { name: "Eagle", emoji: "🦅" },
            { name: "Parrot", emoji: "🦜" },
            { name: "Owl", emoji: "🦉" },
            { name: "Penguin", emoji: "🐧" }
        ]
    },
    "Space & Planets 🚀": {
        "Planets 🪐": [
            { name: "Earth", emoji: "🌍" },
            { name: "Mars", emoji: "🪐" },
            { name: "Jupiter", emoji: "🪐" },
            { name: "Venus", emoji: "🪐" }
        ],
        "Stars ✨": [
            { name: "Sun", emoji: "☀️" },
            { name: "Shooting Star", emoji: "🌠" },
            { name: "Star", emoji: "⭐" }
        ],
        "Moons 🌙": [
            { name: "Moon", emoji: "🌙" },
            { name: "Full Moon", emoji: "🌕" },
            { name: "Crescent Moon", emoji: "🌙" }
        ]
    },
    "Under The Sea 🌊": {
        "Fish 🐠": [
            { name: "Clownfish", emoji: "🐠" },
            { name: "Goldfish", emoji: "🐡" },
            { name: "Angelfish", emoji: "🐟" },
            { name: "Shark", emoji: "🦈" }
        ],
        "Mammals 🐋": [
            { name: "Dolphin", emoji: "🐬" },
            { name: "Whale", emoji: "🐋" },
            { name: "Seal", emoji: "🦭" },
            { name: "Walrus", emoji: "🦭" }
        ],
        "Other Sea Life 🐙": [
            { name: "Octopus", emoji: "🐙" },
            { name: "Jellyfish", emoji: "🪼" },
            { name: "Starfish", emoji: "⭐" },
            { name: "Crab", emoji: "🦀" }
        ]
    },
    "Plant Kingdom 🌸": {
        "Flowers 🌺": [
            { name: "Sunflower", emoji: "🌻" },
            { name: "Rose", emoji: "🌹" },
            { name: "Tulip", emoji: "🌷" },
            { name: "Daisy", emoji: "🌼" }
        ],
        "Trees 🌳": [
            { name: "Oak Tree", emoji: "🌳" },
            { name: "Pine Tree", emoji: "🌲" },
            { name: "Palm Tree", emoji: "🌴" },
            { name: "Apple Tree", emoji: "🌳" }
        ],
        "Fruits 🍎": [
            { name: "Apple", emoji: "🍎" },
            { name: "Banana", emoji: "🍌" },
            { name: "Orange", emoji: "🍊" },
            { name: "Strawberry", emoji: "🍓" }
        ]
    },
    "Vehicle World 🚗": {
        "Air ✈️": [
            { name: "Airplane", emoji: "✈️" },
            { name: "Helicopter", emoji: "🚁" },
            { name: "Hot Air Balloon", emoji: "🎈" }
        ],
        "Land 🚗": [
            { name: "Car", emoji: "🚗" },
            { name: "Bus", emoji: "🚌" },
            { name: "Train", emoji: "🚂" }
        ],
        "Water ⛵": [
            { name: "Boat", emoji: "🚤" },
            { name: "Ship", emoji: "🚢" },
            { name: "Submarine", emoji: "🛳️" }
        ]
    }
};

// === GAME VARIABLES ===
let currentItem = null;
let score = 0;
let itemsLeftToSort = [];
let currentTopic = null;
let totalItems = 0;
let sortedItems = 0;
let droppedEmojis = {}; // Track dropped emojis per category
let autoScrollInterval = null;

// === DOM ELEMENTS ===
const draggableItem = document.getElementById('draggable-item');
const itemEmoji = document.getElementById('item-emoji');
const itemName = document.getElementById('item-name');
const dropZonesContainer = document.getElementById('drop-zones-container');
const scoreDisplay = document.getElementById('score');
const messageArea = document.getElementById('message-area');
const questionDisplay = document.getElementById('question-display');
const nextItemButton = document.getElementById('next-btn');
const topicSelectionScreen = document.getElementById('topic-selection-screen');
const mainGameScreen = document.getElementById('main-game-screen');
const topicButtonsContainer = document.getElementById('topic-buttons');
const progressBar = document.getElementById('progress-bar');
const confettiContainer = document.getElementById('confetti-container');
const loadingScreen = document.getElementById('loading-screen');
const gameContainer = document.getElementById('game-container');

// === CONFETTI CELEBRATION ===
function createConfetti() {
    confettiContainer.innerHTML = '';
    const emojis = ['🎉', '🎊', '✨', '⭐', '🌈', '🦁', '🚀', '🌸', '🍎', '🚗', '🐠', '🐬', '🐙', '🐋'];
    
    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.color = getRandomColor();
        confetti.style.fontSize = `${Math.random() * 25 + 20}px`;
        confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;
        confettiContainer.appendChild(confetti);
    }
    
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 3500);
}

function getRandomColor() {
    const colors = ['#FF6B6B', '#FFD93D', '#FF9C6B', '#6BCF7F', '#4D96FF', '#FF7EB9'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// === GAME FLOW FUNCTIONS ===
function showTopicSelection() {
    mainGameScreen.style.display = 'none';
    topicSelectionScreen.style.display = 'block';
    nextItemButton.style.display = 'none';
    document.getElementById('change-topic-btn').style.display = 'none';
    score = 0;
    sortedItems = 0;
    droppedEmojis = {}; // Reset dropped emojis
    scoreDisplay.textContent = "⭐ Score: 0 ⭐";
    progressBar.style.width = "0%";
    messageArea.textContent = "🎯 PICK A NEW ADVENTURE! 🎯";
    messageArea.className = 'feedback-correct';
    questionDisplay.textContent = "WHERE DOES THIS BELONG? 🤔";
}

function setupTopicButtons() {
    topicButtonsContainer.innerHTML = '';
    for (const topic in GAME_DATA) {
        const button = document.createElement('button');
        button.className = 'topic-btn';
        
        const topicEmoji = topic.split(' ').pop();
        
        button.innerHTML = `
            <div class="emoji">${topicEmoji}</div>
            <span>${topic}</span>
        `;
        
        button.onclick = () => startGame(topic);
        topicButtonsContainer.appendChild(button);
    }
}

function startGame(topic) {
    currentTopic = topic;
    itemsLeftToSort = [];
    droppedEmojis = {}; // Reset for new game
    
    const subCategories = GAME_DATA[topic];
    for (const subCat in subCategories) {
        droppedEmojis[subCat] = []; // Initialize empty array for each category
        subCategories[subCat].forEach(item => {
            itemsLeftToSort.push({ 
                ...item, 
                correctCategory: subCat
            });
        });
    }
    
    totalItems = itemsLeftToSort.length;
    sortedItems = 0;
    itemsLeftToSort.sort(() => Math.random() - 0.5);
    
    topicSelectionScreen.style.display = 'none';
    mainGameScreen.style.display = 'block';
    nextItemButton.style.display = 'block';
    document.getElementById('change-topic-btn').style.display = 'block';
    
    drawDropZones();
    loadNewItem();
    updateProgressBar();
}

function drawDropZones() {
    dropZonesContainer.innerHTML = '';
    const subCategories = GAME_DATA[currentTopic];
    
    for (const subCatName in subCategories) {
        const zone = document.createElement('div');
        zone.classList.add('drop-zone');
        zone.setAttribute('data-category', subCatName);
        
        // Create emoji container for dropped items
        const emojiContainer = document.createElement('div');
        emojiContainer.className = 'dropped-emojis';
        emojiContainer.id = `emojis-${subCatName.replace(/\s+/g, '-')}`;
        
        zone.innerHTML = `
            <h2>${subCatName}</h2>
            <div class="drop-indicator">🎯 DROP HERE! 🎯</div>
        `;
        
        zone.appendChild(emojiContainer);
        
        zone.addEventListener('dragover', preventDefaultAndAddClass);
        zone.addEventListener('dragleave', removeClass);
        zone.addEventListener('drop', handleDrop);
        
        dropZonesContainer.appendChild(zone);
    }
}

// ADD EMOJI TO CATEGORY TILE
function addEmojiToCategory(categoryName, emoji) {
    // Add to tracking array
    if (!droppedEmojis[categoryName]) {
        droppedEmojis[categoryName] = [];
    }
    droppedEmojis[categoryName].push(emoji);
    
    // Update display
    const categoryId = categoryName.replace(/\s+/g, '-');
    const emojiContainer = document.getElementById(`emojis-${categoryId}`);
    
    if (emojiContainer) {
        // Create new emoji element
        const emojiElement = document.createElement('div');
        emojiElement.textContent = emoji;
        emojiElement.style.animation = 'pulse 0.5s ease-in-out';
        emojiElement.style.display = 'inline-block';
        
        // Add to container
        emojiContainer.appendChild(emojiElement);
        
        // Remove animation after it completes
        setTimeout(() => {
            emojiElement.style.animation = '';
        }, 500);
    }
}

function loadNewItem() {
    if (itemsLeftToSort.length === 0) {
        endGame();
        return;
    }
    
    currentItem = itemsLeftToSort.shift();
    
    // BIG EMOJI IN THE BLOCK (NO PICTURE)
    itemEmoji.textContent = currentItem.emoji;
    
    // WORD NAME WITHOUT EMOJI
    itemName.textContent = currentItem.name;
    
    draggableItem.style.display = 'flex';
    
    questionDisplay.textContent = `WHERE DOES ${currentItem.name.toUpperCase()} BELONG? 🤔`;
    
    messageArea.textContent = `🎉 READY TO SORT! ${currentItem.emoji} DRAG ${currentItem.name.toUpperCase()} TO THE RIGHT CATEGORY! ${currentItem.emoji}`;
    messageArea.className = 'feedback-correct';
    
    draggableItem.style.animation = 'none';
    setTimeout(() => {
        draggableItem.style.animation = 'float 4s infinite ease-in-out';
    }, 10);
}

// AUTO-SCROLL FUNCTIONALITY
function startAutoScroll(direction) {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    
    autoScrollInterval = setInterval(() => {
        window.scrollBy(0, direction * 15); // Scroll 15px at a time
    }, 50); // Every 50ms
}

function stopAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
}

// Add auto-scroll on drag
draggableItem.addEventListener('drag', (e) => {
    const mouseY = e.clientY;
    const windowHeight = window.innerHeight;
    
    // If dragging near top of screen (top 100px), scroll up
    if (mouseY < 100) {
        startAutoScroll(-1); // -1 means up
    }
    // If dragging near bottom of screen (bottom 100px), scroll down
    else if (mouseY > windowHeight - 100) {
        startAutoScroll(1); // 1 means down
    }
    // Otherwise, stop scrolling
    else {
        stopAutoScroll();
    }
});

draggableItem.addEventListener('dragend', () => {
    stopAutoScroll();
});

function updateScore(isCorrect, droppedCategoryName) {
    if (isCorrect) {
        score += 10;
        sortedItems++;
        
        // ADD EMOJI TO THE CATEGORY TILE
        addEmojiToCategory(droppedCategoryName, currentItem.emoji);
        
        messageArea.innerHTML = `🎉 AWESOME! 🎉<br>${currentItem.emoji} IS A ${droppedCategoryName.split(' ')[0].toUpperCase()}! ${currentItem.emoji}`;
        messageArea.className = 'feedback-correct';
        
        createConfetti();
        
        draggableItem.style.display = 'none';
        setTimeout(loadNewItem, 1500);
        
    } else {
        score = Math.max(0, score - 5);
        messageArea.innerHTML = `😅 OOPS! 😅<br>${currentItem.emoji} IS NOT A ${droppedCategoryName.split(' ')[0].toUpperCase()}.<br>TRY AGAIN! 🔄`;
        messageArea.className = 'feedback-incorrect';
        messageArea.style.animation = 'incorrect-shake 0.5s';
        
        setTimeout(() => {
            messageArea.style.animation = '';
        }, 500);
    }
    
    scoreDisplay.textContent = `⭐ Score: ${Math.floor(score)} ⭐`;
    updateProgressBar();
}

function updateProgressBar() {
    const progress = ((totalItems - itemsLeftToSort.length) / totalItems) * 100;
    progressBar.style.width = `${progress}%`;
}

function endGame() {
    draggableItem.style.display = 'none';
    messageArea.innerHTML = `
        🏆 🏆 🏆<br>
        CHALLENGE COMPLETE!<br>
        YOU FINISHED ${currentTopic}!<br>
        FINAL SCORE: <strong>${Math.floor(score)}</strong> POINTS!<br>
        🏆 🏆 🏆
    `;
    messageArea.className = 'feedback-correct';
    nextItemButton.style.display = 'none';
    progressBar.style.width = "100%";
    questionDisplay.textContent = "🎉 YOU DID IT! 🎉";
    
    for (let i = 0; i < 5; i++) {
        setTimeout(createConfetti, i * 600);
    }
}

// === DRAG & DROP ===
function preventDefaultAndAddClass(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

function removeClass(e) {
    e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    stopAutoScroll(); // Stop scrolling when dropped

    const droppedCategoryName = e.currentTarget.getAttribute('data-category');
    const isCorrect = (droppedCategoryName === currentItem.correctCategory);
    
    updateScore(isCorrect, droppedCategoryName);
}

// === EVENT LISTENERS ===
draggableItem.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', currentItem.name);
    e.target.classList.add('dragging');
});

draggableItem.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
    stopAutoScroll();
});

// === INITIALIZE GAME ===
function initializeGame() {
    try {
        console.log("🚀 Starting game initialization...");
        
        loadingScreen.style.display = 'none';
        gameContainer.style.display = 'block';
        
        setupTopicButtons();
        
        setTimeout(() => {
            messageArea.innerHTML = "🌈 WELCOME TO SUPER SORTING SAFARI! 🌈<br>PICK AN ADVENTURE TO BEGIN! 🎮";
        }, 500);
        
    } catch (error) {
        console.error("❌ Error loading game:", error);
        loadingScreen.style.display = 'none';
        gameContainer.style.display = 'block';
        setupTopicButtons();
        messageArea.innerHTML = "🌈 WELCOME TO SUPER SORTING SAFARI! 🌈<br>PICK AN ADVENTURE TO BEGIN! 🎮";
    }
}

// === START GAME WHEN PAGE LOADS ===
document.addEventListener('DOMContentLoaded', initializeGame);
window.addEventListener('load', initializeGame);

// Backup initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGame);
} else {
    initializeGame();
}
