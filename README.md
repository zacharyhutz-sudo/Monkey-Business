# Monkey Business

Build a ridiculous primate-powered word empire.

## Version 7 UI Fix

This version is a more defensive mobile-app layout pass.

Important changes:

- Uses a new stylesheet file: `app.css`
- Uses versioned asset links like `app.css?v=7` and `script.js?v=7` to avoid Safari/GitHub Pages cache problems
- Replaces the webpage-like stacked layout with a true one-screen mobile game layout
- Keeps the header compact
- Keeps stats in a resource bar
- Keeps the office as the main visual scene
- Keeps recent words as a short horizontal strip instead of a big webpage box
- Keeps the bottom controls in a mobile game-style dock

## How to Play

- Tap **TYPE** to generate one random lowercase letter.
- The game checks the newest letters against the bundled dictionary.
- Any valid dictionary word of 3 or more letters earns bananas equal to the word length.
- Spend bananas to **Hire** monkeys.
- Each monkey automatically types one random letter every 2 seconds.
- Every hired monkey appears in the office as one randomly assigned pixel monkey from a set of 20 visual designs.
- Progress is saved in the browser with `localStorage`.

## Files

- `index.html`: App-style mobile game layout
- `app.css`: Current UI styling
- `styles.css`: Backup copy of `app.css` for convenience
- `script.js`: Game logic, scoring, monkey roster, autosave, and animations
- `words.js`: Bundled lowercase dictionary word list
- `WORDS_LICENSE.md`: Attribution/license notes for the dictionary source

## Deployment with GitHub Pages

Replace the repo files with these files, then commit and push.

After GitHub Pages updates, test with a cache-busting URL:

`https://zacharyhutz-sudo.github.io/?v=7`

If Safari still shows an older layout, close the tab and reopen the `?v=7` URL.
