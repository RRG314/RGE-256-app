#!/usr/bin/env node

process.stdout.on('error', (error) => {
  if (error.code === 'EPIPE') {
    process.exit(0);
  }
  throw error;
});

function rotl32(x, r) {
  return ((x << r) | (x >>> (32 - r))) >>> 0;
}

function add32(a, b) {
  return (a + b) >>> 0;
}

function simpleHash(str) {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return [h1 >>> 0, h2 >>> 0];
}

class RGE256Safe {
  constructor(seed, rounds = 3, zetas = [1.585, 1.926, 1.262], domain = 'rge-demo') {
    this.rounds = rounds;
    this.zetas = zetas;
    this.domain = domain;
    this.s = new Uint32Array(8);

    const domainText = `${seed}|${domain}|${zetas.map((z) => z.toFixed(6)).join('|')}`;
    const [h1, h2] = simpleHash(domainText);
    let x = (seed ^ h1) >>> 0;
    for (let i = 0; i < 8; i++) {
      x ^= x << 13;
      x ^= x >>> 17;
      x ^= x << 5;
      const zetaWord = Math.floor(Math.abs(zetas[i % zetas.length]) * 0x1000000) >>> 0;
      x = (x + 0x9e3779b9 + Math.imul(h2, i + 1) + zetaWord) >>> 0;
      this.s[i] = (x ^ rotl32(h1, (i + 1) % 31 || 1)) >>> 0;
    }

    this.counterLow = 0;
    this.counterHigh = 0;
  }

  next32() {
    const s = this.s;

    for (let round = 0; round < this.rounds; round++) {
      s[0] = add32(s[0], s[1]);
      s[1] = rotl32(s[1] ^ s[0], 7);
      s[2] = add32(s[2], s[3]);
      s[3] = rotl32(s[3] ^ s[2], 9);
      s[4] = add32(s[4], s[5]);
      s[5] = rotl32(s[5] ^ s[4], 13);
      s[6] = add32(s[6], s[7]);
      s[7] = rotl32(s[7] ^ s[6], 18);

      s[0] ^= s[4];
      s[1] ^= s[5];
      s[2] ^= s[6];
      s[3] ^= s[7];
    }

    this.counterLow = (this.counterLow + 1) >>> 0;
    if (this.counterLow === 0) {
      this.counterHigh = (this.counterHigh + 1) >>> 0;
    }

    return (s[0] ^ rotl32(s[4], 13) ^ this.counterLow ^ rotl32(this.counterHigh, 7)) >>> 0;
  }
}

function parseArgs(argv) {
  const options = {
    count: null,
    domain: 'rge-demo',
    format: 'raw',
    rounds: 3,
    seed: 3405691,
    zetas: [1.585, 1.926, 1.262],
  };

  const readValue = (name, value) => {
    if (value === undefined || value.startsWith('--')) {
      throw new Error(`${name} requires a value`);
    }
    return value;
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--count') {
      const value = readValue(arg, next);
      options.count = value === 'unbounded' ? null : Number(value);
      i++;
    } else if (arg === '--domain') {
      options.domain = readValue(arg, next);
      i++;
    } else if (arg === '--format') {
      options.format = readValue(arg, next);
      i++;
    } else if (arg === '--rounds') {
      options.rounds = Number(readValue(arg, next));
      i++;
    } else if (arg === '--seed') {
      options.seed = Number(readValue(arg, next));
      i++;
    } else if (arg === '--zetas') {
      options.zetas = readValue(arg, next).split(',').map(Number);
      i++;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (!['raw', 'dec', 'hex'].includes(options.format)) {
    throw new Error('--format must be raw, dec, or hex');
  }
  if (!Number.isSafeInteger(options.seed) || options.seed < 0) {
    throw new Error('--seed must be a non-negative safe integer');
  }
  if (!Number.isInteger(options.rounds) || options.rounds < 1) {
    throw new Error('--rounds must be a positive integer');
  }
  if (options.domain.length === 0) {
    throw new Error('--domain must not be empty');
  }
  if (options.count !== null && (!Number.isSafeInteger(options.count) || options.count < 0)) {
    throw new Error('--count must be a non-negative integer or unbounded');
  }
  if (options.zetas.length !== 3 || options.zetas.some((z) => !Number.isFinite(z))) {
    throw new Error('--zetas must contain three comma-separated numbers');
  }

  return options;
}

function printHelp() {
  process.stdout.write(`RGE256Safe stream generator

Usage:
  node scripts/rge256-stream.mjs [options] > stream.bin

Options:
  --seed <n>        Seed value, default 3405691
  --rounds <n>      ARX rounds per output, default 3
  --domain <text>   Domain separation string, default rge-demo
  --zetas <a,b,c>   Zeta values, default 1.585,1.926,1.262
  --count <n>       Number of 32-bit words to emit. Omit for unbounded raw stream.
  --format <fmt>    raw, dec, or hex. raw emits little-endian uint32 words.

Examples:
  node scripts/rge256-stream.mjs --seed 3405691 --count 1000000 --format raw > rge256-u32le.bin
  node scripts/rge256-stream.mjs --seed 3405691 --format raw | RNG_test stdin32
  node scripts/rge256-stream.mjs --seed 3405691 --format raw | dieharder -g 200 -a
`);
}

async function writeChunk(stream, buffer) {
  if (!stream.write(buffer)) {
    await new Promise((resolve) => stream.once('drain', resolve));
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  const generator = new RGE256Safe(options.seed, options.rounds, options.zetas, options.domain);
  const chunkWords = 16384;
  let remaining = options.count;

  while (remaining === null || remaining > 0) {
    const words = remaining === null ? chunkWords : Math.min(chunkWords, remaining);

    if (options.format === 'raw') {
      const buffer = Buffer.allocUnsafe(words * 4);
      for (let i = 0; i < words; i++) {
        buffer.writeUInt32LE(generator.next32(), i * 4);
      }
      await writeChunk(process.stdout, buffer);
    } else {
      let text = '';
      for (let i = 0; i < words; i++) {
        const value = generator.next32();
        text += options.format === 'hex'
          ? `0x${value.toString(16).padStart(8, '0')}\n`
          : `${value}\n`;
      }
      await writeChunk(process.stdout, text);
    }

    if (remaining !== null) {
      remaining -= words;
    }
  }
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
