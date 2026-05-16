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


## Version 9 Background Update

- Added `office-bg.png` and wired it into `.mb-office-scene` as the real pixel-art office background.
- Hid the old CSS-built scene pieces so the pixel background is the full office scene.
- Changed the page pills/chips/buttons to a more squared-off look.
- Updated asset query strings to `?v=9` for cache busting.


## Version 10 Monkey Roster Update

- Replaced the placeholder monkey art with 40 pixel monkey sprites that match the office background.
- Added 30 normal monkeys and 10 super rare monkeys.
- Hire odds are 90% normal and 10% super rare.
- Super rare monkeys type at 5x the normal rate.
- Each monkey type now has a unique name.
- Super rare monkeys get a golden star badge and glow in the office.


## Version 11 Fast Tap + Square UI Fix

- Fixed rapid tapping on the TYPE button by using pointer-first tap handling instead of relying only on delayed mobile click events.
- Removed the global double-tap prevention listener that could swallow fast taps on iOS.
- Squared off all boxes, buttons, cards, chips, HUD pills, and panels.
- Updated asset query strings to `?v=11`.

Test with:

`https://zacharyhutz-sudo.github.io/?v=11`


## Version 12 Embedded Monkey Sprite Fix

- Fixes missing monkey art on GitHub Pages/Safari.
- Monkey sprites are now embedded directly in `script.js` as image data.
- The game no longer depends on the `monkeys/` folder loading correctly at runtime.
- The `monkeys/` folder is still included for reference, but the app uses embedded sprites.
- Updated cache busting to `?v=12`.

Test with:

`https://zacharyhutz-sudo.github.io/?v=12`
