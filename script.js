// Initial State
let bananas = 0;
let lettersTyped = 0;
let wordsTyped = 0;

// DOM Elements
const bananasEl = document.getElementById('bananas');
const lettersEl = document.getElementById('letters');
const wordsEl = document.getElementById('words');
const outputArea = document.getElementById('output-area');
const typeButton = document.getElementById('type-button');

// Alphabet for random generation
const alphabet = "abcdefghijklmnopqrstuvwxyz";

function updateDisplay() {
    bananasEl.textContent = bananas;
    lettersEl.textContent = lettersTyped;
    wordsEl.textContent = wordsTyped;
}

function handleType() {
    // Clear placeholder on first click
    if (outputArea.querySelector('.placeholder')) {
        outputArea.innerHTML = '';
    }

    // Generate random letter
    const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
    
    // Create element for character
    const charSpan = document.createElement('span');
    charSpan.textContent = randomChar;
    outputArea.appendChild(charSpan);

    // Update letters stat
    lettersTyped++;

    // World Logic: Check for words
    const currentText = outputArea.innerText.toLowerCase().replace(/\s/g, '');
    const dictionary = ['monkey', 'banana', 'business', 'type', 'ape', 'jungle'];
    
    dictionary.forEach(word => {
        if (currentText.endsWith(word)) {
            wordsTyped++;
            bananas += word.length * 10;
            
            // Visual feedback for word completion
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word-found';
            wordSpan.textContent = ` [${word.toUpperCase()}! +${word.length * 10}] `;
            outputArea.appendChild(wordSpan);
        }
    });
    
    // Limit visible characters to keep UI clean (scroll or clear logic can go here later)
    if (outputArea.childNodes.length > 50) {
        outputArea.removeChild(outputArea.firstChild);
    }

    updateDisplay();
}

// Event Listeners
typeButton.addEventListener('click', handleType);
