#!/usr/bin/env node

import { runCLI } from './cli';

if (require.main === module) {
    runCLI().catch(console.error);
} else {
    module.exports = { runCLI };
}
