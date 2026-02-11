# Apex Debug Log Parser

A browser-based tool for parsing Salesforce Apex debug logs into structured, filterable, color-coded views with governor limit tracking.

**No download required — [use it in your browser &rarr;](https://spskelly.github.io/apex-log-parser/)**

## Install as an App

Apex Debug Log Parser is a Progressive Web App. After visiting the site once you can install it to your device and use it completely offline — no server, no login, no data leaves your browser.

- **Chrome / Edge:** click the install icon in the address bar
- **Safari (iOS):** tap Share &rarr; Add to Home Screen
- **Android:** tap the browser menu &rarr; Install app

## Features

- **Color-coded events** — SOQL, DML, debug statements, errors, and warnings each get distinct colors
- **Multi-category filtering** — toggle event types on/off with filter chips
- **Full-text search** with highlighted matches
- **Governor limit tracking** — progress bars for heap size, SOQL queries, DML rows, CPU time, and more
- **Statistics dashboard** — query counts, row counts, DML operations, execution time
- **Batch processing metrics**
- **Dim system events** to reduce noise
- **Drag & drop** `.log` files or paste log text directly
- **Sample log** included for quick testing

## Usage

1. Open the app in your browser
2. Paste a Salesforce debug log, drag & drop a `.log` file, or click **Load Sample Log**
3. The parsed view appears automatically once enough content is detected
4. Use the filter chips and search bar to drill into specific events
5. Check the **Governor Limits** panel to spot usage hotspots

## Privacy

Everything runs client-side. Your logs are never uploaded or stored anywhere.

## Tech Stack

Vanilla HTML, CSS, and JavaScript — no frameworks, no build tools. The entire application lives in a single `index.html` file.

## License

MIT
