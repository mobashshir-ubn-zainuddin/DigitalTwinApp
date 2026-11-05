# Room Digital Twin

> Interactive 3D desktop simulation of a room environment â€” real-time physics, live parameter editing, indoor/outdoor views.

[![Build & Release](https://github.com/mobashshir-ubn-zainuddin/DigitalTwinApp/actions/workflows/build-release.yml/badge.svg)](https://github.com/mobashshir-ubn-zainuddin/DigitalTwinApp/actions/workflows/build-release.yml)
[![Latest Release](https://img.shields.io/github/v/release/mobashshir-ubn-zainuddin/DigitalTwinApp?label=latest%20release&color=blue)](https://github.com/mobashshir-ubn-zainuddin/DigitalTwinApp/releases/latest)
[![Downloads](https://img.shields.io/github/downloads/mobashshir-ubn-zainuddin/DigitalTwinApp/total?color=green)](https://github.com/mobashshir-ubn-zainuddin/DigitalTwinApp/releases)

---

## Download

### Latest Version

| File | Description |
|------|-------------|
| [**Room Digital Twin â€” Installer**](https://github.com/mobashshir-ubn-zainuddin/DigitalTwinApp/releases/latest/download/Room-Digital-Twin-Setup-x64.exe) | Installs to Program Files, adds a desktop shortcut |
| [**Room Digital Twin â€” Portable**](https://github.com/mobashshir-ubn-zainuddin/DigitalTwinApp/releases/latest/download/Room-Digital-Twin-Portable.exe) | No installation needed â€” download and run directly |

### All Releases

Browse every release, changelogs, and older EXEs on the **[Releases page â†’](https://github.com/mobashshir-ubn-zainuddin/DigitalTwinApp/releases)**

> **First run on Windows:** because the EXE is unsigned, Windows SmartScreen may show *"Windows protected your PC"*.  
> Click **More info â†’ Run anyway** to proceed. This is expected for open-source apps without a paid code-signing certificate.

---

## Features

- **3D Room Simulation** â€” Three.js scene with workstations, monitors, sofa, AC unit, exhaust fan, ceiling LEDs and occupant avatars
- **Indoor View** â€” first-person perspective inside the room; orbit freely with mouse drag
- **Outdoor View** â€” exterior camera that auto-rotates around the building; walls fade as the camera angle changes
- **Real-time Physics Engine**
  - Temperature (heat from people, PCs, LEDs; AC cooling; wall heat transfer)
  - Humidity (generation by occupants, AC dehumidification, external infiltration)
  - COâ‚‚ (per-person generation, fan ventilation, infiltration)
  - Oâ‚‚ (derived from COâ‚‚ level)
  - Luminosity (LED wattage + solar through sunroof tint)
- **Live Parameter Editing** â€” change any slider while the simulation runs; effects are immediate
- **Fan Auto-Mode** â€” RPM automatically rises when COâ‚‚ > 1000 ppm and falls when < 600 ppm
- **AC Hysteresis Control** â€” AC cycles on/off based on setpoint Â± 0.2 Â°C deadband
- **Sparkline Telemetry** â€” 5 live mini-charts (temperature, humidity, COâ‚‚, Oâ‚‚, luminosity)
- **Simulation Speed** â€” 1Ã— to 1000Ã— time acceleration
- **Reset** â€” restores all telemetry to initial conditions

### Controllable Parameters

| Group | Parameters |
|-------|-----------|
| Outdoor | External temp, humidity, wall permeability (U-value), sun intensity, infiltration ACH |
| Room | AC setpoint, AC capacity, sunroof tint |
| Lighting | LED wattage (Ã—2 fixtures) |
| Computers | PC power rating, CPU+GPU usage % |
| Exhaust Fan | RPM manual control, Auto mode toggle |
| Occupancy | People count (0â€“8), simulation speed |

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

Track the build live: **[Actions â†’](https://github.com/mobashshir-ubn-zainuddin/DigitalTwinApp/actions)**

---

## Run Locally (Development)

```bash
# Prerequisites: Node.js 18+ installed

git clone https://github.com/mobashshir-ubn-zainuddin/DigitalTwinApp.git
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
â”œâ”€â”€ main.js                        # Electron main process (window, menu, zoom)
â”œâ”€â”€ room_digital_twin.html         # Full simulation â€” Three.js, physics, UI
â”œâ”€â”€ package.json                   # App metadata + electron-builder config
â””â”€â”€ .github/
    â””â”€â”€ workflows/
        â””â”€â”€ build-release.yml      # CI/CD: build EXE â†’ GitHub Release on tag push
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

- **`updatePhysics(dt)`** â€” add new sensor calculations here
- **`update3DVisuals()`** â€” drive any new 3D mesh from simulation state
- **`state` object** â€” add new parameters; bind them with `bindSlider()` or custom listeners
- **`historyData` buffers + `drawSparkline()`** â€” add new telemetry chart tracks

> This app is designed to be extended â€” the cold storage digital twin integration planned next will follow the same patterns.
