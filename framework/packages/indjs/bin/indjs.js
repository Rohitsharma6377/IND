#!/usr/bin/env node
import('../src/cli.mjs').then(m => m.run()).catch(err => {
  console.error(err);
  process.exit(1);
});
