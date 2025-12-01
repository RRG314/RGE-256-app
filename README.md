# RGE-256 Random Number Generator - Interactive Demonstration

A comprehensive demonstration and testing platform for the RGE-256 pseudorandom number generator. This single-file application provides statistical analysis, visualization tools, interactive demonstrations, and Monte Carlo simulations for evaluating and utilizing the RGE-256 algorithm.

**Disclaimer:** This software is provided for educational and research purposes only. It is not intended for cryptographic applications, security systems, financial decisions, or gambling applications. Use at your own risk. No warranties or guarantees are provided.

---

## Overview

RGE-256 is an ARX-based (Add-Rotate-XOR) pseudorandom number generator utilizing 256-bit internal state and geometric rotation constants derived from Recursive Division Tree (RDT) entropy analysis. This demonstration platform enables comprehensive testing and validation of the algorithm across various applications.

### Key Features

- Full implementation of RGE-256 with configurable parameters
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

- **Architecture:** ARX (Add-Rotate-XOR) operations
- **State Size:** 256 bits (8 words of 32 bits)
- **Output:** 32-bit unsigned integers
- **Mixing Rounds:** Configurable (3, 4, or 5 rounds)
- **Rotation Constants:** Derived from geometric entropy analysis

### Configurable Parameters

**Seed Value**
- Range: 0 to 9,007,199,254,740,991 (2^53 - 1)
- Purpose: Initialization value for deterministic sequences
- Note: Identical seeds produce identical sequences

**Mixing Rounds**
- 3 rounds: Optimized for speed with good quality (default)
- 4 rounds: Enhanced mixing for improved distribution
- 5 rounds: Maximum quality with reduced throughput

**Zeta Constants**
Rotation constants derived from RDT entropy measurements:
- ζ₁ = 1.585 (triangle-based entropy)
- ζ₂ = 1.926 (Menger sponge-inspired entropy)
- ζ₃ = 1.262 (tetrahedral entropy)

**Domain Separation**
- Optional string parameter for independent random streams
- Enables multiple independent sequences from single seed
- Use case: Parallel simulations requiring uncorrelated outputs

### Output Ranges

- **8-bit:** 0 to 255
- **16-bit:** 0 to 65,535
- **32-bit:** 0 to 4,294,967,295
- **Custom:** User-defined minimum and maximum values

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

All tests include visual color coding and textual interpretation:
- Green indicators: Values within acceptable ranges
- Yellow indicators: Marginal values requiring attention
- Red indicators: Values outside acceptable thresholds

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

### Dice Roller
Simulates rolling 1-6 standard six-sided dice:
- Displays individual results and sum
- Maintains rolling history with average calculation
- Demonstrates discrete uniform distribution

### Coin Flipper
Binary outcome simulation:
- Configurable flip count (1 to 10,000)
- Cumulative heads/tails tracking
- Visual progress bar for distribution ratio
- Statistical convergence to 50/50 with large samples

### Card Drawer
Standard 52-card deck implementation:
- Fisher-Yates shuffle algorithm using RGE-256
- Supports drawing 1 to 52 cards
- Poker hand analysis for 5-card draws
- Demonstrates complex permutation generation

### Lottery Number Generator
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
- Displays estimate, error, and error percentage

### Random Walk
Two-dimensional random walk simulation:
- Equal probability for four cardinal directions
- Configurable step count: 100 to 10,000
- Complete path visualization with auto-scaling
- Start position (green) and end position (red) markers
- Displays final coordinates and distance from origin

### Distribution Sampler
Probability distribution generation:
- Uniform distribution (flat)
- Normal distribution (Box-Muller transform)
- Exponential distribution (inverse transform)
- Triangular distribution
- Real-time histogram with 50 bins
- Statistical summary (mean, standard deviation, range)

### Expected Value Experiments
Empirical validation of probability theory:
- Coin flip experiment: E[X] = $0
- Dice roll experiment: E[X] = 3.5
- Gambler's ruin: Starting capital $50, $1 bets
- Convergence plot showing running average
- Expected value reference line
- Demonstrates Law of Large Numbers

---

## Export Capabilities

### Plain Text (TXT)
- One number per line
- Minimal formatting
- Universal compatibility
- Suitable for import into any analysis tool

### Comma-Separated Values (CSV)
- Two columns: Index and Value
- Header row included
- Compatible with Excel, Google Sheets, R, Python
- Optimal for spreadsheet analysis

### JavaScript Object Notation (JSON)
- Complete metadata package
- Generator configuration settings
- Basic statistical summary
- Full number array
- Timestamp and version information
- Suitable for programmatic processing

### Portable Document Format (PDF)
Professional report generation:
- Configuration summary table
- Complete statistical analysis with interpretations
- Embedded distribution visualization
- Quality assessment narrative
- Citation information and ORCID
- Publication-ready formatting
- Print-optimized CSS

### Configuration File
Lightweight JSON format containing:
- All generator parameters
- Seed, rounds, rotation constants
- Domain separation string
- Output range settings
- Timestamp and version
- Enables exact reproducibility
- Shareable across systems

---

## Session Management

### Save Session
Persistent storage in browser localStorage:
- Complete generator configuration
- All generated numbers
- Game history and statistics
- Total generation count
- Timestamp for session identification
- Survives browser restart

### Load Session
Complete state restoration:
- Restores all configuration parameters
- Reloads generated number array
- Reconstructs all statistics
- Updates visualization
- Reinitializes generator with saved state

### Configuration Export/Import
Settings-only portability:
- Excludes generated data
- Small file size (typically under 1 KB)
- Shareable via email or repository
- Enables methodology documentation
- Perfect for reproducible research

---

## User Interface Features

### Dark Mode
Full theme switching with persistence:
- Light theme: High contrast for bright environments
- Dark theme: Reduced eye strain for extended use
- Preference saved in localStorage
- Smooth transition animations
- All visualizations adapt to selected theme

### Help System
Comprehensive built-in documentation:
- Algorithm overview and use cases
- Statistical test explanations with thresholds
- Visualization interpretation guides
- Configuration parameter descriptions
- Best practices and recommendations
- Export format specifications
- Complete citation information

### Progressive Web App
Full PWA implementation:
- Installable on all platforms (Android, iOS, Windows, macOS, Linux)
- Offline functionality via service worker
- Home screen/desktop icon
- Standalone window mode
- Automatic update detection
- Cache-first loading strategy

### Responsive Design
Optimized for all screen sizes:
- Mobile phones (portrait and landscape)
- Tablets
- Laptops
- Desktop monitors
- Fluid grid layouts
- Touch-friendly controls

---

## Use Cases

### Appropriate Applications

**Research and Development**
- Algorithm validation and testing
- Statistical quality assessment
- Comparison with other PRNGs
- Academic research projects

**Monte Carlo Methods**
- Numerical integration
- Probability simulations
- Statistical modeling
- Risk assessment (non-financial)

**Game Development**
- Procedural generation
- Dice mechanics and loot tables
- Shuffle algorithms
- Non-critical randomization

**Education**
- Probability and statistics demonstrations
- Algorithm implementation studies
- Random number generator theory
- Computational mathematics

**Testing and Benchmarking**
- Algorithm stress testing
- Performance profiling
- Distribution analysis
- Edge case exploration

### Inappropriate Applications

**Security-Critical Systems**
- Cryptographic key generation
- Password generation
- Session token creation
- Authentication systems
- Any encryption/decryption operations

**Financial Applications**
- Trading algorithms
- Risk calculations
- Monte Carlo pricing models
- Portfolio optimization

**Gambling Systems**
- Casino gaming
- Lottery systems
- Sports betting
- Any wagering applications

**High-Stakes Decisions**
- Medical device randomization
- Safety-critical systems
- Mission-critical applications

For security-critical applications, use cryptographically secure random number generators:
- Web: crypto.getRandomValues()
- Linux/Unix: /dev/urandom
- Windows: CryptGenRandom()
- Dedicated hardware RNGs

---

## Installation and Usage

### Web Browser (Recommended)
1. Download rge256_demo.html
2. Open file in any modern web browser
3. No installation or dependencies required
4. Full functionality available immediately

### Progressive Web App
**Desktop Installation (Chrome/Edge):**
1. Open demo in Chrome or Edge browser
2. Look for install icon in address bar
3. Click install button
4. Application launches in standalone window

**Android Installation:**
1. Open demo in Chrome browser
2. Tap "Add to Home Screen" when prompted
3. Icon appears on home screen
4. Opens in full-screen mode

**iOS Installation:**
1. Open demo in Safari browser
2. Tap Share button
3. Select "Add to Home Screen"
4. Icon appears on home screen

### Local Server (Optional)
For development or testing purposes:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server -p 8000

# Then navigate to:
# http://localhost:8000/rge256_demo.html
```

---

## System Requirements

### Minimum Requirements
- Modern web browser with JavaScript enabled
- HTML5 Canvas support
- 2 GB RAM
- 100 MB available storage for PWA installation

### Recommended Requirements
- Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+
- 4 GB RAM
- Desktop or laptop for optimal visualization experience

### Browser Compatibility
- Chrome/Chromium: Full support
- Firefox: Full support
- Safari: Full support (iOS 14.5+)
- Edge: Full support
- Opera: Full support
- Internet Explorer: Not supported

---

## Performance Characteristics

### Generation Speed
- Typical throughput: 1-10 million numbers per second
- Varies by hardware and browser JavaScript engine
- 100,000 number generation: approximately 10-100 milliseconds

### Memory Usage
- Application footprint: approximately 155 KB
- Additional per session: varies with generated numbers
- 100,000 numbers: approximately 400 KB additional memory

### Visualization Performance
- Real-time histogram updates for up to 100,000 points
- Canvas rendering optimized with sampling for large datasets
- Monte Carlo simulations with up to 100,000 iterations

---

## Reproducibility

### Deterministic Behavior
Given identical parameters, RGE-256 produces identical sequences:
- Same seed → Same sequence
- Same configuration → Same results
- Same number of calls → Same values

### Reproducibility Protocol
1. Export configuration file
2. Share configuration with collaborators
3. Import configuration in their environment
4. Generate with identical parameters
5. Verify matching output

### Documentation Best Practices
For research and publication:
- Record seed value
- Document all parameter settings
- Export and archive configuration file
- Include RGE-256 citation
- Note software version if available

---

## Academic Citation

If you use RGE-256 in research or publications, please cite:

```
Reid, S. (2025). RGE-256: A New ARX-Based Pseudorandom Number Generator
With Structured Entropy and Empirical Validation.
```

BibTeX format:
```bibtex
@misc{reid2025rge256,
  author = {Reid, Steven},
  title = {RGE-256: A New ARX-Based Pseudorandom Number Generator
           With Structured Entropy and Empirical Validation},
  year = {2025},
  howpublished = {Interactive demonstration},
  note = {ORCID: 0009-0003-9132-3410}
}
```

### Related Publications
- Recursive Division Tree entropy analysis
- DOI: 10.5281/zenodo.17682287

### Author Information
- Steven Reid
- ORCID: 0009-0003-9132-3410

---

## Known Limitations

### Statistical Testing
- Tests provided are basic validation tools
- Not comprehensive NIST or Dieharder test suites
- Suitable for initial quality assessment
- Professional validation requires dedicated test suites

### Performance Constraints
- Browser JavaScript limitations apply
- Large generation requests (>100,000) may cause brief UI freeze
- Mobile devices have reduced performance
- Canvas rendering limited by device capabilities

### Numerical Precision
- JavaScript uses 64-bit floating point (IEEE 754)
- Integer precision limited to 53 bits
- May affect very large seed values
- Statistical calculations subject to floating point errors

### Browser Storage
- Session save limited by localStorage quota (typically 5-10 MB)
- Large sessions may fail to save
- Private/incognito mode may block storage
- Storage quota varies by browser

---

## Troubleshooting

### Common Issues and Solutions

**Issue: Numbers not generating**
- Solution: Click "Initialize Generator" button
- Verify JavaScript is enabled in browser
- Check browser console for error messages

**Issue: Export buttons not responding**
- Solution: Ensure file opened locally, not in preview mode
- Some browsers restrict downloads from file:// URLs
- Try using local web server

**Issue: PWA installation not available**
- Solution: PWA requires HTTPS or localhost
- Use supported browser (Chrome, Edge, Safari)
- Check if already installed

**Issue: Session save/load failure**
- Solution: Verify localStorage is enabled
- Check available storage quota
- Disable private/incognito mode if active

**Issue: Visualization displays incorrectly**
- Solution: Verify browser supports HTML5 Canvas
- Try different browser
- Check for browser extensions blocking content

**Issue: Poor performance on large datasets**
- Solution: Reduce sample size
- Close other browser tabs
- Use desktop instead of mobile device

---

## Technical Support

For questions, issues, or feedback:
1. Review built-in Help system (help button in application)
2. Consult this README thoroughly
3. Check browser console for error messages
4. Verify browser meets minimum requirements

---

## License and Warranty

This software is provided "as-is" without any warranties or guarantees, express or implied. The author assumes no liability for any damages, losses, or consequences arising from the use of this software.

Users are solely responsible for:
- Determining suitability for their specific use case
- Validating outputs for their application
- Ensuring appropriate use within their legal jurisdiction
- Understanding limitations and constraints

This software is provided for educational and research purposes. Commercial use, redistribution, or modification requires explicit permission from the author.

---

## Version History

### Version 2.0 (Current)
- Added Monte Carlo simulation suite (4 experiments)
- Implemented configuration export/import functionality
- Enhanced reset functionality for all components
- Improved mathematical safety checks (Box-Muller, exponential sampling)
- Added comprehensive help system
- Implemented Progressive Web App support
- Added dark mode with persistence
- Enhanced professional disclaimer

### Version 1.0
- Initial release with core generator
- Basic statistical testing suite
- Visualization components
- Interactive game demonstrations
- Export functionality
- Session management

---

## Acknowledgments

- Rotation constants derived from Recursive Division Tree (RDT) analysis
- Inspired by ARX cipher family (ChaCha20, Salsa20)
- Statistical tests based on standard PRNG evaluation methodologies
- Fisher-Yates shuffle algorithm for card demonstrations
- Box-Muller transform for normal distribution sampling

---

## Keywords

pseudorandom number generator, PRNG, ARX cipher, statistical testing, Monte Carlo simulation, random number generation, entropy analysis, distribution testing, mathematical software, research tool, educational demonstration

---

## File Information

- Filename: rge256_demo.html
- Type: Single-page HTML application
- Size: Approximately 155 KB
- Dependencies: None (self-contained)
- Requirements: Modern web browser with JavaScript

---

**Document Version:** 2.0  
**Last Updated:** 2025  
**Maintained By:** Steven Reid (ORCID: 0009-0003-9132-3410)
