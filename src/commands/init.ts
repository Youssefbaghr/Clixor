import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { ClizerConfig, ProjectConfig } from '../types';
import { cloneRepository } from '../utils/git';
import { installDependencies } from '../utils/package-managers';
import { getProjectTemplates } from '../templates/project-templates';
import { createProjectStructure } from '../utils/file-system';
import { loadConfig, saveConfig } from '../utils/config';
import { logger } from '../utils/logger';

export async function initCommand(options: Partial<ClizerConfig>) {
    const spinner = ora('Initializing Clizer project...').start();
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

        spinner.text = 'Cloning repository...';
        await cloneRepository(config.templateUri, config.name);

        spinner.text = 'Creating project structure...';
        await createProjectStructure(config);

        spinner.text = 'Installing dependencies...';
        await installDependencies(config);

        spinner.succeed('Project initialized successfully!');
        logger.success(`Your project "${config.name}" is ready!`);
        logger.info(`Next steps:\n1. cd ${config.name}\n2. Start coding!`);

        await saveConfig(config);
    } catch (error) {
        spinner.fail('Failed to initialize project');
        logger.error('Project initialization failed', error);
    }
}

async function getFullConfig(
    options: Partial<ClizerConfig>
): Promise<ClizerConfig> {
    const savedConfig = await loadConfig();
    const templates = await getProjectTemplates();

    const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            default: options.name || savedConfig.name || 'my-clizer-project',
            when: !options.name,
        },
        {
            type: 'list',
            name: 'template',
            message: 'Choose a project template:',
            choices: templates.map((t: any) => t.name),
            default:
                options.template || savedConfig.template || templates[0].name,
            when: !options.template,
        },
        {
            type: 'input',
            name: 'branch',
            message: 'Which branch would you like to use?',
            default: options.branch || savedConfig.branch || 'main',
            when: !options.branch,
        },
        {
            type: 'list',
            name: 'packageManager',
            message: 'Which package manager would you like to use?',
            choices: ['npm', 'yarn', 'bun'],
            default:
                options.packageManager || savedConfig.packageManager || 'npm',
            when: !options.packageManager,
        },
        {
            type: 'checkbox',
            name: 'features',
            message: 'Select additional features:',
            choices: [
                { name: 'ESLint', value: 'eslint' },
                { name: 'Prettier', value: 'prettier' },
                { name: 'Jest', value: 'jest' },
                { name: 'GitHub Actions', value: 'github-actions' },
                { name: 'Docker', value: 'docker' },
            ],
            default: options.features || savedConfig.features || [],
            when: !options.features,
        },
    ];

    const answers = await inquirer.prompt(questions);
    const selectedTemplate = templates.find(
        (t) => t.name === (options.template || answers.template)
    );

    if (!selectedTemplate) {
        throw new Error(
            `Template "${options.template || answers.template}" not found`
        );
    }

    return {
        ...savedConfig,
        ...options,
        ...answers,
        templateUri: selectedTemplate ? selectedTemplate.uri : '',
        customTemplates: savedConfig.customTemplates || {},
    } as ProjectConfig;
}
