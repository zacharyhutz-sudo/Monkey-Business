# Monkey Business

Build a ridiculous primate-powered word empire.

## What changed in this version

This version pushes the game further toward a native mobile game feel:

- Full phone-app layout instead of a centered webpage card
- Compact top resource HUD
- Larger single-screen Monkey Office playfield
- Letter tape console instead of a web-style output box
- Bottom mobile control dock with a large TYPE button
- Compact recent-word strip
- Reduced explanatory UI copy so it feels more like a game screen
- Existing gameplay, dictionary scoring, monkey roster, saving, and animations are preserved

## How to Play

- Tap **TYPE** to generate one random lowercase letter.
- The game checks the newest letters against the bundled dictionary.
- Any valid dictionary word of 3 or more letters earns bananas equal to the word length.
  - Example: a 3-letter word earns 3 bananas.
  - Example: a 6-letter word earns 6 bananas.
- Spend bananas to **Hire** monkeys.
- Each monkey automatically types one random letter every 2 seconds.
- Every hired monkey appears in the **Typing Office** as one randomly assigned pixel monkey from a set of 20 visual designs.
- Progress is saved in the browser with `localStorage`.

## Files

- `index.html`: App-style mobile game layout
- `styles.css`: Native-feeling mobile game theme and responsive layout
- `script.js`: Game logic, dictionary scoring, monkey roster, shop, autosave, and animations
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
