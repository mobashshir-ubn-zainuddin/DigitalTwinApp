# Room Digital Twin

> Interactive 3D desktop simulation of a room environment — real-time physics, live parameter editing, indoor/outdoor views.

[![Build & Release](https://github.com/YOUR_USERNAME/DigitalTwinApp/actions/workflows/build-release.yml/badge.svg)](https://github.com/YOUR_USERNAME/DigitalTwinApp/actions/workflows/build-release.yml)
[![Latest Release](https://img.shields.io/github/v/release/YOUR_USERNAME/DigitalTwinApp?label=latest%20release&color=blue)](https://github.com/YOUR_USERNAME/DigitalTwinApp/releases/latest)
[![Downloads](https://img.shields.io/github/downloads/YOUR_USERNAME/DigitalTwinApp/total?color=green)](https://github.com/YOUR_USERNAME/DigitalTwinApp/releases)

---

## Download

### Latest Version

| File | Description |
|------|-------------|
| [**Room Digital Twin — Installer**](https://github.com/YOUR_USERNAME/DigitalTwinApp/releases/latest/download/Room-Digital-Twin-Setup-x64.exe) | Installs to Program Files, adds a desktop shortcut |
| [**Room Digital Twin — Portable**](https://github.com/YOUR_USERNAME/DigitalTwinApp/releases/latest/download/Room-Digital-Twin-Portable.exe) | No installation needed — download and run directly |

### All Releases

Browse every release, changelogs, and older EXEs on the **[Releases page →](https://github.com/YOUR_USERNAME/DigitalTwinApp/releases)**

> **First run on Windows:** because the EXE is unsigned, Windows SmartScreen may show *"Windows protected your PC"*.  
> Click **More info → Run anyway** to proceed. This is expected for open-source apps without a paid code-signing certificate.

---

## Features

- **3D Room Simulation** — Three.js scene with workstations, monitors, sofa, AC unit, exhaust fan, ceiling LEDs and occupant avatars
- **Indoor View** — first-person perspective inside the room; orbit freely with mouse drag
- **Outdoor View** — exterior camera that auto-rotates around the building; walls fade as the camera angle changes
- **Real-time Physics Engine**
  - Temperature (heat from people, PCs, LEDs; AC cooling; wall heat transfer)
  - Humidity (generation by occupants, AC dehumidification, external infiltration)
  - CO₂ (per-person generation, fan ventilation, infiltration)
  - O₂ (derived from CO₂ level)
  - Luminosity (LED wattage + solar through sunroof tint)
- **Live Parameter Editing** — change any slider while the simulation runs; effects are immediate
- **Fan Auto-Mode** — RPM automatically rises when CO₂ > 1000 ppm and falls when < 600 ppm
- **AC Hysteresis Control** — AC cycles on/off based on setpoint ± 0.2 °C deadband
- **Sparkline Telemetry** — 5 live mini-charts (temperature, humidity, CO₂, O₂, luminosity)
- **Simulation Speed** — 1× to 1000× time acceleration
- **Reset** — restores all telemetry to initial conditions

### Controllable Parameters

| Group | Parameters |
|-------|-----------|
| Outdoor | External temp, humidity, wall permeability (U-value), sun intensity, infiltration ACH |
| Room | AC setpoint, AC capacity, sunroof tint |
| Lighting | LED wattage (×2 fixtures) |
| Computers | PC power rating, CPU+GPU usage % |
| Exhaust Fan | RPM manual control, Auto mode toggle |
| Occupancy | People count (0–8), simulation speed |

---

## Keyboard Shortcuts (Desktop App)

| Key | Action |
|-----|--------|
| `F11` | Toggle full screen |
| `F12` | Open DevTools (for debugging/extending) |
| `Ctrl+R` | Reload simulation |
| `Ctrl + =` / `Ctrl + -` | Zoom in / out |
| `Ctrl + 0` | Reset zoom |

---

## Releasing a New Version

```bash
# Bump the version in package.json, commit, then tag
git add package.json
git commit -m "chore: bump version to v1.1.0"
git tag v1.1.0
git push origin main --tags
```

GitHub Actions automatically:
1. Runs on `windows-latest`
2. Installs dependencies (`npm ci`)
3. Builds the installer EXE and the portable EXE via `electron-builder`
4. Creates a **GitHub Release** named `Room Digital Twin v1.1.0`
5. Attaches both EXEs to the release for direct download

Track the build live: **[Actions →](https://github.com/YOUR_USERNAME/DigitalTwinApp/actions)**

---

## Run Locally (Development)

```bash
# Prerequisites: Node.js 18+ installed

git clone https://github.com/YOUR_USERNAME/DigitalTwinApp.git
cd DigitalTwinApp
npm install
npm start          # opens the app window; F12 for DevTools
```

Build the EXE locally (outputs to `dist/`):

```bash
npm run build:win
```

---

## Project Structure

```
DigitalTwinApp/
├── main.js                        # Electron main process (window, menu, zoom)
├── room_digital_twin.html         # Full simulation — Three.js, physics, UI
├── package.json                   # App metadata + electron-builder config
└── .github/
    └── workflows/
        └── build-release.yml      # CI/CD: build EXE → GitHub Release on tag push
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop shell | [Electron](https://www.electronjs.org/) v28 |
| 3D rendering | [Three.js](https://threejs.org/) r128 |
| UI styling | [Tailwind CSS](https://tailwindcss.com/) (CDN) |
| Icons | [Font Awesome](https://fontawesome.com/) 6 (CDN) |
| Build/packaging | [electron-builder](https://www.electron.build/) |
| CI/CD | GitHub Actions |

---

## Extending the App

The simulation logic lives entirely in `room_digital_twin.html` inside a single `<script>` block.
Key extension points:

- **`updatePhysics(dt)`** — add new sensor calculations here
- **`update3DVisuals()`** — drive any new 3D mesh from simulation state
- **`state` object** — add new parameters; bind them with `bindSlider()` or custom listeners
- **`historyData` buffers + `drawSparkline()`** — add new telemetry chart tracks

> This app is designed to be extended — the cold storage digital twin integration planned next will follow the same patterns.
