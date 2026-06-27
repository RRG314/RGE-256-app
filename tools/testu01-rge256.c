#include <math.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "bbattery.h"
#include "unif01.h"

static uint32_t state_words[8];
static uint32_t counter_low = 0;
static uint32_t counter_high = 0;
static int rounds = 3;

static uint32_t rotl32(uint32_t x, unsigned int r) {
  return (uint32_t)((x << r) | (x >> (32U - r)));
}

static void simple_hash(const char *text, uint32_t *out_h1, uint32_t *out_h2) {
  uint32_t h1 = 0xdeadbeefU;
  uint32_t h2 = 0x41c6ce57U;

  for (const unsigned char *p = (const unsigned char *)text; *p; p++) {
    h1 = (uint32_t)((h1 ^ *p) * 2654435761U);
    h2 = (uint32_t)((h2 ^ *p) * 1597334677U);
  }

  h1 = (uint32_t)(((h1 ^ (h1 >> 16)) * 2246822507U) ^ ((h2 ^ (h2 >> 13)) * 3266489909U));
  h2 = (uint32_t)(((h2 ^ (h2 >> 16)) * 2246822507U) ^ ((h1 ^ (h1 >> 13)) * 3266489909U));

  *out_h1 = h1;
  *out_h2 = h2;
}

static void rge256_init(uint64_t seed, const char *domain, const double zetas[3]) {
  char domain_text[256];
  uint32_t h1;
  uint32_t h2;
  uint32_t x;

  snprintf(
    domain_text,
    sizeof(domain_text),
    "%llu|%s|%.6f|%.6f|%.6f",
    (unsigned long long)seed,
    domain,
    zetas[0],
    zetas[1],
    zetas[2]
  );

  simple_hash(domain_text, &h1, &h2);
  x = (uint32_t)seed ^ h1;

  for (int i = 0; i < 8; i++) {
    uint32_t zeta_word;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    zeta_word = (uint32_t)floor(fabs(zetas[i % 3]) * 16777216.0);
    x = (uint32_t)(x + 0x9e3779b9U + (uint32_t)(h2 * (uint32_t)(i + 1)) + zeta_word);
    state_words[i] = (uint32_t)(x ^ rotl32(h1, (unsigned int)((i + 1) % 31U ? (i + 1) % 31U : 1U)));
  }

  counter_low = 0;
  counter_high = 0;
}

static unsigned int rge256_next32(void) {
  for (int round = 0; round < rounds; round++) {
    state_words[0] = (uint32_t)(state_words[0] + state_words[1]);
    state_words[1] = rotl32(state_words[1] ^ state_words[0], 7);
    state_words[2] = (uint32_t)(state_words[2] + state_words[3]);
    state_words[3] = rotl32(state_words[3] ^ state_words[2], 9);
    state_words[4] = (uint32_t)(state_words[4] + state_words[5]);
    state_words[5] = rotl32(state_words[5] ^ state_words[4], 13);
    state_words[6] = (uint32_t)(state_words[6] + state_words[7]);
    state_words[7] = rotl32(state_words[7] ^ state_words[6], 18);

    state_words[0] ^= state_words[4];
    state_words[1] ^= state_words[5];
    state_words[2] ^= state_words[6];
    state_words[3] ^= state_words[7];
  }

  counter_low = (uint32_t)(counter_low + 1U);
  if (counter_low == 0U) {
    counter_high = (uint32_t)(counter_high + 1U);
  }

  return (unsigned int)(state_words[0] ^ rotl32(state_words[4], 13) ^ counter_low ^ rotl32(counter_high, 7));
}

static void usage(const char *program) {
  fprintf(stderr,
    "Usage: %s [--battery smallcrush|crush|bigcrush] [--seed n] [--rounds n] [--domain text]\\n"
    "Defaults: --battery smallcrush --seed 3405691 --rounds 3 --domain rge-demo\\n",
    program
  );
}

int main(int argc, char **argv) {
  const char *battery = "smallcrush";
  const char *domain = "rge-demo";
  uint64_t seed = 3405691ULL;
  double zetas[3] = {1.585, 1.926, 1.262};
  unif01_Gen *gen;

  for (int i = 1; i < argc; i++) {
    if (strcmp(argv[i], "--battery") == 0 && i + 1 < argc) {
      battery = argv[++i];
    } else if (strcmp(argv[i], "--seed") == 0 && i + 1 < argc) {
      seed = strtoull(argv[++i], NULL, 10);
    } else if (strcmp(argv[i], "--rounds") == 0 && i + 1 < argc) {
      rounds = atoi(argv[++i]);
    } else if (strcmp(argv[i], "--domain") == 0 && i + 1 < argc) {
      domain = argv[++i];
    } else if (strcmp(argv[i], "--help") == 0 || strcmp(argv[i], "-h") == 0) {
      usage(argv[0]);
      return 0;
    } else {
      usage(argv[0]);
      return 2;
    }
  }

  if (rounds < 1) {
    fprintf(stderr, "--rounds must be positive\\n");
    return 2;
  }

  rge256_init(seed, domain, zetas);
  gen = unif01_CreateExternGenBits("RGE256Safe", rge256_next32);

  if (strcmp(battery, "smallcrush") == 0) {
    bbattery_SmallCrush(gen);
  } else if (strcmp(battery, "crush") == 0) {
    bbattery_Crush(gen);
  } else if (strcmp(battery, "bigcrush") == 0) {
    bbattery_BigCrush(gen);
  } else {
    fprintf(stderr, "Unknown battery: %s\\n", battery);
    unif01_DeleteExternGenBits(gen);
    return 2;
  }

  unif01_DeleteExternGenBits(gen);
  return 0;
}
