# Monkey Business

Build a ridiculous primate-powered word empire.

## How to Play

- Click **Type Random Letter** to generate one random lowercase letter.
- The game checks the newest letters against the bundled dictionary.
- Any valid dictionary word of 3 or more letters earns bananas equal to the word length.
  - Example: a 3-letter word earns 3 bananas.
  - Example: a 6-letter word earns 6 bananas.
- Spend bananas to **Hire Monkey**.
- Each monkey automatically types one random letter every 2 seconds.
- Progress is saved in the browser with `localStorage`.

## Files

- `index.html`: UI and layout
- `styles.css`: Game design and responsive layout
- `script.js`: Game logic, scoring, shop, autosave
- `words.js`: Bundled lowercase dictionary word list
- `WORDS_LICENSE.md`: Attribution/license notes for the dictionary source

## Dictionary Behavior

The game still generates random letters only. It does not force full words to appear.

When a new random letter appears, the game checks every possible word ending at that newest letter. If multiple valid words form at the same time, each word earns bananas.

## Deployment with GitHub Pages

This is a static browser game. No build step is required.

1. Replace the existing repository files with these files.
2. Commit and push to `main`.
3. In GitHub, go to **Settings → Pages**.
4. Set the source to your `main` branch and root folder.
