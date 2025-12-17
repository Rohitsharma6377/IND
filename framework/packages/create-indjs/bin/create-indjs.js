#!/usr/bin/env node
import { runCLI } from "indjs";

try {
  // Transform argv to call underlying CLI with `create`
  const argv = process.argv.slice(2);
  const newArgv = [process.argv[0], process.argv[1], "create", ...argv];
  process.argv = newArgv;
  await runCLI();
} catch (err) {
  console.error(err?.message || err);
  process.exit(1);
}
