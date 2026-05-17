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


## Version 16 Portrait UI Repair

This version fixes the v15 layout not matching the portrait mockup closely enough.

- Enlarged and rebalanced the title/header.
- Rebuilt the stat HUD spacing so it reads like a game HUD, not compressed cards.
- Gave the office scene more usable vertical space and reduced awkward monkey cropping.
- Made Letter Tape and Recent Words fit cleanly.
- Rebuilt the bottom dock as a five-link game navigation area:
  - Hire
  - TYPE
  - Upgrades
  - Collection
  - Quests
- Preserved all existing mechanics from v13/v14/v15.
- Updated cache busting to `?v=16`.

Test with:

`https://zacharyhutz-sudo.github.io/?v=16`


## Version 17 Faithful Mockup UI

This version rewrites the visual layer instead of stacking more CSS on old layouts.

- Rebuilt the screen structure to more closely match the portrait mockup.
- Created a six-button bottom game dock: Hire, Upgrades, Milestones, TYPE, Collection, Quests.
- Reworked the resource HUD, title/header, office frame, tape, recent words, and progression sheet.
- Removed visible emoji-style banana rewards from the main text output and replaced them with branded icon blocks.
- Preserved the existing mechanics: typing, dictionary scoring, monkeys, rare odds, 5x super rares, upgrades, buildings, quests, milestones, collection, saving, and fast tap handling.
- Updated cache-busting to `?v=17`.

Test with:

`https://zacharyhutz-sudo.github.io/?v=17`


## Version 18 Mockup Fidelity Pass

- Reworked the live UI to better match the portrait mockups using custom pixel icon PNGs.
- Added pixel icons for HUD, dock, tabs, settings, info, quests, and tape decorations.
- Added more mockup-like stat cards with per-second readouts and a player level badge.
- Improved the office header, floor ribbon, info button, and dock.
- Rebuilt quest cards to match the mockup more closely with icon, reward, and action areas.
- Updated cache busting to `?v=18`.

Test with:

`https://zacharyhutz-sudo.github.io/?v=18`


## Version 19 Detail Pass

- Added a more detailed, mockup-inspired visual polish pass with richer trim, inner borders, subtle panel detailing, and stronger texture illusions.
- Refined the office scene, section framing, dock, and top HUD so the UI feels less blocky and closer to the concept art.
- Upgraded the progression panel with office perk chips and more detailed quest card layout.
- Added a clover rarity icon and updated cache busting to `?v=19`.


## Version 20 Fit and Polish

This pass keeps the v19 visual direction but fixes the actual iPhone layout issues shown in testing.

- Reduced title and HUD sizing so text does not truncate as aggressively.
- Added compact HUD number formatting for large values.
- Tightened the office header and empty office message.
- Rebalanced the office, letter tape, recent words, and dock so they fit in the viewport.
- Fixed modal tab/card sizing so milestones and quests do not overlap or crop badly.
- Kept all existing mechanics intact.
- Updated cache busting to `?v=20`.

Test with:

`https://zacharyhutz-sudo.github.io/?v=20`

## Version 21 Main Screen Rebuild

Focused code pass after v20.

- Added a small generated pixel UI kit: green/gold/parchment/wood frames, textures, and vine corner art.
- Rebuilt the main gameplay screen around reusable art assets instead of plain CSS rectangles.
- Improved title/HUD fit and compact dock cost formatting.
- Kept all four main links on the home screen: Upgrades, Goals/Milestones, Monkeys/Collection, and Quests.
- Shortened cramped dock labels while preserving functionality.
- Reduced the empty-office overlay so more office art shows.
- Preserved all existing game mechanics and save data.

Test with:

`https://zacharyhutz-sudo.github.io/?v=21`


## Version 22 Main Screen Layout Lockup

- Reduced the home screen from 6 dock buttons to 5: Hire, Upgrades, TYPE, Monkeys, Quests.
- Milestones remain available as a tab inside the progression panel.
- Tightened the top bar, HUD, office header, letter tape, recent words, and bottom dock so the full screen fits better on iPhone.
- Improved office header text fit and shortened summary copy to avoid cutoffs.
- Reworked progression tabs to icon-above-label layout so tab labels are less likely to truncate.
- Preserved all existing mechanics and added save compatibility from v21.

Test with:

`https://zacharyhutz-sudo.github.io/?v=22`


## Version 23 Icon Detail + Monkey Render Fix

Changed-files-only patch.

- Replaced simple blocky UI icons with more detailed pixel-art icons.
- Added stronger icon shadows and button bevels.
- Added a monkey rendering guard so hiring a monkey immediately forces the office to redraw.
- Removed lazy loading from office monkey sprites and added an image fallback.
- After hiring, monkeys now immediately animate and begin a typing cycle instead of waiting for the next interval.
- Added a typing guard so the monkey office redraws if the roster and rendered monkey count ever get out of sync.
- Updated cache busting to `?v=23`.


## Version 24 Visual Cleanup + Typing Engine Fix

Changed-files-only patch.

- Rebuilt the monkey typing loop into a restartable typing engine.
- Hiring a monkey now immediately types a letter, then restarts the monkey typing engine.
- Added page visibility restart logic so monkeys resume typing after Safari/tab interruptions.
- Reduced the noisy v23 texture/detail treatment.
- Regenerated cleaner pixel UI frames, textures, and icons.
- Fixed office title clipping by reducing vine dominance and raising the title layer.
- Reduced the empty-office overlay so the office remains the hero.
- Updated cache busting to `?v=24`.


## Version 25 Quest Modal Rebuild + Typing Engine Correction

Changed-files-only patch.

- Fixed the monkey typing engine bug so it uses `setInterval(runMonkeyTyping, 2000)` again instead of recursively calling itself.
- Normal monkeys type about one letter every 2 seconds before upgrades.
- Super rare monkeys and speed upgrades still increase letters per 2-second cycle.
- Rebuilt the quest modal so the header/tabs/office summary/footer stay fixed and the content area scrolls.
- Shortened quest cards and reduced the reward/action column size.
- Added a modal footer helper line.
- Fixed the “No words yet” clipping on the main screen.
- Updated cache busting to `?v=25`.


## Version 26 Automatic Typing Fix + Office Life Pass

Changed-files-only patch.

- Replaced the interval-based monkey typing engine with a requestAnimationFrame timing engine.
- Normal monkeys now schedule one letter about every 2 seconds.
- Super rare monkeys and speed upgrades reduce the delay per letter instead of relying on burst logic.
- Added a watchdog fallback that nudges typing if mobile Safari stalls the animation frame loop.
- Hiring a monkey primes that monkey to type shortly after appearing.
- Added intentional seat positions so monkeys appear in planned office locations instead of flex wrapping.
- Improved monkey letter bubbles and office depth.
- Continued tightening the quest modal card sizes.
- Updated cache busting to `?v=26`.


## Version 27 Recent Words + Office Life Pass

Changed-files-only patch.

- Fixed Recent Words rendering with a dedicated DOM renderer.
- Recent Words now updates immediately when monkey-typed or player-typed words are found.
- Recent Words chips are horizontally scrollable and less likely to clip.
- Fixed the blank office thumbnail in the progression/quests modal.
- Added image fallback handling for the office thumbnail.
- Reintroduced actual seat styles into monkey rendering.
- Adjusted monkey seat positions so monkeys appear more intentionally placed around the office.
- Added small desk bases under monkeys so they feel seated at workstations.
- Kept the v26 automatic typing engine intact.
- Updated cache busting to `?v=27`.


## Version 29 Logic Audit Patch

Changed-files-only patch.

### Logic fixes
- Replaced the requestAnimationFrame-based monkey typing loop with a timer-backed per-monkey scheduler.
- Each normal monkey keeps its own ~2-second typing schedule.
- Additional monkeys now continue typing independently after being hired.
- Super rare monkeys and speed upgrades still reduce the delay per keystroke.
- Made quest/milestone claim buttons use delegated event handling so dynamically re-rendered buttons remain tappable.
- Hardened milestone claiming so a ready quest updates the panel and save data immediately.
- Added a lightweight `window.MonkeyBusinessDebug` helper for future logic audits.

### UI support
- Claimable buttons now show a clearer active/tappable state.
- Disabled claim/buy buttons no longer intercept touches.


## Version 30 Progression Rebalance + Purposeful Home Buttons

Changed-files-only patch.

### Progression changes
- Rebalanced early monkey costs:
  - Monkey 1 starts at 50 bananas.
  - Subsequent monkeys now scale by 1.9x, making the first few hires feel reachable but still paced.
- Lowered early upgrade costs so players encounter upgrades sooner.
- Floor 2 now gives a clearer reward: +8% typing speed and +1 banana per word.
- Quests are now short-term player guidance.
- Milestones are now long-term achievement goals.
- Quest cards sort claimable goals to the top.
- The home Quests badge now represents claimable quests.

### Home-screen purpose cleanup
- Removed the decorative Letter Tape play and fast-forward buttons.
- The office info button now opens Office Upgrades.
- The monkey stat no longer shows a misleading “monkeys per second” rate.

### Upgrade clarity
- Upgrade cards now show Current and Next effects.
- Claimable quest/milestone buttons now have clearer gold reward styling.

### Logic hardening
- Added progress metrics for upgrades, claimed quests, and banana balance.
- Existing saves migrate from v29.
- Invalid old milestone claim IDs are filtered safely.


## Version 31 Progression Expansion

Changed-files-only patch.

### Progression depth
- Added lifetime stats:
  - lifetime bananas earned
  - lifetime letters typed
  - lifetime words found
  - total monkeys hired
  - total upgrades purchased
  - quests claimed
  - offices unlocked
  - best word and longest word tracking
  - super rare monkeys hired
- Expanded the quest list into tiered progression.
- Quests now unlock gradually as the player grows.
- Added many more short-term quests and long-term milestones.
- The Quests panel now shows the current quest tier and how many goals are still locked for later.

### Office progression
- Office unlocks now require both bananas and progress goals.
- Floor 2 now requires 3 monkeys and 3 claimed quests.
- Later offices require monkey count, upgrades, lifetime words, lifetime bananas, or super rare progress.
- Office cards now show requirement chips with progress.

### Save compatibility
- Existing v30 saves migrate into v31.
- Lifetime stats are backfilled from existing save data where possible.
- Existing claimed goals are filtered safely against the expanded goal list.


## Version 32 Word Discovery System

Changed-files-only patch.

### Word discovery
- Added persistent discovered words.
- First-time word discoveries now award a discovery bonus.
- Repeated words still pay normally, but do not receive the discovery bonus again.
- 4-letter, 5-letter, 6-letter, and 7+ letter words now receive escalating length bonuses.
- Recent Words chips now mark NEW words and bonus words.
- Word reward chips in the Letter Tape now show NEW / BONUS / LONG / BIG WORD / JACKPOT labels.

### Progression hooks
- Added unique-word quests across quest tiers.
- Added long-word and unique-word milestone support.
- Added `uniqueWords` metric to progression tracking.
- Best word, longest word, and unique discoveries now help progression feel less monotonous.

### Collection screen
- Added a Word Discoveries section to the collection screen.
- Shows unique words discovered, best word, longest word, and recent discoveries.

### Save compatibility
- Existing v31 saves migrate to v32.
- Existing recent words seed the discovered-word list when possible.
