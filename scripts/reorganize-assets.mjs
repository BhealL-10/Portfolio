import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, statSync, unlinkSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const projectRoot = process.cwd();
const moves = [];
const mergedDuplicates = [];
const archivedUnreferenced = [];
const retainedUnreferenced = [
  'assets/images/shared/branding/variants/logo-hub-dark.svg',
  'assets/images/shared/branding/variants/logo-hub-light.svg',
  'assets/images/shared/branding/variants/logo-v2-dark.svg',
  'assets/images/shared/branding/variants/logo-v2-light.svg',
  'assets/images/portfolio/projects/ape-prod/value-proposition.png',
  'assets/images/portfolio/projects/davinci-resolve/gallery-01.webp',
  'assets/images/portfolio/projects/davinci-resolve/gallery-02.webp',
  'assets/images/portfolio/projects/davinci-resolve/gallery-03.webp',
  'assets/images/portfolio/projects/davinci-resolve/gallery-04.webp',
  'assets/images/portfolio/projects/davinci-resolve/gallery-05.webp',
  'assets/images/portfolio/projects/davinci-resolve/gallery-06.webp'
];
const replacements = new Map();

const TEXT_EXTENSIONS = new Set(['.ts', '.js', '.css', '.html', '.md', '.json']);
const EXCLUDED_DIRS = new Set(['.git', 'dist', 'node_modules']);

function normalize(filePath) {
  return filePath.replace(/\\/g, '/');
}

function toAbsolute(filePath) {
  return path.resolve(projectRoot, filePath);
}

function ensureParent(filePath) {
  mkdirSync(path.dirname(toAbsolute(filePath)), { recursive: true });
}

function recordReplacement(from, to) {
  const normalizedFrom = normalize(from);
  const normalizedTo = normalize(to);
  replacements.set(normalizedFrom, normalizedTo);
  replacements.set(`/${normalizedFrom}`, `/${normalizedTo}`);
}

function sameContent(left, right) {
  const leftBuffer = readFileSync(toAbsolute(left));
  const rightBuffer = readFileSync(toAbsolute(right));
  const leftHash = crypto.createHash('sha256').update(leftBuffer).digest('hex');
  const rightHash = crypto.createHash('sha256').update(rightBuffer).digest('hex');
  return leftHash === rightHash;
}

function moveFile(from, to, meta = {}) {
  const source = toAbsolute(from);
  if (!existsSync(source)) {
    return;
  }

  ensureParent(to);
  const destination = toAbsolute(to);
  if (existsSync(destination)) {
    if (!sameContent(from, to)) {
      throw new Error(`Destination already exists with different content: ${to}`);
    }
    unlinkSync(source);
  } else {
    renameSync(source, destination);
  }

  recordReplacement(from, to);
  moves.push({
    from: normalize(from),
    to: normalize(to),
    reason: meta.reason ?? 'reorganized'
  });
}

function archiveFile(from, to, reason) {
  const source = toAbsolute(from);
  if (!existsSync(source)) {
    return;
  }

  moveFile(from, to, { reason });
  archivedUnreferenced.push({
    from: normalize(from),
    to: normalize(to),
    reason
  });
}

function mergeDuplicate(from, canonical, reason) {
  const source = toAbsolute(from);
  if (!existsSync(source)) {
    return;
  }

  const target = toAbsolute(canonical);
  if (!existsSync(target)) {
    throw new Error(`Canonical duplicate target missing: ${canonical}`);
  }

  if (!sameContent(from, canonical)) {
    throw new Error(`Cannot merge non-identical files: ${from} -> ${canonical}`);
  }

  unlinkSync(source);
  recordReplacement(from, canonical);
  mergedDuplicates.push({
    removed: normalize(from),
    canonical: normalize(canonical),
    reason
  });
}

function walkTextFiles(startDir) {
  const absoluteStart = toAbsolute(startDir);
  if (!existsSync(absoluteStart)) {
    return [];
  }

  const entries = [];
  const stack = [absoluteStart];

  while (stack.length > 0) {
    const current = stack.pop();
    const relative = normalize(path.relative(projectRoot, current));

    if (relative && EXCLUDED_DIRS.has(relative.split('/')[0])) {
      continue;
    }

    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const absoluteEntry = path.join(current, entry.name);
      const relativeEntry = normalize(path.relative(projectRoot, absoluteEntry));

      if (entry.isDirectory()) {
        if (!EXCLUDED_DIRS.has(entry.name)) {
          stack.push(absoluteEntry);
        }
        continue;
      }

      if (TEXT_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
        entries.push(relativeEntry);
      }
    }
  }

  return entries;
}

function replaceInTextFiles() {
  const files = [
    'index.html',
    ...walkTextFiles('src'),
    ...walkTextFiles('assets'),
    ...walkTextFiles('docs'),
    ...walkTextFiles('scripts'),
    'vite.config.ts',
    'package.json',
    'textfren.md'
  ].filter((value, index, array) => array.indexOf(value) === index && existsSync(toAbsolute(value)));

  const entries = [...replacements.entries()].sort((left, right) => right[0].length - left[0].length);

  for (const file of files) {
    const absoluteFile = toAbsolute(file);
    const previous = readFileSync(absoluteFile, 'utf8');
    let next = previous;

    for (const [from, to] of entries) {
      next = next.split(from).join(to);
    }

    if (next !== previous) {
      writeFileSync(absoluteFile, next);
    }
  }
}

function pruneEmptyDirectories(startDir) {
  const absoluteStart = toAbsolute(startDir);
  if (!existsSync(absoluteStart) || !statSync(absoluteStart).isDirectory()) {
    return;
  }

  const children = readdirSync(absoluteStart);
  for (const child of children) {
    const childRelative = normalize(path.relative(projectRoot, path.join(absoluteStart, child)));
    pruneEmptyDirectories(childRelative);
  }

  if (readdirSync(absoluteStart).length === 0) {
    rmSync(absoluteStart, { recursive: true, force: true });
  }
}

function writeManifest() {
  const manifestPath = 'docs/assets-migration-manifest.json';
  ensureParent(manifestPath);
  writeFileSync(
    toAbsolute(manifestPath),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        summary: {
          moved: moves.length,
          mergedDuplicates: mergedDuplicates.length,
          archivedUnreferenced: archivedUnreferenced.length,
          retainedUnreferenced: retainedUnreferenced.length
        },
        moved: moves,
        mergedDuplicates,
        archivedUnreferenced,
        retainedUnreferenced
      },
      null,
      2
    )
  );
}

function reorganizeBranding() {
  const brandingMoves = {
    'assets/images/Logo/logomodedark.svg': 'assets/images/shared/branding/ape-prod-mark-dark.svg',
    'assets/images/Logo/logomodelight.svg': 'assets/images/shared/branding/ape-prod-mark-light.svg',
    'assets/images/Logo/LogoApeProdDark.png': 'assets/images/shared/branding/ape-prod-intro-dark.png',
    'assets/images/Logo/LogoApeProdLight.png': 'assets/images/shared/branding/ape-prod-intro-light.png',
    'assets/images/Logo/AffinityLogoDark.svg': 'assets/images/shared/branding/affinity-dark.svg',
    'assets/images/Logo/AffinityLogoLight.svg': 'assets/images/shared/branding/affinity-light.svg',
    'assets/images/Logo/DavinciLogoDark.svg': 'assets/images/shared/branding/davinci-dark.svg',
    'assets/images/Logo/DavinciLogoLight.svg': 'assets/images/shared/branding/davinci-light.svg',
    'assets/images/Logo/DiscordLogoDark.svg': 'assets/images/shared/branding/discord-dark.svg',
    'assets/images/Logo/DiscordLogoLight.svg': 'assets/images/shared/branding/discord-light.svg',
    'assets/images/Logo/IALogoDark.svg': 'assets/images/shared/branding/ia-dark.svg',
    'assets/images/Logo/IALogoLight.svg': 'assets/images/shared/branding/ia-light.svg',
    'assets/images/Logo/MovieLogoDark.svg': 'assets/images/shared/branding/movie-dark.svg',
    'assets/images/Logo/MovieLogoLight.svg': 'assets/images/shared/branding/movie-light.svg',
    'assets/images/Logo/SpineLogoDark.svg': 'assets/images/shared/branding/spine-dark.svg',
    'assets/images/Logo/SpineLogoLight.svg': 'assets/images/shared/branding/spine-light.svg',
    'assets/images/Logo/LOGO-HUB_dark.svg': 'assets/images/shared/branding/variants/logo-hub-dark.svg',
    'assets/images/Logo/LOGO-HUB_light.svg': 'assets/images/shared/branding/variants/logo-hub-light.svg',
    'assets/images/Logo/LogoV2Dark.svg': 'assets/images/shared/branding/variants/logo-v2-dark.svg',
    'assets/images/Logo/LogoV2light.svg': 'assets/images/shared/branding/variants/logo-v2-light.svg',
    'assets/images/Logo/Moontheme.svg': 'assets/images/shared/theme-icons/moon.svg',
    'assets/images/Logo/sunTheme.svg': 'assets/images/shared/theme-icons/sun.svg'
  };

  for (const [from, to] of Object.entries(brandingMoves)) {
    moveFile(from, to, { reason: 'branding reorganization' });
  }

  mergeDuplicate(
    'assets/images/favicon.svg',
    'assets/images/shared/branding/ape-prod-mark-light.svg',
    'favicon duplicated the light Ape Prod mark'
  );

  archiveFile(
    'assets/images/Logo/3D Objects/desktop.ini',
    'assets/archive/unreferenced/system/desktop.ini',
    'os-generated file not consumed by the project'
  );
}

function reorganizeSharedImages() {
  moveFile('assets/images/Langue/FR.svg', 'assets/images/shared/localization/fr.svg', {
    reason: 'shared localization assets'
  });
  moveFile('assets/images/Langue/EN.svg', 'assets/images/shared/localization/en.svg', {
    reason: 'shared localization assets'
  });
}

function reorganizeButtonImages() {
  const labelActions = ['RESTART', 'BACK', 'HIGHSCORE', 'BUY', 'HUB'];
  const locales = ['FR', 'EN'];
  const themes = ['dark', 'light'];

  for (const locale of locales) {
    for (const action of labelActions) {
      for (const theme of themes) {
        const from = `assets/images/btn/${locale}_${action}_${theme}.svg`;
        const to = `assets/images/game/ui/buttons/labels/${locale.toLowerCase()}-${action.toLowerCase()}-${theme}.svg`;
        moveFile(from, to, { reason: 'game ui button labels' });
      }
    }
  }

  const iconMoves = {
    'assets/images/btn/LEFT_dark.svg': 'assets/images/game/ui/buttons/icons/arrow-left-dark.svg',
    'assets/images/btn/LEFT_light.svg': 'assets/images/game/ui/buttons/icons/arrow-left-light.svg',
    'assets/images/btn/RIGHT_dark.svg': 'assets/images/game/ui/buttons/icons/arrow-right-dark.svg',
    'assets/images/btn/RIGHT_left.svg': 'assets/images/game/ui/buttons/icons/arrow-right-light.svg',
    'assets/images/btn/CLOSE_right.svg': 'assets/images/game/ui/buttons/icons/close-dark.svg',
    'assets/images/btn/CLOSE_light.svg': 'assets/images/game/ui/buttons/icons/close-light.svg',
    'assets/images/btn/help-reward_dark.svg': 'assets/images/game/ui/buttons/icons/help-dark.svg',
    'assets/images/btn/help-reward_light.svg': 'assets/images/game/ui/buttons/icons/help-light.svg',
    'assets/images/btn/Sound_Dark.svg': 'assets/images/game/ui/buttons/icons/sound-on-dark.svg',
    'assets/images/btn/Sound_Light.svg': 'assets/images/game/ui/buttons/icons/sound-on-light.svg',
    'assets/images/btn/Sound-OFF_Dark.svg': 'assets/images/game/ui/buttons/icons/sound-off-dark.svg',
    'assets/images/btn/Sound-OFF_light.svg': 'assets/images/game/ui/buttons/icons/sound-off-light.svg',
    'assets/images/btn/GAMEOVER_dark.svg': 'assets/images/game/ui/headers/game-over-title-dark.svg',
    'assets/images/btn/GAMEOVER_light.svg': 'assets/images/game/ui/headers/game-over-title-light.svg',
    'assets/images/btn/BG_Gameover_dark.svg': 'assets/images/game/ui/backgrounds/game-over-background-dark.svg',
    'assets/images/btn/BG_Gameover_light.svg': 'assets/images/game/ui/backgrounds/game-over-background-light.svg'
  };

  for (const [from, to] of Object.entries(iconMoves)) {
    moveFile(from, to, { reason: 'game ui icons and headers' });
  }

  for (let index = 1; index <= 5; index += 1) {
    moveFile(`assets/images/btn/BG_dark_${index}.svg`, `assets/images/game/ui/backgrounds/hud-dark-${index}.svg`, {
      reason: 'game ui backgrounds'
    });
    moveFile(`assets/images/btn/BG_Light_${index}.svg`, `assets/images/game/ui/backgrounds/hud-light-${index}.svg`, {
      reason: 'game ui backgrounds'
    });
  }
}

function reorganizeHelpImages() {
  for (const locale of ['EN', 'FR']) {
    for (let index = 0; index <= 6; index += 1) {
      moveFile(
        `assets/images/help/${locale}-Rules${index}.png`,
        `assets/images/game/ui/help/${locale.toLowerCase()}/${locale.toLowerCase()}-rules-${index}.png`,
        { reason: 'game help image sets' }
      );
    }
  }
}

function reorganizeEquipmentImages() {
  moveFile('assets/images/itemhud/ui-equipment-dock.svg', 'assets/images/game/ui/equipment/dock.svg', {
    reason: 'game equipment dock'
  });

  const chargeAssets = [
    'big-cannon',
    'blower-primary',
    'blower-recharge',
    'front-cannon',
    'front-reactor',
    'grappling-hook',
    'magnet',
    'plane',
    'rear-reactor',
    'shield',
    'thruster',
    'wings',
    'wrapper'
  ];

  for (const asset of chargeAssets) {
    moveFile(`assets/images/itemhud/hud-charge-${asset}.svg`, `assets/images/game/ui/equipment/charges/${asset}.svg`, {
      reason: 'game equipment charge icons'
    });
  }

  const moduleAssets = [
    'big-cannon',
    'blower',
    'front-cannon',
    'front-reactor',
    'grappling-hook',
    'magnet',
    'plane',
    'rear-reactor',
    'shield',
    'thruster',
    'wings',
    'wrapper'
  ];

  for (const asset of moduleAssets) {
    moveFile(`assets/images/itemhud/hud-module-${asset}.png`, `assets/images/game/ui/equipment/modules/${asset}.png`, {
      reason: 'game equipment module icons'
    });
  }

  const passiveAssets = [
    'belt',
    'compass',
    'map',
    'parrot',
    'purse',
    'rudder',
    'shock-absorbers',
    'spyglass',
    'tail',
    'totem'
  ];

  for (const asset of passiveAssets) {
    moveFile(`assets/images/itemhud/hud-passive-${asset}.png`, `assets/images/game/ui/equipment/passives/${asset}.png`, {
      reason: 'game equipment passive icons'
    });
  }

  const rarities = ['common', 'epic', 'legendary', 'rare', 'uncommon'];
  for (const rarity of rarities) {
    moveFile(`assets/images/itemhud/hud-rarity-${rarity}.png`, `assets/images/game/ui/equipment/rarities/${rarity}.png`, {
      reason: 'game equipment rarity icons'
    });
  }
}

function reorganizePortfolioImages() {
  const projectMoves = {
    'assets/images/projects/intro.png': 'assets/images/portfolio/projects/ape-prod/cover.png',
    'assets/images/projects/Imageprofile.png': 'assets/images/portfolio/projects/ape-prod/profile.png',
    'assets/images/projects/Vpropreterportofolio.png': 'assets/images/portfolio/projects/ape-prod/value-proposition.png',
    'assets/images/projects/TonoIntro.png': 'assets/images/portfolio/projects/tono-discord-bot/cover.png',
    'assets/images/projects/Davinciintro.png': 'assets/images/portfolio/projects/davinci-resolve/cover.png',
    'assets/images/projects/Davinci1.webp': 'assets/images/portfolio/projects/davinci-resolve/gallery-01.webp',
    'assets/images/projects/Davinci2.webp': 'assets/images/portfolio/projects/davinci-resolve/gallery-02.webp',
    'assets/images/projects/Davinci3.webp': 'assets/images/portfolio/projects/davinci-resolve/gallery-03.webp',
    'assets/images/projects/Davinci4.webp': 'assets/images/portfolio/projects/davinci-resolve/gallery-04.webp',
    'assets/images/projects/Davinci5.webp': 'assets/images/portfolio/projects/davinci-resolve/gallery-05.webp',
    'assets/images/projects/Davinci6.webp': 'assets/images/portfolio/projects/davinci-resolve/gallery-06.webp',
    'assets/images/projects/Introia.png': 'assets/images/portfolio/projects/generative-ai/cover.png',
    'assets/images/projects/Discordintro.png': 'assets/images/portfolio/projects/discord-bots/cover.png',
    'assets/images/projects/placeholder.svg': 'assets/images/portfolio/projects/shared/placeholder.svg',
    'assets/images/projects/Spine.png': 'assets/images/portfolio/projects/avatars-and-animation/cover.png',
    'assets/images/projects/Conception.png': 'assets/images/portfolio/projects/game-design/cover.png'
  };

  for (const [from, to] of Object.entries(projectMoves)) {
    moveFile(from, to, { reason: 'portfolio project organization' });
  }
}

function reorganizeSpriteImages() {
  const gradeMoves = {
    'assets/images/spritesheet/Grade-Echecsheet.png': 'assets/images/game/sprites/grades/miss-sheet.png',
    'assets/images/spritesheet/Grade-Greatsheet.png': 'assets/images/game/sprites/grades/good-sheet.png',
    'assets/images/spritesheet/Grade-supersheet.png': 'assets/images/game/sprites/grades/super-sheet.png',
    'assets/images/spritesheet/Grade-Perfectsheet.png': 'assets/images/game/sprites/grades/perfect-sheet.png',
    'assets/images/spritesheet/Grade-Twistsheet.png': 'assets/images/game/sprites/grades/twist-sheet.png'
  };

  for (const [from, to] of Object.entries(gradeMoves)) {
    moveFile(from, to, { reason: 'game grade sprite sheets' });
  }

  const characterMoves = {
    'assets/images/spritesheet/player-boat-airborne-spritesheet.png': 'assets/images/game/sprites/characters/player/boat-airborne-sheet.png',
    'assets/images/spritesheet/player-boat-boost-spritesheet.png': 'assets/images/game/sprites/characters/player/boat-boost-sheet.png',
    'assets/images/spritesheet/character-stick-monkey-airborne-spritesheet.png': 'assets/images/game/sprites/characters/companion/stick-monkey-airborne-sheet.png',
    'assets/images/spritesheet/character-stick-monkey-glide-spritesheet.png': 'assets/images/game/sprites/characters/companion/stick-monkey-glide-sheet.png',
    'assets/images/spritesheet/enemy-basic-spritesheet.png': 'assets/images/game/sprites/characters/enemies/basic-sheet.png',
    'assets/images/spritesheet/pickup-coin-spritesheet.png': 'assets/images/game/sprites/pickups/coin-sheet.png'
  };

  for (const [from, to] of Object.entries(characterMoves)) {
    moveFile(from, to, { reason: 'game character and pickup sprite sheets' });
  }

  const effectMoves = {
    'assets/images/spritesheet/fx-projectile-big-cannon.svg': 'assets/images/game/sprites/effects/big-cannon-projectile.svg',
    'assets/images/spritesheet/fx-projectile-front-cannon.svg': 'assets/images/game/sprites/effects/front-cannon-projectile.svg',
    'assets/images/spritesheet/fx-radius-big-cannon.svg': 'assets/images/game/sprites/effects/big-cannon-radius.svg',
    'assets/images/spritesheet/fx-radius-grappling-hook.svg': 'assets/images/game/sprites/effects/grappling-hook-radius.svg',
    'assets/images/spritesheet/fx-radius-magnet.svg': 'assets/images/game/sprites/effects/magnet-radius.svg'
  };

  for (const [from, to] of Object.entries(effectMoves)) {
    moveFile(from, to, { reason: 'game effect sprites' });
  }

  archiveFile(
    'assets/images/spritesheet/fx-grappling-rope.svg',
    'assets/archive/unreferenced/game/effects/grappling-rope.svg',
    'unused grappling rope effect variant'
  );

  const moduleAssets = [
    'big-cannon',
    'blower',
    'front-cannon',
    'front-reactor',
    'grappling-hook',
    'magnet',
    'plane',
    'rear-reactor',
    'shield',
    'thruster',
    'wings',
    'wrapper'
  ];

  for (const asset of moduleAssets) {
    moveFile(
      `assets/images/spritesheet/module-${asset}-spritesheet.png`,
      `assets/images/game/sprites/modules/${asset}/sheet.png`,
      { reason: 'game module sprite sheets' }
    );
  }

  archiveFile(
    'assets/images/spritesheet/module-front-reactor-legacy-spritesheet.png',
    'assets/archive/unreferenced/game/modules/front-reactor-legacy-sheet.png',
    'legacy front reactor sprite sheet is not referenced'
  );

  const uiMoves = {
    'assets/images/spritesheet/hud-momentum-bar-background.png': 'assets/images/game/ui/meters/momentum-background.png',
    'assets/images/spritesheet/hud-momentum-bar-fill-spritesheet.png': 'assets/images/game/ui/meters/fill-strip.png',
    'assets/images/spritesheet/hud-momentum-bar-overlay.png': 'assets/images/game/ui/meters/momentum-overlay.png',
    'assets/images/spritesheet/hud_boostsvg.svg': 'assets/images/game/ui/mobile-controls/boost.svg',
    'assets/images/spritesheet/hud_grappinsvg.svg': 'assets/images/game/ui/mobile-controls/grapple.svg',
    'assets/images/spritesheet/hud_jumpsvg.svg': 'assets/images/game/ui/mobile-controls/jump.svg',
    'assets/images/spritesheet/hud_parametredarksvg.svg': 'assets/images/game/ui/settings/settings-dark.svg',
    'assets/images/spritesheet/hud_parametrelightsvg.svg': 'assets/images/game/ui/settings/settings-light.svg',
    'assets/images/spritesheet/hud_restartbtndark.svg': 'assets/images/game/ui/settings/restart-dark.svg',
    'assets/images/spritesheet/hud_restartbtnlight.svg': 'assets/images/game/ui/settings/restart-light.svg'
  };

  for (const [from, to] of Object.entries(uiMoves)) {
    moveFile(from, to, { reason: 'game ui overlays and settings assets' });
  }

  for (let index = 1; index <= 5; index += 1) {
    moveFile(`assets/images/spritesheet/hud_${index}chargesvg.svg`, `assets/images/game/ui/mobile-controls/charge-${index}.svg`, {
      reason: 'game mobile control charge assets'
    });
  }
}

function reorganizeFonts() {
  moveFile('assets/fonts/text-me-one.regular.ttf', 'assets/fonts/text-me-one-regular.ttf', {
    reason: 'font naming normalization'
  });
  archiveFile(
    'assets/fonts/quicksand.boldoblique-regular.otf',
    'assets/fonts/archive/quicksand-bold-oblique-regular.otf',
    'unused secondary font retained in archive'
  );
}

function reorganizeAudio() {
  moveFile('assets/sound/soundtrackloopstereo/music-intro-stereo-left.wav', 'assets/audio/music/intro/left.wav', {
    reason: 'music organization'
  });
  moveFile('assets/sound/soundtrackloopstereo/music-intro-stereo-right.wav', 'assets/audio/music/intro/right.wav', {
    reason: 'music organization'
  });

  for (let loop = 1; loop <= 4; loop += 1) {
    const loopId = String(loop).padStart(2, '0');
    moveFile(`assets/sound/soundtrackloopstereo/music-loop-${loopId}-stereo-left.wav`, `assets/audio/music/loops/loop-${loopId}/left.wav`, {
      reason: 'music organization'
    });
    moveFile(`assets/sound/soundtrackloopstereo/music-loop-${loopId}-stereo-right.wav`, `assets/audio/music/loops/loop-${loopId}/right.wav`, {
      reason: 'music organization'
    });
  }

  const sfxMoves = {
    'assets/sound/sfx-blower-on.wav': 'assets/audio/sfx/modules/blower/on.wav',
    'assets/sound/sfx-blower-off.wav': 'assets/audio/sfx/modules/blower/off.wav',
    'assets/sound/sfx-boat-boost.wav': 'assets/audio/sfx/player/boat/boost.wav',
    'assets/sound/sfx-boat-land-01.wav': 'assets/audio/sfx/player/boat/land-01.wav',
    'assets/sound/sfx-boat-land-02.wav': 'assets/audio/sfx/player/boat/land-02.wav',
    'assets/sound/sfx-boat-land-03.wav': 'assets/audio/sfx/player/boat/land-03.wav',
    'assets/sound/sfx-cannon-big-shot-01.wav': 'assets/audio/sfx/modules/cannons/big-shot-01.wav',
    'assets/sound/sfx-cannon-big-shot-02.wav': 'assets/audio/sfx/modules/cannons/big-shot-02.wav',
    'assets/sound/sfx-cannon-front-shot-01.wav': 'assets/audio/sfx/modules/cannons/front-shot-01.wav',
    'assets/sound/sfx-cannon-front-shot-02.wav': 'assets/audio/sfx/modules/cannons/front-shot-02.wav',
    'assets/sound/sfx-coin-pickup-01.wav': 'assets/audio/sfx/ui/coin-pickup-01.wav',
    'assets/sound/sfx-coin-pickup-02.wav': 'assets/audio/sfx/ui/coin-pickup-02.wav',
    'assets/sound/sfx-enemy-die-01.wav': 'assets/audio/sfx/enemies/die-01.wav',
    'assets/sound/sfx-enemy-die-02.wav': 'assets/audio/sfx/enemies/die-02.wav',
    'assets/sound/sfx-enemy-die-03.wav': 'assets/audio/sfx/enemies/die-03.wav',
    'assets/sound/sfx-enemy-hit-player.wav': 'assets/audio/sfx/enemies/hit-player.wav',
    'assets/sound/sfx-game-over.wav': 'assets/audio/sfx/ui/game-over.wav',
    'assets/sound/sfx-grade-fail.wav': 'assets/audio/sfx/ui/grade/fail.wav',
    'assets/sound/sfx-grade-great.wav': 'assets/audio/sfx/ui/grade/great.wav',
    'assets/sound/sfx-grade-perfect.wav': 'assets/audio/sfx/ui/grade/perfect.wav',
    'assets/sound/sfx-grade-super.wav': 'assets/audio/sfx/ui/grade/super.wav',
    'assets/sound/sfx-grappling-hook-cast-return.wav': 'assets/audio/sfx/modules/grappling-hook/cast-return.wav',
    'assets/sound/sfx-grappling-hook-impact.wav': 'assets/audio/sfx/modules/grappling-hook/impact.wav',
    'assets/sound/sfx-magnet-coin-01.wav': 'assets/audio/sfx/modules/magnet/coin-01.wav',
    'assets/sound/sfx-magnet-coin-02.wav': 'assets/audio/sfx/modules/magnet/coin-02.wav',
    'assets/sound/sfx-momentum-loss-start.wav': 'assets/audio/sfx/gameplay/momentum-loss-start.wav',
    'assets/sound/sfx-plane-glide.wav': 'assets/audio/sfx/environment/plane-glide.wav',
    'assets/sound/sfx-player-jump-02.wav': 'assets/audio/sfx/player/jump/jump-02.wav',
    'assets/sound/sfx-player-jump-03.wav': 'assets/audio/sfx/player/jump/jump-03.wav',
    'assets/sound/sfx-player-jump-04.wav': 'assets/audio/sfx/player/jump/jump-04.wav',
    'assets/sound/sfx-player-jump-05.wav': 'assets/audio/sfx/player/jump/jump-05.wav',
    'assets/sound/sfx-player-jump-06.wav': 'assets/audio/sfx/player/jump/jump-06.wav',
    'assets/sound/sfx-player-jump-07.wav': 'assets/audio/sfx/player/jump/jump-07.wav',
    'assets/sound/sfx-playeronshard.wav': 'assets/audio/sfx/player/on-shard.wav',
    'assets/sound/sfx-reactor-charge-01.wav': 'assets/audio/sfx/modules/reactor/charge-01.wav',
    'assets/sound/sfx-reactor-charge-02.wav': 'assets/audio/sfx/modules/reactor/charge-02.wav',
    'assets/sound/sfx-reward-shard-land.wav': 'assets/audio/sfx/gameplay/reward-shard-land.wav',
    'assets/sound/sfx-sail-flap-01.wav': 'assets/audio/sfx/environment/sail-flap-01.wav',
    'assets/sound/sfx-sail-flap-02.wav': 'assets/audio/sfx/environment/sail-flap-02.wav',
    'assets/sound/sfx-shield-protect-01.wav': 'assets/audio/sfx/modules/shield/protect-01.wav',
    'assets/sound/sfx-shield-protect-02.wav': 'assets/audio/sfx/modules/shield/protect-02.wav',
    'assets/sound/sfx-shop-land.wav': 'assets/audio/sfx/ui/shop-land.wav',
    'assets/sound/sfx-thruster-charge.wav': 'assets/audio/sfx/modules/thruster/charge.wav',
    'assets/sound/sfx-twist-land.wav': 'assets/audio/sfx/gameplay/twist-land.wav',
    'assets/sound/sfx-wings-charge-01.wav': 'assets/audio/sfx/modules/wings/charge-01.wav',
    'assets/sound/sfx-wings-charge-02.wav': 'assets/audio/sfx/modules/wings/charge-02.wav',
    'assets/sound/sfx-wings-charge-03.wav': 'assets/audio/sfx/modules/wings/charge-03.wav',
    'assets/sound/sfx-wrapper-activate.wav': 'assets/audio/sfx/modules/wrapper/activate.wav'
  };

  for (const [from, to] of Object.entries(sfxMoves)) {
    moveFile(from, to, { reason: 'sfx organization' });
  }

  archiveFile(
    'assets/sound/sfx-boat-jump.wav',
    'assets/archive/unreferenced/audio/player/boat-jump.wav',
    'unreferenced alternate player boat jump'
  );
  archiveFile(
    'assets/sound/sfx-player-unkownshard.wav',
    'assets/archive/unreferenced/audio/player/unknown-shard.wav',
    'unreferenced player shard audio with inconsistent name'
  );
}

function mergeKnownDuplicateAssets() {
  mergeDuplicate(
    'assets/images/btn/Soundspritesheet.png',
    'assets/images/game/ui/meters/fill-strip.png',
    'sound meter sprite duplicated the momentum meter fill strip'
  );
}

reorganizeBranding();
reorganizeSharedImages();
reorganizeButtonImages();
reorganizeHelpImages();
reorganizeEquipmentImages();
reorganizePortfolioImages();
reorganizeSpriteImages();
reorganizeFonts();
reorganizeAudio();
mergeKnownDuplicateAssets();
replaceInTextFiles();
pruneEmptyDirectories('assets/images/Logo');
pruneEmptyDirectories('assets/images/Langue');
pruneEmptyDirectories('assets/images/btn');
pruneEmptyDirectories('assets/images/help');
pruneEmptyDirectories('assets/images/itemhud');
pruneEmptyDirectories('assets/images/projects');
pruneEmptyDirectories('assets/images/spritesheet');
pruneEmptyDirectories('assets/sound');
writeManifest();
