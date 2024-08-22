import fs from 'fs-extra';
import path from 'node:path';
import type { PackageJson } from 'type-fest';

import { logger } from '@/src/utils/logger';
import type { PackageManager } from '@/src/utils/types';

export function getPackageInfo() {
  const packageJsonPath = path.join('package.json');

  return fs.readJSONSync(packageJsonPath) as PackageJson;
}

export function detectPackageManager(): PackageManager | null {
  const cwd = process.cwd();

  if (fs.existsSync(path.join(cwd, 'bun.lockb'))) {
    return 'bun';
  } else if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  } else if (fs.existsSync(path.join(cwd, 'yarn.lock'))) {
    return 'yarn';
  } else if (fs.existsSync(path.join(cwd, 'package-lock.json'))) {
    return 'npm';
  } else {
    return null;
  }
}

export function getInstallCommand(packageManager: PackageManager): string {
  switch (packageManager) {
    case 'npm':
      return 'npm install --save-dev';
    case 'yarn':
      return 'yarn add --dev';
    case 'pnpm':
      return 'pnpm add --save-dev';
    case 'bun':
      return 'bun add --dev';
    default:
      throw new Error('Unknown package manager');
  }
}

export function getUpdateCommand(packageManager: PackageManager): string {
  switch (packageManager) {
    case 'npm':
      return 'npm install';
    case 'yarn':
      return 'yarn';
    case 'pnpm':
      return 'pnpm install';
    case 'bun':
      return 'bun install';
    default:
      throw new Error('Unknown package manager');
  }
}

export async function huskyAlreadyInstall() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = (await fs.readJSON(packageJsonPath)) as PackageJson;

  return Boolean(packageJson.dependencies?.husky || packageJson.devDependencies?.husky);
}

export function cwdExists(cwd: string) {
  const currentWorkingDirectory = path.resolve(cwd);

  if (!fs.existsSync(currentWorkingDirectory)) {
    logger.error(`The path ${currentWorkingDirectory} does not exist. Please try again.`);
    process.exit(1);
  }

  return currentWorkingDirectory;
}
