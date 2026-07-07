/**
 * flexr.dev — client-side state engine.
 *
 * PURGE SAFETY: every Tailwind utility that can ever reach the DOM is written
 * below as a complete literal string. Never build a class via interpolation
 * (`gap-${n}`) — Tailwind's compiler scans this file for full strings and
 * anything assembled at runtime would be purged from the production CSS.
 * (global.css declares this directory via @source as a scanned source.)
 */

/* ------------------------------------------------------------------ */
/* Option dictionaries                                                 */
/* ------------------------------------------------------------------ */

const DIRECTION_OPTIONS = [
  { id: 'row', label: 'Row', tw: 'flex-row', css: 'flex-direction: row;' },
  { id: 'row-reverse', label: 'Row Rev', tw: 'flex-row-reverse', css: 'flex-direction: row-reverse;' },
  { id: 'col', label: 'Column', tw: 'flex-col', css: 'flex-direction: column;' },
  { id: 'col-reverse', label: 'Col Rev', tw: 'flex-col-reverse', css: 'flex-direction: column-reverse;' },
];

const JUSTIFY_OPTIONS = [
  { id: 'start', label: 'Start', tw: 'justify-start', css: 'justify-content: flex-start;' },
  { id: 'center', label: 'Center', tw: 'justify-center', css: 'justify-content: center;' },
  { id: 'end', label: 'End', tw: 'justify-end', css: 'justify-content: flex-end;' },
  { id: 'between', label: 'Between', tw: 'justify-between', css: 'justify-content: space-between;' },
  { id: 'around', label: 'Around', tw: 'justify-around', css: 'justify-content: space-around;' },
  { id: 'evenly', label: 'Evenly', tw: 'justify-evenly', css: 'justify-content: space-evenly;' },
];

const ALIGN_OPTIONS = [
  { id: 'stretch', label: 'Stretch', tw: 'items-stretch', css: 'align-items: stretch;' },
  { id: 'start', label: 'Start', tw: 'items-start', css: 'align-items: flex-start;' },
  { id: 'center', label: 'Center', tw: 'items-center', css: 'align-items: center;' },
  { id: 'end', label: 'End', tw: 'items-end', css: 'align-items: flex-end;' },
  { id: 'baseline', label: 'Baseline', tw: 'items-baseline', css: 'align-items: baseline;' },
];

const WRAP_OPTIONS = [
  { id: 'nowrap', label: 'No Wrap', tw: 'flex-nowrap', css: 'flex-wrap: nowrap;' },
  { id: 'wrap', label: 'Wrap', tw: 'flex-wrap', css: 'flex-wrap: wrap;' },
  { id: 'wrap-reverse', label: 'Wrap Rev', tw: 'flex-wrap-reverse', css: 'flex-wrap: wrap-reverse;' },
];

const GAP_OPTIONS = [
  { id: '0', tw: 'gap-0', css: 'gap: 0px;', size: '0px' },
  { id: '1', tw: 'gap-1', css: 'gap: 0.25rem;', size: '0.25rem' },
  { id: '2', tw: 'gap-2', css: 'gap: 0.5rem;', size: '0.5rem' },
  { id: '3', tw: 'gap-3', css: 'gap: 0.75rem;', size: '0.75rem' },
  { id: '4', tw: 'gap-4', css: 'gap: 1rem;', size: '1rem' },
  { id: '5', tw: 'gap-5', css: 'gap: 1.25rem;', size: '1.25rem' },
  { id: '6', tw: 'gap-6', css: 'gap: 1.5rem;', size: '1.5rem' },
  { id: '8', tw: 'gap-8', css: 'gap: 2rem;', size: '2rem' },
  { id: '10', tw: 'gap-10', css: 'gap: 2.5rem;', size: '2.5rem' },
  { id: '12', tw: 'gap-12', css: 'gap: 3rem;', size: '3rem' },
];

const GRID_COLS_OPTIONS = [
  { id: '1', label: '1', tw: 'grid-cols-1', css: 'grid-template-columns: repeat(1, minmax(0, 1fr));' },
  { id: '2', label: '2', tw: 'grid-cols-2', css: 'grid-template-columns: repeat(2, minmax(0, 1fr));' },
  { id: '3', label: '3', tw: 'grid-cols-3', css: 'grid-template-columns: repeat(3, minmax(0, 1fr));' },
  { id: '4', label: '4', tw: 'grid-cols-4', css: 'grid-template-columns: repeat(4, minmax(0, 1fr));' },
  { id: '5', label: '5', tw: 'grid-cols-5', css: 'grid-template-columns: repeat(5, minmax(0, 1fr));' },
  { id: '6', label: '6', tw: 'grid-cols-6', css: 'grid-template-columns: repeat(6, minmax(0, 1fr));' },
];

const GRID_ROWS_OPTIONS = [
  { id: '1', label: '1', tw: 'grid-rows-1', css: 'grid-template-rows: repeat(1, minmax(0, 1fr));' },
  { id: '2', label: '2', tw: 'grid-rows-2', css: 'grid-template-rows: repeat(2, minmax(0, 1fr));' },
  { id: '3', label: '3', tw: 'grid-rows-3', css: 'grid-template-rows: repeat(3, minmax(0, 1fr));' },
  { id: '4', label: '4', tw: 'grid-rows-4', css: 'grid-template-rows: repeat(4, minmax(0, 1fr));' },
];

const ALIGN_SELF_OPTIONS = [
  { id: 'auto', label: 'Auto', tw: 'self-auto', css: 'align-self: auto;' },
  { id: 'start', label: 'Start', tw: 'self-start', css: 'align-self: flex-start;' },
  { id: 'center', label: 'Center', tw: 'self-center', css: 'align-self: center;' },
  { id: 'end', label: 'End', tw: 'self-end', css: 'align-self: flex-end;' },
  { id: 'stretch', label: 'Stretch', tw: 'self-stretch', css: 'align-self: stretch;' },
  { id: 'baseline', label: 'Baseline', tw: 'self-baseline', css: 'align-self: baseline;' },
];

const ORDER_OPTIONS = [
  { id: 'none', label: 'None', tw: 'order-none', css: 'order: 0;' },
  { id: 'first', label: 'First', tw: 'order-first', css: 'order: -9999;' },
  { id: 'last', label: 'Last', tw: 'order-last', css: 'order: 9999;' },
  { id: '1', label: '1', tw: 'order-1', css: 'order: 1;' },
  { id: '2', label: '2', tw: 'order-2', css: 'order: 2;' },
  { id: '3', label: '3', tw: 'order-3', css: 'order: 3;' },
  { id: '4', label: '4', tw: 'order-4', css: 'order: 4;' },
  { id: '5', label: '5', tw: 'order-5', css: 'order: 5;' },
  { id: '6', label: '6', tw: 'order-6', css: 'order: 6;' },
];

const GROW_TW = 'grow';
const GROW_CSS = 'flex-grow: 1;';
const SHRINK_OFF_TW = 'shrink-0';
const SHRINK_OFF_CSS = 'flex-shrink: 0;';

/* ------------------------------------------------------------------ */
/* Human-readable layout translation                                   */
/* ------------------------------------------------------------------ */

/* Curated use-cases for notable justify|align pairs (row direction only —
   the axis wording is wrong for columns, which fall through to the
   composed fallback below). */
const LAYOUT_USE_CASES = {
  'center|center':
    'Items are perfectly centered horizontally and vertically. Excellent for hero sections, modals, and landing-page badges.',
  'between|center':
    'Items are pushed to the absolute outer edges with equal gaps. Perfect for navigation bars — logo on the left, menu on the right.',
  'start|stretch':
    "Items are packed to the left and stretched to full height — the browser's flex default. A solid base for toolbars and media rows.",
  'evenly|center':
    'Items are spaced with perfectly even gaps throughout. Great for footer link rows and icon strips.',
  'around|center':
    'Every item gets equal breathing room on both sides. Nice for stat strips and feature rows.',
  'end|end':
    'Items are tucked into the bottom-right corner. Common for dialog action buttons (Cancel / Save).',
  'center|end':
    'Items are centered horizontally and rest on the bottom edge. Good for footers and image captions.',
  'start|baseline':
    'Items line up on their text baselines. The right choice for mixed-size text sitting on one visual line.',
};

const JUSTIFY_HUMAN = {
  start: 'packed %MAIN% to the start',
  center: 'centered %MAIN%',
  end: 'pushed %MAIN% to the end',
  between: 'spread %MAIN% to the outer edges with equal gaps between',
  around: 'spaced %MAIN% with equal padding around each one',
  evenly: 'spaced %MAIN% with perfectly even gaps',
};

const ALIGN_HUMAN = {
  stretch: 'stretched %CROSS% to fill the container',
  start: 'tucked %CROSS% to the start',
  center: 'centered %CROSS%',
  end: 'dropped %CROSS% to the end',
  baseline: 'lined up on their text baselines',
};

function buildTranslation() {
  if (state.mode === 'grid') {
    return `Items flow left-to-right into ${state.gridCols} equal columns across ${state.gridRows} rows. Great for card grids, image galleries, and dashboard tiles.`;
  }

  const isColumn = state.direction === 'col' || state.direction === 'col-reverse';
  const isReversed = state.direction === 'row-reverse' || state.direction === 'col-reverse';
  const main = isColumn ? 'vertically' : 'horizontally';
  const cross = isColumn ? 'horizontally' : 'vertically';

  const curated = LAYOUT_USE_CASES[`${state.justify}|${state.align}`];
  let sentence;
  if (curated && !isColumn && !isReversed) {
    sentence = curated;
  } else {
    sentence = `Items are ${JUSTIFY_HUMAN[state.justify].replace('%MAIN%', main)} and ${ALIGN_HUMAN[state.align].replace('%CROSS%', cross)}.`;
    if (isColumn) {
      sentence = `Stacked as a vertical column: ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`;
    }
    if (isReversed) sentence += ' Visual order is reversed.';
  }

  if (state.wrap === 'wrap') {
    sentence += ' Overflowing items wrap onto new lines — shrink the window to preview responsive, grid-like reflow.';
  } else if (state.wrap === 'wrap-reverse') {
    sentence += ' Overflow wraps onto new lines in reverse stacking order.';
  }
  return sentence;
}

/* ------------------------------------------------------------------ */
/* Quick Layout Recipes                                                */
/* ------------------------------------------------------------------ */

const PRESETS = [
  {
    id: 'perfect-center',
    emoji: '\u{1F3AF}',
    label: 'Perfect Center',
    hint: 'Dead-center anything — hero content, modals, empty states.',
    itemCount: 3,
    state: { mode: 'flex', direction: 'row', justify: 'center', align: 'center', wrap: 'nowrap', gap: '4' },
  },
  {
    id: 'navbar',
    emoji: '\u{1F4F1}',
    label: 'Standard Navbar',
    hint: 'Logo left, links right — the classic space-between header split.',
    itemCount: 3,
    state: { mode: 'flex', direction: 'row', justify: 'between', align: 'center', wrap: 'nowrap', gap: '4' },
  },
  {
    id: 'card-grid',
    emoji: '\u{1F5C2}\u{FE0F}',
    label: 'Responsive Card Grid',
    hint: 'Wrapping cards with consistent gutters that reflow on small screens.',
    itemCount: 6,
    state: { mode: 'flex', direction: 'row', justify: 'start', align: 'stretch', wrap: 'wrap', gap: '6' },
  },
];

/* Canvas item cosmetics — cycled per index so shifts are obvious. */
const ITEM_GRADIENTS = [
  'bg-linear-to-br from-indigo-500 to-violet-600',
  'bg-linear-to-br from-sky-500 to-cyan-600',
  'bg-linear-to-br from-emerald-500 to-teal-600',
  'bg-linear-to-br from-amber-500 to-orange-600',
  'bg-linear-to-br from-rose-500 to-pink-600',
  'bg-linear-to-br from-fuchsia-500 to-purple-600',
  'bg-linear-to-br from-blue-500 to-indigo-600',
  'bg-linear-to-br from-lime-500 to-green-600',
  'bg-linear-to-br from-red-500 to-rose-600',
  'bg-linear-to-br from-cyan-500 to-blue-600',
  'bg-linear-to-br from-purple-500 to-fuchsia-600',
  'bg-linear-to-br from-teal-500 to-emerald-600',
];

/* Varied heights (flex mode only) so align/baseline changes read instantly. */
const ITEM_SIZE_VARIANTS = ['min-h-16', 'min-h-28', 'min-h-20', 'min-h-24'];

const ITEM_BASE =
  'flexr-item relative flex flex-col items-center justify-center gap-1 min-w-20 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/40 transition-all duration-200 cursor-pointer select-none';
const ITEM_SELECTED =
  'ring-2 ring-indigo-300 ring-offset-2 ring-offset-zinc-950 scale-[1.02]';

/* Control-panel button skins. */
const OPT_BASE =
  'rounded-lg border px-2 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer';
const OPT_ON =
  'border-indigo-400/60 bg-indigo-500/15 text-indigo-200 shadow-[0_0_14px_-4px_rgba(99,102,241,0.7)]';
const OPT_OFF =
  'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200';

const RECIPE_BASE =
  'flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all duration-150 cursor-pointer';
const RECIPE_ON = 'border-indigo-400/60 bg-indigo-500/15 text-indigo-200';
const RECIPE_OFF =
  'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-600 hover:text-zinc-100';

const MODE_ON =
  'rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-150 cursor-pointer bg-indigo-500 text-white shadow-lg shadow-indigo-500/25';
const MODE_OFF =
  'rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-150 cursor-pointer bg-transparent text-zinc-400 hover:text-zinc-100';

const CHIP_BASE =
  'relative rounded-md border px-2.5 py-1 font-mono text-[11px] transition-all duration-150 cursor-pointer';
const CHIP_ON = 'border-indigo-400/70 bg-indigo-500/20 text-indigo-200';
const CHIP_OFF =
  'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200';

const TAB_ON =
  'rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-150 cursor-pointer bg-zinc-800 text-zinc-100 shadow-sm';
const TAB_OFF =
  'rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-150 cursor-pointer text-zinc-500 hover:text-zinc-200';

const TOGGLE_ON = 'relative h-5 w-9 rounded-full transition-colors duration-200 cursor-pointer bg-indigo-500';
const TOGGLE_OFF = 'relative h-5 w-9 rounded-full transition-colors duration-200 cursor-pointer bg-zinc-700';
const KNOB_ON =
  'absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 translate-x-4';
const KNOB_OFF =
  'absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 translate-x-0';

const PRESSED_ON =
  'flex items-center justify-between rounded-lg border px-3 py-2 text-xs font-medium transition-all duration-150 cursor-pointer border-indigo-400/60 bg-indigo-500/15 text-indigo-200';
const PRESSED_OFF =
  'flex items-center justify-between rounded-lg border px-3 py-2 text-xs font-medium transition-all duration-150 cursor-pointer border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200';

/* Guides overlay (grid mode) — also full literal strings. */
const OVERLAY_BASE = 'pointer-events-none absolute inset-5 z-10 grid opacity-80';
const OVERLAY_CELL = 'rounded-lg border border-dashed border-zinc-500/50';

/* ------------------------------------------------------------------ */
/* State                                                               */
/* ------------------------------------------------------------------ */

const defaultItem = () => ({ grow: false, shrink: true, alignSelf: 'auto', order: 'none' });

const state = {
  mode: 'flex', // 'flex' | 'grid'
  direction: 'row',
  justify: 'start',
  align: 'stretch',
  wrap: 'nowrap',
  gap: '4',
  gridCols: '3',
  gridRows: '2',
  items: [defaultItem(), defaultItem(), defaultItem()],
  selected: null, // index of the item being overridden, or null
  guides: false,
  tab: 'tailwind', // 'tailwind' | 'vanilla'
};

const MAX_ITEMS = 12;
const MIN_ITEMS = 1;

const findOpt = (options, id) => options.find((o) => o.id === id);
const selectedItem = () => (state.selected === null ? null : state.items[state.selected]);

/* Declarative wiring between [data-options] containers and state. */
const OPTION_GROUPS = {
  direction: { options: DIRECTION_OPTIONS, get: () => state.direction, set: (v) => (state.direction = v) },
  justify: { options: JUSTIFY_OPTIONS, get: () => state.justify, set: (v) => (state.justify = v) },
  align: { options: ALIGN_OPTIONS, get: () => state.align, set: (v) => (state.align = v) },
  wrap: { options: WRAP_OPTIONS, get: () => state.wrap, set: (v) => (state.wrap = v) },
  gridCols: { options: GRID_COLS_OPTIONS, get: () => state.gridCols, set: (v) => (state.gridCols = v) },
  gridRows: { options: GRID_ROWS_OPTIONS, get: () => state.gridRows, set: (v) => (state.gridRows = v) },
  alignSelf: {
    options: ALIGN_SELF_OPTIONS,
    get: () => selectedItem()?.alignSelf,
    set: (v) => { const it = selectedItem(); if (it) it.alignSelf = v; },
  },
  order: {
    options: ORDER_OPTIONS,
    get: () => selectedItem()?.order,
    set: (v) => { const it = selectedItem(); if (it) it.order = v; },
  },
};

/* ------------------------------------------------------------------ */
/* Class + code builders                                               */
/* ------------------------------------------------------------------ */

function containerTw() {
  if (state.mode === 'flex') {
    return [
      'flex',
      findOpt(DIRECTION_OPTIONS, state.direction).tw,
      findOpt(JUSTIFY_OPTIONS, state.justify).tw,
      findOpt(ALIGN_OPTIONS, state.align).tw,
      findOpt(WRAP_OPTIONS, state.wrap).tw,
      findOpt(GAP_OPTIONS, state.gap).tw,
    ];
  }
  return [
    'grid',
    findOpt(GRID_COLS_OPTIONS, state.gridCols).tw,
    findOpt(GRID_ROWS_OPTIONS, state.gridRows).tw,
    findOpt(GAP_OPTIONS, state.gap).tw,
  ];
}

function containerCss() {
  if (state.mode === 'flex') {
    return [
      'display: flex;',
      findOpt(DIRECTION_OPTIONS, state.direction).css,
      findOpt(JUSTIFY_OPTIONS, state.justify).css,
      findOpt(ALIGN_OPTIONS, state.align).css,
      findOpt(WRAP_OPTIONS, state.wrap).css,
      findOpt(GAP_OPTIONS, state.gap).css,
    ];
  }
  return [
    'display: grid;',
    findOpt(GRID_COLS_OPTIONS, state.gridCols).css,
    findOpt(GRID_ROWS_OPTIONS, state.gridRows).css,
    findOpt(GAP_OPTIONS, state.gap).css,
  ];
}

function itemTw(item) {
  const out = [];
  if (state.mode === 'flex') {
    if (item.grow) out.push(GROW_TW);
    if (!item.shrink) out.push(SHRINK_OFF_TW);
  }
  if (item.alignSelf !== 'auto') out.push(findOpt(ALIGN_SELF_OPTIONS, item.alignSelf).tw);
  if (item.order !== 'none') out.push(findOpt(ORDER_OPTIONS, item.order).tw);
  return out;
}

function itemCss(item) {
  const out = [];
  if (state.mode === 'flex') {
    if (item.grow) out.push(GROW_CSS);
    if (!item.shrink) out.push(SHRINK_OFF_CSS);
  }
  if (item.alignSelf !== 'auto') out.push(findOpt(ALIGN_SELF_OPTIONS, item.alignSelf).css);
  if (item.order !== 'none') out.push(findOpt(ORDER_OPTIONS, item.order).css);
  return out;
}

function buildTailwindSnippet() {
  const lines = [`<div class="${containerTw().join(' ')}">`];
  state.items.forEach((item, i) => {
    const cls = itemTw(item).join(' ');
    lines.push(cls ? `  <div class="${cls}">Item ${i + 1}</div>` : `  <div>Item ${i + 1}</div>`);
  });
  lines.push('</div>');
  return lines.join('\n');
}

function buildVanillaSnippet() {
  const html = ['<div class="parent">'];
  state.items.forEach((item, i) => {
    const hasOverrides = itemCss(item).length > 0;
    html.push(
      hasOverrides
        ? `  <div class="item item-${i + 1}">Item ${i + 1}</div>`
        : `  <div class="item">Item ${i + 1}</div>`
    );
  });
  html.push('</div>');

  const css = ['.parent {', ...containerCss().map((d) => `  ${d}`), '}'];
  state.items.forEach((item, i) => {
    const decls = itemCss(item);
    if (decls.length > 0) {
      css.push('', `.item-${i + 1} {`, ...decls.map((d) => `  ${d}`), '}');
    }
  });

  return { html: html.join('\n'), css: css.join('\n') };
}

/* ------------------------------------------------------------------ */
/* Syntax highlighting (display only — copy uses the raw string)       */
/* ------------------------------------------------------------------ */

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function hlHtml(src) {
  return escapeHtml(src).replace(
    /(&lt;\/?[\w-]+|\/?&gt;)|([\w-]+)(?==)|("[^"]*")/g,
    (m, tag, attr, str) => {
      if (tag) return `<span class="text-sky-400">${tag}</span>`;
      if (attr) return `<span class="text-violet-400">${attr}</span>`;
      return `<span class="text-emerald-400">${str}</span>`;
    }
  );
}

function hlCss(src) {
  return escapeHtml(src).replace(
    /(^[.#][\w-]+)|([\w-]+)(?=:)|(:[^;\n]+;)/gm,
    (m, sel, prop, val) => {
      if (sel) return `<span class="text-violet-400">${sel}</span>`;
      if (prop) return `<span class="text-sky-400">${prop}</span>`;
      return `<span class="text-emerald-400">${val}</span>`;
    }
  );
}

/* ------------------------------------------------------------------ */
/* Rendering                                                           */
/* ------------------------------------------------------------------ */

let dom = {};
let currentCode = '';

function applyPreset(preset) {
  Object.assign(state, preset.state);
  state.items = Array.from({ length: preset.itemCount }, defaultItem);
  state.selected = null;
  render();
}

function presetIsActive(preset) {
  return (
    state.items.length === preset.itemCount &&
    Object.entries(preset.state).every(([key, value]) => state[key] === value)
  );
}

function renderRecipes() {
  dom.recipeButtons.forEach((btn, i) => {
    btn.className = `${RECIPE_BASE} ${presetIsActive(PRESETS[i]) ? RECIPE_ON : RECIPE_OFF}`;
  });
}

function renderTranslation() {
  dom.translation.textContent = buildTranslation();
}

function renderModeUI() {
  dom.modeButtons.forEach((btn) => {
    btn.className = btn.dataset.mode === state.mode ? MODE_ON : MODE_OFF;
  });
  // style.display (not the `hidden` class) so it can't fight display utilities
  dom.flexSection.style.display = state.mode === 'flex' ? '' : 'none';
  dom.gridSection.style.display = state.mode === 'grid' ? '' : 'none';
}

function renderOptionGroups() {
  dom.optionContainers.forEach((container) => {
    const group = OPTION_GROUPS[container.dataset.options];
    const current = group.get();
    for (const btn of container.children) {
      btn.className = `${OPT_BASE} ${btn.dataset.value === current ? OPT_ON : OPT_OFF}`;
    }
  });
}

function renderGap() {
  const idx = GAP_OPTIONS.findIndex((o) => o.id === state.gap);
  dom.gapSlider.value = String(idx);
  const opt = GAP_OPTIONS[idx];
  dom.gapValue.textContent = `${opt.tw} · ${opt.size}`;
}

function renderChips() {
  dom.itemsCount.textContent = String(state.items.length);
  dom.itemChips.innerHTML = '';
  state.items.forEach((item, i) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.dataset.index = String(i);
    chip.className = `${CHIP_BASE} ${state.selected === i ? CHIP_ON : CHIP_OFF}`;
    chip.textContent = `Item ${i + 1}`;
    if (itemTw(item).length > 0) {
      const dot = document.createElement('span');
      dot.className = 'absolute -top-1 -right-1 h-2 w-2 rounded-full bg-indigo-400';
      chip.appendChild(dot);
    }
    dom.itemChips.appendChild(chip);
  });
}

function renderOverridePanel() {
  const item = selectedItem();
  dom.overridePanel.style.display = item ? '' : 'none';
  if (!item) return;
  dom.overrideTitle.textContent = `Item ${state.selected + 1} overrides`;
  dom.flexOnlyControls.style.display = state.mode === 'flex' ? '' : 'none';
  dom.growToggle.className = item.grow ? PRESSED_ON : PRESSED_OFF;
  dom.growState.textContent = item.grow ? 'on' : 'off';
  dom.shrinkToggle.className = item.shrink ? PRESSED_ON : PRESSED_OFF;
  dom.shrinkState.textContent = item.shrink ? 'on' : 'off';
}

function renderCanvas() {
  const canvasBase = 'relative min-h-96 w-full transition-all duration-200';
  dom.canvas.className = `${canvasBase} ${containerTw().join(' ')}${state.guides ? ' guides' : ''}`;

  // Reconcile child count without rebuilding untouched nodes (keeps transitions fluid).
  while (dom.canvas.children.length > state.items.length) dom.canvas.lastElementChild.remove();
  while (dom.canvas.children.length < state.items.length) {
    dom.canvas.appendChild(document.createElement('div'));
  }

  state.items.forEach((item, i) => {
    const el = dom.canvas.children[i];
    el.dataset.index = String(i);
    const size = state.mode === 'grid' ? 'min-h-16' : ITEM_SIZE_VARIANTS[i % ITEM_SIZE_VARIANTS.length];
    const overrides = itemTw(item).join(' ');
    el.className = [
      ITEM_BASE,
      ITEM_GRADIENTS[i % ITEM_GRADIENTS.length],
      size,
      overrides,
      state.selected === i ? ITEM_SELECTED : '',
    ].filter(Boolean).join(' ');
    el.innerHTML =
      `<span class="pointer-events-none">Item ${i + 1}</span>` +
      (overrides
        ? `<span class="pointer-events-none font-mono text-[10px] font-normal text-white/75">${overrides}</span>`
        : '');
  });

  // Guides: dotted track overlay in grid mode (flex guides are pure CSS via .guides).
  if (state.guides && state.mode === 'grid') {
    const cols = findOpt(GRID_COLS_OPTIONS, state.gridCols);
    const rows = findOpt(GRID_ROWS_OPTIONS, state.gridRows);
    const gap = findOpt(GAP_OPTIONS, state.gap);
    dom.overlay.className = `${OVERLAY_BASE} ${cols.tw} ${rows.tw} ${gap.tw}`;
    const cellCount = Number(state.gridCols) * Number(state.gridRows);
    dom.overlay.innerHTML = `<div class="${OVERLAY_CELL}"></div>`.repeat(cellCount);
  } else {
    dom.overlay.className = 'hidden';
    dom.overlay.innerHTML = '';
  }

  dom.guidesToggle.className = state.guides ? TOGGLE_ON : TOGGLE_OFF;
  dom.guidesToggle.setAttribute('aria-pressed', String(state.guides));
  dom.guidesKnob.className = state.guides ? KNOB_ON : KNOB_OFF;
  dom.canvasClasses.textContent = containerTw().join(' ');
}

function renderCode() {
  dom.tabButtons.forEach((btn) => {
    btn.className = btn.dataset.tab === state.tab ? TAB_ON : TAB_OFF;
  });

  if (state.tab === 'tailwind') {
    const snippet = buildTailwindSnippet();
    currentCode = snippet;
    dom.codeBlock.innerHTML = hlHtml(snippet);
  } else {
    const { html, css } = buildVanillaSnippet();
    currentCode = `${html}\n\n<style>\n${css}\n</style>`;
    dom.codeBlock.innerHTML =
      hlHtml(html) + '\n\n' + hlHtml('<style>') + '\n' + hlCss(css) + '\n' + hlHtml('</style>');
  }
}

function render() {
  renderRecipes();
  renderTranslation();
  renderModeUI();
  renderOptionGroups();
  renderGap();
  renderChips();
  renderOverridePanel();
  renderCanvas();
  renderCode();
}

/* ------------------------------------------------------------------ */
/* Actions                                                             */
/* ------------------------------------------------------------------ */

function selectItem(index) {
  state.selected = state.selected === index ? null : index;
  render();
}

function setItemCount(next) {
  const count = Math.max(MIN_ITEMS, Math.min(MAX_ITEMS, next));
  while (state.items.length < count) state.items.push(defaultItem());
  state.items.length = count;
  if (state.selected !== null && state.selected >= count) state.selected = null;
  render();
}

async function copyCode() {
  try {
    await navigator.clipboard.writeText(currentCode);
  } catch {
    // Clipboard API can be unavailable (permissions / non-secure context)
    const ta = document.createElement('textarea');
    ta.value = currentCode;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  dom.copyLabel.textContent = 'Copied!';
  dom.copyBtn.classList.add('text-emerald-300', 'border-emerald-400/60', 'bg-emerald-500/10');
  clearTimeout(copyCode._t);
  copyCode._t = setTimeout(() => {
    dom.copyLabel.textContent = 'Copy Code';
    dom.copyBtn.classList.remove('text-emerald-300', 'border-emerald-400/60', 'bg-emerald-500/10');
  }, 1600);
}

/**
 * Opens the current layout in a live Tailwind sandbox tab. The document is
 * round-tripped through base64 (a safe, URL-encodable structural payload)
 * and served from an in-memory blob URL — nothing ever leaves the browser.
 * The sandbox compiles utilities at runtime via the official Tailwind Play
 * CDN browser build.
 */
function openSandbox() {
  const container = containerTw().join(' ');
  const inner = state.items
    .map((item, i) => {
      const overrides = itemTw(item).join(' ');
      const cls = ['rounded-xl bg-indigo-500/80 px-6 py-4 text-center font-medium', overrides]
        .filter(Boolean)
        .join(' ');
      return `      <div class="${cls}">Item ${i + 1}</div>`;
    })
    .join('\n');

  const doc = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>flexr.dev export</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"><\/script>
  </head>
  <body class="min-h-screen bg-zinc-950 p-10 font-sans text-white">
    <p class="mb-6 font-mono text-xs text-zinc-500">Exported from flexr.dev</p>
    <div class="${container} min-h-96 rounded-2xl border border-zinc-800 p-6">
${inner}
    </div>
  </body>
</html>`;

  const b64 = btoa(String.fromCharCode(...new TextEncoder().encode(doc)));
  const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  const url = URL.createObjectURL(new Blob([bytes], { type: 'text/html' }));
  window.open(url, '_blank', 'noopener');
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

/* ------------------------------------------------------------------ */
/* pSEO state hydration                                                */
/* ------------------------------------------------------------------ */

/**
 * Translates an initialState payload from src/data/seoLayouts.json into
 * engine state. The dataset is authored in full Tailwind class strings
 * ("justify-center", "grid-cols-3"), so each value is reverse-looked-up in
 * the option dictionaries — an unknown or missing value leaves the default
 * untouched, and the dataset can never reference a class the engine (and
 * therefore the compiled CSS) doesn't know about.
 */
function applySeoState(cfg) {
  const idByTw = (options, tw) => options.find((o) => o.tw === tw)?.id;
  if (cfg.mode === 'flex' || cfg.mode === 'grid') state.mode = cfg.mode;
  state.direction = idByTw(DIRECTION_OPTIONS, cfg.direction) ?? state.direction;
  state.justify = idByTw(JUSTIFY_OPTIONS, cfg.justify) ?? state.justify;
  state.align = idByTw(ALIGN_OPTIONS, cfg.align) ?? state.align;
  state.wrap = idByTw(WRAP_OPTIONS, cfg.wrap) ?? state.wrap;
  state.gap = idByTw(GAP_OPTIONS, cfg.gap) ?? state.gap;
  state.gridCols = idByTw(GRID_COLS_OPTIONS, cfg.cols) ?? state.gridCols;
  state.gridRows = idByTw(GRID_ROWS_OPTIONS, cfg.rows) ?? state.gridRows;
  const count = Number(cfg.childrenCount);
  if (Number.isInteger(count) && count >= MIN_ITEMS && count <= MAX_ITEMS) {
    state.items = Array.from({ length: count }, defaultItem);
  }
}

/* ------------------------------------------------------------------ */
/* Init                                                                */
/* ------------------------------------------------------------------ */

export function initFlexr() {
  const $ = (sel) => document.querySelector(sel);

  // pSEO pages embed their layout configuration as a JSON island (see
  // src/pages/[slug].astro); the home page has none and keeps defaults.
  const seed = document.getElementById('flexr-initial-state');
  if (seed) {
    try {
      applySeoState(JSON.parse(seed.textContent));
    } catch {
      // Malformed island — fall back to the default state.
    }
  }

  dom = {
    modeButtons: [...document.querySelectorAll('[data-mode]')],
    flexSection: $('[data-section="flex"]'),
    gridSection: $('[data-section="grid"]'),
    optionContainers: [...document.querySelectorAll('[data-options]')],
    gapSlider: $('#gap-slider'),
    gapValue: $('#gap-value'),
    itemsCount: $('#items-count'),
    itemChips: $('#item-chips'),
    overridePanel: $('#override-panel'),
    overrideTitle: $('#override-title'),
    overrideClose: $('#override-close'),
    flexOnlyControls: $('#flex-only-controls'),
    growToggle: $('#grow-toggle'),
    growState: $('#grow-state'),
    shrinkToggle: $('#shrink-toggle'),
    shrinkState: $('#shrink-state'),
    canvas: $('#canvas'),
    overlay: $('#guides-overlay'),
    guidesToggle: $('#guides-toggle'),
    guidesKnob: $('#guides-knob'),
    canvasClasses: $('#canvas-classes'),
    translation: $('#layout-translation'),
    recipes: $('#recipes'),
    tabButtons: [...document.querySelectorAll('[data-tab]')],
    codeBlock: $('#code-block'),
    copyBtn: $('#copy-btn'),
    copyLabel: $('#copy-label'),
    sandboxBtn: $('#sandbox-btn'),
  };

  // Quick Layout Recipes — one click writes a whole known-good state.
  dom.recipeButtons = PRESETS.map((preset) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.title = preset.hint;
    const emoji = document.createElement('span');
    emoji.setAttribute('aria-hidden', 'true');
    emoji.textContent = preset.emoji;
    const label = document.createElement('span');
    label.textContent = preset.label;
    btn.append(emoji, label);
    btn.addEventListener('click', () => applyPreset(preset));
    dom.recipes.appendChild(btn);
    return btn;
  });

  // Populate segmented controls from the dictionaries.
  dom.optionContainers.forEach((container) => {
    const group = OPTION_GROUPS[container.dataset.options];
    group.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.value = opt.id;
      btn.textContent = opt.label ?? opt.tw;
      btn.addEventListener('click', () => {
        group.set(opt.id);
        render();
      });
      container.appendChild(btn);
    });
  });

  dom.modeButtons.forEach((btn) =>
    btn.addEventListener('click', () => {
      state.mode = btn.dataset.mode;
      render();
    })
  );

  dom.gapSlider.min = '0';
  dom.gapSlider.max = String(GAP_OPTIONS.length - 1);
  dom.gapSlider.addEventListener('input', (e) => {
    state.gap = GAP_OPTIONS[Number(e.target.value)].id;
    render();
  });

  $('#items-dec').addEventListener('click', () => setItemCount(state.items.length - 1));
  $('#items-inc').addEventListener('click', () => setItemCount(state.items.length + 1));

  dom.itemChips.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-index]');
    if (chip) selectItem(Number(chip.dataset.index));
  });

  dom.canvas.addEventListener('click', (e) => {
    const el = e.target.closest('[data-index]');
    if (el) selectItem(Number(el.dataset.index));
  });

  dom.overrideClose.addEventListener('click', () => {
    state.selected = null;
    render();
  });

  dom.growToggle.addEventListener('click', () => {
    const it = selectedItem();
    if (it) { it.grow = !it.grow; render(); }
  });

  dom.shrinkToggle.addEventListener('click', () => {
    const it = selectedItem();
    if (it) { it.shrink = !it.shrink; render(); }
  });

  $('#item-reset').addEventListener('click', () => {
    if (state.selected !== null) {
      state.items[state.selected] = defaultItem();
      render();
    }
  });

  dom.guidesToggle.addEventListener('click', () => {
    state.guides = !state.guides;
    render();
  });

  dom.tabButtons.forEach((btn) =>
    btn.addEventListener('click', () => {
      state.tab = btn.dataset.tab;
      render();
    })
  );

  dom.copyBtn.addEventListener('click', copyCode);
  dom.sandboxBtn.addEventListener('click', openSandbox);

  render();
}
