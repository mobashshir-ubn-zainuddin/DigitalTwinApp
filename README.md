# Room Digital Twin

Interactive 3D desktop simulation of a room environment -- real-time physics, live parameter editing, indoor/outdoor views.

[![Build and Release](https://github.com/mobashshir-ubn-zainuddin/DigitalTwinApp/actions/workflows/build-release.yml/badge.svg)](https://github.com/mobashshir-ubn-zainuddin/DigitalTwinApp/actions/workflows/build-release.yml)

---

## Download

### Latest Version

| File | Description | Download |
|------|-------------|----------|
| Installer (recommended) | Installs to Program Files, adds desktop shortcut, includes uninstaller | [**Room-Digital-Twin-Setup-x64.exe**](https://github.com/mobashshir-ubn-zainuddin/DigitalTwinApp/releases/latest/download/Room-Digital-Twin-Setup-x64.exe) |
| Portable | No installation needed -- download and double-click to run | [**Room-Digital-Twin-Portable.exe**](https://github.com/mobashshir-ubn-zainuddin/DigitalTwinApp/releases/latest/download/Room-Digital-Twin-Portable.exe) |

### All Releases

Browse every release, changelogs, and older EXEs: **[Releases page](https://github.com/mobashshir-ubn-zainuddin/DigitalTwinApp/releases)**

> **Windows SmartScreen notice:** because the EXE is unsigned, Windows may show *"Windows protected your PC"* on first run.
> Click **More info** then **Run anyway** to proceed.

---

## Features

- **3D Room Simulation** -- Three.js scene with workstations, monitors, sofa, AC unit, exhaust fan, ceiling LEDs and occupant avatars
- **Indoor View** -- first-person perspective inside the room; orbit freely with mouse drag
- **Outdoor View** -- exterior camera that auto-rotates around the building; walls fade as the camera angle changes
- **Real-time Physics Engine**
  - Temperature (heat from people, PCs, LEDs; AC cooling; wall heat transfer from outside)
  - Humidity (generation by occupants, AC dehumidification, external infiltration)
  - CO2 (per-person generation, fan ventilation, infiltration ACH)
  - O2 (derived from CO2 level)
  - Luminosity (LED wattage + solar intensity through sunroof tint)
- **Live Parameter Editing** -- change any slider while the simulation runs; effects are immediate
- **Fan Auto-Mode** -- RPM automatically rises when CO2 > 1000 ppm and falls when < 600 ppm
- **AC Hysteresis Control** -- AC cycles on/off based on setpoint +/- 0.2 C deadband
- **Sparkline Telemetry** -- 5 live mini-charts (temperature, humidity, CO2, O2, luminosity)
- **Simulation Speed** -- 1x to 1000x time acceleration

### Controllable Parameters

| Group | Parameters |
|-------|-----------|
| Outdoor | External temp, humidity, wall permeability (U-value), sun intensity, infiltration ACH |
| Room | AC setpoint, AC capacity, sunroof tint |
| Lighting | LED wattage (x2 fixtures) |
| Computers | PC power rating, CPU+GPU usage % |
| Exhaust Fan | RPM manual control, Auto mode toggle |
| Occupancy | People count (0-8), simulation speed |

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| F11 | Toggle full screen |
| Ctrl+R | Reload simulation |
| Ctrl+= / Ctrl+- | Zoom in / out |
| Ctrl+0 | Reset zoom |

---

## Releasing a New Version

```bash
git add package.json
git commit -m "chore: bump version to v1.1.0"
git tag v1.1.0
git push origin main --tags
```

GitHub Actions will build both EXEs and create a release automatically.
Track live builds: **[Actions](https://github.com/mobashshir-ubn-zainuddin/DigitalTwinApp/actions)**

---

## Run Locally

```bash
git clone https://github.com/mobashshir-ubn-zainuddin/DigitalTwinApp.git
cd DigitalTwinApp
npm install
npm start
```

---

## Project Structure

```
DigitalTwinApp/
+-- main.js                        # Electron main process
+-- room_digital_twin.html         # Full simulation -- Three.js, physics engine, UI
+-- package.json                   # App metadata + electron-builder config
+-- .github/workflows/
    +-- build-release.yml          # CI/CD: build EXE -> GitHub Release on tag push
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop shell | Electron v28 |
| 3D rendering | Three.js r128 |
| UI styling | Tailwind CSS (CDN) |
| Icons | Font Awesome 6 (CDN) |
| Build/packaging | electron-builder |
| CI/CD | GitHub Actions |