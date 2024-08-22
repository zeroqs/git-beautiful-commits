import { Command } from 'commander';
import * as process from 'node:process';

import { cwdExists, detectPackageManager, handleError, installHuskyPackage, logger, setUpConfig } from '@/src/utils';
import { initOptionsSchema } from '@/src/utils/types';

export const init = new Command()
  .name('init')
  .description('🚀 initialize .husky in project and install dependency 🚀')
  .option('-c, --cwd <cwd>', '📂 The working directory. Defaults to the current directory. 📂', process.cwd())
  .action(async (opts) => {
    try {
      const options = initOptionsSchema.parse({
        cwd: opts.cwd
      });

      const cwd = cwdExists(options.cwd || process.cwd());

      const packageManager = detectPackageManager();

      if (!packageManager) {
        logger.error('💥 Unable to detect package manager. 💥');
        process.exit(1);
      }

      await installHuskyPackage(packageManager);

      await setUpConfig(cwd, packageManager);
    } catch (error) {
      handleError(error);
    }
  });
