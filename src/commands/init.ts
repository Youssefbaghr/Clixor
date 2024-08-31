import { ClixorConfig } from '../types';
import { loadConfig, saveConfig } from '../utils/config';
import { logger } from '../utils/logger';
import { templateUrls } from '../config/templates';
import { TemplateType } from '../types';
import chalk from 'chalk';
import ora from 'ora';
import { getProjectTemplates } from '../templates/project-templates';
import process from 'process';
import { handleInitError } from '../utils/error-handling';
import { setupProject } from '../utils/project-setup';
import { handleExistingDirectory } from '../utils/directory-helpers';

export async function initCommand(options: Partial<ClixorConfig>) {
  const spinner = ora('Initializing Clixor project...').start();
  let config;

  try {
    config = await getFullConfig(options);

    if (!config) {
      throw new Error('Failed to generate full configuration');
    }

    await handleExistingDirectory(config, spinner);
    await setupProject(config, spinner);

    spinner.succeed(chalk.green('Project initialized successfully!'));
    logger.success(`Your project "${config.name}" is ready!`);
    logger.info(chalk.blue(`Next steps:\n1. cd ${config.name}\n2. Start coding!`));

    await saveConfig(config);

    process.exit(0);
  } catch (error) {
    handleInitError(error, spinner);
  }
}

async function getFullConfig(options: Partial<ClixorConfig>): Promise<ClixorConfig | null> {
  try {
    const savedConfig = await loadConfig();

    const templates = getProjectTemplates();

    if (options.template && !templates.includes(options.template)) {
      throw new Error(`Template "${options.template}" not found`);
    }

    const baseConfig: ClixorConfig = savedConfig || {};

    const fullConfig: ClixorConfig = {
      ...baseConfig,
      ...options,
      name: options.name || baseConfig.name || 'default-project-name',
      template: options.template || baseConfig.template || templates[0],
      templateUri:
        options.template && options.template in templateUrls
          ? templateUrls[options.template as TemplateType]
          : undefined,
      customTemplates: baseConfig.customTemplates || {},
      packageManager: options.packageManager || baseConfig.packageManager || 'npm',
      features: options.features || baseConfig.features || [],
    };

    return fullConfig;
  } catch (error) {
    logger.error('Failed to load configuration');
    if (error instanceof Error) {
      logger.error(`Error details: ${error.message}`);
      logger.error(`Error stack: ${error.stack}`);
    } else {
      logger.error(`Unexpected error: ${error}`);
    }
    logger.error(`Options received: ${JSON.stringify(options, null, 2)}`);
    return null;
  }
}
