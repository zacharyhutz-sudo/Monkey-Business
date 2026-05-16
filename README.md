# Monkey Business

Build a ridiculous primate-powered word empire.

## What changed in this version

This version refreshes the UI to feel more like a mobile game and less like a plain web page:

- Compact top HUD for bananas, letters, words, and monkeys
- A more illustrated **Monkey Office** scene
- A paper-style **Typewriter Feed** area
- A sticky bottom control dock with the main action button
- Floating reward popups when words score
- Refreshed app-style panels and mobile-friendly layout

## How to Play

- Tap **Type Random Letter** to generate one random lowercase letter.
- The game checks the newest letters against the bundled dictionary.
- Any valid dictionary word of 3 or more letters earns bananas equal to the word length.
  - Example: a 3-letter word earns 3 bananas.
  - Example: a 6-letter word earns 6 bananas.
- Spend bananas to **Hire Monkey**.
- Each monkey automatically types one random letter every 2 seconds.
- Every hired monkey appears in the **Monkey Office** as one randomly assigned pixel monkey from a set of 20 visual designs.
- When letters are typed, monkeys animate at their typewriters.
- Progress is saved in the browser with `localStorage`.

## Files

- `index.html`: App layout and game UI structure
- `styles.css`: App-style theme, responsive layout, Monkey Office scene, and animation styling
- `script.js`: Game logic, dictionary scoring, monkey roster, shop, autosave, and UI animation behavior
- `words.js`: Bundled lowercase dictionary word list
- `WORDS_LICENSE.md`: Attribution/license notes for the dictionary source

## Dictionary Behavior

The game still generates random letters only. It does not force full words to appear.

When a new random letter appears, the game checks every possible word ending at that newest letter. If multiple valid words form at the same time, each word earns bananas.

## Mobile Note

Fast tapping on mobile should not trigger accidental zooming on the main controls.

## Deployment with GitHub Pages

This is a static browser game. No build step is required.

1. Replace the existing repository files with these files.
2. Commit and push to `main`.
3. In GitHub, go to **Settings → Pages**.
4. Set the source to your `main` branch and root folder.
