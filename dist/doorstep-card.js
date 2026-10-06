/*
 * Doorstep: a glanceable parcel card for Home Assistant.
 * https://github.com/ma-2a/doorstep
 *
 * Reads the shared parcel format published by the ha-parcel-integrations
 * family (DHL, DPD, GLS, Hermes, PostNL, the Parcel Aggregator, ...).
 */

const VERSION = '1.0.0';
const DOCS = 'https://github.com/ma-2a/doorstep';
const CARRIERS_URL = 'https://ha-parcel-integrations.github.io/';

const TEXT = {
  en: {
    status: {
      registered: 'Announced',
      in_transit: 'On the way',
      out_for_delivery: 'Out for delivery',
      at_pickup_point: 'Ready for pickup',
      delivered: 'Delivered',
      returning: 'Returning to sender',
      problem: 'Problem reported',
      unknown: 'Status unclear',
    },
    from: 'from {0}',
    parcel: 'Parcel {0}',
    between: 'between {0} and {1}',
    moreToday: { one: '1 more today', other: '{0} more today' },
    showMore: 'Show {0} more',
    showLess: 'Show less',
    sent: 'Sent by you',
    problemText: 'The carrier flagged this parcel. Check the tracking page.',
    emptyTitle: 'Nothing on the way',
    emptyText: 'New parcels show up here on their own.',
    setupTitle: 'No parcel sources yet',
    setupText: 'Add a carrier integration such as DHL, DPD or Hermes. This card finds it automatically.',
    setupLink: 'See supported carriers',
    offlineTitle: 'Parcel data unavailable',
    offlineText: 'Check the carrier integration under Settings, Devices & services.',
    hiddenNote: 'Hidden on the dashboard while nothing is on the way.',
    tracking: 'Tracking number',
    copy: 'Copy',
    copied: 'Copied',
    pickupPoint: 'Pickup point',
    window: 'Delivery window',
    updates: 'Updates',
    open: 'Open tracking page',
    details: 'Show details',
    moreParcels: { one: '1 more parcel', other: '{0} more parcels' },
    deliveredAt: 'Delivered at {0}',
    fromShort: '{0}, from {1}',
  },
  de: {
    status: {
      registered: 'Angekündigt',
      in_transit: 'Unterwegs',
      out_for_delivery: 'In Zustellung',
      at_pickup_point: 'Abholbereit',
      delivered: 'Zugestellt',
      returning: 'Geht zurück an Absender',
      problem: 'Problem gemeldet',
      unknown: 'Status unklar',
    },
    from: 'von {0}',
    parcel: 'Paket {0}',
    between: 'zwischen {0} und {1}',
    moreToday: { one: '1 weiteres heute', other: '{0} weitere heute' },
    showMore: '{0} weitere anzeigen',
    showLess: 'Weniger anzeigen',
    sent: 'Von dir verschickt',
    problemText: 'Der Zusteller meldet ein Problem. Details auf der Sendungsseite.',
    emptyTitle: 'Nichts unterwegs',
    emptyText: 'Neue Pakete erscheinen hier von selbst.',
    setupTitle: 'Noch keine Paketquelle',
    setupText: 'Füge eine Zusteller-Integration wie DHL, DPD oder Hermes hinzu. Die Karte findet sie automatisch.',
    setupLink: 'Unterstützte Zusteller',
    offlineTitle: 'Paketdaten nicht verfügbar',
    offlineText: 'Prüfe die Zusteller-Integration unter Einstellungen, Geräte & Dienste.',
    hiddenNote: 'Auf dem Dashboard ausgeblendet, solange nichts unterwegs ist.',
    tracking: 'Sendungsnummer',
    copy: 'Kopieren',
    copied: 'Kopiert',
    pickupPoint: 'Abholort',
    window: 'Zeitfenster',
    updates: 'Verlauf',
    open: 'Sendungsverfolgung öffnen',
    details: 'Details anzeigen',
    moreParcels: { one: '1 weiteres Paket', other: '{0} weitere Pakete' },
    deliveredAt: 'Zugestellt um {0}',
    fromShort: '{0}, von {1}',
  },
  nl: {
    status: {
      registered: 'Aangemeld',
      in_transit: 'Onderweg',
      out_for_delivery: 'Wordt bezorgd',
      at_pickup_point: 'Klaar om op te halen',
      delivered: 'Bezorgd',
      returning: 'Terug naar afzender',
      problem: 'Probleem gemeld',
      unknown: 'Status onduidelijk',
    },
    from: 'van {0}',
    parcel: 'Pakket {0}',
    between: 'tussen {0} en {1}',
    moreToday: { one: 'nog 1 vandaag', other: 'nog {0} vandaag' },
    showMore: 'Toon {0} meer',
    showLess: 'Toon minder',
    sent: 'Door jou verstuurd',
    problemText: 'De vervoerder meldt een probleem. Bekijk de trackingpagina.',
    emptyTitle: 'Niets onderweg',
    emptyText: 'Nieuwe pakketten verschijnen hier vanzelf.',
    setupTitle: 'Nog geen pakketbron',
    setupText: 'Voeg een vervoerder-integratie toe, zoals DHL, DPD of PostNL. Deze kaart vindt hem automatisch.',
    setupLink: 'Ondersteunde vervoerders',
    offlineTitle: 'Pakketgegevens niet beschikbaar',
    offlineText: 'Controleer de vervoerder-integratie onder Instellingen, Apparaten & diensten.',
    hiddenNote: 'Verborgen op het dashboard zolang er niets onderweg is.',
    tracking: 'Trackingnummer',
    copy: 'Kopiëren',
    copied: 'Gekopieerd',
    pickupPoint: 'Afhaalpunt',
    window: 'Tijdvak',
    updates: 'Updates',
    open: 'Trackingpagina openen',
    details: 'Details tonen',
    moreParcels: { one: 'nog 1 pakket', other: 'nog {0} pakketten' },
    deliveredAt: 'Bezorgd om {0}',
    fromShort: '{0}, van {1}',
  },
};

const EDITOR_TEXT = {
  en: {
    found: { zero: 'No parcel sources found yet.', one: 'Found 1 parcel source: {1}.', other: 'Found {0} parcel sources: {1}.' },
    intro: 'Parcels are picked up automatically. Everything below is optional.',
    size: 'Size',
    size_compact: 'Small, for a home dashboard',
    size_full: 'Large, for a wall panel',
    title: 'Title',
    appearance: 'Look',
    appearance_theme: 'Match my theme',
    appearance_glass: 'Glass',
    layout: 'Layout',
    layout_auto: 'Automatic',
    layout_stacked: 'Stacked',
    layout_split: 'Side by side',
    show_delivered: 'Show parcels delivered today',
    show_outgoing: 'Show parcels you sent',
    hide_when_empty: 'Hide card when nothing is on the way',
    advanced: 'Advanced',
    max_items: 'Parcels in the list before "Show more"',
    entities: 'Only use these sources',
    entities_help: 'Leave empty to use every parcel source.',
  },
  de: {
    found: { zero: 'Noch keine Paketquelle gefunden.', one: '1 Paketquelle gefunden: {1}.', other: '{0} Paketquellen gefunden: {1}.' },
    intro: 'Pakete werden automatisch erkannt. Alles hier unten ist optional.',
    size: 'Größe',
    size_compact: 'Klein, für das Home-Dashboard',
    size_full: 'Groß, für ein Wandpanel',
    title: 'Titel',
    appearance: 'Aussehen',
    appearance_theme: 'Wie mein Theme',
    appearance_glass: 'Glas',
    layout: 'Anordnung',
    layout_auto: 'Automatisch',
    layout_stacked: 'Untereinander',
    layout_split: 'Nebeneinander',
    show_delivered: 'Heute zugestellte Pakete zeigen',
    show_outgoing: 'Von dir verschickte Pakete zeigen',
    hide_when_empty: 'Karte ausblenden, wenn nichts unterwegs ist',
    advanced: 'Erweitert',
    max_items: 'Pakete in der Liste vor „Weitere anzeigen“',
    entities: 'Nur diese Quellen verwenden',
    entities_help: 'Leer lassen, um alle Paketquellen zu nutzen.',
  },
  nl: {
    found: { zero: 'Nog geen pakketbron gevonden.', one: '1 pakketbron gevonden: {1}.', other: '{0} pakketbronnen gevonden: {1}.' },
    intro: 'Pakketten worden automatisch gevonden. Alles hieronder is optioneel.',
    size: 'Formaat',
    size_compact: 'Klein, voor een home-dashboard',
    size_full: 'Groot, voor een wandpaneel',
    title: 'Titel',
    appearance: 'Uiterlijk',
    appearance_theme: 'Zoals mijn thema',
    appearance_glass: 'Glas',
    layout: 'Indeling',
    layout_auto: 'Automatisch',
    layout_stacked: 'Onder elkaar',
    layout_split: 'Naast elkaar',
    show_delivered: 'Vandaag bezorgde pakketten tonen',
    show_outgoing: 'Door jou verstuurde pakketten tonen',
    hide_when_empty: 'Kaart verbergen als er niets onderweg is',
    advanced: 'Geavanceerd',
    max_items: 'Pakketten in de lijst vóór "Toon meer"',
    entities: 'Alleen deze bronnen gebruiken',
    entities_help: 'Leeg laten om alle pakketbronnen te gebruiken.',
  },
};

const DEFAULTS = {
  size: 'compact',
  title: '',
  appearance: 'theme',
  layout: 'auto',
  show_delivered: true,
  show_outgoing: false,
  hide_when_empty: false,
  max_items: null,
  entities: [],
};

const SOURCE_KEYS = new Set([
  'incoming_parcels', 'incoming', 'delivered_parcels', 'delivered',
  'outgoing_parcels', 'outgoing', 'outgoing_delivered_parcels', 'outgoing_delivered',
  'awaiting_pickup', 'en_route_to_pickup_point', 'en_route_to_servicepoint',
]);

const TONE = {
  registered: 'quiet',
  in_transit: 'quiet',
  out_for_delivery: 'today',
  at_pickup_point: 'pickup',
  delivered: 'done',
  returning: 'return',
  problem: 'problem',
  unknown: 'quiet',
};

const ICON = {
  box: '<path d="M3.5 7.6 12 3.2l8.5 4.4v8.8L12 20.8l-8.5-4.4z"/><path d="M3.5 7.6 12 12l8.5-4.4M12 12v8.8"/>',
  van: '<path d="M2.8 6.5h10.7v9.3H2.8zM13.5 9.6h3.9l3 3.1v3.1h-6.9"/><circle cx="6.6" cy="17.3" r="1.7"/><circle cx="16.9" cy="17.3" r="1.7"/>',
  store: '<path d="M4.5 10v9.5h15V10M3.2 9.8 5.1 4.5h13.8l1.9 5.3c0 1.4-1.2 2.4-2.6 2.4s-2.6-1-2.6-2.4c0 1.4-1.2 2.4-2.6 2.4s-2.6-1-2.6-2.4c0 1.4-1.2 2.4-2.6 2.4s-2.6-1-2.6-2.4zM9.8 19.5v-4.6h4.4v4.6"/>',
  check: '<path d="m5.2 12.6 4.3 4.2 9.3-9.6"/>',
  alert: '<circle cx="12" cy="12" r="8.6"/><path d="M12 7.6v5.3M12 16.3v.1"/>',
  back: '<path d="M8.6 6.4 4.4 10.6l4.2 4.2"/><path d="M4.8 10.6h9.4a5.3 5.3 0 0 1 0 10.6h-2.8"/>',
  unknown: '<circle cx="12" cy="12" r="8.6"/><path d="M9.6 9.5a2.5 2.5 0 1 1 3.6 2.2c-.8.4-1.2 1-1.2 1.8v.4M12 16.6v.1"/>',
  send: '<path d="M20.4 3.6 3.6 10.4l6.9 3.1 3.1 6.9z"/><path d="m10.5 13.5 4.4-4.4"/>',
  copy: '<rect x="8.5" y="8.5" width="11" height="11" rx="2.2"/><path d="M15.5 8.5V6.7a2.2 2.2 0 0 0-2.2-2.2H6.7a2.2 2.2 0 0 0-2.2 2.2v6.6a2.2 2.2 0 0 0 2.2 2.2h1.8"/>',
  open: '<path d="M13.5 4.5h6v6M19.5 4.5l-8 8"/><path d="M18 14v4.3a1.7 1.7 0 0 1-1.7 1.7H5.7A1.7 1.7 0 0 1 4 18.3V7.7A1.7 1.7 0 0 1 5.7 6H10"/>',
  chevron: '<path d="m9 5.5 6.5 6.5L9 18.5"/>',
};

const STATUS_ICON = {
  registered: 'box',
  in_transit: 'box',
  out_for_delivery: 'van',
  at_pickup_point: 'store',
  delivered: 'check',
  returning: 'back',
  problem: 'alert',
  unknown: 'unknown',
};

const svg = (name) =>
  `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICON[name] || ''}</svg>`;

const esc = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const fill = (template, ...args) => template.replace(/\{(\d)\}/g, (_, i) => args[i] ?? '');

const languageOf = (hass) => {
  const lang = (hass?.locale?.language || hass?.language || navigator.language || 'en').toLowerCase();
  return lang;
};

const pick = (table, lang) => table[lang.split('-')[0]] || table.en;

function normalizeConfig(config = {}) {
  const c = { ...DEFAULTS, ...config };
  if (!['compact', 'full'].includes(c.size)) c.size = DEFAULTS.size;
  if (!['theme', 'glass'].includes(c.appearance)) c.appearance = DEFAULTS.appearance;
  if (!['auto', 'stacked', 'split'].includes(c.layout)) c.layout = DEFAULTS.layout;
  const max = parseInt(c.max_items, 10);
  c.max_items = Number.isFinite(max) && max > 0 ? Math.min(max, 50) : null;
  c.entities = Array.isArray(c.entities) ? c.entities.filter((e) => typeof e === 'string') : [];
  return c;
}

function looksLikeParcel(p) {
  return p && typeof p === 'object' && typeof p.barcode === 'string' && 'status' in p;
}

function findSources(hass, only = []) {
  if (!hass?.states) return [];
  const ids = only.length ? only : Object.keys(hass.states).filter((id) => id.startsWith('sensor.'));
  const sources = [];
  for (const id of ids) {
    const state = hass.states[id];
    if (!state) continue;
    const parcels = state.attributes?.parcels;
    const entry = hass.entities?.[id];
    const key = entry?.translation_key || '';
    const known = SOURCE_KEYS.has(key);

    if (Array.isArray(parcels)) {
      if (parcels.length && !parcels.some(looksLikeParcel)) continue;
      if (!parcels.length && !known && !only.length) continue;
    } else if (!(known && ['unavailable', 'unknown'].includes(state.state))) {
      continue;
    }

    const outgoing = key ? key.startsWith('outgoing') : /outgoing|ausgehend|uitgaand|verstuurd/.test(id);
    sources.push({
      id,
      outgoing,
      available: Array.isArray(parcels),
      platform: entry?.platform || '',
      parcels: Array.isArray(parcels) ? parcels.filter(looksLikeParcel) : [],
      updated: state.last_updated,
    });
  }
  return sources;
}

const isDelivered = (p) => p.status === 'delivered' || p.delivered === true;

function mergeParcel(a, b) {
  const merged = { ...a };
  for (const [k, v] of Object.entries(b)) {
    if (v !== null && v !== undefined && (merged[k] === null || merged[k] === undefined)) merged[k] = v;
  }
  if (isDelivered(b) && !isDelivered(a)) {
    merged.status = 'delivered';
    merged.delivered = true;
    merged.delivered_at = b.delivered_at ?? merged.delivered_at;
  }
  merged.outgoing = a.outgoing || b.outgoing;
  return merged;
}

function collectParcels(sources) {
  const byKey = new Map();
  for (const source of sources) {
    for (const raw of source.parcels) {
      const parcel = { ...raw, outgoing: source.outgoing, status: TONE[raw.status] ? raw.status : 'unknown' };
      const key = `${(parcel.carrier || '').toLowerCase()}:${parcel.barcode}`;
      byKey.set(key, byKey.has(key) ? mergeParcel(byKey.get(key), parcel) : parcel);
    }
  }
  return [...byKey.values()].map((p) => ({ ...p, key: `${(p.carrier || '').toLowerCase()}:${p.barcode}` }));
}

class Clock {
  constructor(hass) {
    const lang = languageOf(hass);
    this.lang = lang;
    this.zone = hass?.locale?.time_zone === 'server' ? hass?.config?.time_zone : undefined;
    const fmt = hass?.locale?.time_format;
    this.hourCycle = fmt === '12' ? 'h12' : fmt === '24' ? 'h23' : undefined;
    this.now = new Date();
    this._dayFmt = new Intl.DateTimeFormat('en-CA', { timeZone: this.zone, year: 'numeric', month: '2-digit', day: '2-digit' });
    this._hmFmt = new Intl.DateTimeFormat('en-GB', { timeZone: this.zone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  }

  parse(value) {
    if (!value) return null;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  dayKey(d) {
    return this._dayFmt.format(d);
  }

  minutesOfDay(d) {
    const [h, m] = this._hmFmt.format(d).split(':').map(Number);
    return (h % 24) * 60 + m;
  }

  dayDiff(d) {
    const toUtc = (key) => {
      const [y, m, day] = key.split('-').map(Number);
      return Date.UTC(y, m - 1, day);
    };
    return Math.round((toUtc(this.dayKey(d)) - toUtc(this.dayKey(this.now))) / 86400000);
  }

  isToday(d) {
    return !!d && this.dayDiff(d) === 0;
  }

  time(d) {
    return new Intl.DateTimeFormat(this.lang, { timeZone: this.zone, hour: 'numeric', minute: '2-digit', hourCycle: this.hourCycle }).format(d);
  }

  hourLabel(hour) {
    const d = new Date(Date.UTC(2020, 0, 1, hour));
    const parts = new Intl.DateTimeFormat(this.lang, { timeZone: 'UTC', hour: 'numeric', hourCycle: this.hourCycle }).formatToParts(d);
    const h = Number(parts.find((p) => p.type === 'hour')?.value ?? hour);
    const period = parts.find((p) => p.type === 'dayPeriod')?.value;
    return period ? `${h} ${period}` : String(h);
  }

  range(from, to) {
    const f = new Intl.DateTimeFormat(this.lang, { timeZone: this.zone, hour: 'numeric', minute: '2-digit', hourCycle: this.hourCycle });
    try {
      return f.formatRange(from, to);
    } catch (err) {
      return `${f.format(from)}–${f.format(to)}`;
    }
  }

  relativeDay(d, capital = false) {
    const diff = this.dayDiff(d);
    let text;
    if (Math.abs(diff) <= 1) {
      text = new Intl.RelativeTimeFormat(this.lang, { numeric: 'auto' }).format(diff, 'day');
    } else if (diff > 1 && diff < 7) {
      text = new Intl.DateTimeFormat(this.lang, { timeZone: this.zone, weekday: 'long' }).format(d);
    } else {
      text = new Intl.DateTimeFormat(this.lang, { timeZone: this.zone, day: 'numeric', month: 'short' }).format(d);
    }
    return capital ? text.charAt(0).toLocaleUpperCase(this.lang) + text.slice(1) : text;
  }

  stamp(d) {
    if (this.isToday(d)) return this.time(d);
    return new Intl.DateTimeFormat(this.lang, {
      timeZone: this.zone, weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hourCycle: this.hourCycle,
    }).format(d);
  }
}

/*
 * Carriers that only know the day send a window until 23:59, so a very long
 * window counts as a date. Plans that lie in the past are ignored.
 */
function windowOf(parcel, clock) {
  const from = clock.parse(parcel.planned_from);
  const to = clock.parse(parcel.planned_to);
  if (!from || clock.dayDiff(to || from) < 0) return { day: null, from: null, to: null };
  if (!to) return { day: from, from: null, to: null };
  const span = (to - from) / 60000;
  const endsAtMidnight = clock.minutesOfDay(to) >= 23 * 60 + 59;
  if (span <= 0 || span > 10 * 60 || endsAtMidnight) return { day: from, from: null, to: null };
  return { day: from, from, to };
}

function deliveredAt(parcel, clock) {
  return clock.parse(parcel.delivered_at);
}

function arrivesToday(parcel, clock) {
  if (parcel.status === 'out_for_delivery') return true;
  const { day } = windowOf(parcel, clock);
  return !!day && clock.dayDiff(day) === 0 && !isDelivered(parcel);
}

function sortActive(list, clock) {
  const weight = (p) => {
    if (p.status === 'out_for_delivery') return 0;
    if (p.status === 'at_pickup_point') return 1;
    if (p.status === 'problem') return 2;
    return 3;
  };
  const when = (p) => clock.parse(p.planned_from)?.getTime() ?? Number.MAX_SAFE_INTEGER;
  return [...list].sort((a, b) => weight(a) - weight(b) || when(a) - when(b) || String(a.barcode).localeCompare(String(b.barcode)));
}

function buildModel(hass, config) {
  const clock = new Clock(hass);
  const sources = findSources(hass, config.entities);
  const parcels = collectParcels(sources);

  const incoming = parcels.filter((p) => !p.outgoing);
  const active = sortActive(incoming.filter((p) => !isDelivered(p)), clock);
  const deliveredToday = config.show_delivered
    ? incoming
        .filter((p) => isDelivered(p) && clock.isToday(deliveredAt(p, clock)))
        .sort((a, b) => deliveredAt(b, clock) - deliveredAt(a, clock))
    : [];
  const outgoing = config.show_outgoing
    ? sortActive(parcels.filter((p) => p.outgoing && !isDelivered(p)), clock)
    : [];

  const todays = active.filter((p) => arrivesToday(p, clock));
  let hero = null;
  let kind = 'empty';

  const first = (status) => active.find((p) => p.status === status);
  if (first('out_for_delivery')) {
    hero = first('out_for_delivery');
    kind = 'today';
  } else if (first('at_pickup_point')) {
    hero = first('at_pickup_point');
    kind = 'pickup';
  } else if (first('problem')) {
    hero = first('problem');
    kind = 'problem';
  } else if (todays.length) {
    hero = todays[0];
    kind = 'today';
  } else if (deliveredToday.length) {
    hero = deliveredToday[0];
    kind = 'delivered';
  } else if (active.length) {
    hero = active[0];
    kind = windowOf(hero, clock).day ? 'upcoming' : 'transit';
  }

  if (!sources.length) kind = 'setup';
  else if (!hero && sources.every((s) => !s.available)) kind = 'offline';

  const rest = [...active, ...deliveredToday].filter((p) => p !== hero);
  const moreToday = kind === 'today' ? todays.filter((p) => p !== hero).length : 0;

  return { clock, sources, hero, kind, rest, outgoing, moreToday, empty: !active.length && !deliveredToday.length && !outgoing.length };
}

const STYLE = `
:host {
  display: block;
  height: 100%;
  --ds-ink: var(--primary-text-color, #1d2125);
  --ds-muted: var(--secondary-text-color, #646b73);
  --ds-line: color-mix(in srgb, var(--ds-ink) 11%, transparent);
  --ds-today: var(--doorstep-today-color, var(--primary-color, #2a6ee8));
  --ds-pickup: var(--doorstep-pickup-color, #7a5bd6);
  --ds-done: var(--doorstep-delivered-color, var(--success-color, #2d9a68));
  --ds-problem: var(--doorstep-problem-color, var(--error-color, #d3433f));
  --ds-return: var(--doorstep-returning-color, var(--warning-color, #c4841a));
  --ds-quiet: var(--ds-muted);
}
ha-card {
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  color: var(--ds-ink);
  container-type: inline-size;
}
ha-card.glass {
  background: var(--ha-card-background, var(--card-background-color, #fff));
  background: color-mix(in srgb, var(--ha-card-background, var(--card-background-color, #fff)) var(--doorstep-glass-opacity, 46%), transparent);
  -webkit-backdrop-filter: blur(24px) saturate(170%);
  backdrop-filter: blur(24px) saturate(170%);
  border: 1px solid color-mix(in srgb, #fff 20%, transparent);
  box-shadow: inset 0 1px 0 color-mix(in srgb, #fff 32%, transparent), 0 10px 34px rgba(0, 0, 0, 0.16);
}
.frame {
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.title {
  margin: 0;
  font-size: 15px;
  font-weight: 500;
  color: var(--ds-muted);
}
.body { display: flex; flex-direction: column; gap: 18px; min-height: 0; flex: 1; }
.split .frame { padding: 24px 26px; }
.split .body { flex-direction: row; gap: 28px; align-items: stretch; }
.split .hero-wrap { flex: 1.15 1 0; min-width: 0; display: flex; flex-direction: column; justify-content: center; }
.split .list { flex: 1 1 0; min-width: 0; overflow-y: auto; padding-left: 26px; border-left: 1px solid var(--ds-line); align-self: stretch; }
.split .list:empty { display: none; }

[data-tone=today] { --tone: var(--ds-today); }
[data-tone=pickup] { --tone: var(--ds-pickup); }
[data-tone=done] { --tone: var(--ds-done); }
[data-tone=problem] { --tone: var(--ds-problem); }
[data-tone=return] { --tone: var(--ds-return); }
[data-tone=quiet] { --tone: var(--ds-quiet); }
[data-tone] { --tone-text: color-mix(in srgb, var(--tone) 68%, var(--ds-ink)); }
[data-tone=return] { --tone-text: color-mix(in srgb, var(--tone) 55%, var(--ds-ink)); }

button { font: inherit; color: inherit; }
button:focus-visible, a:focus-visible, .hero:focus-visible {
  outline: 2px solid var(--ds-today);
  outline-offset: 2px;
}

.hero {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  text-align: left;
  border-radius: 12px;
}
.hero[aria-expanded] { cursor: pointer; }
.lead {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--tone-text, var(--tone));
  min-height: 22px;
}
.lead > svg { width: 20px; height: 20px; color: var(--tone); }
.carrier {
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--ds-muted);
  padding: 2px 7px;
  border: 1px solid var(--ds-line);
  border-radius: 6px;
  white-space: nowrap;
}
.lead .carrier { margin-left: 2px; }
.headline {
  margin: 6px 0 0;
  font-size: 34px;
  line-height: 1.08;
  font-weight: 400;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  overflow-wrap: anywhere;
}
.headline.time { font-weight: 300; letter-spacing: -0.03em; white-space: nowrap; overflow-wrap: normal; overflow: hidden; }
.headline.long {
  font-size: 26px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.detail {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: 12px;
  row-gap: 4px;
  font-size: 15px;
  color: var(--ds-muted);
}
.detail .who { color: var(--ds-ink); font-weight: 500; }
.more-today {
  font-size: 13px;
  font-weight: 500;
  color: var(--tone-text, var(--tone));
}
.hero .chev {
  display: inline-flex;
  margin-left: auto;
  width: 18px;
  height: 18px;
  color: var(--ds-muted);
  transition: transform 0.2s ease;
  align-self: center;
}
.hero[aria-expanded=true] .chev { transform: rotate(90deg); }
.split .headline { font-size: 52px; }
.split .headline.long { font-size: 34px; }
@container (min-width: 760px) {
  .split .headline { font-size: 64px; }
  .split .headline.long { font-size: 40px; }
}
@container (max-width: 340px) {
  .frame { padding: 16px; }
  .headline { font-size: 29px; }
  .headline.long { font-size: 23px; }
}

.quiet-state .headline { font-size: 26px; font-weight: 400; }
.split .quiet-state .headline { font-size: 34px; }
.quiet-state .glyph { margin-bottom: 14px; }
.quiet-state .detail { max-width: 42ch; }
.quiet-state a { color: var(--ds-today); font-weight: 500; text-decoration: none; }
.quiet-state a:hover { text-decoration: underline; }

.rail { margin-top: 22px; }
.track {
  position: relative;
  height: 8px;
  border-radius: 999px;
  background: var(--ds-line);
}
.elapsed {
  position: absolute;
  inset: 0 auto 0 0;
  border-radius: inherit;
  background: color-mix(in srgb, var(--ds-ink) 12%, transparent);
}
.band {
  position: absolute;
  top: -3px;
  bottom: -3px;
  min-width: 10px;
  border-radius: 999px;
  background: var(--tone);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--tone) 18%, transparent);
}
.now {
  position: absolute;
  top: 50%;
  width: 14px;
  height: 14px;
  margin: -7px 0 0 -7px;
  border-radius: 50%;
  background: var(--ha-card-background, var(--card-background-color, #fff));
  border: 3px solid var(--ds-ink);
  box-sizing: border-box;
}
.now.live::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid var(--ds-ink);
  opacity: 0;
  animation: ping 2.4s ease-out infinite;
}
@keyframes ping {
  0% { transform: scale(0.6); opacity: 0.55; }
  80%, 100% { transform: scale(1.5); opacity: 0; }
}
.hours {
  position: relative;
  height: 16px;
  margin-top: 8px;
  font-size: 11.5px;
  color: var(--ds-muted);
  font-variant-numeric: tabular-nums;
}
.hours span { position: absolute; transform: translateX(-50%); white-space: nowrap; }
.hours span:first-child { transform: none; }

.glyph {
  flex: none;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  color: var(--tone);
  background: color-mix(in srgb, var(--tone) 14%, transparent);
}
.glyph svg { width: 19px; height: 19px; }
svg { fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; display: block; }

.list { display: flex; flex-direction: column; min-height: 0; }
.list ul { list-style: none; margin: 0; padding: 0; }
.stacked .list:not(:empty) { border-top: 1px solid var(--ds-line); padding-top: 6px; margin-top: -4px; }
.group {
  margin: 14px 0 2px;
  font-size: 13px;
  font-weight: 500;
  color: var(--ds-muted);
}
.row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 6px;
  margin: 0 -6px;
  box-sizing: content-box;
  border: 0;
  border-radius: 10px;
  background: none;
  text-align: left;
  cursor: pointer;
}
.row:hover { background: color-mix(in srgb, var(--ds-ink) 4%, transparent); }
.row .text { flex: 1; min-width: 0; }
.row .name {
  display: block;
  font-size: 15px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.row .sub {
  display: block;
  margin-top: 2px;
  font-size: 13px;
  color: var(--ds-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.row .sub b { font-weight: 500; color: var(--tone-text, var(--tone)); }
.row .chev { width: 16px; height: 16px; color: var(--ds-muted); transition: transform 0.2s ease; flex: none; }
.row[aria-expanded=true] .chev { transform: rotate(90deg); }
.toggle-more {
  margin-top: 6px;
  padding: 8px 0;
  border: 0;
  background: none;
  color: color-mix(in srgb, var(--ds-today) 68%, var(--ds-ink));
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
}

.drawer { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.24s ease; }
.drawer.open { grid-template-rows: 1fr; }
.drawer > div { overflow: hidden; min-height: 0; }
.panel { padding: 4px 0 14px 46px; display: flex; flex-direction: column; gap: 12px; font-size: 13.5px; }
.hero-wrap .panel { padding-left: 0; padding-top: 16px; }
.facts { display: grid; grid-template-columns: max-content 1fr; gap: 6px 16px; margin: 0; }
.facts dt { color: var(--ds-muted); }
.facts dd { margin: 0; display: flex; align-items: center; gap: 8px; min-width: 0; flex-wrap: wrap; }
.code { font-variant-numeric: tabular-nums; letter-spacing: 0.02em; overflow-wrap: anywhere; user-select: all; }
.chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 9px;
  border: 1px solid var(--ds-line);
  border-radius: 999px;
  background: none;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--ds-ink);
  cursor: pointer;
  text-decoration: none;
}
.chip svg { width: 14px; height: 14px; }
.chip.done { color: var(--ds-done); border-color: color-mix(in srgb, var(--ds-done) 40%, transparent); }
.updates { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 8px; }
.updates li { display: grid; grid-template-columns: 10px 1fr; column-gap: 10px; }
.updates li::before {
  content: '';
  width: 7px;
  height: 7px;
  margin-top: 6px;
  border-radius: 50%;
  background: var(--ds-line);
  border: 1px solid color-mix(in srgb, var(--ds-ink) 25%, transparent);
}
.updates li:first-child::before { background: var(--tone, var(--ds-today)); border-color: transparent; }
.updates time { display: block; color: var(--ds-muted); font-size: 12.5px; font-variant-numeric: tabular-nums; }
.updates small { color: var(--ds-muted); }
.actions { display: flex; flex-wrap: wrap; gap: 8px; }

.hidden-note { font-size: 13px; color: var(--ds-muted); margin: 0; }

.compact .c-wrap { padding: 10px 12px; }
.c-head {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 40px;
  border-radius: 10px;
}
.c-head[role=button] { cursor: pointer; }
.c-head:focus-visible { outline: 2px solid var(--ds-today); outline-offset: 3px; }
.c-head .glyph { width: 36px; height: 36px; }
.c-head .glyph svg { width: 19px; height: 19px; }
.c-text { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.c-label { font-size: 12px; color: var(--ds-muted); margin-bottom: 1px; }
.c-title {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.c-sub {
  font-size: 12.5px;
  line-height: 1.35;
  color: var(--ds-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.c-sub.wrap { white-space: normal; }
.c-sub a { color: var(--ds-today); text-decoration: none; font-weight: 500; }
.c-count {
  flex: none;
  min-width: 22px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 600;
  text-align: center;
  font-variant-numeric: tabular-nums;
  color: var(--ds-ink);
  background: color-mix(in srgb, var(--ds-ink) 7%, transparent);
}
.c-head .chev { width: 16px; height: 16px; color: var(--ds-muted); transition: transform 0.2s ease; flex: none; }
.c-head[aria-expanded=true] .chev { transform: rotate(90deg); }
.rail.slim { margin: 8px 0 2px 48px; }
@container (max-width: 220px) {
  .c-count { display: none; }
}
@container (max-width: 300px) {
  .c-day { display: none; }
  .c-head { gap: 10px; }
  .c-count { padding: 2px 6px; }
  .c-head .chev { display: none; }
  .rail.slim { margin-left: 0; }
}
.rail.slim .track { height: 4px; }
.rail.slim .band { top: -2px; bottom: -2px; box-shadow: none; }
.rail.slim .now { width: 10px; height: 10px; margin: -5px 0 0 -5px; border-width: 2px; }
.rail.slim .now.live::after { inset: -5px; }
.c-list { margin-top: 10px; padding-top: 4px; border-top: 1px solid var(--ds-line); }
.compact .hidden-note { padding: 0 14px 12px; }

@media (prefers-reduced-motion: reduce) {
  .drawer, .chev, .c-head .chev { transition: none; }
  .now.live::after { animation: none; }
}
`;

class DoorstepCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = normalizeConfig();
    this._open = new Set();
    this._showAll = false;
    this._copied = null;
    this._sig = '';
    this._layout = 'stacked';
    this.shadowRoot.addEventListener('click', (ev) => this._onClick(ev));
    this.shadowRoot.addEventListener('keydown', (ev) => {
      const hero = ev.target.closest?.('.hero[role=button], .c-head[role=button]');
      if (hero && (ev.key === 'Enter' || ev.key === ' ')) {
        ev.preventDefault();
        hero.click();
      }
    });
  }

  static getConfigElement() {
    return document.createElement('doorstep-card-editor');
  }

  static getStubConfig() {
    return {};
  }

  setConfig(config) {
    if (config && typeof config !== 'object') throw new Error('Invalid configuration');
    this._config = normalizeConfig(config);
    this._sig = '';
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    const sig = this._signature();
    if (sig !== this._sig) {
      this._sig = sig;
      this._render();
    }
  }

  get hass() {
    return this._hass;
  }

  set editMode(value) {
    if (this._editMode === !!value) return;
    this._editMode = !!value;
    this._render();
  }

  get editMode() {
    return !!this._editMode;
  }

  set preview(value) {
    if (this._preview === !!value) return;
    this._preview = !!value;
    this._render();
  }

  get preview() {
    return !!this._preview;
  }

  connectedCallback() {
    this._tick = setInterval(() => this._render(), 60000);
    if (!this._resize && 'ResizeObserver' in window) {
      this._resize = new ResizeObserver((entries) => {
        const width = entries[0]?.contentRect?.width || 0;
        const layout = this._config.layout === 'auto' ? (width >= 600 ? 'split' : 'stacked') : this._config.layout;
        if (layout !== this._layout && width > 0) {
          this._layout = layout;
          this._render();
        } else {
          this._fit();
        }
      });
      this._resize.observe(this);
    }
    this._render();
    document.fonts?.ready.then(() => this._fit());
  }

  disconnectedCallback() {
    clearInterval(this._tick);
    this._resize?.disconnect();
    this._resize = null;
  }

  getCardSize() {
    if (this._config.size === 'compact') return this._expanded ? 2 + Math.min(this._rows || 0, 6) : 1;
    return 3 + Math.min(this._rows || 0, this._config.max_items || 4);
  }

  getGridOptions() {
    if (this._config.size === 'compact') return { columns: 12, min_columns: 6 };
    return { columns: 12, min_columns: 6, min_rows: 3 };
  }

  _signature() {
    const hass = this._hass;
    if (!hass) return '';
    const parts = [languageOf(hass), hass.locale?.time_format, hass.locale?.time_zone, hass.themes?.darkMode];
    for (const s of findSources(hass, this._config.entities)) parts.push(s.id, s.updated);
    return parts.join('|');
  }

  _t() {
    return pick(TEXT, languageOf(this._hass));
  }

  _label(p, t) {
    if (p.outgoing && p.receiver) return p.receiver;
    if (p.sender) return p.sender;
    const code = String(p.barcode || '');
    return fill(t.parcel, code.length > 6 ? `…${code.slice(-4)}` : code);
  }

  _render() {
    if (!this.shadowRoot || !this._hass) return;
    const config = this._config;
    const t = this._t();
    const model = buildModel(this._hass, config);
    this._model = model;
    this._rows = model.rest.length + model.outgoing.length;

    const editing = !!(this.editMode || this.preview);
    const hide = config.hide_when_empty && model.empty && !['setup', 'offline'].includes(model.kind) && !editing;
    if (this.hidden !== hide) {
      this.hidden = hide;
      this.dispatchEvent(new Event('card-visibility-changed', { bubbles: true, composed: true }));
    }
    if (hide) {
      this.shadowRoot.innerHTML = '';
      return;
    }

    const focusKey = this.shadowRoot.activeElement?.dataset?.focus;
    const layout = this._layout;
    const glass = config.appearance === 'glass' ? ' glass' : '';
    const note = config.hide_when_empty && model.empty && editing && !['setup', 'offline'].includes(model.kind)
      ? `<p class="hidden-note">${esc(t.hiddenNote)}</p>` : '';

    if (config.size === 'compact') {
      this.shadowRoot.innerHTML = `
        <style>${STYLE}</style>
        <ha-card class="compact${glass}">${this._compact(model, t)}${note}</ha-card>`;
      if (focusKey) this.shadowRoot.querySelector(`[data-focus="${CSS.escape(focusKey)}"]`)?.focus();
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>${STYLE}</style>
      <ha-card class="${layout}${glass}">
        <div class="frame">
          ${config.title ? `<h2 class="title">${esc(config.title)}</h2>` : ''}
          <div class="body">
            <div class="hero-wrap">${this._hero(model, t)}</div>
            <div class="list">${this._list(model, t)}</div>
          </div>
          ${note}
        </div>
      </ha-card>`;

    if (focusKey) this.shadowRoot.querySelector(`[data-focus="${CSS.escape(focusKey)}"]`)?.focus();
    this._fit();
    requestAnimationFrame(() => this._fit());
  }

  _fit() {
    const el = this.shadowRoot.querySelector('.headline.time');
    if (!el || !el.clientWidth) return;
    el.style.fontSize = '';
    let size = parseFloat(getComputedStyle(el).fontSize);
    while (el.scrollWidth > el.clientWidth + 1 && size > 24) {
      size -= 2;
      el.style.fontSize = `${size}px`;
    }
  }

  _compact(model, t) {
    const { hero: p, kind, clock } = model;
    const config = this._config;
    let tone = 'quiet';
    let icon = 'box';
    let title;
    let sub;
    let rail = '';

    if (kind === 'setup') {
      title = t.setupTitle;
      sub = `${esc(t.setupText)} <a href="${CARRIERS_URL}" target="_blank" rel="noopener">${esc(t.setupLink)}</a>`;
    } else if (kind === 'offline') {
      icon = 'alert';
      title = t.offlineTitle;
      sub = esc(t.offlineText);
    } else if (kind === 'empty' && model.outgoing.length) {
      icon = 'send';
      title = t.sent;
      sub = esc(model.outgoing.map((x) => this._label(x, t)).join(', '));
    } else if (kind === 'empty') {
      title = t.emptyTitle;
      sub = esc(t.emptyText);
    } else {
      const win = windowOf(p, clock);
      const status = kind === 'delivered' ? 'delivered' : p.status;
      const who = this._label(p, t);
      const phrase = t.status[status];
      tone = kind === 'today' ? 'today' : TONE[status];
      icon = STATUS_ICON[status];
      sub = esc(p.sender ? fill(t.fromShort, phrase, p.sender) : `${phrase}, ${who}`);

      if (kind === 'today') {
        const day = clock.relativeDay(clock.now, true);
        title = win.from ? [day, clock.range(win.from, win.to)] : day;
        if (win.from && clock.isToday(win.from)) rail = this._rail(win, clock, p.status === 'out_for_delivery', true);
      } else if (kind === 'pickup') {
        title = p.pickup_point || phrase;
        if (!p.pickup_point) sub = esc(p.sender ? fill(t.from, p.sender) : who);
      } else if (kind === 'problem') {
        title = who;
        sub = esc(p.raw_status ? `${phrase}: ${p.raw_status}` : phrase);
      } else if (kind === 'delivered') {
        const at = deliveredAt(p, clock);
        title = at ? fill(t.deliveredAt, clock.time(at)) : phrase;
        sub = esc(p.sender ? fill(t.from, p.sender) : who);
      } else if (kind === 'upcoming') {
        title = win.from ? [clock.relativeDay(win.day, true), clock.range(win.from, win.to)] : clock.relativeDay(win.day, true);
      } else {
        title = who;
        sub = esc(phrase);
      }
    }

    const all = p ? [p, ...model.rest] : [...model.rest];
    const others = model.rest.length + (kind === 'empty' ? 0 : model.outgoing.length);
    const expandable = all.length + model.outgoing.length > 0;
    const open = expandable && this._expanded;
    const form = new Intl.PluralRules(clock.lang).select(others) === 'one' ? 'one' : 'other';
    const countLabel = others ? fill(t.moreParcels[form], others) : '';

    const limit = this._showAll ? Infinity : config.max_items || 6;
    const more = all.length > (config.max_items || 6)
      ? `<button class="toggle-more" data-action="more" data-focus="more">${esc(this._showAll ? t.showLess : fill(t.showMore, all.length - (config.max_items || 6)))}</button>`
      : '';
    const list = open
      ? `<div class="list c-list">${all.length ? `<ul>${all.slice(0, limit).map((x) => this._row(x, t, clock)).join('')}</ul>` : ''}${more}${
          model.outgoing.length ? `<h3 class="group">${esc(t.sent)}</h3><ul>${model.outgoing.map((x) => this._row(x, t, clock)).join('')}</ul>` : ''
        }</div>`
      : '';

    const head = `
      <span class="glyph">${svg(icon)}</span>
      <span class="c-text">
        ${config.title ? `<span class="c-label">${esc(config.title)}</span>` : ''}
        <span class="c-title">${Array.isArray(title)
          ? `<span class="c-day">${esc(title[0])}, </span>${esc(title[1])}`
          : esc(title)}</span>
        <span class="c-sub${['setup', 'offline'].includes(kind) ? ' wrap' : ''}">${sub}</span>
      </span>
      ${others ? `<span class="c-count" aria-label="${esc(countLabel)}">+${others}</span>` : ''}
      ${expandable ? `<span class="chev">${svg('chevron')}</span>` : ''}`;

    return `
      <div class="c-wrap" data-tone="${tone}">
        ${expandable
          ? `<div class="c-head" role="button" tabindex="0" aria-expanded="${open}" data-action="expand" data-focus="head">${head}</div>`
          : `<div class="c-head">${head}</div>`}
        ${rail}
        ${list}
      </div>`;
  }

  _hero(model, t) {
    const { hero: p, kind, clock } = model;

    if (['setup', 'offline', 'empty'].includes(kind)) {
      const copy = {
        setup: [t.setupTitle, t.setupText, `<a href="${CARRIERS_URL}" target="_blank" rel="noopener">${esc(t.setupLink)}</a>`],
        offline: [t.offlineTitle, t.offlineText, ''],
        empty: [t.emptyTitle, t.emptyText, ''],
      }[kind];
      return `
        <div class="hero quiet-state" data-tone="quiet">
          <div class="glyph">${svg(kind === 'offline' ? 'alert' : 'box')}</div>
          <div class="headline">${esc(copy[0])}</div>
          <div class="detail"><span>${esc(copy[1])}</span>${copy[2]}</div>
        </div>`;
    }

    const win = windowOf(p, clock);
    const status = kind === 'delivered' ? 'delivered' : p.status;
    const tone = kind === 'today' ? 'today' : TONE[status];
    const who = this._label(p, t);
    let lead = t.status[status];
    let headline;
    let isTime = false;
    const detail = [];

    if (kind === 'today') {
      if (win.from) {
        headline = clock.range(win.from, win.to);
        isTime = true;
      } else {
        headline = clock.relativeDay(clock.now, true);
      }
      detail.push(`<span class="who">${esc(p.sender ? fill(t.from, p.sender) : who)}</span>`);
    } else if (kind === 'pickup') {
      headline = p.pickup_point || t.status.at_pickup_point;
      if (!p.pickup_point) lead = '';
      detail.push(`<span class="who">${esc(p.sender ? fill(t.from, p.sender) : who)}</span>`);
    } else if (kind === 'problem') {
      headline = who;
      detail.push(`<span>${esc(p.raw_status || t.problemText)}</span>`);
    } else if (kind === 'delivered') {
      const at = deliveredAt(p, clock);
      headline = at ? clock.time(at) : clock.relativeDay(clock.now, true);
      isTime = !!at;
      detail.push(`<span class="who">${esc(p.sender ? fill(t.from, p.sender) : who)}</span>`);
    } else if (kind === 'upcoming') {
      headline = clock.relativeDay(win.day, true);
      detail.push(`<span class="who">${esc(p.sender ? fill(t.from, p.sender) : who)}</span>`);
      if (win.from) detail.push(`<span>${esc(fill(t.between, clock.time(win.from), clock.time(win.to)))}</span>`);
    } else {
      headline = who;
    }

    if (model.moreToday) {
      const form = new Intl.PluralRules(clock.lang).select(model.moreToday) === 'one' ? 'one' : 'other';
      detail.push(`<span class="more-today">${esc(fill(t.moreToday[form], model.moreToday))}</span>`);
    }

    const open = this._open.has(p.key);
    const rail = kind === 'today' && win.from && clock.isToday(win.from) ? this._rail(win, clock, p.status === 'out_for_delivery') : '';
    const long = !isTime && headline.length > 16 ? ' long' : '';

    return `
      <div class="hero" data-tone="${tone}" role="button" tabindex="0" aria-expanded="${open}"
           data-action="toggle" data-key="${esc(p.key)}" data-focus="hero" aria-label="${esc(`${who}: ${t.status[status]}. ${t.details}`)}">
        <div class="lead">
          ${svg(STATUS_ICON[status])}
          ${lead ? `<span>${esc(lead)}</span>` : ''}
          ${p.carrier ? `<span class="carrier">${esc(p.carrier)}</span>` : ''}
          <span class="chev">${svg('chevron')}</span>
        </div>
        <div class="headline${isTime ? ' time' : ''}${long}">${esc(headline)}</div>
        ${detail.length ? `<div class="detail">${detail.join('')}</div>` : ''}
        ${rail}
      </div>
      ${this._drawer(p, open, t, clock)}`;
  }

  _rail(win, clock, live, compact = false) {
    const from = clock.minutesOfDay(win.from);
    const to = clock.dayKey(win.to) === clock.dayKey(win.from) ? Math.max(from + 15, clock.minutesOfDay(win.to)) : 24 * 60;
    const now = clock.minutesOfDay(clock.now);
    const start = Math.min(7 * 60, Math.floor(from / 60) * 60, Math.floor(now / 60) * 60);
    const end = Math.max(21 * 60, Math.ceil(to / 60) * 60, Math.ceil(now / 60) * 60);
    const span = end - start || 1;
    const pct = (m) => ((Math.min(Math.max(m, start), end) - start) / span) * 100;

    const step = span > 15 * 60 ? 4 : 3;
    const hours = [];
    for (let h = start / 60; h <= end / 60 - step / 2; h += step) hours.push(h);

    if (compact) {
      return `
      <div class="rail slim" aria-hidden="true">
        <div class="track">
          <div class="elapsed" style="width:${pct(now).toFixed(2)}%"></div>
          <div class="band" style="left:${pct(from).toFixed(2)}%;width:${(pct(to) - pct(from)).toFixed(2)}%"></div>
          <div class="now${live ? ' live' : ''}" style="left:${pct(now).toFixed(2)}%"></div>
        </div>
      </div>`;
    }

    return `
      <div class="rail" aria-hidden="true">
        <div class="track">
          <div class="elapsed" style="width:${pct(now).toFixed(2)}%"></div>
          <div class="band" style="left:${pct(from).toFixed(2)}%;width:${(pct(to) - pct(from)).toFixed(2)}%"></div>
          <div class="now${live ? ' live' : ''}" style="left:${pct(now).toFixed(2)}%"></div>
        </div>
        <div class="hours">${hours.map((h) => `<span style="left:${pct(h * 60).toFixed(2)}%">${esc(clock.hourLabel(h % 24))}</span>`).join('')}</div>
      </div>`;
  }

  _list(model, t) {
    const { rest, outgoing, clock } = model;
    if (!rest.length && !outgoing.length) return '';
    const limit = this._config.max_items || (this._layout === 'split' ? Infinity : 4);
    const shown = this._showAll ? rest : rest.slice(0, limit);
    let html = shown.length ? `<ul>${shown.map((p) => this._row(p, t, clock)).join('')}</ul>` : '';
    if (rest.length > limit) {
      const label = this._showAll ? t.showLess : fill(t.showMore, rest.length - limit);
      html += `<button class="toggle-more" data-action="more" data-focus="more">${esc(label)}</button>`;
    }
    if (outgoing.length) {
      html += `<h3 class="group">${esc(t.sent)}</h3><ul>${outgoing.map((p) => this._row(p, t, clock)).join('')}</ul>`;
    }
    return html;
  }

  _row(p, t, clock) {
    const status = p.status;
    const tone = arrivesToday(p, clock) && status !== 'problem' ? 'today' : TONE[status];
    const open = this._open.has(p.key);
    const win = windowOf(p, clock);
    let when = '';
    if (status === 'delivered') {
      const at = deliveredAt(p, clock);
      when = at ? clock.time(at) : '';
    } else if (status === 'at_pickup_point') {
      when = p.pickup_point || '';
    } else if (win.from && clock.isToday(win.from)) {
      when = clock.range(win.from, win.to);
    } else if (win.day) {
      when = clock.relativeDay(win.day);
    } else if (status === 'out_for_delivery') {
      when = clock.relativeDay(clock.now);
    }
    const icon = p.outgoing && status !== 'delivered' && status !== 'problem' ? 'send' : STATUS_ICON[status];
    const sub = `<b>${esc(t.status[status])}</b>${when ? `, ${esc(when)}` : ''}`;

    return `
      <li data-tone="${tone}">
        <button class="row" data-action="toggle" data-key="${esc(p.key)}" data-focus="row:${esc(p.key)}" aria-expanded="${open}">
          <span class="glyph">${svg(icon)}</span>
          <span class="text">
            <span class="name">${esc(this._label(p, t))}</span>
            <span class="sub">${sub}</span>
          </span>
          ${p.carrier ? `<span class="carrier">${esc(p.carrier)}</span>` : ''}
          <span class="chev">${svg('chevron')}</span>
        </button>
        ${this._drawer(p, open, t, clock)}
      </li>`;
  }

  _drawer(p, open, t, clock) {
    const win = windowOf(p, clock);
    const facts = [];
    facts.push(`
      <dt>${esc(t.tracking)}</dt>
      <dd>
        <span class="code">${esc(p.barcode)}</span>
        <button class="chip${this._copied === p.key ? ' done' : ''}" data-action="copy" data-key="${esc(p.key)}" data-focus="copy:${esc(p.key)}" ${open ? '' : 'tabindex="-1"'}>
          ${svg(this._copied === p.key ? 'check' : 'copy')}${esc(this._copied === p.key ? t.copied : t.copy)}
        </button>
      </dd>`);
    if (p.pickup_point) facts.push(`<dt>${esc(t.pickupPoint)}</dt><dd>${esc(p.pickup_point)}</dd>`);
    if (win.from) facts.push(`<dt>${esc(t.window)}</dt><dd>${esc(`${clock.relativeDay(win.from, true)}, ${clock.range(win.from, win.to)}`)}</dd>`);

    const history = Array.isArray(p.history) ? [...p.history].reverse().slice(0, 6) : [];
    const updates = history.length
      ? `<ol class="updates" aria-label="${esc(t.updates)}">${history
          .map((h) => {
            const at = clock.parse(h.timestamp);
            const label = t.status[h.status] || t.status.unknown;
            return `<li><span>${at ? `<time>${esc(clock.stamp(at))}</time>` : ''}${esc(label)}${h.raw_status && typeof h.raw_status === 'string' && !/^[A-Z0-9_]+$/.test(h.raw_status) ? ` <small>${esc(h.raw_status)}</small>` : ''}</span></li>`;
          })
          .join('')}</ol>`
      : '';

    const link = p.url && /^https?:\/\//i.test(p.url)
      ? `<div class="actions"><a class="chip" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" ${open ? '' : 'tabindex="-1"'}>${svg('open')}${esc(t.open)}</a></div>`
      : '';

    return `
      <div class="drawer${open ? ' open' : ''}" ${open ? '' : 'inert'}>
        <div><div class="panel">
          <dl class="facts">${facts.join('')}</dl>
          ${updates}
          ${link}
        </div></div>
      </div>`;
  }

  _onClick(ev) {
    const target = ev.target.closest('[data-action]');
    if (!target) return;
    const { action, key } = target.dataset;
    if (action === 'toggle') {
      if (this._open.has(key)) this._open.delete(key);
      else this._open.add(key);
      this._haptic();
      this._render();
    } else if (action === 'expand') {
      this._expanded = !this._expanded;
      this._haptic();
      this._render();
    } else if (action === 'more') {
      this._showAll = !this._showAll;
      this._render();
    } else if (action === 'copy') {
      ev.stopPropagation();
      const parcel = collectParcels(findSources(this._hass, this._config.entities)).find((p) => p.key === key);
      if (parcel) this._copy(parcel.barcode, key);
    }
  }

  async _copy(text, key) {
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch (err) {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      this.shadowRoot.appendChild(area);
      area.select();
      try {
        ok = document.execCommand('copy');
      } catch (e) {
        ok = false;
      }
      area.remove();
    }
    if (!ok) {
      const code = this.shadowRoot.querySelector(`[data-key="${CSS.escape(key)}"][data-action=copy]`)?.previousElementSibling;
      if (code) window.getSelection()?.selectAllChildren(code);
      return;
    }
    this._copied = key;
    this._haptic('success');
    this._render();
    clearTimeout(this._copyTimer);
    this._copyTimer = setTimeout(() => {
      this._copied = null;
      this._render();
    }, 1800);
  }

  _haptic(kind = 'light') {
    this.dispatchEvent(new CustomEvent('haptic', { detail: kind, bubbles: true, composed: true }));
  }
}

class DoorstepCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = { ...config };
    this._render();
  }

  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (this._form) this._form.hass = hass;
    if (first) this._render();
  }

  connectedCallback() {
    this._ready();
  }

  async _ready() {
    if (!customElements.get('ha-form') && window.loadCardHelpers) {
      try {
        const helpers = await window.loadCardHelpers();
        const card = await helpers.createCardElement({ type: 'entities', entities: [] });
        await card.constructor.getConfigElement?.();
      } catch (err) {
        /* without ha-form the YAML editor still works */
      }
    }
    this._render();
  }

  _schema(t, sources) {
    const full = (this._config.size || DEFAULTS.size) === 'full';
    return [
      {
        name: 'size',
        selector: {
          select: {
            mode: 'list',
            options: [
              { value: 'compact', label: t.size_compact },
              { value: 'full', label: t.size_full },
            ],
          },
        },
      },
      { name: 'title', selector: { text: {} } },
      {
        name: 'appearance',
        selector: {
          select: {
            mode: 'box',
            options: [
              { value: 'theme', label: t.appearance_theme },
              { value: 'glass', label: t.appearance_glass },
            ],
          },
        },
      },
      ...(full ? [{
        name: 'layout',
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'auto', label: t.layout_auto },
              { value: 'stacked', label: t.layout_stacked },
              { value: 'split', label: t.layout_split },
            ],
          },
        },
      }] : []),
      { name: 'show_delivered', selector: { boolean: {} } },
      { name: 'show_outgoing', selector: { boolean: {} } },
      { name: 'hide_when_empty', selector: { boolean: {} } },
      {
        type: 'expandable',
        name: '',
        title: t.advanced,
        schema: [
          { name: 'max_items', selector: { number: { min: 1, max: 20, mode: 'box' } } },
          { name: 'entities', selector: { entity: { multiple: true, include_entities: sources.map((s) => s.id) } } },
        ],
      },
    ];
  }

  _render() {
    if (!this._hass || !this._config) return;
    const lang = languageOf(this._hass);
    const t = pick(EDITOR_TEXT, lang);

    const sources = findSources(this._hass, []);
    const names = [...new Set(sources.map((s) => this._sourceName(s)))];
    const count = names.length;
    const form = count === 0 ? 'zero' : new Intl.PluralRules(lang).select(count) === 'one' ? 'one' : 'other';
    const listFormat = Intl.ListFormat ? new Intl.ListFormat(lang, { type: 'conjunction' }).format(names) : names.join(', ');

    if (!this._root) {
      this.innerHTML = `
        <style>
          .note { margin: 0 0 16px; padding: 12px 14px; border-radius: 10px; font-size: 14px; line-height: 1.45;
                  background: color-mix(in srgb, var(--primary-color, #2a6ee8) 9%, transparent); }
          .note strong { font-weight: 500; }
        </style>
        <p class="note"></p>
        <div class="form"></div>`;
      this._root = this;
    }
    this.querySelector('.note').innerHTML = `<strong>${esc(fill(t.found[form], count, listFormat))}</strong> ${esc(t.intro)}`;

    if (!customElements.get('ha-form')) return;
    if (!this._form) {
      this._form = document.createElement('ha-form');
      this._form.computeLabel = (s) => t[s.name] ?? s.name;
      this._form.computeHelper = (s) => (s.name === 'entities' ? t.entities_help : undefined);
      this._form.addEventListener('value-changed', (ev) => {
        ev.stopPropagation();
        const next = { ...ev.detail.value };
        for (const [k, v] of Object.entries(next)) {
          if (k === 'type') continue;
          const empty = v === '' || v === undefined || (Array.isArray(v) && !v.length);
          if (empty || v === DEFAULTS[k]) delete next[k];
        }
        const sizeChanged = (next.size || DEFAULTS.size) !== (this._config.size || DEFAULTS.size);
        this._config = next;
        if (sizeChanged) this._form.schema = this._schema(t, findSources(this._hass, []));
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: next }, bubbles: true, composed: true }));
      });
      this.querySelector('.form').appendChild(this._form);
    }
    this._form.hass = this._hass;
    this._form.schema = this._schema(t, sources);
    this._form.data = { ...DEFAULTS, ...this._config };
  }

  _sourceName(source) {
    const st = this._hass.states[source.id];
    const carrier = source.parcels.find((p) => p.carrier)?.carrier;
    if (carrier && source.platform !== 'parcel_aggregator') return carrier;
    const platform = source.platform.replace(/_/g, ' ');
    if (platform) return platform === 'parcel aggregator' ? 'Parcel Aggregator' : platform.toUpperCase();
    return st?.attributes?.friendly_name || source.id;
  }
}

if (!customElements.get('doorstep-card')) customElements.define('doorstep-card', DoorstepCard);
if (!customElements.get('doorstep-card-editor')) customElements.define('doorstep-card-editor', DoorstepCardEditor);

window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === 'doorstep-card')) {
  window.customCards.push({
    type: 'doorstep-card',
    name: 'Doorstep',
    description: 'See at a glance when your next parcel arrives.',
    preview: true,
    documentationURL: DOCS,
  });
}

console.info(`%c Doorstep %c ${VERSION} `, 'background:#2a6ee8;color:#fff;border-radius:3px 0 0 3px;padding:1px 4px', 'background:#e8edf5;color:#1d2125;border-radius:0 3px 3px 0;padding:1px 4px');
