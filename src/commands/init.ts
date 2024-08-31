import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { ClixorConfig } from '../types';
import { cloneRepository } from '../utils/git';
import { installDependencies } from '../utils/package-managers';
import { getProjectTemplates } from '../templates/project-templates';
import { createProjectStructure } from '../utils/file-system';
import { loadConfig, saveConfig } from '../utils/config';
import { logger } from '../utils/logger';
import { nodeTemplate } from '../config/constants';
import chalk from 'chalk';
import ora from 'ora';
import { templateUrls } from '../config/templates';
import { TemplateType } from '../types';

export async function initCommand(options: Partial<ClixorConfig>) {
    const spinner = ora('Initializing Clixor project...').start();

    try {
        const config = await getFullConfig(options);

        while (fs.existsSync(path.join(process.cwd(), config.name))) {
            spinner.stop();
            const { action } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: `A directory named "${config.name}" already exists. What would you like to do?`,
                    choices: [
                        { name: 'Choose a different name', value: 'rename' },
                        { name: 'Cancel', value: 'cancel' },
                    ],
                },
            ]);

            if (action === 'cancel') {
                logger.info('Project initialization cancelled.');
                return;
            }

            const { newName } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'newName',
                    message: 'Enter a new project name:',
                    validate: (input) =>
                        input.trim() !== '' || 'Project name cannot be empty',
                },
            ]);

            config.name = newName.trim();
            spinner.start();
        }

        spinner.text = chalk.cyan('Cloning repositories...');

        if (
            config.template === 'React' ||
            config.template === 'Next.js with Express API'
        ) {
            await Promise.all([
                cloneRepository(
                    config.templateUri,
                    path.join(config.name, config.frontendName || 'frontend')
                ),
                cloneRepository(
                    nodeTemplate,
                    path.join(config.name, config.backendName || 'backend')
                ),
            ]);
        } else {
            await cloneRepository(config.templateUri, config.name);
        }

        spinner.text = chalk.cyan('Creating project structure...');
        await createProjectStructure(config);

        spinner.text = chalk.cyan('Installing dependencies...');
        if (
            config.template === 'React' ||
            config.template === 'Next.js with Express API'
        ) {
            await Promise.all([
                installDependencies({
                    ...config,
                    name: path.join(
                        config.name,
                        config.frontendName || 'frontend'
                    ),
                }),
                installDependencies({
                    ...config,
                    name: path.join(
                        config.name,
                        config.backendName || 'backend'
                    ),
                }),
            ]);
        } else {
            await installDependencies(config);
        }

        spinner.succeed(chalk.green('Project initialized successfully!'));
        logger.success(`Your project "${config.name}" is ready!`);
        logger.info(
            chalk.blue(`Next steps:\n1. cd ${config.name}\n2. Start coding!`)
        );

        await saveConfig(config);
    } catch (error) {
        spinner.fail(chalk.red('Failed to initialize project'));
        logger.error('Project initialization failed', error);
    }
}

async function getFullConfig(
    options: Partial<ClixorConfig>
): Promise<ClixorConfig> {
    const savedConfig = await loadConfig();
    const templates = getProjectTemplates();

    if (options.template && !templates.includes(options.template)) {
        throw new Error(`Template "${options.template}" not found`);
    }

    return {
        ...savedConfig,
        ...options,
        templateUri:
            options.template && options.template in templateUrls
                ? templateUrls[options.template as TemplateType]
                : undefined,
        customTemplates: savedConfig.customTemplates || {},
    } as ClixorConfig;
}
