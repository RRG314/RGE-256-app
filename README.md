# RGE256 Demo

[![GitHub Release](https://img.shields.io/github/v/release/RRG314/RGE-256-app)](https://github.com/RRG314/RGE-256-app/releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](./LICENSE)

RGE256 Demo is the full browser-based workbench for the RGE256 pseudorandom number generator family. It is designed for people who want to generate deterministic streams, understand the active PRNG, run quick browser-side diagnostics, and prepare external statistical testing without setting up the Python package first.

## Current Release

**Current repository release:** `v1.1.1`

This release focuses on clarity, organization, and external validation workflow. The app is organized into Generate, Results, PRNG Guide, External Testing, and Demos views.

## Live Demo

- Full demo: [https://rrg314.github.io/RGE-256-app/](https://rrg314.github.io/RGE-256-app/)
- Lite demo: [https://rrg314.github.io/RGE-256-Lite/](https://rrg314.github.io/RGE-256-Lite/)

GitHub Pages paths are case-sensitive. Use `/RGE-256-app/` for this browser app; `/rge256/` is the package repository name and will not serve this demo.

## What This App Does

The full demo brings together several practical browser-side views of the generator:
- seedable deterministic number generation
- generated values come from the app's `RGE256Safe` ARX/counter PRNG implementation
- the "Random Seed" button uses browser entropy only to choose a new starting seed
- basic statistical summaries and visual checks
- a dedicated PRNG Guide explaining state, seeding, ARX mixing, counter use, controls, and claims boundaries
- an External Testing tab with PractRand, dieharder, and TestU01 directions
- a validation results ledger for adding external battery outcomes after logs are complete
- interactive demonstrations of common random-process behavior
- exports for reports and quick sharing
- offline-capable installation through the bundled PWA setup

## When To Use This Repo

Use this repository if you want:
- a browser demo instead of a Python package
- an approachable way to inspect the generator before integrating it elsewhere
- a teaching or presentation tool for showing how the generator behaves
- a portable local app that can be opened or hosted statically

If you want package integration instead, use one of these repos:
- [rge256](https://github.com/RRG314/rge256) for the standalone multi-variant suite
- [numpyrge256](https://github.com/RRG314/numpyrge256) for NumPy workflows
- [torchrge256](https://github.com/RRG314/torchrge256) for PyTorch workflows

## Quick Start

### Use Online
1. Open the live demo.
2. Set a seed and generate a sequence.
3. Inspect the visualizations or run one of the built-in demonstrations.
4. Export results if you want to keep a record.

### Run Locally
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000/index.html`.

### External Test Streams
```bash
npm run stream:help
node scripts/rge256-stream.mjs --seed 3405691 --count 1000000 --format raw > rge256-u32le.bin
```

See [docs/statistical-testing.md](docs/statistical-testing.md) for PractRand, dieharder, and TestU01 Crush/BigCrush instructions.

## Validation Context

This app is a front-end environment. It should be read as a usability and demonstration layer built on top of the underlying RGE256 work. The active browser generator is the `RGE256Safe` implementation inside `index.html`: a 256-bit ARX state with fixed rotations and a 64-bit counter mixed into each output. The seed, domain, and zeta controls are folded into state initialization so the same settings reproduce the same stream.

It is not a full cryptographic evaluation environment, and its built-in tests are best understood as educational and research-facing diagnostics.

## Repository Map

- `index.html` - single-file demo application
- `404.html` - GitHub Pages fallback that redirects mistyped app subpaths back to the live demo
- `service-worker.js` and `manifest.json` - installable PWA support
- `scripts/rge256-stream.mjs` - raw RGE256Safe stream generator for external batteries
- `tools/testu01-rge256.c` - TestU01 SmallCrush/Crush/BigCrush harness
- `docs/statistical-testing.md` - external testing guide and reporting template
- `README_RGE256_demo.md` - extended older guide retained for reference
- `docs/releases/` - release notes for the public repo surface

## Related Repositories

- [Recursive Geometric Entropy research program](https://github.com/RRG314/Recursive-Geometric-Entropy-research)
- [rge256](https://github.com/RRG314/rge256)
- [numpyrge256](https://github.com/RRG314/numpyrge256)
- [torchrge256](https://github.com/RRG314/torchrge256)
- [RGE-256-Lite](https://github.com/RRG314/RGE-256-Lite)
