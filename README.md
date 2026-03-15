# GBDA302 — Week 6 Side Quest

**Author:** Min Htet Naing, dmnaing (21008098)

---

## Description

This project builds on the Week 5 Example 5 modular side-scrolling platformer to create an action-platformer set in a night city environment. The level is defined through JSON and rendered using reusable classes, maintaining clean separation between world logic, camera logic, view rendering, and player movement.

For Week 6, the focus is on visual and audio polish: replacing all default characters and tiles with custom assets, and adding a full sound system that responds to gameplay events. The player controls a giant human character navigating city platforms, avoiding red fire hazards, and defeating robot mini enemies — all accompanied by a looping background music track and sound effects for jumping, attacking, taking damage, and collecting objects.

As a bonus, a second level (`ex5_level2`) was added with a new tilemap layout, higher gravity, a darker background, and an increased rescue target (20 vs 15), giving players a meaningful difficulty progression after completing Level 1.

---

## Setup and Interaction Instructions

1. Open the GitHub Pages link in **Google Chrome**.
2. **Click the screen once** to unlock audio (browser requirement — all browsers block audio until a user gesture).
3. Controls:

| Action            | Keys                   |
| ----------------- | ---------------------- |
| Move left / right | `A` / `D` or `←` / `→` |
| Jump              | `W` / `↑` or `Space`   |
| Attack            | `Space`                |
| Reset level       | `R`                    |

4. **Goal:** Rescue 15 characters in Level 1, then 20 in Level 2 to win.

---

## What Was Changed (Week 6 Requirements)

### Player, Enemy, and Collectible Sprite Sheets

All sprite sheets were procedurally generated using HTML5 Canvas (JavaScript) and Python (Pillow) as part of this project, in place of sourcing external assets.

- **Giant Human Player** — replaced the default fox sprite sheet with a custom 192×192px pixel-art human character (6 rows × 5 columns, 32×32px per frame): idle, walk, run, jump, crouch, and hurt animations.
- **Robot Mini Enemy** — replaced the default boar sprite sheet with a custom 160×192px robot character (5 cols × 6 rows): idle, walk, run, attack, jump, and hurt/death animations with glowing cyan eyes, metal panels, and a chest power core.
- **Red Fire Hazard** — replaced the original fire sprite sheet with a custom 512×32px red-orange-yellow flame sheet (16 frames, 32×32px each).

### Tile Set — Level Look

- **Green Forest Ground Tiles** — replaced the original brown ground tiles with custom pixel-art forest tiles: green grass top layer with blade detail, brown dirt mid-layer with root details, and dark stone bottom with moss patches. Three variants produced: middle, left cap, and right cap (all 24×24px, matching the original tile dimensions exactly).

### Parallax Backgrounds

- **3-layer city parallax backgrounds** — replaced the forest background layers with a procedurally generated night city scene (all 272×160px):
  - Layer 1: deep night sky with stars, moon, and distant skyscrapers with lit windows.
  - Layer 2: mid-ground buildings with neon signs, fire escapes, antennas, and lit windows.
  - Layer 3: foreground dark buildings with street, road markings, and lamp posts with glow cones.

### Sound — Jumping, Attacking, Taking Damage, Collecting, Background Music

Five sound effects and one music track were integrated into the game:

| Sound file          | Trigger                                               |
| ------------------- | ----------------------------------------------------- |
| `music.wav`         | Looping background music — starts on first user click |
| `jump.wav`          | Player jumps                                          |
| `hitEnemy.wav`      | Enemy is hit by player attack                         |
| `receiveDamage.wav` | Player takes damage                                   |
| `leafCollect.wav`   | Player collects a rescue object                       |

`SoundManager.js` was extended to support `register()`, `playMusic()`, `stopMusic()`, `pauseMusic()`, and `setMusicVolume()`. Sounds are loaded asynchronously inside `AssetLoader.js` using a `loadSoundAsync()` promise wrapper, matching the existing image loading pattern to ensure all audio is ready before gameplay begins.

### Bonus — New Level

A second level (`ex5_level2`) was added to `levels.json` with:

- New tilemap layout with more gaps, more fire hazards, and trickier platform spacing.
- `winScore: 20` (up from 15).
- `gravity: 13` (up from 10) for heavier, harder jumps.
- Darker background colour `[25, 20, 50]` for a deeper night feel.
- Slightly increased parallax scroll speeds for a faster, more intense atmosphere.

---

## Iteration Notes

### a. Post-Playtest (3 changes)

1. Reduced fire sprite display size from `w:18, h:16` down to `w:10, h:10` after playtesting showed the hazard was rendering too large and covering too much of the platform surface, making it nearly impossible to pass safely.
2. Switched the background theme from forest to city after playtesting feedback that the dark forest environment felt visually disconnected from the robot enemy and the overall pixel-art aesthetic.
3. Added a click-to-unlock audio prompt comment in the code after the first playtest session produced no sound — browsers silently block audio until a user gesture occurs, and testers did not know to click first.

### b. Post-Showcase (2 planned improvements)

1. Add a level transition screen between Level 1 and Level 2 with an animated city skyline and level title card, so the difficulty escalation feels intentional rather than abrupt.
2. Source or commission a proper pixel-art sprite sheet for the player character to replace the programmatically generated one, which lacks the fine detail and expressiveness of hand-drawn pixel art.

---

## Assets

All visual assets (sprite sheets, ground tiles, parallax backgrounds) were **procedurally generated** as part of this project using HTML5 Canvas (JavaScript) and Python with the Pillow library. No third-party image assets were downloaded or used.

Audio files (`music.wav`, `jump.wav`, `hitEnemy.wav`, `receiveDamage.wav`, `leafCollect.wav`) were provided as part of the GBDA302 Week 5 assignment starter package supplied by the course instructor.

---

## References

All code was written by the author with AI assistance (see GenAI section below). All audio assets were course-supplied. All visual assets are original procedurally generated works.

The assets are also from https://opengameart.org/

---

## GenAI

I used AI (Claude, Anthropic) to assist with this side quest in the following ways:

- Generating pixel-art sprite sheets (player, enemy, fire) programmatically using HTML5 Canvas and Python/Pillow, including animation pose design across multiple rows.
- Generating pixel-art ground tile variants (middle, left cap, right cap) and parallax city background layers in Python/Pillow.
- Debugging the audio loading pipeline — specifically restructuring sound loading into `AssetLoader.js` using async promises so sounds load correctly before gameplay begins.
- Extending `SoundManager.js` with `register()`, `playMusic()`, and volume control methods.
- Structuring the Level 2 JSON entry in `levels.json` with appropriate difficulty tuning.
- Writing and structuring this README according to the assignment template.

All generated code was reviewed, tested, and verified by me before inclusion. I remain responsible for understanding and documenting all code in this submission.
