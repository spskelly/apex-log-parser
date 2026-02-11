# Apex Debug Log Parser

A browser-based Progressive Web App for parsing Salesforce Apex debug logs into structured, filterable, color-coded views with governor limit tracking.

**No download required — [use it in your browser &rarr;](https://spskelly.github.io/apex-log-parser/)**

---

## Why This Exists

Salesforce debug logs are dense walls of text. Finding the SOQL that returned too many rows, spotting a governor limit creeping toward its cap, or tracing execution flow through triggers and classes means a lot of scrolling and squinting. This tool turns raw logs into something you can actually read — color-coded by event type, filterable, searchable, with governor limits visualized at a glance.

## Install as an App

Apex Debug Log Parser is a Progressive Web App. Visit the site once and you can install it to your device for fully offline use — no server, no login, no data ever leaves your browser.

| Platform | How to Install |
|---|---|
| **Chrome / Edge** | Click the install icon in the address bar |
| **Safari (iOS)** | Tap **Share** &rarr; **Add to Home Screen** |
| **Android** | Tap the browser menu &rarr; **Install app** |

Once installed, the app works completely offline. All assets (including fonts) are pre-cached by the service worker.

## Features

### Log Parsing

- **Automatic detection** — paste a log and parsing begins once enough content is detected (500+ characters)
- **Line-by-line parsing** — each log line is classified by event type and mapped to a category
- **Log metadata extraction** — debug level settings (e.g. `APEX_CODE,DEBUG`) are parsed from the header and displayed
- **Execution time calculation** — total execution time is computed from the first and last nanosecond timestamps

### Visualization

- **Color-coded categories** — 12 distinct categories, each with its own color:

  | Category | Color | Event Types |
  |---|---|---|
  | SOQL | Yellow | `SOQL_EXECUTE_BEGIN`, `SOQL_EXECUTE_END`, `SOQL_EXECUTE_EXPLAIN` |
  | DML | Orange | `DML_BEGIN`, `DML_END` |
  | Debug | Teal | `USER_DEBUG`, `SYSTEM_DEBUG` |
  | Code Unit | Blue | `CODE_UNIT_STARTED/FINISHED`, `METHOD_ENTRY/EXIT`, `CONSTRUCTOR_ENTRY/EXIT`, `TRIGGER_STARTED/FINISHED` |
  | Error | Red | `FATAL_ERROR`, `EXCEPTION_THROWN`, `VALIDATION_ERROR`, `VALIDATION_FAIL` |
  | Validation | Purple | `VALIDATION_RULE`, `VALIDATION_FORMULA`, `VALIDATION_PASS` |
  | Workflow | Green | `WF_RULE_EVAL_*`, `WF_CRITERIA_*`, `WF_FIELD_UPDATE`, `WF_ACTION` |
  | Flow | Cyan | `FLOW_START_INTERVIEW_*`, `FLOW_ELEMENT_*`, `FLOW_VALUE_ASSIGNMENT`, and more |
  | Callout | Gold | `CALLOUT_REQUEST/RESPONSE`, `NAMED_CREDENTIAL_*` |
  | Limit | Pink | `LIMIT_USAGE_FOR_NS`, `CUMULATIVE_LIMIT_USAGE` |
  | System | Gray | `HEAP_ALLOCATE`, `STATEMENT_EXECUTE`, `VARIABLE_ASSIGNMENT`, `SYSTEM_METHOD_*`, and more |
  | Header | Purple | Log metadata and anonymous execution lines |

- **Debug level badges** — `USER_DEBUG` lines display their log level (`ERROR`, `WARN`, `INFO`, `DEBUG`, `FINE`, `FINER`, `FINEST`), each with a distinct color
- **Entry/exit pair linking** — click a badge on any begin/entry event to highlight the matching end/exit event, with the entire scope range highlighted in between
- **Line numbers** — original log line numbers are preserved for cross-referencing with the raw log

### Filtering & Search

- **Category filter chips** — toggle any combination of event categories on or off; chips display the count of events in each category
- **Full-text search** — search across all log content with highlighted matches and a live match count
- **Hide System events** — one-click toggle to suppress noisy system-level events (`HEAP_ALLOCATE`, `STATEMENT_EXECUTE`, `VARIABLE_ASSIGNMENT`, etc.)
- **Combined filters** — category filters, search, and the system toggle all compose together

### Governor Limits

- **Automatic extraction** — governor limit blocks (`LIMIT_USAGE_FOR_NS` ... `CUMULATIVE_LIMIT_USAGE_END`) are parsed into structured data
- **Progress bar visualization** — each limit is shown with a color-coded progress bar:
  - Green: &lt; 40% usage
  - Orange: 40–70% usage
  - Yellow: 70–90% usage
  - Red: &ge; 90% usage
- **Tracked limits include:** SOQL queries, query rows, SOSL queries, DML statements, DML rows, CPU time, heap size, callouts, email invocations, future calls, queueable jobs, and more
- **Collapsible panel** — toggle the Limits panel on/off from the toolbar

### Statistics Dashboard

- **SOQL Queries** — count and total rows returned
- **DML Operations** — count and total rows affected
- **Debug Logs** — total `USER_DEBUG` count
- **Errors & Warnings** — counts displayed when present
- **Execution Time** — total time in milliseconds
- **Log Levels** — the debug level configuration from the log header

### Input Methods

- **Paste** — paste log text directly into the textarea (auto-parses when > 500 characters)
- **Drag & drop** — drop a `.log`, `.txt`, or `.debug` file onto the input area
- **File browser** — click **Browse File** to open a file picker
- **Sample log** — click **Load Sample** to try the app with a built-in example log demonstrating SOQL, DML, debug output, governor limits, and more

### Performance

- **Chunked rendering** — large logs are rendered in chunks of 2,000 lines with an IntersectionObserver that lazy-loads more as you scroll
- **Debounced search** — search input is debounced at 150ms to keep the UI responsive

### Other

- **Copy filtered results** — copies the currently visible (filtered) log lines to the clipboard as raw text
- **Scroll to top** — floating button appears after scrolling down
- **Keyboard shortcuts** — `Ctrl+F` / `Cmd+F` focuses the search bar; `Escape` returns to the input view
- **Responsive layout** — the limits panel hides on mobile; the stats bar and header adapt to smaller screens

## Usage

1. Open the app in your browser (or the installed PWA)
2. Paste a Salesforce debug log, drag & drop a `.log` file, click **Browse File**, or click **Load Sample**
3. The parsed view appears automatically
4. Use the **filter chips** to isolate specific event categories (e.g. only SOQL + DML)
5. Use the **search bar** to find specific text across all log lines
6. Toggle **Hide System** to reduce noise from heap allocations, variable assignments, and system method calls
7. Click any **entry/exit badge** (e.g. `UNIT▸`) to highlight the matching scope range
8. Check the **Governor Limits** panel on the right to spot usage hotspots
9. Click **Copy** to copy the current filtered view to clipboard
10. Press **Escape** or click **Clear** to return to the input view

## Privacy

Everything runs client-side. Your logs are **never** uploaded, transmitted, or stored anywhere outside your browser. The service worker caches only the app's own assets for offline use.

## Tech Stack

| | |
|---|---|
| **Language** | Vanilla HTML, CSS, and JavaScript — no frameworks, no build tools |
| **Architecture** | Single-file application (`index.html`) with a separate service worker (`sw.js`) |
| **Fonts** | IBM Plex Mono and IBM Plex Sans (Google Fonts, pre-cached for offline use) |
| **PWA** | Web app manifest + service worker with cache-first strategy and offline fallback |

### Project Structure

```
apex-log-parser/
├── index.html       # Entire application (markup, styles, and ~900 lines of JS)
├── sw.js            # Service worker — pre-caches all assets including fonts
├── manifest.json    # PWA manifest
├── icon-192.png     # App icon (192×192)
├── icon-512.png     # App icon (512×512)
└── README.md
```

## License

MIT
