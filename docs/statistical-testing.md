# External Statistical Testing

This app does not run large statistical batteries in the browser. Use the command-line stream generator and TestU01 harness in this repository, run tests in your own environment, and then copy summarized results back into the app or README.

## Raw Stream Generator

The browser app maps generated values into display ranges. External batteries should receive raw 32-bit words instead.

```bash
node scripts/rge256-stream.mjs --help
node scripts/rge256-stream.mjs --seed 3405691 --count 1000000 --format raw > rge256-u32le.bin
node scripts/rge256-stream.mjs --seed 3405691 --count 262144 --format raw > sample-1mib.bin
```

The raw format is unsigned 32-bit little-endian output.

Record seed, rounds, zeta values, domain, commit hash, and exact command for every run.

## PractRand

PractRand is stream-oriented, so it can consume unbounded stdin.

```bash
node scripts/rge256-stream.mjs --seed 3405691 --format raw | RNG_test stdin32
node scripts/rge256-stream.mjs --seed 3405691 --format raw | RNG_test stdin32 -tlmin 32MB -tlmax 16GB
```

Report the data volume reached, any anomalies, and the full command.

Primary source: <https://pracrand.sourceforge.net/>

## dieharder

dieharder generator 200 reads raw binary from stdin.

```bash
node scripts/rge256-stream.mjs --seed 3405691 --format raw | dieharder -g 200 -a
node scripts/rge256-stream.mjs --seed 3405691 --format raw | dieharder -g 200 -d 0
```

Save the full output log and report pass, weak, and fail counts.

Primary source: <https://webhome.phy.duke.edu/~rgb/General/dieharder.php>

## TestU01 SmallCrush / Crush / BigCrush

TestU01 is a C library. Compile the included harness after installing TestU01.

```bash
cc tools/testu01-rge256.c -o testu01-rge256 -ltestu01 -lprobdist -lmylib -lm
./testu01-rge256 --battery smallcrush --seed 3405691
./testu01-rge256 --battery crush --seed 3405691
./testu01-rge256 --battery bigcrush --seed 3405691
```

BigCrush is long-running. Run it on a machine where the process can remain uninterrupted.

Primary source: <https://simul.iro.umontreal.ca/testu01/tu01.html>

## Reporting Template

```text
Generator: RGE256Safe
Repository commit:
Seed:
Rounds:
Zetas:
Domain:
Tool:
Tool version:
Battery / command:
Data volume or samples consumed:
Pass count:
Weak / suspicious count:
Fail count:
Notes:
Raw log artifact:
```

## Claims Boundary

Passing these batteries is useful empirical evidence. It is not proof of randomness, unpredictability, or cryptographic security. Phrase results as observations from a specific tool, version, seed, configuration, and data volume.
