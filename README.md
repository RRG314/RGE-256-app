# RGE256 Demo

[![GitHub Release](https://img.shields.io/github/v/release/RRG314/RGE-256-app)](https://github.com/RRG314/RGE-256-app/releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](./LICENSE)

RGE256 Demo is the full browser-based front end for the RGE256 pseudorandom number generator family. It is designed for people who want to inspect the generator visually, run quick quality checks, explore simple Monte Carlo examples, and export results without setting up a Python environment.

## Current Release

**Current repository release:** `v1.1.1`

This release focuses on clarity and repository presentation. The application itself remains the same; the goal is to make the repo easier to understand and easier to place within the larger RGE ecosystem.

## Live Demo

- Full demo: [https://rrg314.github.io/RGE-256-app/](https://rrg314.github.io/RGE-256-app/)
- Lite demo: [https://rrg314.github.io/RGE-256-Lite/](https://rrg314.github.io/RGE-256-Lite/)

## What This App Does

The full demo brings together several practical browser-side views of the generator:
- seedable deterministic number generation
- basic statistical summaries and visual checks
- interactive demonstrations of common random-process behavior
- Monte Carlo examples for teaching and exploration
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

## Validation Context

This app is a front-end environment. It should be read as a usability and demonstration layer built on top of the underlying RGE256 work. It is not a full cryptographic evaluation environment, and its built-in tests are best understood as educational and research-facing diagnostics.

## Repository Map

- `index.html` - single-file demo application
- `service-worker.js` and `manifest.json` - installable PWA support
- `README_RGE256_demo.md` - extended older guide retained for reference
- `docs/releases/` - release notes for the public repo surface

## Related Repositories

- [Recursive Geometric Entropy research program](https://github.com/RRG314/Recursive-Geometric-Entropy-research)
- [rge256](https://github.com/RRG314/rge256)
- [numpyrge256](https://github.com/RRG314/numpyrge256)
- [torchrge256](https://github.com/RRG314/torchrge256)
- [RGE-256-Lite](https://github.com/RRG314/RGE-256-Lite)
