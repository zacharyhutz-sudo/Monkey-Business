# Monkey Business

Build a ridiculous primate-powered word empire.

## Version 8 Polish Fix

This version fixes the issue where word reward chips could push the game wider than the phone screen.

Changes:

- Long dictionary words are visually shortened with an ellipsis, while still scoring their full length.
- Letter Tape, Recent Words, reward bubbles, HUD, and dock are all width-contained.
- The app uses a clearer two-font brand system:
  - **Baloo 2** for game headings and primary button text
  - **Nunito** for UI, numbers, letter tape, and chips
- The dictionary status is shortened so the header feels more polished.
- Asset links are cache-busted with `?v=8`.

## How to Play

- Tap **TYPE** to generate one random lowercase letter.
- The game checks the newest letters against the bundled dictionary.
- Any valid dictionary word of 3 or more letters earns bananas equal to the word length.
- Spend bananas to **Hire** monkeys.
- Each monkey automatically types one random letter every 2 seconds.
- Progress is saved in the browser with `localStorage`.

## Files

- `index.html`
- `app.css`
- `styles.css` backup copy of `app.css`
- `script.js`
- `words.js`
- `WORDS_LICENSE.md`

## Deployment with GitHub Pages

Replace the repo files with these files, then commit and push.

Test with:

`https://zacharyhutz-sudo.github.io/?v=8`
