const SAVE_KEY = 'monkey-business-save-v2';
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const minWordLength = 3;
const maxOutputNodes = 140;
const maxSavedStreamLength = 250;
const recentWordLimit = 12;

const fallbackWords = ['ape', 'bad', 'bag', 'ban', 'bar', 'bat', 'bee', 'big', 'bun', 'bus', 'cat', 'dog', 'fun', 'hat', 'jam', 'man', 'map', 'monkey', 'nap', 'pen', 'run', 'sun', 'tag', 'tan', 'tap', 'top', 'van', 'win', 'zoo'];
const wordList = Array.isArray(window.MONKEY_WORDS) && window.MONKEY_WORDS.length > 0
    ? window.MONKEY_WORDS
    : fallbackWords;

const wordsByLength = new Map();
let maxWordLength = minWordLength;

wordList.forEach((word) => {
    const cleanWord = String(word).trim().toLowerCase();

    if (!/^[a-z]+$/.test(cleanWord) || cleanWord.length < minWordLength) {
        return;
    }

    if (!wordsByLength.has(cleanWord.length)) {
        wordsByLength.set(cleanWord.length, new Set());
    }

    wordsByLength.get(cleanWord.length).add(cleanWord);
    maxWordLength = Math.max(maxWordLength, cleanWord.length);
});

let bananas = 0;
let lettersTyped = 0;
let wordsTyped = 0;
let monkeysOwned = 0;
let monkeyCost = 50;
let typedStream = '';
let recentWords = [];

const bananasEl = document.getElementById('bananas');
const lettersEl = document.getElementById('letters');
const wordsEl = document.getElementById('words');
const monkeysEl = document.getElementById('monkeys');
const monkeyCostEl = document.getElementById('monkey-cost');
const outputArea = document.getElementById('output-area');
const typeButton = document.getElementById('type-button');
const resetButton = document.getElementById('reset-button');
const buyMonkeyButton = document.getElementById('buy-monkey-button');
const recentWordsList = document.getElementById('recent-words-list');
const dictionaryStatus = document.getElementById('dictionary-status');

function formatNumber(value) {
    return Math.floor(value).toLocaleString();
}

function updateDisplay() {
    bananasEl.textContent = formatNumber(bananas);
    lettersEl.textContent = formatNumber(lettersTyped);
    wordsEl.textContent = formatNumber(wordsTyped);
    monkeysEl.textContent = formatNumber(monkeysOwned);
    monkeyCostEl.textContent = formatNumber(monkeyCost);

    buyMonkeyButton.disabled = bananas < monkeyCost;
    buyMonkeyButton.classList.toggle('can-afford', bananas >= monkeyCost);

    if (recentWords.length === 0) {
        recentWordsList.innerHTML = '<span class="empty-state">No words yet.</span>';
    } else {
        recentWordsList.innerHTML = recentWords
            .map((entry) => `<span class="recent-word">${entry.word} <strong>+${entry.points}</strong></span>`)
            .join('');
    }

    dictionaryStatus.textContent = `${formatNumber(getDictionaryWordCount())} dictionary words loaded. Random letters only — no forced words.`;
}

function getDictionaryWordCount() {
    let total = 0;
    wordsByLength.forEach((wordSet) => {
        total += wordSet.size;
    });
    return total;
}

function clearPlaceholder() {
    if (outputArea.querySelector('.placeholder')) {
        outputArea.innerHTML = '';
    }
}

function appendOutputLetter(letter, source = 'player') {
    clearPlaceholder();

    const charSpan = document.createElement('span');
    charSpan.className = source === 'monkey' ? 'typed-char monkey-char' : 'typed-char';
    charSpan.textContent = letter;
    outputArea.appendChild(charSpan);

    trimOutputArea();
}

function appendWordReward(word, points) {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'word-found';
    wordSpan.textContent = ` ${word.toUpperCase()} +${points} 🍌 `;
    outputArea.appendChild(wordSpan);

    trimOutputArea();
}

function trimOutputArea() {
    while (outputArea.childNodes.length > maxOutputNodes) {
        outputArea.removeChild(outputArea.firstChild);
    }

    outputArea.scrollTop = outputArea.scrollHeight;
}

function findNewWordsAtEnd() {
    const foundWords = [];
    const longestPossibleWord = Math.min(maxWordLength, typedStream.length);

    for (let length = minWordLength; length <= longestPossibleWord; length++) {
        const wordSet = wordsByLength.get(length);

        if (!wordSet) {
            continue;
        }

        const candidate = typedStream.slice(-length);

        if (wordSet.has(candidate)) {
            foundWords.push(candidate);
        }
    }

    return foundWords;
}

function awardWords(words) {
    words.forEach((word) => {
        const points = word.length;
        bananas += points;
        wordsTyped += 1;
        recentWords.unshift({ word, points });
        appendWordReward(word, points);
    });

    recentWords = recentWords.slice(0, recentWordLimit);
}

function typeRandomLetter(source = 'player') {
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];

    typedStream += randomLetter;
    if (typedStream.length > maxSavedStreamLength) {
        typedStream = typedStream.slice(-maxSavedStreamLength);
    }

    lettersTyped += 1;
    appendOutputLetter(randomLetter, source);

    const foundWords = findNewWordsAtEnd();
    if (foundWords.length > 0) {
        awardWords(foundWords);
    }

    updateDisplay();
    saveGame();
}

function buyMonkey() {
    if (bananas < monkeyCost) {
        return;
    }

    bananas -= monkeyCost;
    monkeysOwned += 1;
    monkeyCost = Math.ceil(monkeyCost * 1.55);

    updateDisplay();
    saveGame();
}

function runMonkeyTyping() {
    if (monkeysOwned <= 0) {
        return;
    }

    for (let i = 0; i < monkeysOwned; i++) {
        typeRandomLetter('monkey');
    }
}

function saveGame() {
    const saveData = {
        bananas,
        lettersTyped,
        wordsTyped,
        monkeysOwned,
        monkeyCost,
        typedStream,
        recentWords,
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
}

function loadGame() {
    const rawSave = localStorage.getItem(SAVE_KEY);

    if (!rawSave) {
        return;
    }

    try {
        const saveData = JSON.parse(rawSave);

        bananas = Number(saveData.bananas) || 0;
        lettersTyped = Number(saveData.lettersTyped) || 0;
        wordsTyped = Number(saveData.wordsTyped) || 0;
        monkeysOwned = Number(saveData.monkeysOwned) || 0;
        monkeyCost = Number(saveData.monkeyCost) || 50;
        typedStream = typeof saveData.typedStream === 'string' ? saveData.typedStream.slice(-maxSavedStreamLength) : '';
        recentWords = Array.isArray(saveData.recentWords) ? saveData.recentWords.slice(0, recentWordLimit) : [];
    } catch (error) {
        console.warn('Could not load saved Monkey Business game.', error);
        localStorage.removeItem(SAVE_KEY);
    }
}

function resetGame() {
    const shouldReset = window.confirm('Reset Monkey Business and clear your saved bananas, words, and monkeys?');

    if (!shouldReset) {
        return;
    }

    bananas = 0;
    lettersTyped = 0;
    wordsTyped = 0;
    monkeysOwned = 0;
    monkeyCost = 50;
    typedStream = '';
    recentWords = [];

    localStorage.removeItem(SAVE_KEY);
    outputArea.innerHTML = '<span class="placeholder">Click “Type” to begin...</span>';
    updateDisplay();
}

typeButton.addEventListener('click', () => typeRandomLetter('player'));
buyMonkeyButton.addEventListener('click', buyMonkey);
resetButton.addEventListener('click', resetGame);

loadGame();
updateDisplay();
setInterval(runMonkeyTyping, 2000);
