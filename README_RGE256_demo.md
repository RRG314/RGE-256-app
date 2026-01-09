# RGE256 Demo

A comprehensive demonstration and testing platform for the RGE256 pseudorandom number generator. This single-file application provides statistical analysis, visualization tools, interactive demonstrations, and Monte Carlo simulations.

**Disclaimer:** This software is provided for educational and research purposes only. It is not intended for cryptographic applications, security systems, financial decisions, or gambling applications. Use at your own risk. No warranties or guarantees are provided.

---

## Overview

RGE256 is an ARX-based (Add-Rotate-XOR) pseudorandom number generator utilizing 256-bit internal state with a 64-bit counter for guaranteed cycle-free operation. The demo app uses the "Safe" variant which eliminates the possibility of bad seeds and guarantees a minimum period of 2^64.

### Key Features

- Full RGE256 implementation with 64-bit counter protection
- No bad seeds - counter guarantees proper state evolution
- Guaranteed minimum period of 2^64 - no premature cycles
- Six statistical quality tests with visual interpretation
- Four visualization modes for distribution analysis
- Four interactive demonstrations of PRNG applications
- Four Monte Carlo simulation experiments
- Five export formats including professional PDF reports
- Progressive Web App support for offline use and installation
- Complete session persistence and configuration management
- Validated by Dieharder and SmokeRand test suites

---

## Technical Specifications

### Algorithm Details

| Property | Value |
|----------|-------|
| Architecture | ARX (Add-Rotate-XOR) with 64-bit counter |
| State Size | 256 bits (8 × 32-bit words) + 64-bit counter |
| Output | 32-bit unsigned integers |
| Mixing Rounds | Configurable (3 rounds default) |
| Rotation Constants | 7, 9, 13, 18 (optimized for mixing) |
| Period | Guaranteed minimum 2^64 |

### Configurable Parameters

**Seed Value**
- Range: 0 to 9,007,199,254,740,991 (2^53 - 1)
- Purpose: Initialization value for deterministic sequences
- Note: Identical seeds produce identical sequences

**Mixing Rounds**
- 3 rounds: Optimized for speed with excellent quality (default)
- Configurable for specific use cases
- Fixed rotation constants per round: 7, 9, 13, 18

**Counter-Based Protection**
- 64-bit monotonic counter incremented on each call
- Counter value mixed into final output via XOR and rotation
- Eliminates possibility of short cycles
- No seed validation required

**Domain Separation**
- Optional string parameter for independent random streams
- Enables multiple independent sequences from single seed
- Use case: Parallel simulations requiring uncorrelated outputs

### Output Ranges

| Range | Values |
|-------|--------|
| 8-bit | 0 to 255 |
| 16-bit | 0 to 65,535 |
| 32-bit | 0 to 4,294,967,295 |
| Custom | User-defined min/max |

---

## Validation Results

RGE256 has undergone extensive validation using industry-standard test suites with streaming input mode.

### Quick Statistics

| Metric | Value |
|--------|-------|
| Entropy | ~17.60 bits (near-maximum for 32-bit) |
| Chi-square | ~312 (excellent uniformity) |
| Serial Correlation | 0.00138 (negligible) |
| Bit Frequency | 0.49978 (near-perfect 50%) |
| Cycle Detection | None observed |

### Dieharder Test Suite (114 Tests)

| Test Category | Tests | Passed | Weak | Failed |
|--------------|-------|--------|------|--------|
| Diehard Core | 17 | 17 | 0 | 0 |
| STS Serial | 32 | 31 | 1 | 0 |
| RGB Bitdist | 12 | 11 | 1 | 0 |
| RGB Lagged Sum | 33 | 33 | 0 | 0 |
| DAB Tests | 6 | 6 | 0 | 0 |
| **Total** | **114** | **112** | **2** | **0** |

Results: 112/114 tests passed (98.2%), 2 weak results, 0 failures.

### SmokeRand Test Suite (42 Tests)

| Metric | Value |
|--------|-------|
| Express Suite | 7/7 passed |
| Default Suite | 42/42 passed |
| Quality Rating | 4.00/4.00 (maximum) |
| Data Volume | ~145 GB |

### Summary

- Zero failures on 156 combined tests
- Maximum quality rating on SmokeRand
- Suitable for Monte Carlo simulations, game development, procedural generation, and other non-cryptographic applications

---

## Statistical Analysis

### Implemented Tests

**Basic Statistics**
- Count, mean, standard deviation
- Minimum and maximum values
- Distribution moments

**Shannon Entropy**
- Information-theoretic randomness measure
- Normalized to percentage of theoretical maximum
- Quality thresholds: Excellent (98-100%), Acceptable (95-98%), Poor (<95%)

**Chi-Square Test**
- Distribution uniformity verification
- Compares observed vs expected frequencies
- Interpretation based on deviation from expected value

**Kolmogorov-Smirnov Test**
- Advanced uniformity testing
- Measures maximum deviation from uniform distribution
- Pass/fail based on critical value (1.36/√n)

**Quick Statistical Tests**
- Runs Test: Sequential pattern detection
- Gap Test: Independence verification between values
- Poker Test: Simplified pattern analysis

### Interpretation Guidelines

All tests include visual color coding:
- **Green:** Values within acceptable ranges
- **Yellow:** Marginal values requiring attention
- **Red:** Values outside acceptable thresholds

---

## Visualization Tools

### Distribution Histogram
50-bin histogram with color-coded frequency bars:
- Green: Within 20% of expected frequency
- Yellow: 20-40% deviation from expected
- Red: Greater than 40% deviation
- Reference line showing expected uniform distribution

### Scatter Plot
Sequential visualization of generated values:
- X-axis: Generation order
- Y-axis: Value magnitude
- Purpose: Visual pattern detection and clustering analysis

### Bit Pattern Analysis
32-bit balance verification chart:
- Displays percentage of set bits at each position
- Green: Within 2% of 50%
- Yellow: 2-5% deviation from 50%
- Red: Greater than 5% deviation

### Bit Transition Heatmap
Sequential correlation testing visualization:
- Maps frequency of bit transitions between consecutive numbers
- Uniform color distribution indicates low correlation
- Clustering or patterns suggest sequential bias

---

## Interactive Demonstrations

### 🎲 Dice Roller
Simulates rolling 1-6 standard six-sided dice:
- Displays individual results and sum
- Maintains rolling history with average calculation
- Demonstrates discrete uniform distribution

### 🪙 Coin Flipper
Binary outcome simulation:
- Configurable flip count (1 to 10,000)
- Cumulative heads/tails tracking
- Visual progress bar for distribution ratio
- Statistical convergence to 50/50 with large samples

### 🃏 Card Drawer
Standard 52-card deck implementation:
- Fisher-Yates shuffle algorithm
- Supports drawing 1 to 52 cards
- Poker hand analysis for 5-card draws
- Demonstrates complex permutation generation

### 🎰 Lottery Number Generator
Configurable lottery format simulation:
- Multiple format support (6/49, 5/69, Powerball, Mega Millions)
- Generates unique numbers without replacement
- Sorted output display
- Batch generation capability

---

## Monte Carlo Simulations

### Pi Estimation
Geometric probability method for estimating π:
- Random point generation within unit square
- Inside/outside circle classification
- Formula: π ≈ 4 × (points inside circle / total points)
- Visual scatter plot with circle overlay
- Configurable sample size: 1,000 to 100,000 points

### Random Walk
Two-dimensional random walk simulation:
- Equal probability for four cardinal directions
- Configurable step count: 100 to 10,000
- Complete path visualization with auto-scaling
- Start position (green) and end position (red) markers

### Distribution Sampler
Probability distribution generation:
- Uniform distribution (flat)
- Normal distribution (Box-Muller transform)
- Exponential distribution (inverse transform)
- Triangular distribution
- Real-time histogram with 50 bins

### Expected Value Experiments
Empirical validation of probability theory:
- Coin flip experiment: E[X] = $0
- Dice roll experiment: E[X] = 3.5
- Gambler's ruin: Starting capital $50, $1 bets
- Demonstrates Law of Large Numbers

---

## Export Capabilities

| Format | Description |
|--------|-------------|
| **TXT** | One number per line, universal compatibility |
| **CSV** | Two columns (Index, Value), spreadsheet compatible |
| **JSON** | Complete metadata with configuration and statistics |
| **PDF** | Professional report with visualizations |
| **Config** | Lightweight settings file for reproducibility |

---

## Session Management

### Save Session
- Complete generator configuration
- All generated numbers
- Game history and statistics
- Survives browser restart

### Load Session
- Restores all configuration parameters
- Reloads generated number array
- Reconstructs all statistics
- Updates visualization

### Configuration Export/Import
- Excludes generated data
- Small file size (under 1 KB)
- Enables exact reproducibility

---

## User Interface Features

### Dark Mode
- Light and dark themes with persistence
- Smooth transition animations
- All visualizations adapt to selected theme

### Help System
- Algorithm overview and use cases
- Statistical test explanations
- Visualization interpretation guides
- Best practices and recommendations

### Progressive Web App
- Installable on all platforms
- Offline functionality via service worker
- Home screen/desktop icon
- Standalone window mode

### Responsive Design
- Mobile phones (portrait and landscape)
- Tablets, laptops, desktop monitors
- Touch-friendly controls

---

## Use Cases

### ✅ Appropriate Applications

- **Research:** Algorithm validation, statistical quality assessment, academic projects
- **Monte Carlo:** Numerical integration, probability simulations, statistical modeling
- **Games:** Procedural generation, dice mechanics, shuffle algorithms
- **Education:** Probability demonstrations, algorithm studies, computational mathematics
- **Testing:** Stress testing, performance profiling, distribution analysis

### ❌ Inappropriate Applications

- **Security:** Cryptographic keys, passwords, session tokens, authentication
- **Financial:** Trading algorithms, risk calculations, pricing models
- **Gambling:** Casino gaming, lottery systems, sports betting
- **High-Stakes:** Medical devices, safety-critical systems, mission-critical applications

For security-critical applications, use:
- Web: `crypto.getRandomValues()`
- Linux/Unix: `/dev/urandom`
- Windows: `CryptGenRandom()`

---

## Installation and Usage

### Web Browser (Recommended)
1. Download index.html
2. Open in any modern web browser
3. No installation or dependencies required

### Progressive Web App

**Desktop (Chrome/Edge):**
1. Look for install icon in address bar
2. Click install button
3. Application launches in standalone window

**Android:**
1. Open in Chrome browser
2. Tap "Add to Home Screen" when prompted

**iOS:**
1. Open in Safari browser
2. Tap Share → "Add to Home Screen"

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
- 100 MB storage for PWA

### Recommended
- Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+
- 4 GB RAM
- Desktop for optimal visualization

### Browser Compatibility
| Browser | Support |
|---------|---------|
| Chrome/Chromium | Full |
| Firefox | Full |
| Safari (iOS 14.5+) | Full |
| Edge | Full |
| Opera | Full |
| Internet Explorer | Not supported |

---

## Performance

| Metric | Value |
|--------|-------|
| Generation Speed | 1-10 million numbers/second |
| 100K numbers | ~10-100 milliseconds |
| App Size | ~160 KB |
| 100K numbers memory | ~400 KB additional |

---

## Reproducibility

Given identical parameters, RGE256 produces identical sequences:
- Same seed → Same sequence
- Same configuration → Same results

### For Research
1. Export configuration file
2. Share with collaborators
3. Import in their environment
4. Generate with identical parameters
5. Verify matching output

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
- Large requests (>100,000) may cause brief UI freeze
- JavaScript integer precision limited to 53 bits
- Session storage limited by localStorage quota (~5-10 MB)
- Mobile devices have reduced performance

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Numbers not generating | Click "Initialize Generator", verify JavaScript enabled |
| Export not working | Ensure file opened locally, try local web server |
| PWA install unavailable | Requires HTTPS or localhost |
| Session save/load failure | Check localStorage enabled and quota |
| Visualization incorrect | Verify HTML5 Canvas support, try different browser |
| Poor performance | Reduce sample size, close other tabs, use desktop |

---

## License and Warranty

This software is provided "as-is" without warranties or guarantees. The author assumes no liability for damages arising from use.

Users are responsible for:
- Determining suitability for their use case
- Validating outputs for their application
- Ensuring appropriate use within their jurisdiction

Provided for educational and research purposes. Commercial use requires explicit permission.

---

## Version History

### Version 3.0 (Current)
- Updated to use RGE256-Safe algorithm with 64-bit counter protection
- Guaranteed minimum period of 2^64 - eliminates all bad seeds
- Simplified ARX core with fixed rotation constants (7, 9, 13, 18)
- Passed Dieharder (112/114) and SmokeRand (42/42, Quality 4.0)
- No seed validation required - all seeds are safe
- Maintained backward compatibility (next32, nextFloat, nextRange)

### Version 2.0
- Added Monte Carlo simulation suite (4 experiments)
- Configuration export/import functionality
- Enhanced reset functionality
- PWA support and dark mode
- Comprehensive help system

### Version 1.0
- Initial release with core generator
- Basic statistical testing suite
- Visualization components
- Interactive game demonstrations
- Export functionality

---

## Acknowledgments

- 64-bit counter technique inspired by PCG family of generators
- ARX architecture inspired by ChaCha20 and Salsa20
- Fisher-Yates shuffle for card demonstrations
- Box-Muller transform for normal distribution sampling

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
