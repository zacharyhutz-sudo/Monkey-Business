const SAVE_KEY = 'monkey-business-save-v10';
const LEGACY_SAVE_KEYS = ['monkey-business-save-v9', 'monkey-business-save-v8', 'monkey-business-save-v7', 'monkey-business-save-v5', 'monkey-business-save-v4', 'monkey-business-save-v3', 'monkey-business-save-v2'];
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
    { id: 'bongo-banks', name: 'Bongo Banks', sprite: 'monkeys/bongo-banks.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'milton-margins', name: 'Milton Margins', sprite: 'monkeys/milton-margins.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'quincy-quill', name: 'Quincy Quill', sprite: 'monkeys/quincy-quill.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'poppy-pages', name: 'Poppy Pages', sprite: 'monkeys/poppy-pages.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'beanie-bits', name: 'Beanie Bits', sprite: 'monkeys/beanie-bits.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'violet-vim', name: 'Violet Vim', sprite: 'monkeys/violet-vim.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'sunny-shades', name: 'Sunny Shades', sprite: 'monkeys/sunny-shades.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'capper-click', name: 'Capper Click', sprite: 'monkeys/capper-click.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'dreamer-desk', name: 'Dreamer Desk', sprite: 'monkeys/dreamer-desk.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'echo-ears', name: 'Echo Ears', sprite: 'monkeys/echo-ears.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'cedar-collar', name: 'Cedar Collar', sprite: 'monkeys/cedar-collar.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'mabel-memo', name: 'Mabel Memo', sprite: 'monkeys/mabel-memo.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'professor-peel', name: 'Professor Peel', sprite: 'monkeys/professor-peel.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'curl-carter', name: 'Curl Carter', sprite: 'monkeys/curl-carter.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'captain-carbons', name: 'Captain Carbons', sprite: 'monkeys/captain-carbons.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'lulu-ledger', name: 'Lulu Ledger', sprite: 'monkeys/lulu-ledger.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'mustache-morse', name: 'Mustache Morse', sprite: 'monkeys/mustache-morse.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'ollie-offset', name: 'Ollie Offset', sprite: 'monkeys/ollie-offset.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'sweater-sam', name: 'Sweater Sam', sprite: 'monkeys/sweater-sam.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'tango-tie', name: 'Tango Tie', sprite: 'monkeys/tango-tie.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'baron-bowler', name: 'Baron Bowler', sprite: 'monkeys/baron-bowler.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'gadget-gus', name: 'Gadget Gus', sprite: 'monkeys/gadget-gus.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'pencil-pam', name: 'Pencil Pam', sprite: 'monkeys/pencil-pam.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'harvey-highlight', name: 'Harvey Highlight', sprite: 'monkeys/harvey-highlight.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'sterling-steno', name: 'Sterling Steno', sprite: 'monkeys/sterling-steno.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'scout-script', name: 'Scout Script', sprite: 'monkeys/scout-script.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'olive-orbit', name: 'Olive Orbit', sprite: 'monkeys/olive-orbit.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'dapper-dawn', name: 'Dapper Dawn', sprite: 'monkeys/dapper-dawn.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'pearl-pixel', name: 'Pearl Pixel', sprite: 'monkeys/pearl-pixel.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'dr-hush', name: 'Dr. Hush', sprite: 'monkeys/dr-hush.png', rarity: 'normal', speedMultiplier: 1 },
    { id: 'auric-ace', name: 'Auric Ace', sprite: 'monkeys/auric-ace.png', rarity: 'super-rare', speedMultiplier: 5 },
    { id: 'super-sonny', name: 'Super Sonny', sprite: 'monkeys/super-sonny.png', rarity: 'super-rare', speedMultiplier: 5 },
    { id: 'nova-nimbus', name: 'Nova Nimbus', sprite: 'monkeys/nova-nimbus.png', rarity: 'super-rare', speedMultiplier: 5 },
    { id: 'king-keystroke', name: 'King Keystroke', sprite: 'monkeys/king-keystroke.png', rarity: 'super-rare', speedMultiplier: 5 },
    { id: 'merlin-margin', name: 'Merlin Margin', sprite: 'monkeys/merlin-margin.png', rarity: 'super-rare', speedMultiplier: 5 },
    { id: 'halo-hugo', name: 'Halo Hugo', sprite: 'monkeys/halo-hugo.png', rarity: 'super-rare', speedMultiplier: 5 },
    { id: 'crystal-clack', name: 'Crystal Clack', sprite: 'monkeys/crystal-clack.png', rarity: 'super-rare', speedMultiplier: 5 },
    { id: 'robo-ribbon', name: 'Robo Ribbon', sprite: 'monkeys/robo-ribbon.png', rarity: 'super-rare', speedMultiplier: 5 },
    { id: 'volt-victor', name: 'Volt Victor', sprite: 'monkeys/volt-victor.png', rarity: 'super-rare', speedMultiplier: 5 },
    { id: 'sultan-scroll', name: 'Sultan Scroll', sprite: 'monkeys/sultan-scroll.png', rarity: 'super-rare', speedMultiplier: 5 }
];

const normalMonkeyTypeIds = MONKEY_TYPES.filter((type) => type.rarity === 'normal').map((type) => type.id);
const superRareMonkeyTypeIds = MONKEY_TYPES.filter((type) => type.rarity === 'super-rare').map((type) => type.id);

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

function getRandomFromList(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function getUnusedTypeIds(poolIds) {
    const usedTypeIds = new Set(monkeyRoster.filter((typeId) => poolIds.includes(typeId)));
    const unused = poolIds.filter((typeId) => !usedTypeIds.has(typeId));
    return unused.length > 0 ? unused : poolIds;
}

function getRandomMonkeyTypeId() {
    const isSuperRareRoll = Math.random() < 0.10;
    const sourcePool = isSuperRareRoll ? superRareMonkeyTypeIds : normalMonkeyTypeIds;
    return getRandomFromList(getUnusedTypeIds(sourcePool));
}

function normalizeRosterEntry(entry) {
    if (typeof entry === 'string') {
        return MONKEY_TYPES.some((type) => type.id === entry) ? entry : getRandomFromList(normalMonkeyTypeIds);
    }

    if (entry && typeof entry === 'object' && typeof entry.typeId === 'string') {
        return MONKEY_TYPES.some((type) => type.id === entry.typeId) ? entry.typeId : getRandomFromList(normalMonkeyTypeIds);
    }

    return getRandomFromList(normalMonkeyTypeIds);
}

function getMonkeyRarityLabel(monkeyType) {
    return monkeyType.rarity === 'super-rare' ? 'Super Rare' : 'Normal';
}

function ensureMonkeyRosterMatchesCount() {
    if (!Array.isArray(monkeyRoster)) {
        monkeyRoster = [];
    }

    monkeyRoster = monkeyRoster.map(normalizeRosterEntry);

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

function spawnFloatingMessage(message, extraClass = '') {
    if (!floatingRewardsLayer) {
        return;
    }

    const reward = document.createElement('span');
    reward.className = `float-reward ${extraClass}`.trim();
    reward.textContent = message;
    reward.style.left = `${18 + Math.random() * 60}%`;
    reward.style.bottom = `${50 + Math.random() * 26}px`;
    floatingRewardsLayer.appendChild(reward);

    setTimeout(() => {
        reward.remove();
    }, 1250);
}

function spawnFloatingReward(points, word) {
    spawnFloatingMessage(`+${points} 🍌 ${getDisplayWord(word).toUpperCase()}`);
}

function spawnMonkeyHireMessage(monkeyType) {
    const prefix = monkeyType.rarity === 'super-rare' ? 'SUPER RARE' : 'HIRED';
    const star = monkeyType.rarity === 'super-rare' ? ' ★' : '';
    spawnFloatingMessage(`${prefix}: ${monkeyType.name.toUpperCase()}${star}`, monkeyType.rarity === 'super-rare' ? 'is-super-rare' : 'is-hire');
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

    const hiredTypeId = getRandomMonkeyTypeId();
    monkeyRoster.push(hiredTypeId);
    const hiredMonkeyType = getMonkeyType(hiredTypeId);

    monkeyCost = Math.ceil(monkeyCost * 1.55);

    updateDisplay();
    saveGame();
    spawnMonkeyHireMessage(hiredMonkeyType);

    requestAnimationFrame(() => {
        animateMonkey(monkeysOwned - 1, hiredMonkeyType.rarity === 'super-rare' ? '★' : '!');
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

    monkeyRoster.forEach((typeId, index) => {
        const monkeyType = getMonkeyType(typeId);
        const speedMultiplier = Math.max(1, Number(monkeyType.speedMultiplier) || 1);
        const perLetterDelay = monkeyTypingIntervalMs / speedMultiplier;
        const jitter = Math.floor(Math.random() * 140);

        for (let burst = 0; burst < speedMultiplier; burst += 1) {
            const delay = Math.floor(jitter + burst * perLetterDelay);
            const timeoutId = setTimeout(() => {
                typeRandomLetter('monkey', index);
            }, delay);

            pendingMonkeyTypeTimeouts.push(timeoutId);
        }
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
            const rarityClass = monkeyType.rarity === 'super-rare' ? ' is-super-rare' : '';
            const rarityLabel = getMonkeyRarityLabel(monkeyType);
            const rarityBadge = monkeyType.rarity === 'super-rare'
                ? '<span class="monkey-rarity-star" aria-hidden="true">★</span>'
                : '';

            return `
                <div class="office-monkey${rarityClass}" data-monkey-slot="${index}" title="${monkeyType.name} — ${rarityLabel}${monkeyType.rarity === 'super-rare' ? ' • 5x speed' : ''}" aria-label="${monkeyType.name}, ${rarityLabel}${monkeyType.rarity === 'super-rare' ? ', five times speed' : ''}">
                    <span class="letter-bubble" aria-hidden="true"></span>
                    ${rarityBadge}
                    <div class="office-monkey-art">
                        <img src="${monkeyType.sprite}" alt="" class="monkey-sprite" loading="lazy" />
                    </div>
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
        monkeyRoster = Array.isArray(saveData.monkeyRoster) ? saveData.monkeyRoster.map(normalizeRosterEntry) : [];

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
