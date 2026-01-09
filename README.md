# RGE256 Demo

A comprehensive demonstration and testing platform for the RGE256 pseudorandom number generator. This single-file application provides statistical analysis, visualization tools, interactive demonstrations, and Monte Carlo simulations.

**Disclaimer:** This software is provided for educational and research purposes only. It is not intended for cryptographic applications, security systems, financial decisions, or gambling applications. Use at your own risk. No warranties or guarantees are provided.

---

## Overview

RGE256 is an ARX-based (Add-Rotate-XOR) pseudorandom number generator utilizing 256-bit internal state. This demo application uses the RGE256-Safe variant, which includes a 64-bit counter for guaranteed cycle-free operation and eliminates the possibility of bad seeds.

### Key Features

- Full RGE256 implementation with 64-bit counter protection
- Six statistical quality tests with visual interpretation
- Four visualization modes for distribution analysis
- Four interactive demonstrations of PRNG applications
- Four Monte Carlo simulation experiments
- Five export formats including professional PDF reports
- Progressive Web App support for offline use and installation
- Complete session persistence and configuration management

---

## Technical Specifications

### Algorithm Details

| Property | Value |
|----------|-------|
| Architecture | ARX (Add-Rotate-XOR) |
| State Size | 256 bits (8 × 32-bit words) + 64-bit counter |
| Output | 32-bit unsigned integers |
| Default Rounds | 3 |
| Rotation Constants | 7, 9, 13, 18 |
| Minimum Period | 2^64 (guaranteed) |

### Configurable Parameters

**Seed Value**
- Range: 0 to 9,007,199,254,740,991 (2^53 - 1)
- Identical seeds produce identical sequences

**Mixing Rounds**
- Default: 3 rounds (optimized for speed with excellent quality)
- Configurable for specific use cases

**Domain Separation**
- Optional string parameter for independent random streams
- Enables multiple independent sequences from single seed

### Output Ranges

- **8-bit:** 0 to 255
- **16-bit:** 0 to 65,535
- **32-bit:** 0 to 4,294,967,295
- **Custom:** User-defined minimum and maximum values

---

## Validation Results

The underlying algorithm has been validated using industry-standard test suites.

### Quick Statistics

| Metric | Value |
|--------|-------|
| Entropy | ~17.60 bits (near-maximum for 32-bit) |
| Chi-square | ~312 (excellent uniformity) |
| Serial Correlation | 0.00138 (negligible) |
| Bit Frequency | 0.49978 (near-perfect 50%) |

### Dieharder Test Suite (114 Tests)

| Result | Count |
|--------|-------|
| Passed | 112 |
| Weak | 2 |
| Failed | 0 |

### SmokeRand Test Suite (42 Tests)

| Metric | Value |
|--------|-------|
| Tests Passed | 42/42 |
| Quality Rating | 4.00/4.00 (maximum) |
| Data Volume | ~145 GB |

---

## Statistical Analysis

### Implemented Tests

- **Basic Statistics** — Count, mean, standard deviation, min/max
- **Shannon Entropy** — Information-theoretic randomness measure
- **Chi-Square Test** — Distribution uniformity verification
- **Kolmogorov-Smirnov Test** — Advanced uniformity testing
- **Runs Test** — Sequential pattern detection
- **Gap Test** — Independence verification
- **Poker Test** — Pattern analysis

### Interpretation

All tests include visual color coding:
- **Green:** Values within acceptable ranges
- **Yellow:** Marginal values requiring attention
- **Red:** Values outside acceptable thresholds

---

## Visualization Tools

### Distribution Histogram
50-bin histogram with color-coded frequency bars showing deviation from expected uniform distribution.

### Scatter Plot
Sequential visualization of generated values for visual pattern detection.

### Bit Pattern Analysis
32-bit balance verification showing percentage of set bits at each position.

### Bit Transition Heatmap
Sequential correlation testing showing frequency of bit transitions between consecutive numbers.

---

## Interactive Demonstrations

### 🎲 Dice Roller
Roll 1-6 standard six-sided dice with history tracking and average calculation.

### 🪙 Coin Flipper
Flip 1 to 10,000 coins with cumulative statistics and convergence visualization.

### 🃏 Card Drawer
Draw from a 52-card deck using Fisher-Yates shuffle with poker hand analysis.

### 🎰 Lottery Generator
Generate numbers for various lottery formats (6/49, Powerball, Mega Millions, etc.).

---

## Monte Carlo Simulations

### Pi Estimation
Estimate π using random point generation within a unit square.

### Random Walk
Two-dimensional random walk simulation with path visualization.

### Distribution Sampler
Generate samples from uniform, normal, exponential, and triangular distributions.

### Expected Value Experiments
Empirical validation of probability theory demonstrating the Law of Large Numbers.

---

## Export Formats

| Format | Description |
|--------|-------------|
| TXT | One number per line, universal compatibility |
| CSV | Two columns (Index, Value) for spreadsheet analysis |
| JSON | Complete metadata with configuration and statistics |
| PDF | Professional report with visualizations |
| Config | Lightweight settings file for reproducibility |

---

## Installation and Usage

### Web Browser (Recommended)
1. Download index.html
2. Open in any modern web browser
3. No installation or dependencies required

### Progressive Web App

**Desktop (Chrome/Edge):**
Click the install icon in the address bar.

**Android:**
Tap "Add to Home Screen" when prompted.

**iOS:**
Use Safari's Share → "Add to Home Screen".

### Local Server (Optional)
```bash
python -m http.server 8000
# Navigate to http://localhost:8000/index.html
```

---

## System Requirements

### Minimum
- Modern web browser with JavaScript enabled
- HTML5 Canvas support
- 2 GB RAM

### Recommended
- Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+
- 4 GB RAM
- Desktop or laptop for optimal visualization

---

## Use Cases

### ✅ Appropriate Applications

- Research and algorithm validation
- Monte Carlo simulations
- Game development and procedural generation
- Education and probability demonstrations
- Testing and benchmarking

### ❌ Inappropriate Applications

- Cryptographic key/password generation
- Financial trading or risk calculations
- Gambling or lottery systems
- Medical or safety-critical systems

For security-critical applications, use cryptographically secure generators like `crypto.getRandomValues()`.

---

## Reproducibility

Given identical parameters, RGE256 produces identical sequences:
- Same seed → Same sequence
- Same configuration → Same results

**For research:** Export and archive configuration files, record seed values, and include citation.

---

## Academic Citation

```
Reid, S. (2025). RGE256: An ARX-Based Pseudorandom Number Generator.
```

```bibtex
@misc{reid2025rge256,
  author = {Reid, Steven},
  title = {RGE256: An ARX-Based Pseudorandom Number Generator},
  year = {2025},
  howpublished = {Interactive demonstration},
  note = {ORCID: 0009-0003-9132-3410}
}
```

### Related Work
- Recursive Division Tree entropy analysis (DOI: 10.5281/zenodo.17682287)

---

## Known Limitations

- Statistical tests are basic validation tools, not comprehensive NIST suites
- Large generation requests (>100,000) may cause brief UI freeze
- JavaScript integer precision limited to 53 bits
- Session storage limited by browser localStorage quota (~5-10 MB)

---

## Version History

### Version 3.0 (Current)
- Updated to use RGE256-Safe algorithm with 64-bit counter
- Guaranteed minimum period of 2^64
- All seeds are valid (no bad seeds)
- Passed Dieharder (112/114) and SmokeRand (42/42, Quality 4.0)

### Version 2.0
- Added Monte Carlo simulation suite
- Implemented configuration export/import
- Added PWA support and dark mode
- Enhanced help system

### Version 1.0
- Initial release with core generator
- Basic statistical testing and visualization
- Interactive demonstrations
- Export functionality

---

## Acknowledgments

- ARX architecture inspired by ChaCha20 and Salsa20
- 64-bit counter technique inspired by PCG family
- Fisher-Yates shuffle for card demonstrations
- Box-Muller transform for normal distribution

---

## File Information

| Property | Value |
|----------|-------|
| Filename | index.html |
| Type | Single-page HTML application |
| Size | ~160 KB |
| Dependencies | None (self-contained) |

---

**Author:** Steven Reid (ORCID: 0009-0003-9132-3410)  
**Last Updated:** January 2025
