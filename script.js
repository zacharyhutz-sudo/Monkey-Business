const SAVE_KEY = 'monkey-business-save-v8';
const LEGACY_SAVE_KEYS = ['monkey-business-save-v7', 'monkey-business-save-v5', 'monkey-business-save-v4', 'monkey-business-save-v3', 'monkey-business-save-v2'];
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const minWordLength = 3;
const maxOutputNodes = 140;
const maxSavedStreamLength = 250;
const recentWordLimit = 12;
const monkeyTypingIntervalMs = 2000;
const monkeyAnimationDurationMs = 480;

const fallbackWords = ['ape', 'bad', 'bag', 'ban', 'bar', 'bat', 'bee', 'big', 'bun', 'bus', 'cat', 'dog', 'fun', 'hat', 'jam', 'man', 'map', 'monkey', 'nap', 'pen', 'run', 'sun', 'tag', 'tan', 'tap', 'top', 'van', 'win', 'zoo'];
const wordList = Array.isArray(window.MONKEY_WORDS) && window.MONKEY_WORDS.length > 0
    ? window.MONKEY_WORDS
    : fallbackWords;

const MONKEY_TYPES = [
    { id: 'amber-tie', fur: '#7b4b2f', face: '#ddb38c', shirt: '#f6c445', accent: '#d94f35', accessory: 'tie', hat: 'none', glasses: false, headset: false, tuft: false, stripe: false, pocket: false },
    { id: 'teal-visor', fur: '#6d4329', face: '#d4ab82', shirt: '#57c4c2', accent: '#2b7f88', accessory: 'none', hat: 'visor', glasses: false, headset: false, tuft: true, stripe: false, pocket: true },
    { id: 'purple-glasses', fur: '#76503a', face: '#e1b792', shirt: '#9878ff', accent: '#5038b8', accessory: 'bowtie', hat: 'none', glasses: true, headset: false, tuft: false, stripe: false, pocket: false },
    { id: 'forest-headset', fur: '#5d3f2c', face: '#d6ab7f', shirt: '#67b357', accent: '#2a6239', accessory: 'none', hat: 'none', glasses: false, headset: true, tuft: false, stripe: false, pocket: false },
    { id: 'sunset-cap', fur: '#8b5838', face: '#e4bd93', shirt: '#ff8e64', accent: '#c7512f', accessory: 'badge', hat: 'cap', glasses: false, headset: false, tuft: false, stripe: true, pocket: false },
    { id: 'sky-suspenders', fur: '#725240', face: '#e1bc94', shirt: '#9cd6ff', accent: '#3a79b7', accessory: 'suspenders', hat: 'none', glasses: false, headset: false, tuft: true, stripe: false, pocket: false },
    { id: 'berry-beanie', fur: '#6f4732', face: '#d8af87', shirt: '#eb6fa1', accent: '#9d2b62', accessory: 'none', hat: 'beanie', glasses: false, headset: false, tuft: false, stripe: false, pocket: true },
    { id: 'mint-bow', fur: '#7a5037', face: '#e0b48b', shirt: '#81d8b0', accent: '#2c8c66', accessory: 'bow', hat: 'none', glasses: false, headset: false, tuft: false, stripe: false, pocket: false },
    { id: 'navy-vest', fur: '#644330', face: '#d8ab80', shirt: '#6f85d6', accent: '#31448c', accessory: 'vest', hat: 'none', glasses: false, headset: false, tuft: true, stripe: false, pocket: false },
    { id: 'gold-flower', fur: '#865239', face: '#e2b78e', shirt: '#f2d15b', accent: '#b7860f', accessory: 'flower', hat: 'none', glasses: false, headset: false, tuft: false, stripe: false, pocket: true },
    { id: 'orchid-scarf', fur: '#744936', face: '#ddb089', shirt: '#c38cff', accent: '#7f42c1', accessory: 'scarf', hat: 'none', glasses: false, headset: false, tuft: false, stripe: true, pocket: false },
    { id: 'lime-headset', fur: '#68452f', face: '#d9af82', shirt: '#b9db58', accent: '#668423', accessory: 'none', hat: 'none', glasses: false, headset: true, tuft: true, stripe: false, pocket: false },
    { id: 'rose-glasses', fur: '#7b4f39', face: '#e0b48d', shirt: '#f39ab5', accent: '#a73d60', accessory: 'tie', hat: 'none', glasses: true, headset: false, tuft: false, stripe: false, pocket: false },
    { id: 'ocean-cap', fur: '#5f3e2b', face: '#d4ab82', shirt: '#6db5ff', accent: '#2160b1', accessory: 'none', hat: 'cap', glasses: false, headset: false, tuft: false, stripe: false, pocket: true },
    { id: 'cocoa-bowtie', fur: '#8a5a40', face: '#e5bb94', shirt: '#d8b07c', accent: '#814f25', accessory: 'bowtie', hat: 'none', glasses: false, headset: false, tuft: true, stripe: false, pocket: false },
    { id: 'jade-patch', fur: '#6c4631', face: '#d8ad83', shirt: '#4ed0b1', accent: '#1d8b78', accessory: 'badge', hat: 'none', glasses: false, headset: false, tuft: false, stripe: true, pocket: false },
    { id: 'crimson-beanie', fur: '#734731', face: '#dcae84', shirt: '#f16c5b', accent: '#a13128', accessory: 'scarf', hat: 'beanie', glasses: false, headset: false, tuft: false, stripe: false, pocket: false },
    { id: 'silver-visor', fur: '#705142', face: '#dfb890', shirt: '#ccd7df', accent: '#6c7f8d', accessory: 'vest', hat: 'visor', glasses: false, headset: false, tuft: true, stripe: false, pocket: false },
    { id: 'peach-flower', fur: '#885742', face: '#e9bf98', shirt: '#ffb37f', accent: '#c46824', accessory: 'flower', hat: 'none', glasses: false, headset: false, tuft: false, stripe: false, pocket: true },
    { id: 'midnight-headset', fur: '#55392b', face: '#cf9f76', shirt: '#6370c7', accent: '#252b70', accessory: 'suspenders', hat: 'none', glasses: false, headset: true, tuft: false, stripe: false, pocket: false }
];

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
let monkeyRoster = [];
const monkeyAnimationTimeouts = new Map();
let pendingMonkeyTypeTimeouts = [];

const bananasEl = document.getElementById('bananas');
const lettersEl = document.getElementById('letters');
const wordsEl = document.getElementById('words');
const monkeysEl = document.getElementById('monkeys');
const monkeyCostEl = document.getElementById('monkey-cost');
const monkeyCostInlineEl = document.getElementById('monkey-cost-inline');
const outputArea = document.getElementById('output-area');
const typeButton = document.getElementById('type-button');
const resetButton = document.getElementById('reset-button');
const buyMonkeyButton = document.getElementById('buy-monkey-button');
const recentWordsList = document.getElementById('recent-words-list');
const dictionaryStatus = document.getElementById('dictionary-status');
const monkeyOfficeGrid = document.getElementById('monkey-office-grid');
const monkeyOfficeSummary = document.getElementById('monkey-office-summary');
const floatingRewardsLayer = document.getElementById('floating-rewards-layer');

function formatNumber(value) {
    return Math.floor(value).toLocaleString();
}

function getDictionaryWordCount() {
    let total = 0;
    wordsByLength.forEach((wordSet) => {
        total += wordSet.size;
    });
    return total;
}

function getDisplayWord(word, maxLength = 10) {
    const cleanWord = String(word);
    if (cleanWord.length <= maxLength) {
        return cleanWord;
    }
    return `${cleanWord.slice(0, maxLength - 1)}…`;
}


function getMonkeyType(typeId) {
    return MONKEY_TYPES.find((type) => type.id === typeId) || MONKEY_TYPES[0];
}

function getRandomMonkeyTypeId() {
    const randomIndex = Math.floor(Math.random() * MONKEY_TYPES.length);
    return MONKEY_TYPES[randomIndex].id;
}

function ensureMonkeyRosterMatchesCount() {
    if (!Array.isArray(monkeyRoster)) {
        monkeyRoster = [];
    }

    while (monkeyRoster.length < monkeysOwned) {
        monkeyRoster.push(getRandomMonkeyTypeId());
    }

    if (monkeyRoster.length > monkeysOwned) {
        monkeyRoster = monkeyRoster.slice(0, monkeysOwned);
    }
}


function syncOfficeVisuals(force = false) {
    const renderedMonkeyCount = monkeyOfficeGrid.querySelectorAll('[data-monkey-slot]').length;
    const hasEmptyState = Boolean(monkeyOfficeGrid.querySelector('.office-empty-state'));

    if (force || renderedMonkeyCount !== monkeysOwned || (monkeysOwned === 0 && !hasEmptyState)) {
        renderMonkeyOffice();
        return;
    }

    monkeyOfficeSummary.textContent = monkeysOwned === 0
        ? 'No monkeys hired yet.'
        : `${formatNumber(monkeysOwned)} monkey${monkeysOwned === 1 ? '' : 's'} in the office`;
}

function updateDisplay() {
    bananasEl.textContent = formatNumber(bananas);
    lettersEl.textContent = formatNumber(lettersTyped);
    wordsEl.textContent = formatNumber(wordsTyped);
    monkeysEl.textContent = formatNumber(monkeysOwned);
    monkeyCostEl.textContent = formatNumber(monkeyCost);
    monkeyCostInlineEl.textContent = formatNumber(monkeyCost);

    buyMonkeyButton.disabled = bananas < monkeyCost;
    buyMonkeyButton.classList.toggle('can-afford', bananas >= monkeyCost);

    if (recentWords.length === 0) {
        recentWordsList.innerHTML = '<span class="empty-state">No words yet.</span>';
    } else {
        recentWordsList.innerHTML = recentWords
            .map((entry) => `<span class="recent-word">${getDisplayWord(entry.word)} <strong>+${entry.points}</strong></span>`)
            .join('');
    }

    syncOfficeVisuals();
    dictionaryStatus.textContent = `${formatNumber(getDictionaryWordCount())} words loaded`;
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
    wordSpan.textContent = ` ${getDisplayWord(word).toUpperCase()} +${points} 🍌 `;
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

function spawnFloatingReward(points, word) {
    if (!floatingRewardsLayer) {
        return;
    }

    const reward = document.createElement('span');
    reward.className = 'float-reward';
    reward.textContent = `+${points} 🍌 ${getDisplayWord(word).toUpperCase()}`;
    reward.style.left = `${26 + Math.random() * 48}%`;
    reward.style.bottom = `${52 + Math.random() * 24}px`;
    floatingRewardsLayer.appendChild(reward);

    setTimeout(() => {
        reward.remove();
    }, 1200);
}

function awardWords(words) {
    words.forEach((word) => {
        const points = word.length;
        bananas += points;
        wordsTyped += 1;
        recentWords.unshift({ word, points });
        appendWordReward(word, points);
        spawnFloatingReward(points, word);
    });

    recentWords = recentWords.slice(0, recentWordLimit);
}

function animateMonkey(monkeyIndex, letter) {
    if (monkeysOwned <= 0) {
        return;
    }

    let targetIndex = typeof monkeyIndex === 'number' ? monkeyIndex : Math.floor(Math.random() * monkeysOwned);

    if (targetIndex < 0 || targetIndex >= monkeysOwned) {
        targetIndex = Math.floor(Math.random() * monkeysOwned);
    }

    const monkeyEl = monkeyOfficeGrid.querySelector(`[data-monkey-slot="${targetIndex}"]`);
    if (!monkeyEl) {
        return;
    }

    const bubble = monkeyEl.querySelector('.letter-bubble');
    if (bubble) {
        bubble.textContent = String(letter).toUpperCase();
    }

    monkeyEl.classList.remove('typing');
    void monkeyEl.offsetWidth;
    monkeyEl.classList.add('typing');

    if (monkeyAnimationTimeouts.has(targetIndex)) {
        clearTimeout(monkeyAnimationTimeouts.get(targetIndex));
    }

    const timeoutId = setTimeout(() => {
        monkeyEl.classList.remove('typing');
        if (bubble) {
            bubble.textContent = '';
        }
        monkeyAnimationTimeouts.delete(targetIndex);
    }, monkeyAnimationDurationMs);

    monkeyAnimationTimeouts.set(targetIndex, timeoutId);
}

function typeRandomLetter(source = 'player', monkeyIndex = null) {
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];

    typedStream += randomLetter;
    if (typedStream.length > maxSavedStreamLength) {
        typedStream = typedStream.slice(-maxSavedStreamLength);
    }

    lettersTyped += 1;
    appendOutputLetter(randomLetter, source);
    animateMonkey(monkeyIndex, randomLetter);

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
    monkeyRoster.push(getRandomMonkeyTypeId());
    monkeyCost = Math.ceil(monkeyCost * 1.55);

    updateDisplay();
    saveGame();

    requestAnimationFrame(() => {
        animateMonkey(monkeysOwned - 1, '!');
    });
}

function clearPendingMonkeyTyping() {
    pendingMonkeyTypeTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    pendingMonkeyTypeTimeouts = [];
}

function runMonkeyTyping() {
    if (monkeysOwned <= 0) {
        return;
    }

    clearPendingMonkeyTyping();

    monkeyRoster.forEach((_, index) => {
        const delay = Math.min(index * 90, 900);
        const timeoutId = setTimeout(() => {
            typeRandomLetter('monkey', index);
        }, delay);

        pendingMonkeyTypeTimeouts.push(timeoutId);
    });
}

function renderMonkeyOffice() {
    ensureMonkeyRosterMatchesCount();

    if (monkeysOwned === 0) {
        monkeyOfficeSummary.textContent = 'No monkeys hired yet.';
        monkeyOfficeGrid.innerHTML = `
            <div class="office-empty-state">
                <span class="office-empty-emoji" aria-hidden="true">🐒</span>
                <p>Hire your first monkey to fill the office.</p>
            </div>
        `;
        return;
    }

    monkeyOfficeSummary.textContent = `${formatNumber(monkeysOwned)} monkey${monkeysOwned === 1 ? '' : 's'} in the office`;
    monkeyOfficeGrid.innerHTML = monkeyRoster
        .map((typeId, index) => {
            const monkeyType = getMonkeyType(typeId);
            return `
                <div class="office-monkey" data-monkey-slot="${index}" aria-label="Monkey ${index + 1}">
                    <span class="letter-bubble" aria-hidden="true"></span>
                    <div class="office-monkey-art">
                        ${createMonkeySvg(monkeyType)}
                    </div>
                    <span class="monkey-badge">#${index + 1}</span>
                </div>
            `;
        })
        .join('');
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
        monkeyRoster,
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    LEGACY_SAVE_KEYS.forEach((key) => {
        if (key !== SAVE_KEY) {
            localStorage.removeItem(key);
        }
    });
}

function loadGame() {
    const availableKeys = [SAVE_KEY, ...LEGACY_SAVE_KEYS];
    let rawSave = null;

    for (const key of availableKeys) {
        rawSave = localStorage.getItem(key);
        if (rawSave) {
            break;
        }
    }

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
        monkeyRoster = Array.isArray(saveData.monkeyRoster) ? saveData.monkeyRoster.filter((typeId) => typeof typeId === 'string') : [];

        ensureMonkeyRosterMatchesCount();
    } catch (error) {
        console.warn('Could not load saved Monkey Business game.', error);
        availableKeys.forEach((key) => localStorage.removeItem(key));
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
    monkeyRoster = [];

    monkeyAnimationTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    monkeyAnimationTimeouts.clear();
    clearPendingMonkeyTyping();

    [SAVE_KEY, ...LEGACY_SAVE_KEYS].forEach((key) => localStorage.removeItem(key));
    outputArea.innerHTML = '<span class="placeholder">Tap TYPE to begin...</span>';
    if (floatingRewardsLayer) {
        floatingRewardsLayer.innerHTML = '';
    }
    updateDisplay();
}

function createMonkeySvg(monkeyType) {
    const fur = monkeyType.fur;
    const face = monkeyType.face;
    const shirt = monkeyType.shirt;
    const accent = monkeyType.accent;
    const darkFur = shadeColor(fur, -18);
    const lightShirt = shadeColor(shirt, 16);

    const rect = (x, y, w, h, fill, className = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"${className ? ` class="${className}"` : ''} />`;
    const parts = [];

    parts.push(rect(0, 23, 32, 5, '#cabca9', 'office-floor'));
    parts.push(rect(4, 20, 24, 2, '#6e5238', 'desk-top'));
    parts.push(rect(6, 22, 2, 4, '#87664a', 'desk-leg'));
    parts.push(rect(24, 22, 2, 4, '#87664a', 'desk-leg'));
    parts.push(rect(11, 15, 10, 4, '#505b67', 'typewriter-body'));
    parts.push(rect(12, 14, 8, 1, '#7b8794', 'typewriter-top'));
    parts.push(rect(14, 12, 4, 2, '#f8f4ec', 'typewriter-paper'));
    parts.push(rect(12, 18, 8, 1, '#2f3740', 'typewriter-keys'));

    parts.push(rect(8, 7, 4, 4, fur));
    parts.push(rect(20, 7, 4, 4, fur));
    parts.push(rect(10, 4, 12, 11, fur));
    parts.push(rect(12, 6, 8, 7, face));
    parts.push(rect(13, 7, 2, 2, '#181512'));
    parts.push(rect(17, 7, 2, 2, '#181512'));
    parts.push(rect(15, 9, 2, 1, darkFur));
    parts.push(rect(14, 10, 4, 1, '#9b5c54'));
    parts.push(rect(11, 5, 10, 1, darkFur));

    if (monkeyType.tuft) {
        parts.push(rect(15, 2, 2, 2, darkFur));
        parts.push(rect(14, 3, 4, 1, darkFur));
    }

    if (monkeyType.glasses) {
        parts.push(rect(12, 7, 3, 2, '#1b1e26'));
        parts.push(rect(17, 7, 3, 2, '#1b1e26'));
        parts.push(rect(15, 7, 2, 1, '#1b1e26'));
    }

    if (monkeyType.headset) {
        parts.push(rect(9, 6, 1, 5, '#29323a'));
        parts.push(rect(22, 6, 1, 5, '#29323a'));
        parts.push(rect(10, 4, 12, 1, '#29323a'));
        parts.push(rect(21, 10, 2, 1, accent));
    }

    if (monkeyType.hat === 'cap') {
        parts.push(rect(11, 2, 10, 3, accent));
        parts.push(rect(18, 5, 5, 1, accent));
    } else if (monkeyType.hat === 'beanie') {
        parts.push(rect(11, 2, 10, 3, accent));
        parts.push(rect(12, 1, 8, 1, lightShirt));
    } else if (monkeyType.hat === 'visor') {
        parts.push(rect(11, 3, 10, 2, accent));
        parts.push(rect(17, 5, 6, 1, accent));
    }

    parts.push(rect(10, 15, 12, 6, shirt));
    parts.push(rect(8, 15, 3, 5, fur));
    parts.push(rect(21, 15, 3, 5, fur));
    parts.push(rect(12, 21, 2, 3, fur));
    parts.push(rect(18, 21, 2, 3, fur));

    if (monkeyType.stripe) {
        parts.push(rect(10, 17, 12, 1, lightShirt));
        parts.push(rect(10, 19, 12, 1, lightShirt));
    }

    if (monkeyType.pocket) {
        parts.push(rect(18, 17, 3, 3, lightShirt));
    }

    switch (monkeyType.accessory) {
        case 'tie':
            parts.push(rect(15, 15, 2, 4, accent));
            parts.push(rect(14, 18, 4, 2, accent));
            break;
        case 'bowtie':
            parts.push(rect(13, 15, 2, 2, accent));
            parts.push(rect(17, 15, 2, 2, accent));
            parts.push(rect(15, 15, 2, 2, shadeColor(accent, -12)));
            break;
        case 'bow':
            parts.push(rect(11, 5, 2, 2, accent));
            parts.push(rect(14, 5, 2, 2, accent));
            parts.push(rect(13, 5, 1, 1, '#f8d978'));
            break;
        case 'badge':
            parts.push(rect(18, 16, 2, 2, '#ffe082'));
            parts.push(rect(18, 18, 2, 1, '#cc8c00'));
            break;
        case 'suspenders':
            parts.push(rect(12, 15, 1, 6, accent));
            parts.push(rect(19, 15, 1, 6, accent));
            break;
        case 'vest':
            parts.push(rect(11, 15, 3, 6, accent));
            parts.push(rect(18, 15, 3, 6, accent));
            break;
        case 'flower':
            parts.push(rect(20, 6, 2, 2, '#ff5f83'));
            parts.push(rect(21, 8, 1, 2, '#2ca25f'));
            break;
        case 'scarf':
            parts.push(rect(12, 15, 8, 2, accent));
            parts.push(rect(17, 16, 2, 4, accent));
            break;
        default:
            break;
    }

    return `
        <svg viewBox="0 0 32 28" class="monkey-svg" role="img" aria-hidden="true" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
            ${parts.join('')}
        </svg>
    `;
}

function shadeColor(hex, percent) {
    const safeHex = hex.replace('#', '');
    const value = parseInt(safeHex, 16);
    const amount = Math.round(2.55 * percent);
    const r = Math.max(0, Math.min(255, (value >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((value >> 8) & 0x00ff) + amount));
    const b = Math.max(0, Math.min(255, (value & 0x0000ff) + amount));
    return `#${(0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1)}`;
}

function preventDoubleTapZoom() {
    let lastTouchEnd = 0;

    document.addEventListener('touchend', (event) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });
}

typeButton.addEventListener('click', () => typeRandomLetter('player'));
buyMonkeyButton.addEventListener('click', buyMonkey);
resetButton.addEventListener('click', resetGame);

preventDoubleTapZoom();
loadGame();
syncOfficeVisuals(true);
updateDisplay();
setInterval(runMonkeyTyping, monkeyTypingIntervalMs);
