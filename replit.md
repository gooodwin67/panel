# Yandex Games Three.js Boilerplate

## Overview
A Three.js game boilerplate designed for Yandex Games platform. Uses Vite as the build tool with WASM support for Rapier3D physics engine.

## Project Architecture
- **Build System**: Vite 7 with plugins for WASM, top-level await, and legacy browser support
- **3D Engine**: Three.js with Rapier3D physics
- **Animation**: GSAP and Tween.js
- **Structure**:
  - `src/` - Source code
    - `src/main/` - Main game initialization (scene, panels, preview, GUI, drag handling)
    - `src/game/` - Game logic (world, params)
    - `src/assets/` - Asset management
    - `src/utils/` - Utility functions and events
  - `public/` - Static assets (models, fonts, textures)
  - `dist/` - Production build output

## Setup
- Node.js 20, npm for package management
- `npm run dev` starts Vite dev server on port 5000 (0.0.0.0)
- `npm run build` creates production build in `dist/`

## Recent Changes
- 2026-02-09: Configured Vite for Replit (host 0.0.0.0, port 5000, allowedHosts)
