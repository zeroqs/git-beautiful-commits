#!/usr/bin/env node
import { Command } from 'commander';

import { init } from '@/src/commands/init';
import { getPackageInfo } from '@/src/utils/get-package-info';

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

async function main() {
  const packageJson = getPackageInfo();

  const program = new Command()
    .name('beautiful-commits')
    .description('☄️ Customize and make beautiful your commits ☄️')
    .helpOption('-h, --help', '💡 display help for commands 💡')
    .version(
      `📦 ${packageJson.version}` || '📦 1.0.0',
      '-v, --version',
      '📦 display the version number 📦'
    );
  program.addCommand(init);

  program.parse();
}

main();
