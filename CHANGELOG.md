# Changelog

## Unreleased
- reorganized the app into workspace views for generation, results, PRNG explanation, external testing, and demos
- added a professional PRNG Guide tab explaining RGE256Safe state, ARX mixing, counter behavior, controls, diagnostics, and claims boundaries
- added an External Testing tab with PractRand, dieharder, and TestU01 Crush/BigCrush workflows
- added a validation results ledger for recording external battery summaries after tests complete
- added `scripts/rge256-stream.mjs` for raw 32-bit stream export outside the browser
- added `tools/testu01-rge256.c` as a TestU01 harness
- added `docs/statistical-testing.md` with command examples and a reporting template

## v1.1.1 - 2026-04-12
- refreshed the public README so the demo is easier to understand and approach
- added release-note and ecosystem-role documents
- clarified how the full demo differs from the lite demo and from the package repos
- no application logic changes in this pass

## v1.1.0 - 2026-01-09
- current public demo release prior to this documentation refresh
