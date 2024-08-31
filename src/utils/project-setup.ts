import { ClixorConfig } from '../types';
import { setupProjectFromTemplate } from './templates';
import { createProjectStructure } from './file-system';
import { installDependencies } from './package-managers';
import { executeHooks } from './hooks';
import path from 'path';
import chalk from 'chalk';
import { Ora } from 'ora';
import { nodeTemplate } from '../config/constants';

export async function setupProject(config: ClixorConfig, spinner: Ora): Promise<void> {
  spinner.text = chalk.cyan('Cloning repositories...');
  await cloneRepositories(config);

  spinner.text = chalk.cyan('Creating project structure...');
  await createProjectStructure(config);

  spinner.text = chalk.cyan('Installing dependencies...');
  await installProjectDependencies(config);

  spinner.text = chalk.cyan('Executing post-initialization hooks...');
  await executeHooks(config);
}

async function cloneRepositories(config: ClixorConfig): Promise<void> {
  if (config.template === 'React' || config.template === 'Next.js with Express API') {
    await Promise.all([
      setupProjectFromTemplate({
        ...config,
        name: path.join(config.name, config.frontendName || 'frontend'),
      }),
      setupProjectFromTemplate({
        ...config,
        templateUri: nodeTemplate,
        name: path.join(config.name, config.backendName || 'backend'),
      }),
    ]);
  } else {
    await setupProjectFromTemplate(config);
  }
}

async function installProjectDependencies(config: ClixorConfig): Promise<void> {
  if (config.template === 'React' || config.template === 'Next.js with Express API') {
    await Promise.all([
      installDependencies({
        ...config,
        name: path.join(config.name, config.frontendName || 'frontend'),
      }),
      installDependencies({
        ...config,
        name: path.join(config.name, config.backendName || 'backend'),
      }),
    ]);
  } else {
    await installDependencies(config);
  }
}
