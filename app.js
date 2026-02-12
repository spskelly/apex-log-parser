// -- event type → category mapping --
const EVENT_CATEGORIES = {
  SOQL_EXECUTE_BEGIN: 'soql', SOQL_EXECUTE_END: 'soql',
  DML_BEGIN: 'dml', DML_END: 'dml',
  USER_DEBUG: 'debug', SYSTEM_DEBUG: 'debug',
  CODE_UNIT_STARTED: 'unit', CODE_UNIT_FINISHED: 'unit',
  EXECUTION_STARTED: 'execution', EXECUTION_FINISHED: 'execution',
  LIMIT_USAGE_FOR_NS: 'limit', CUMULATIVE_LIMIT_USAGE: 'limit', CUMULATIVE_LIMIT_USAGE_END: 'limit',
  FATAL_ERROR: 'error', EXCEPTION_THROWN: 'error', VALIDATION_ERROR: 'error', VALIDATION_FAIL: 'error',
  VALIDATION_RULE: 'validation', VALIDATION_FORMULA: 'validation', VALIDATION_PASS: 'validation',
  WF_RULE_EVAL_BEGIN: 'workflow', WF_RULE_EVAL_END: 'workflow',
  WF_CRITERIA_BEGIN: 'workflow', WF_CRITERIA_END: 'workflow',
  FLOW_START_INTERVIEW_BEGIN: 'flow', FLOW_START_INTERVIEW_END: 'flow',
  FLOW_ELEMENT_BEGIN: 'flow', FLOW_ELEMENT_END: 'flow',
  CALLOUT_REQUEST: 'callout', CALLOUT_RESPONSE: 'callout',
  HEAP_ALLOCATE: 'system', HEAP_DEALLOCATE: 'system',
  STATEMENT_EXECUTE: 'system', VARIABLE_SCOPE_BEGIN: 'system', VARIABLE_ASSIGNMENT: 'system',
  ENTERING_MANAGED_PKG: 'system', CONSTRUCTOR_ENTRY: 'unit', CONSTRUCTOR_EXIT: 'unit',
  METHOD_ENTRY: 'unit', METHOD_EXIT: 'unit',
  SYSTEM_METHOD_ENTRY: 'system', SYSTEM_METHOD_EXIT: 'system',
  // triggers
  TRIGGER_STARTED: 'unit', TRIGGER_FINISHED: 'unit',
  // visualforce
  VF_PAGE_MESSAGE: 'system', VF_APEX_CALL_START: 'unit', VF_APEX_CALL_END: 'unit',
  VF_SERIALIZE_VIEWSTATE_BEGIN: 'system', VF_SERIALIZE_VIEWSTATE_END: 'system',
  VF_EVALUATE_FORMULA_BEGIN: 'system', VF_EVALUATE_FORMULA_END: 'system',
  // named credentials & push
  NAMED_CREDENTIAL_REQUEST: 'callout', NAMED_CREDENTIAL_RESPONSE: 'callout',
  PUSH_NOTIFICATION_SEND: 'callout',
  // soql explain
  SOQL_EXECUTE_EXPLAIN: 'soql',
  // additional system events
  USER_INFO: 'system', STACK_FRAME_VARIABLE_LIST: 'system',
  CUMULATIVE_PROFILING_BEGIN: 'system', CUMULATIVE_PROFILING_END: 'system', CUMULATIVE_PROFILING: 'system',
  SOQL: 'system', SOQL_ROWS: 'system', DML: 'system', DML_ROWS: 'system', AGGS: 'system',
  SYSTEM_MODE_ENTER: 'system', SYSTEM_MODE_EXIT: 'system',
  SAVEPOINT_SET: 'system', SAVEPOINT_ROLLBACK: 'system',
  EMAIL_QUEUE: 'system', ASYNC_APEX: 'system',
  // additional flow events
  FLOW_START_INTERVIEWS_BEGIN: 'flow', FLOW_START_INTERVIEWS_END: 'flow',
  FLOW_VALUE_ASSIGNMENT: 'flow', FLOW_ACTIONCALL_DETAIL: 'flow',
  FLOW_ASSIGNMENT_DETAIL: 'flow', FLOW_LOOP_DETAIL: 'flow',
  FLOW_RULE_DETAIL: 'flow', FLOW_BULK_ELEMENT_BEGIN: 'flow', FLOW_BULK_ELEMENT_END: 'flow',
  FLOW_CREATE_INTERVIEW_BEGIN: 'flow', FLOW_CREATE_INTERVIEW_END: 'flow',
  // additional workflow events
  WF_RULE_EVAL_VALUE: 'workflow', WF_RULE_NOT_EVALUATED: 'workflow',
  WF_FIELD_UPDATE: 'workflow', WF_ACTION: 'workflow',
  WF_ACTIONS_END: 'workflow', WF_FLOW_ACTION_BEGIN: 'workflow', WF_FLOW_ACTION_END: 'workflow',
  WF_EMAIL_ALERT: 'workflow', WF_OUTBOUND_MSG: 'workflow',
};

// -- category display config --
const CATEGORIES = {
  soql:       { color: '#f4c542', label: 'SOQL' },
  dml:        { color: '#e8853d', label: 'DML' },
  debug:      { color: '#5cc9c2', label: 'DEBUG' },
  unit:       { color: '#7c8dea', label: 'UNIT' },
  execution:  { color: '#888888', label: 'EXEC' },
  limit:      { color: '#e05577', label: 'LIMIT' },
  error:      { color: '#ff4444', label: 'ERROR' },
  validation: { color: '#b48ade', label: 'VALID' },
  workflow:   { color: '#6db36d', label: 'WF' },
  flow:       { color: '#4db8d8', label: 'FLOW' },
  callout:    { color: '#d4a056', label: 'HTTP' },
  system:     { color: '#666666', label: 'SYS' },
  header:     { color: '#9a7bd4', label: 'HDR' },
  unknown:    { color: '#555555', label: '???' },
};

const DEBUG_LEVEL_COLORS = {
  ERROR: '#ff4444', WARN: '#f4c542', INFO: '#5cc9c2',
  DEBUG: '#7c8dea', FINE: '#808080', FINER: '#707070', FINEST: '#606060',
};

// -- short readable labels for event types (used in log badges) --
const EVENT_LABELS = {
  CODE_UNIT_STARTED: 'UNIT\u25B8', CODE_UNIT_FINISHED: 'UNIT\u25C2',
  METHOD_ENTRY: 'MTHD\u25B8', METHOD_EXIT: 'MTHD\u25C2',
  CONSTRUCTOR_ENTRY: 'CTOR\u25B8', CONSTRUCTOR_EXIT: 'CTOR\u25C2',
  SYSTEM_METHOD_ENTRY: 'SYS\u25B8', SYSTEM_METHOD_EXIT: 'SYS\u25C2',
  TRIGGER_STARTED: 'TRGR\u25B8', TRIGGER_FINISHED: 'TRGR\u25C2',
  VF_APEX_CALL_START: 'VF\u25B8', VF_APEX_CALL_END: 'VF\u25C2',
  EXECUTION_STARTED: 'EXEC\u25B8', EXECUTION_FINISHED: 'EXEC\u25C2',
  DML_END: 'DML\u25C2',
  HEAP_ALLOCATE: 'HEAP+', HEAP_DEALLOCATE: 'HEAP\u2212',
  STATEMENT_EXECUTE: 'STMT', VARIABLE_ASSIGNMENT: 'VAR',
  VARIABLE_SCOPE_BEGIN: 'SCOPE', ENTERING_MANAGED_PKG: 'PKG',
  FATAL_ERROR: 'FATAL', EXCEPTION_THROWN: 'EXCEPT',
  VALIDATION_RULE: 'VRULE', VALIDATION_FORMULA: 'VFORM',
  VALIDATION_PASS: 'VPASS', VALIDATION_ERROR: 'VERROR', VALIDATION_FAIL: 'VFAIL',
  WF_RULE_EVAL_BEGIN: 'WF\u25B8', WF_RULE_EVAL_END: 'WF\u25C2',
  WF_CRITERIA_BEGIN: 'WFCRT\u25B8', WF_CRITERIA_END: 'WFCRT\u25C2',
  WF_FIELD_UPDATE: 'WFUPD', WF_ACTION: 'WFACT',
  FLOW_START_INTERVIEW_BEGIN: 'FLOW\u25B8', FLOW_START_INTERVIEW_END: 'FLOW\u25C2',
  FLOW_ELEMENT_BEGIN: 'FELEM\u25B8', FLOW_ELEMENT_END: 'FELEM\u25C2',
  FLOW_VALUE_ASSIGNMENT: 'FVAR', FLOW_ACTIONCALL_DETAIL: 'FCALL',
  CALLOUT_REQUEST: 'HTTP\u25B8', CALLOUT_RESPONSE: 'HTTP\u25C2',
  NAMED_CREDENTIAL_REQUEST: 'NCRED\u25B8', NAMED_CREDENTIAL_RESPONSE: 'NCRED\u25C2',
};

// -- entry/exit pair mapping --
const ENTRY_EXIT_PAIRS = {
  CODE_UNIT_STARTED: 'CODE_UNIT_FINISHED',
  METHOD_ENTRY: 'METHOD_EXIT',
  CONSTRUCTOR_ENTRY: 'CONSTRUCTOR_EXIT',
  SYSTEM_METHOD_ENTRY: 'SYSTEM_METHOD_EXIT',
  TRIGGER_STARTED: 'TRIGGER_FINISHED',
  EXECUTION_STARTED: 'EXECUTION_FINISHED',
  SOQL_EXECUTE_BEGIN: 'SOQL_EXECUTE_END',
  DML_BEGIN: 'DML_END',
  FLOW_START_INTERVIEW_BEGIN: 'FLOW_START_INTERVIEW_END',
  FLOW_START_INTERVIEWS_BEGIN: 'FLOW_START_INTERVIEWS_END',
  FLOW_ELEMENT_BEGIN: 'FLOW_ELEMENT_END',
  FLOW_BULK_ELEMENT_BEGIN: 'FLOW_BULK_ELEMENT_END',
  FLOW_CREATE_INTERVIEW_BEGIN: 'FLOW_CREATE_INTERVIEW_END',
  WF_RULE_EVAL_BEGIN: 'WF_RULE_EVAL_END',
  WF_CRITERIA_BEGIN: 'WF_CRITERIA_END',
  WF_FLOW_ACTION_BEGIN: 'WF_FLOW_ACTION_END',
  VF_APEX_CALL_START: 'VF_APEX_CALL_END',
  VF_SERIALIZE_VIEWSTATE_BEGIN: 'VF_SERIALIZE_VIEWSTATE_END',
  VF_EVALUATE_FORMULA_BEGIN: 'VF_EVALUATE_FORMULA_END',
  CUMULATIVE_PROFILING_BEGIN: 'CUMULATIVE_PROFILING_END',
  SYSTEM_MODE_ENTER: 'SYSTEM_MODE_EXIT',
};
const EXIT_ENTRY_PAIRS = Object.fromEntries(
  Object.entries(ENTRY_EXIT_PAIRS).map(([k, v]) => [v, k])
);

// -- filter categories shown as chips --
const FILTER_ORDER = ['debug','soql','dml','error','unit','limit','validation','workflow','flow','callout','header','system'];

// -- state --
let state = {
  lines: [],
  limits: [],
  stats: {},
  activeFilters: new Set(),
  searchTerm: '',
  hideSystem: false,
  showLimits: true,
  categoryCounts: {},
  pairs: new Map(),
  highlightRange: null,
  matchIndices: [],
  currentMatchPos: -1,
  matchSet: new Set(),
};

// -- dom refs --
const $ = (sel) => document.querySelector(sel);
const inputView = $('#input-view');
const parsedView = $('#parsed-view');
const logInput = $('#log-input');
const dropZone = $('#drop-zone');
const searchInput = $('#search-input');
const logLinesEl = $('#log-lines');
const statsBar = $('#stats-bar');
const limitsContent = $('#limits-content');
const limitsPanel = $('#limits-panel');
const filtersRow = $('#filters-row');

// -- escapes html for safe insertion --
function esc(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// -- highlights search matches in text --
function highlight(text, term) {
  if (!term || !text) return esc(text || '');
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(escaped, 'gi');
  let result = '';
  let lastIndex = 0;
  let match;
  while ((match = re.exec(text)) !== null) {
    result += esc(text.slice(lastIndex, match.index));
    result += '<span class="search-hl">' + esc(match[0]) + '</span>';
    lastIndex = re.lastIndex;
  }
  result += esc(text.slice(lastIndex));
  return result;
}

// -- parses a single log line --
function parseLine(raw, lineNum) {
  const m = raw.match(/^(\d{2}:\d{2}:\d{2}\.\d+)\s*\((\d+)\)\|([A-Z_]+)\|?(.*)?$/);
  if (!m) return { lineNum, raw, category: 'header', eventType: null };

  const [, timestamp, nanos, eventType, rest = ''] = m;
  const category = EVENT_CATEGORIES[eventType] || 'unknown';
  const line = { lineNum, timestamp, nanos: +nanos, eventType, category, rest, raw };

  // extract debug specifics
  if (eventType === 'USER_DEBUG') {
    const dm = rest.match(/^\[(\d+)\]\|(\w+)\|(.*)$/s);
    if (dm) { line.debugLevel = dm[2]; line.debugMessage = dm[3]; }
  }

  // extract soql query
  if (eventType === 'SOQL_EXECUTE_BEGIN') {
    const sm = rest.match(/^\[(\d+)\]\|Aggregations:(\d+)\|(.*)$/s);
    if (sm) line.soqlQuery = sm[3];
  }

  // extract soql rows
  if (eventType === 'SOQL_EXECUTE_END') {
    const rm = rest.match(/Rows:(\d+)/);
    if (rm) line.soqlRows = +rm[1];
  }

  // extract dml info
  if (eventType === 'DML_BEGIN') {
    const dm = rest.match(/Op:(\w+)\|Type:(\w+)\|Rows:(\d+)/);
    if (dm) line.dmlInfo = { op: dm[1], type: dm[2], rows: +dm[3] };
  }

  return line;
}

// -- parses governor limits from raw text --
function parseLimits(rawLines) {
  const limitMap = new Map();
  let inBlock = false;
  for (const raw of rawLines) {
    if (raw.includes('LIMIT_USAGE_FOR_NS')) { inBlock = true; continue; }
    if (raw.includes('CUMULATIVE_LIMIT_USAGE_END')) { inBlock = false; continue; }
    if (inBlock) {
      const m = raw.match(/^\s+(.+?):\s+(\d+)\s+out of\s+(\d+)/);
      if (m) {
        const name = m[1].trim();
        const used = +m[2], max = +m[3];
        const prev = limitMap.get(name);
        if (!prev || used > prev.used) {
          limitMap.set(name, { name, used, max, pct: max > 0 ? (used / max) * 100 : 0 });
        }
      }
    }
  }
  return [...limitMap.values()];
}

// -- computes bidirectional entry/exit pairs --
function computePairs(lines) {
  const pairs = new Map();
  const stacks = {};
  for (const line of lines) {
    if (!line.eventType) continue;
    if (ENTRY_EXIT_PAIRS[line.eventType]) {
      const key = line.eventType;
      if (!stacks[key]) stacks[key] = [];
      stacks[key].push(line.idx);
    } else if (EXIT_ENTRY_PAIRS[line.eventType]) {
      const key = EXIT_ENTRY_PAIRS[line.eventType];
      if (stacks[key] && stacks[key].length > 0) {
        const entryIdx = stacks[key].pop();
        pairs.set(entryIdx, line.idx);
        pairs.set(line.idx, entryIdx);
      }
    }
  }
  return pairs;
}

// -- main parse function --
function parseLog(rawLog) {
  const rawLines = rawLog.split('\n');
  const lines = rawLines.map((r, i) => { const l = parseLine(r, i + 1); l.idx = i; return l; });
  const limits = parseLimits(rawLines);

  // compute stats
  const soqlBegins = lines.filter(l => l.eventType === 'SOQL_EXECUTE_BEGIN');
  const soqlEnds = lines.filter(l => l.eventType === 'SOQL_EXECUTE_END');
  const dmlOps = lines.filter(l => l.eventType === 'DML_BEGIN');
  const debugLines = lines.filter(l => l.eventType === 'USER_DEBUG');
  const errors = lines.filter(l => l.category === 'error' || l.debugLevel === 'ERROR');
  const warnings = lines.filter(l => l.debugLevel === 'WARN');
  const soqlRows = soqlEnds.reduce((s, l) => s + (l.soqlRows || 0), 0);
  const dmlRows = dmlOps.reduce((s, l) => s + (l.dmlInfo ? l.dmlInfo.rows : 0), 0);

  const firstNano = lines.find(l => l.nanos)?.nanos;
  const lastNano = lines.findLast(l => l.nanos)?.nanos;
  const execTimeMs = firstNano && lastNano ? ((lastNano - firstNano) / 1e6).toFixed(1) : null;

  // category counts
  const counts = {};
  for (const l of lines) counts[l.category] = (counts[l.category] || 0) + 1;

  // parse log metadata (debug level settings from first header line)
  let metadata = null;
  const firstLine = lines[0];
  if (firstLine && firstLine.category === 'header' && firstLine.raw) {
    const metaMatch = firstLine.raw.match(/^[\d.]+\s+(.+)$/);
    if (metaMatch) {
      const parts = metaMatch[1].split(';').map(p => p.trim()).filter(Boolean);
      if (parts.length > 1 && parts.every(p => p.includes(','))) {
        metadata = parts.map(p => {
          const [name, level] = p.split(',');
          return { name, level };
        });
      }
    }
  }

  state.lines = lines;
  state.limits = limits;
  state.pairs = computePairs(lines);
  state.highlightRange = null;
  state.categoryCounts = counts;
  state.stats = {
    totalLines: lines.length,
    soqlCount: soqlBegins.length, soqlRows,
    dmlCount: dmlOps.length, dmlRows,
    debugCount: debugLines.length,
    errorCount: errors.length, warnCount: warnings.length,
    execTimeMs, metadata,
  };
}

// -- filters the parsed lines based on current state --
function getFilteredLines() {
  let lines = state.lines;
  const { activeFilters, hideSystem } = state;

  if (activeFilters.size > 0) {
    lines = lines.filter(l => activeFilters.has(l.category));
  }

  if (hideSystem) {
    lines = lines.filter(l => l.category !== 'system' && l.category !== 'execution');
  }

  return lines;
}

function lineMatchesSearch(line, term) {
  if (!term) return false;
  const t = term.toLowerCase();
  return (
    (line.raw && line.raw.toLowerCase().includes(t)) ||
    (line.debugMessage && line.debugMessage.toLowerCase().includes(t)) ||
    (line.soqlQuery && line.soqlQuery.toLowerCase().includes(t))
  );
}

// -- renders a single log line to html --
function renderLine(line) {
  const cat = CATEGORIES[line.category] || CATEGORIES.unknown;
  const color = cat.color;
  const bg = `${color}14`;
  const term = state.searchTerm;
  const num = `<span class="log-line-num">${line.lineNum}</span>`;
  const hasPair = state.pairs && state.pairs.has(line.idx);
  const pairAttr = hasPair ? ' data-pair="1"' : '';

  // highlight class
  const range = state.highlightRange;
  let hlClass = '';
  if (range && line.idx >= range.start && line.idx <= range.end) {
    hlClass = (line.idx === range.start || line.idx === range.end) ? ' scope-hl scope-hl-cap' : ' scope-hl';
  }
  const matchClass = state.matchSet.has(line.idx) ? ' search-match' : '';

  // header lines
  if (!line.eventType) {
    return `<div class="log-line${hlClass}${matchClass}" data-idx="${line.idx}" style="color:${color};background:${bg}">
      ${num}
      <span class="log-content">${highlight(line.raw, term)}</span>
    </div>`;
  }

  // user_debug
  if (line.eventType === 'USER_DEBUG') {
    const lc = DEBUG_LEVEL_COLORS[line.debugLevel] || color;
    return `<div class="log-line${hlClass}${matchClass}" data-idx="${line.idx}" style="background:${bg};border-left-color:${lc}">
      ${num}
      <span class="log-timestamp">${esc(line.timestamp)}</span>
      <span class="log-badge" style="color:${lc};background:${lc}18">${esc(line.debugLevel || '')}</span>
      <span class="log-content" style="color:var(--text)">${highlight(line.debugMessage, term)}</span>
    </div>`;
  }

  // soql begin
  if (line.eventType === 'SOQL_EXECUTE_BEGIN') {
    return `<div class="log-line${hlClass}${matchClass}" data-idx="${line.idx}" style="background:${bg};border-left-color:${color}">
      ${num}
      <span class="log-timestamp">${esc(line.timestamp)}</span>
      <span class="log-badge${hasPair ? ' clickable-badge' : ''}" style="color:${color};background:${color}18"${pairAttr}>SOQL</span>
      <span class="log-content" style="color:#c9b458">${highlight(line.soqlQuery || line.rest, term)}</span>
    </div>`;
  }

  // soql end
  if (line.eventType === 'SOQL_EXECUTE_END') {
    return `<div class="log-line${hlClass}${matchClass}" data-idx="${line.idx}" style="background:${bg};border-left-color:${color}">
      ${num}
      <span class="log-timestamp">${esc(line.timestamp)}</span>
      <span${pairAttr} style="color:${color}${hasPair ? ';cursor:pointer' : ''}">↳ ${line.soqlRows != null ? line.soqlRows + ' rows returned' : esc(line.rest)}</span>
    </div>`;
  }

  // dml begin
  if (line.eventType === 'DML_BEGIN' && line.dmlInfo) {
    return `<div class="log-line${hlClass}${matchClass}" data-idx="${line.idx}" style="background:${bg};border-left-color:${color}">
      ${num}
      <span class="log-timestamp">${esc(line.timestamp)}</span>
      <span class="log-badge${hasPair ? ' clickable-badge' : ''}" style="color:${color};background:${color}18"${pairAttr}>DML</span>
      <span class="log-content"><span style="color:${color}">${esc(line.dmlInfo.op)}</span> <span style="color:var(--text)">${esc(line.dmlInfo.type)}</span> <span style="color:var(--text-dim)">(${line.dmlInfo.rows} rows)</span></span>
    </div>`;
  }

  // limit events
  if (line.category === 'limit') {
    return `<div class="log-line${hlClass}${matchClass}" data-idx="${line.idx}" style="border-left-color:${color}">
      ${num}
      <span class="log-timestamp">${esc(line.timestamp)}</span>
      <span style="color:${color}">${esc(line.eventType)}</span>
    </div>`;
  }

  // default
  const label = EVENT_LABELS[line.eventType] || cat.label;
  return `<div class="log-line${hlClass}${matchClass}" data-idx="${line.idx}" style="color:${color};background:${bg};border-left-color:${color}33">
    ${num}
    <span class="log-timestamp">${esc(line.timestamp || '')}</span>
    <span class="log-badge${hasPair ? ' clickable-badge' : ''}" style="color:${color};background:${color}18"${pairAttr}>${esc(label)}</span>
    <span class="log-content" style="color:var(--text-dim)">${highlight(line.rest, term)}</span>
  </div>`;
}

// -- renders stats cards --
function renderStats() {
  const s = state.stats;
  let html = '';

  const card = (label, value, color, sub) =>
    `<div class="stat-card">
      <div class="stat-value" style="color:${color}">${value}</div>
      <div class="stat-label">${label}</div>
      ${sub ? `<div class="stat-sub">${sub}</div>` : ''}
    </div>`;

  html += card('SOQL Queries', s.soqlCount, 'var(--soql)', `${s.soqlRows} rows`);
  html += card('DML Ops', s.dmlCount, 'var(--dml)', `${s.dmlRows} rows`);
  html += card('Debug Logs', s.debugCount, 'var(--debug)', '');
  if (s.errorCount > 0) html += card('Errors', s.errorCount, 'var(--error)', '');
  if (s.warnCount > 0) html += card('Warnings', s.warnCount, 'var(--warn)', '');
  if (s.execTimeMs) html += card('Exec Time', s.execTimeMs + 'ms', 'var(--unit)', '');

  if (s.metadata) {
    const levels = s.metadata.map(m =>
      `<span style="color:${DEBUG_LEVEL_COLORS[m.level] || '#888'}">${esc(m.name)}:${esc(m.level)}</span>`
    ).join(' <span style="color:var(--text-ghost)">&middot;</span> ');
    html += `<div class="stat-card" style="flex-grow:1;min-width:auto">
      <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Log Levels</div>
      <div style="font-size:11px;font-family:var(--mono);line-height:1.6">${levels}</div>
    </div>`;
  }

  statsBar.innerHTML = html;
}

// -- renders governor limits panel --
function renderLimits() {
  if (!state.limits.length) {
    limitsContent.innerHTML = '<div style="color:var(--text-ghost);font-size:12px;font-family:var(--mono)">No limit data found in log.</div>';
    return;
  }

  let html = '';
  for (const lim of state.limits) {
    const barColor = lim.pct >= 90 ? 'var(--error)' : lim.pct >= 70 ? 'var(--warn)' : lim.pct >= 40 ? 'var(--dml)' : '#3d8c6e';
    const nameClass = lim.pct >= 90 ? 'danger' : lim.pct >= 70 ? 'warn' : '';
    const shortName = lim.name.replace(/^Number of /, '').replace(/^Maximum /, '');

    html += `<div class="limit-row">
      <div class="limit-header">
        <span class="limit-name ${nameClass}">${esc(shortName)}</span>
        <span class="limit-values"><span style="color:${barColor}">${lim.used.toLocaleString()}</span> / ${lim.max.toLocaleString()}</span>
      </div>
      <div class="limit-bar-track">
        <div class="limit-bar-fill" style="width:${Math.min(lim.pct, 100)}%;background:${barColor}"></div>
      </div>
    </div>`;
  }
  limitsContent.innerHTML = html;
}

// -- renders filter chips --
function renderFilters() {
  // remove existing chips (keep search input, count, and first separator)
  const existing = filtersRow.querySelectorAll('.filter-chip, .filter-sep:not(:first-of-type)');
  existing.forEach(el => el.remove());

  for (const cat of FILTER_ORDER) {
    const count = state.categoryCounts[cat];
    if (!count) continue;

    const c = CATEGORIES[cat];
    const active = state.activeFilters.has(cat);
    const chip = document.createElement('button');
    chip.className = 'filter-chip';
    chip.setAttribute('aria-pressed', active);
    chip.style.cssText = active
      ? `background:${c.color}20;border-color:${c.color};color:${c.color}`
      : '';
    chip.innerHTML = `${c.label} <span class="chip-count">${count}</span>`;
    chip.addEventListener('click', () => {
      if (state.activeFilters.has(cat)) state.activeFilters.delete(cat);
      else state.activeFilters.add(cat);
      renderFilters();
      renderLogLines();
    });
    filtersRow.appendChild(chip);
  }

  // add hide system toggle
  const sep = document.createElement('div');
  sep.className = 'filter-sep';
  filtersRow.appendChild(sep);

  const hideChip = document.createElement('button');
  hideChip.className = 'filter-chip';
  hideChip.setAttribute('aria-pressed', state.hideSystem);
  hideChip.style.cssText = state.hideSystem
    ? 'background:rgba(255,68,68,0.09);border-color:var(--error);color:var(--error)'
    : '';
  hideChip.textContent = 'Hide System';
  hideChip.addEventListener('click', () => {
    state.hideSystem = !state.hideSystem;
    renderFilters();
    renderLogLines();
  });
  filtersRow.appendChild(hideChip);
}

// -- renders all log lines with chunked rendering for large logs --
const RENDER_CHUNK = 2000;
let renderedCount = 0;
let currentObserver = null;
let currentFiltered = [];

function updateLineCountBadge(filtered) {
  const total = state.lines.length;
  const shown = filtered.length;
  const badge = $('#line-count');
  if (state.activeFilters.size > 0 || state.hideSystem) {
    badge.textContent = `${shown.toLocaleString()} / ${total.toLocaleString()} lines`;
    badge.style.color = 'var(--warn)';
  } else {
    badge.textContent = `${total.toLocaleString()} lines`;
    badge.style.color = '';
  }
}

function updateSearchCount() {
  const countEl = $('#search-count');
  if (state.searchTerm && state.matchIndices.length > 0) {
    if (state.currentMatchPos >= 0) {
      countEl.textContent = `${state.currentMatchPos + 1} of ${state.matchIndices.length}`;
    } else {
      countEl.textContent = `${state.matchIndices.length} match${state.matchIndices.length !== 1 ? 'es' : ''}`;
    }
    countEl.style.color = 'var(--text-ghost)';
  } else if (state.searchTerm) {
    countEl.textContent = '0 results';
    countEl.style.color = 'var(--error)';
  } else {
    countEl.textContent = '';
  }
}

function appendLoadMoreSentinel(filtered) {
  const remaining = filtered.length - renderedCount;
  const sentinel = document.createElement('div');
  sentinel.id = 'load-more-sentinel';
  sentinel.style.cssText = 'padding:16px;text-align:center;color:var(--text-ghost);font-family:var(--mono);font-size:12px;cursor:pointer;';
  sentinel.textContent = `Showing ${renderedCount.toLocaleString()} of ${filtered.length.toLocaleString()} lines — click or scroll to load ${Math.min(RENDER_CHUNK, remaining).toLocaleString()} more`;

  if (currentObserver) { currentObserver.disconnect(); currentObserver = null; }
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      observer.disconnect();
      loadMoreLines(filtered);
    }
  }, { rootMargin: '200px' });

  sentinel.addEventListener('click', () => {
    observer.disconnect();
    loadMoreLines(filtered);
  });

  logLinesEl.appendChild(sentinel);
  currentObserver = observer;
  observer.observe(sentinel);
}

function loadMoreLines(filtered) {
  const sentinel = $('#load-more-sentinel');
  if (sentinel) sentinel.remove();

  const start = renderedCount;
  const end = Math.min(renderedCount + RENDER_CHUNK, filtered.length);

  const fragment = document.createDocumentFragment();
  const tempDiv = document.createElement('div');
  const chunks = [];
  for (let i = start; i < end; i++) {
    chunks.push(renderLine(filtered[i]));
  }
  tempDiv.innerHTML = chunks.join('');
  while (tempDiv.firstChild) {
    fragment.appendChild(tempDiv.firstChild);
  }
  logLinesEl.appendChild(fragment);

  renderedCount = end;

  if (renderedCount < filtered.length) {
    appendLoadMoreSentinel(filtered);
  }
}

function renderLogLines() {
  if (currentObserver) { currentObserver.disconnect(); currentObserver = null; }
  state.highlightRange = null;
  const filtered = getFilteredLines();
  currentFiltered = filtered;

  // compute search matches
  state.matchIndices = [];
  state.matchSet = new Set();
  state.currentMatchPos = -1;
  if (state.searchTerm) {
    for (let i = 0; i < filtered.length; i++) {
      if (lineMatchesSearch(filtered[i], state.searchTerm)) {
        state.matchIndices.push(i);
        state.matchSet.add(filtered[i].idx);
      }
    }
  }

  updateSearchCount();
  updateLineCountBadge(filtered);

  if (!filtered.length) {
    logLinesEl.innerHTML = '<div class="empty-state">No lines match your current filters.</div>';
    return;
  }

  // render first chunk
  renderedCount = Math.min(RENDER_CHUNK, filtered.length);
  const chunks = [];
  for (let i = 0; i < renderedCount; i++) {
    chunks.push(renderLine(filtered[i]));
  }
  logLinesEl.innerHTML = chunks.join('');

  // add load-more sentinel if there are remaining lines
  if (renderedCount < filtered.length) {
    appendLoadMoreSentinel(filtered);
  }
}

// -- switches to parsed view --
function showParsedView() {
  const raw = logInput.value.trim();
  if (!raw) return;

  parseLog(raw);

  inputView.classList.add('hidden');
  parsedView.classList.add('active');

  // populate header
  $('#line-count').textContent = state.stats.totalLines + ' lines';
  const execEl = $('#exec-time');
  execEl.textContent = state.stats.execTimeMs ? state.stats.execTimeMs + 'ms' : '';

  renderStats();
  renderLimits();
  renderFilters();
  renderLogLines();
  searchInput.focus();
}

// -- resets to input view --
function resetToInput() {
  parsedView.classList.remove('active');
  inputView.classList.remove('hidden');
  logInput.value = '';
  state = {
    lines: [], limits: [], stats: {}, activeFilters: new Set(),
    searchTerm: '', hideSystem: false, showLimits: true, categoryCounts: {},
    pairs: new Map(), highlightRange: null,
    matchIndices: [], currentMatchPos: -1, matchSet: new Set(),
  };
  searchInput.value = '';
  logInput.focus();
}

// -- sample log --
const SAMPLE_LOG = `55.0 APEX_CODE,DEBUG;APEX_PROFILING,INFO;CALLOUT,INFO;DB,INFO;NBA,INFO;SYSTEM,DEBUG;VALIDATION,INFO;VISUALFORCE,INFO;WORKFLOW,INFO
Execute Anonymous: Account[] accts = [SELECT Id, Name, Industry FROM Account WHERE Industry != null LIMIT 10];
Execute Anonymous: for (Account a : accts) {
Execute Anonymous:     System.debug(LoggingLevel.DEBUG, 'Processing account: ' + a.Name + ' | Industry: ' + a.Industry);
Execute Anonymous: }
Execute Anonymous: Contact[] contacts = [SELECT Id, FirstName, LastName, AccountId FROM Contact WHERE AccountId IN :accts LIMIT 50];
Execute Anonymous: System.debug(LoggingLevel.INFO, 'Found ' + contacts.size() + ' contacts for ' + accts.size() + ' accounts');
Execute Anonymous: Map<Id, List<Contact>> acctContacts = new Map<Id, List<Contact>>();
Execute Anonymous: for (Contact c : contacts) {
Execute Anonymous:     if (!acctContacts.containsKey(c.AccountId)) {
Execute Anonymous:         acctContacts.put(c.AccountId, new List<Contact>());
Execute Anonymous:     }
Execute Anonymous:     acctContacts.get(c.AccountId).add(c);
Execute Anonymous: }
Execute Anonymous: for (Account a : accts) {
Execute Anonymous:     List<Contact> relatedContacts = acctContacts.get(a.Id);
Execute Anonymous:     Integer count = relatedContacts != null ? relatedContacts.size() : 0;
Execute Anonymous:     System.debug(LoggingLevel.DEBUG, a.Name + ' has ' + count + ' contacts');
Execute Anonymous: }
Execute Anonymous: System.debug(LoggingLevel.WARN, 'Batch processing complete - review governor limits');
Execute Anonymous: List<Lead> leads = [SELECT Id, Name, Status, Company FROM Lead WHERE Status = 'Open' AND CreatedDate = LAST_N_DAYS:30 LIMIT 200];
Execute Anonymous: System.debug(LoggingLevel.INFO, 'Processing ' + leads.size() + ' recent open leads');
Execute Anonymous: Integer dmlCount = 0;
Execute Anonymous: for (Lead l : leads) {
Execute Anonymous:     if (l.Company == null) {
Execute Anonymous:         l.Company = 'Unknown';
Execute Anonymous:         dmlCount++;
Execute Anonymous:     }
Execute Anonymous: }
Execute Anonymous: if (dmlCount > 0) {
Execute Anonymous:     update leads;
Execute Anonymous:     System.debug(LoggingLevel.INFO, 'Updated ' + dmlCount + ' leads with missing company');
Execute Anonymous: }
Execute Anonymous: try {
Execute Anonymous:     AggregateResult[] results = [SELECT Industry, COUNT(Id) cnt FROM Account GROUP BY Industry];
Execute Anonymous:     for (AggregateResult ar : results) {
Execute Anonymous:         System.debug(LoggingLevel.FINE, 'Industry: ' + ar.get('Industry') + ' Count: ' + ar.get('cnt'));
Execute Anonymous:     }
Execute Anonymous: } catch (Exception e) {
Execute Anonymous:     System.debug(LoggingLevel.ERROR, 'Aggregation failed: ' + e.getMessage());
Execute Anonymous: }
14:23:01.5 (1234567)|EXECUTION_STARTED
14:23:01.5 (1234890)|CODE_UNIT_STARTED|[EXTERNAL]|execute_anonymous_apex
14:23:01.8 (2345678)|SOQL_EXECUTE_BEGIN|[1]|Aggregations:0|SELECT Id, Name, Industry FROM Account WHERE Industry != null LIMIT 10
14:23:01.12 (3456789)|SOQL_EXECUTE_END|[1]|Rows:8
14:23:01.15 (4567890)|USER_DEBUG|[3]|DEBUG|Processing account: Acme Corporation | Industry: Technology
14:23:01.16 (4667890)|USER_DEBUG|[3]|DEBUG|Processing account: Global Media Inc | Industry: Communications
14:23:01.17 (4767890)|USER_DEBUG|[3]|DEBUG|Processing account: Pinnacle Financial | Industry: Finance
14:23:01.18 (4867890)|USER_DEBUG|[3]|DEBUG|Processing account: Summit Healthcare | Industry: Healthcare
14:23:01.19 (4967890)|USER_DEBUG|[3]|DEBUG|Processing account: Atlas Manufacturing | Industry: Manufacturing
14:23:01.20 (5067890)|USER_DEBUG|[3]|DEBUG|Processing account: Meridian Consulting | Industry: Consulting
14:23:01.21 (5167890)|USER_DEBUG|[3]|DEBUG|Processing account: Vertex Energy | Industry: Energy
14:23:01.22 (5267890)|USER_DEBUG|[3]|DEBUG|Processing account: Horizon Retail Group | Industry: Retail
14:23:01.25 (5567890)|SOQL_EXECUTE_BEGIN|[6]|Aggregations:0|SELECT Id, FirstName, LastName, AccountId FROM Contact WHERE AccountId IN :tmpVar1 LIMIT 50
14:23:01.32 (6234567)|SOQL_EXECUTE_END|[6]|Rows:23
14:23:01.33 (6334567)|USER_DEBUG|[7]|INFO|Found 23 contacts for 8 accounts
14:23:01.40 (7034567)|USER_DEBUG|[14]|DEBUG|Acme Corporation has 5 contacts
14:23:01.41 (7134567)|USER_DEBUG|[14]|DEBUG|Global Media Inc has 3 contacts
14:23:01.42 (7234567)|USER_DEBUG|[14]|DEBUG|Pinnacle Financial has 4 contacts
14:23:01.43 (7334567)|USER_DEBUG|[14]|DEBUG|Summit Healthcare has 2 contacts
14:23:01.44 (7434567)|USER_DEBUG|[14]|DEBUG|Atlas Manufacturing has 3 contacts
14:23:01.45 (7534567)|USER_DEBUG|[14]|DEBUG|Meridian Consulting has 1 contacts
14:23:01.46 (7634567)|USER_DEBUG|[14]|DEBUG|Vertex Energy has 3 contacts
14:23:01.47 (7734567)|USER_DEBUG|[14]|DEBUG|Horizon Retail Group has 2 contacts
14:23:01.50 (7834567)|USER_DEBUG|[16]|WARN|Batch processing complete - review governor limits
14:23:01.55 (8234567)|SOQL_EXECUTE_BEGIN|[17]|Aggregations:0|SELECT Id, Name, Status, Company FROM Lead WHERE Status = 'Open' AND CreatedDate = LAST_N_DAYS:30 LIMIT 200
14:23:01.72 (9534567)|SOQL_EXECUTE_END|[17]|Rows:47
14:23:01.73 (9634567)|USER_DEBUG|[18]|INFO|Processing 47 recent open leads
14:23:01.85 (10834567)|DML_BEGIN|[23]|Op:Update|Type:Lead|Rows:12
14:23:01.98 (11934567)|DML_END|[23]
14:23:01.99 (12034567)|USER_DEBUG|[24]|INFO|Updated 12 leads with missing company
14:23:02.05 (12534567)|SOQL_EXECUTE_BEGIN|[27]|Aggregations:1|SELECT Industry, COUNT(Id) cnt FROM Account GROUP BY Industry
14:23:02.15 (13534567)|SOQL_EXECUTE_END|[27]|Rows:6
14:23:02.16 (13634567)|USER_DEBUG|[29]|FINE|Industry: Technology Count: 15
14:23:02.17 (13734567)|USER_DEBUG|[29]|FINE|Industry: Finance Count: 8
14:23:02.18 (13834567)|USER_DEBUG|[29]|FINE|Industry: Healthcare Count: 12
14:23:02.19 (13934567)|USER_DEBUG|[29]|FINE|Industry: Communications Count: 5
14:23:02.20 (14034567)|USER_DEBUG|[29]|FINE|Industry: Manufacturing Count: 9
14:23:02.21 (14134567)|USER_DEBUG|[29]|FINE|Industry: Energy Count: 7
14:23:02.25 (14534567)|CUMULATIVE_LIMIT_USAGE
14:23:02.25 (14534567)|LIMIT_USAGE_FOR_NS|(default)|
  Number of SOQL queries: 4 out of 100
  Number of query rows: 84 out of 50000
  Number of SOSL queries: 0 out of 20
  Number of DML statements: 1 out of 150
  Number of DML rows: 12 out of 10000
  Maximum CPU time: 89 out of 10000
  Maximum heap size: 14230 out of 6000000
  Number of callouts: 0 out of 100
  Number of Email Invocations: 0 out of 10
  Number of future calls: 0 out of 50
  Number of queueable jobs added to the queue: 0 out of 50
  Number of Mobile Apex push calls: 0 out of 10
14:23:02.25 (14534567)|CUMULATIVE_LIMIT_USAGE_END
14:23:02.30 (15034567)|CODE_UNIT_FINISHED|execute_anonymous_apex
14:23:02.30 (15034567)|EXECUTION_FINISHED`;

// -- search match navigation --
function ensureRenderedUpTo(targetPos) {
  while (renderedCount <= targetPos && renderedCount < currentFiltered.length) {
    loadMoreLines(currentFiltered);
  }
}

function applyCurrentMatchToDOM() {
  const old = logLinesEl.querySelector('.search-match-current');
  if (old) old.classList.remove('search-match-current');
  if (state.currentMatchPos < 0 || state.currentMatchPos >= state.matchIndices.length) return;

  const filteredPos = state.matchIndices[state.currentMatchPos];
  const lineIdx = currentFiltered[filteredPos].idx;
  const el = logLinesEl.querySelector(`.log-line[data-idx="${lineIdx}"]`);
  if (el) el.classList.add('search-match-current');
}

function navigateToMatch(pos) {
  if (state.matchIndices.length === 0) return;
  if (pos >= state.matchIndices.length) pos = 0;
  if (pos < 0) pos = state.matchIndices.length - 1;

  state.currentMatchPos = pos;
  updateSearchCount();

  const filteredPos = state.matchIndices[pos];
  ensureRenderedUpTo(filteredPos);
  applyCurrentMatchToDOM();

  const lineIdx = currentFiltered[filteredPos].idx;
  const el = logLinesEl.querySelector(`.log-line[data-idx="${lineIdx}"]`);
  if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
}

// -- apply/remove scope highlights on existing DOM without re-render --
function applyHighlightsToDOM() {
  const lines = logLinesEl.querySelectorAll('.log-line');
  const range = state.highlightRange;
  for (const el of lines) {
    const idx = +el.dataset.idx;
    if (range && idx >= range.start && idx <= range.end) {
      el.classList.add('scope-hl');
      if (idx === range.start || idx === range.end) el.classList.add('scope-hl-cap');
      else el.classList.remove('scope-hl-cap');
    } else {
      el.classList.remove('scope-hl', 'scope-hl-cap');
    }
  }
}

// -- badge click handler for scope highlighting --
logLinesEl.addEventListener('click', (e) => {
  const badge = e.target.closest('[data-pair]');
  if (!badge) return;
  const lineEl = badge.closest('.log-line');
  if (!lineEl) return;
  const idx = +lineEl.dataset.idx;
  const pairIdx = state.pairs.get(idx);
  if (pairIdx == null) return;

  const [start, end] = idx < pairIdx ? [idx, pairIdx] : [pairIdx, idx];
  const startLine = state.lines[start];
  if (!startLine) return;
  const entryCat = CATEGORIES[startLine.category] || CATEGORIES.unknown;

  // Toggle: if same range already highlighted, clear it
  if (state.highlightRange && state.highlightRange.start === start && state.highlightRange.end === end) {
    state.highlightRange = null;
  } else {
    state.highlightRange = { start, end, color: entryCat.color };
  }

  applyHighlightsToDOM();
});

// -- event listeners --

// auto-parse on paste when content is substantial
logInput.addEventListener('paste', () => {
  setTimeout(() => {
    if (logInput.value.trim().length > 500) showParsedView();
  }, 0);
});

// parse button
$('#btn-parse').addEventListener('click', () => {
  if (logInput.value.trim().length > 0) showParsedView();
});

// browse file button
const fileInput = $('#file-input');
$('#btn-browse').addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => { logInput.value = ev.target.result; showParsedView(); };
    reader.readAsText(file);
  }
});

// sample button
$('#btn-sample').addEventListener('click', () => {
  logInput.value = SAMPLE_LOG;
  showParsedView();
});

// clear button
$('#btn-clear').addEventListener('click', resetToInput);

// limits toggle
$('#btn-limits').addEventListener('click', () => {
  state.showLimits = !state.showLimits;
  limitsPanel.classList.toggle('hidden', !state.showLimits);
  const btn = $('#btn-limits');
  btn.classList.toggle('active', state.showLimits);
  btn.setAttribute('aria-expanded', state.showLimits);
});

// search
let searchTimeout;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    state.searchTerm = searchInput.value;
    renderLogLines();
    if (state.matchIndices.length > 0) {
      navigateToMatch(0);
    }
  }, 150);
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (e.shiftKey) {
      navigateToMatch(state.currentMatchPos - 1);
    } else {
      navigateToMatch(state.currentMatchPos + 1);
    }
  }
});

$('#search-prev').addEventListener('click', () => navigateToMatch(state.currentMatchPos - 1));
$('#search-next').addEventListener('click', () => navigateToMatch(state.currentMatchPos + 1));

// drag and drop
dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragging'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragging'));
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragging');
  const file = e.dataTransfer.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => { logInput.value = ev.target.result; showParsedView(); };
    reader.readAsText(file);
  }
});

// copy filtered results
$('#btn-copy').addEventListener('click', () => {
  const filtered = getFilteredLines();
  const text = filtered.map(l => l.raw).join('\n');
  navigator.clipboard.writeText(text).then(() => {
    const btn = $('#btn-copy');
    btn.textContent = 'Copied!';
    btn.style.color = 'var(--accent)';
    btn.style.borderColor = 'var(--accent)';
    setTimeout(() => { btn.textContent = 'Copy'; btn.style.color = ''; btn.style.borderColor = ''; }, 1500);
  });
});

// scroll to top
const scrollBtn = $('#btn-scroll-top');
window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('visible', window.scrollY > 400 && parsedView.classList.contains('active'));
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && parsedView.classList.contains('active')) resetToInput();
  if ((e.ctrlKey || e.metaKey) && e.key === 'f' && parsedView.classList.contains('active')) {
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
  }
});

// register service worker for offline support
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js', { scope: '/apex-log-parser/' });
}
