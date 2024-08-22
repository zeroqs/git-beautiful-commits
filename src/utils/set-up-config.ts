import fs from 'fs-extra';
import { execSync } from 'node:child_process';
import * as os from 'node:os';
import path from 'node:path';
import prompts from 'prompts';

import { emojiList } from '@/src/utils/emoji-list';
import { getInstallCommand, getUpdateCommand, huskyAlreadyInstall } from '@/src/utils/get-package-info';
import { handleError } from '@/src/utils/handle-error';
import { logger } from '@/src/utils/logger';
import { SCRIPT_TEMPLATE } from '@/src/utils/templates';
import type { PackageManager } from '@/src/utils/types';

export async function installHuskyPackage(packageManager: PackageManager) {
  const huskyInstall = await huskyAlreadyInstall();

  if (huskyInstall) {
    logger.info('💡 Husky is already installed. Skipping installation. 💡');
    return;
  }

  const installCommand = getInstallCommand(packageManager);

  try {
    runCommand(`${installCommand} husky`);
    // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (error) {
    logger.error('💥 Failed to install Husky. 💥');
    process.exit(1);
  } finally {
    logger.success('✅ Husky installed successfully!');
  }
}

export async function setUpConfig(cwd: string, packageManager: PackageManager) {
  try {
    const { emoji } = await promptConfig();
    const selectedEmoji = emojiList[emoji].title;

    const targetPath = path.resolve(cwd, `beautiful-commits.config.json`);
    const config = {
      selectedEmoji
    };

    await fs.writeFile(targetPath, JSON.stringify(config, null, 2), 'utf8');
    await setUpHuskyConfig(cwd, packageManager);
  } catch (error) {
    handleError(error);
  }
}

async function promptConfig() {
  return prompts({
    type: 'select',
    name: 'emoji',
    message: '🎯 Select emoji to add to the start of the commit',
    hint: '💡 Enter to submit.',
    choices: emojiList
  });
}

async function setUpHuskyConfig(cwd: string, packageManager: PackageManager) {
  const filePath = path.resolve(`${cwd}/.husky/prepare-commit-msg`);
  const updatePackagesCommand = getUpdateCommand(packageManager);
  const huskyInstall = await huskyAlreadyInstall();
  const huskyDirectoryExists = fs.existsSync(`${cwd}/.husky`);

  try {
    if (!huskyInstall || !huskyDirectoryExists) {
      runCommand('npx husky-init');
      runCommand(updatePackagesCommand);
    }

    runCommand('echo "npx --no -- commitlint --edit \$1" > .husky/prepare-commit-msg');

    if (os.platform() !== 'win32') {
      runCommand('chmod +x .husky/prepare-commit-msg');
    }
    fs.writeFileSync(filePath, SCRIPT_TEMPLATE, { encoding: 'utf8', mode: 0o755 });
  } catch (error) {
    handleError(error);
  }
}

function runCommand(command: string) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    handleError(error);
  }
}
