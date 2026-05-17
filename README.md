# Monkey Business

Build a ridiculous primate-powered word empire.

## Version 13 Progression Update

This version adds a full slow-burn progression layer while keeping the square pixel-art mobile style.

### New systems

- **Office Buildings**
  - Starter Office
  - Cubicle Jungle
  - Banana Bureau
  - Typewriter Tower
  - Executive Treehouse
  - Golden HQ

- **Skills / Upgrades**
  - Faster Typewriters: all monkeys type faster
  - Better Dictionary: every word earns more bananas
  - Banana Payroll: multiplies word income
  - Rare Recruiter: increases super rare monkey odds

- **Milestones / Goals**
  - Letter goals
  - Word goals
  - Monkey hiring goals
  - Super rare goal
  - Office unlock goals

- **Balanced slow progression**
  - First office unlock starts at 2,500 bananas.
  - Upgrade costs scale aggressively.
  - Super rare odds begin at 10% and can slowly climb with upgrades/buildings.
  - Super rare monkeys still type at 5x speed.

## How to Play

- Tap **TYPE** to generate one random lowercase letter.
- Any valid 3+ letter dictionary word earns bananas.
- Hire monkeys to type automatically.
- Super rare monkeys have a 10% base hire chance and type 5x faster.
- Tap **Upgrades** to buy skills, unlock offices, and claim goals.
- Progress is saved in the browser with `localStorage`.

## Files

- `index.html`
- `app.css`
- `styles.css`
- `script.js`
- `words.js`
- `office-bg.png`
- `monkeys/`
- `WORDS_LICENSE.md`

## Deployment with GitHub Pages

Replace the repo files with these files, then commit and push.

Test with:

`https://zacharyhutz-sudo.github.io/?v=13`


## Version 14 Office Unlock Fix

- Fixes the office unlock button not reliably purchasing on mobile.
- Progression panel buttons now use the same fast-tap handling as the main TYPE button.
- Office unlock gives feedback if you do not have enough bananas.
- Updated cache busting to `?v=14`.

Test with:

`https://zacharyhutz-sudo.github.io/?v=14`

## Version 15 App Store UI Direction

- Reworked the interface toward the darker wood-and-jungle pixel UI from the portrait mockups.
- Replaced most visible emoji-style UI icons with custom square icon blocks and embedded art.
- Preserved all existing mechanics: typing, dictionary scoring, monkey hiring, super rare odds, 5x super rare speed, office buildings, skills, milestones, saves, and fast mobile tapping.
- Added main-page links for **Upgrades**, **Milestones**, **Collection**, and **Quests**.
- Added a Monkey Collection view showing owned/locked monkeys and rarity.
- Added a Quests view that surfaces active, unclaimed milestone goals.
- Updated cache busting to `?v=15`.

Test with:

`https://zacharyhutz-sudo.github.io/?v=15`
