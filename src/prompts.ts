import chalk from 'chalk';
import inquirer from 'inquirer';
import { ClixorConfig } from './types';
import { loadConfig } from './utils/config';
import { ProjectConfig } from './types';
import { logger } from './utils/logger';

export async function promptInitOptions(): Promise<Partial<ProjectConfig>> {
    try {
        console.clear();
        console.log(chalk.cyan.bold("🚀 Let's set up your new project!\n"));

        const config = await loadConfig();

        const templates = Object.keys(config.templates || {});

        const choices = Object.keys(config.customTemplates || {}).map(
            (key) => ({
                name: key,
                value: key,
            })
        );

        const questions = [
            {
                type: 'input',
                name: 'name',
                message: chalk.blue('📝 What is the name of your project?'),
                default: 'my-clixor-project',
                validate: (input: string) =>
                    input.trim() !== '' || 'Project name cannot be empty',
            },
            {
                type: 'list',
                name: 'template',
                message: chalk.blue('🔧 Choose a project template:'),
                choices: ['React', 'Next.js'],
            },
        ];

        const answers = await inquirer.prompt(questions);

        if (answers.template === 'Next.js') {
            const nextjsType = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'nextjsType',
                    message: chalk.blue('🔧 Choose Next.js setup:'),
                    choices: [
                        {
                            name: 'With Express API',
                            value: 'Next.js with Express API',
                        },
                        {
                            name: 'With Server Actions',
                            value: 'Next.js with Server Actions',
                        },
                    ],
                },
            ]);
            answers.template = nextjsType.nextjsType;
        }

        if (
            answers.template === 'Next.js with Express API' ||
            answers.template === 'React'
        ) {
            const folderNames = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'frontendName',
                    message: chalk.blue(
                        '📁 Enter the name for the frontend folder:'
                    ),
                    default: 'frontend',
                },
                {
                    type: 'input',
                    name: 'backendName',
                    message: chalk.blue(
                        '📁 Enter the name for the backend folder:'
                    ),
                    default: 'backend',
                },
            ]);
            Object.assign(answers, folderNames);
        }

        const packageManager = await inquirer.prompt([
            {
                type: 'list',
                name: 'packageManager',
                message: chalk.blue(
                    '📦 Which package manager would you like to use?'
                ),
                choices: ['npm', 'yarn', 'bun'],
            },
        ]);
        answers.packageManager = packageManager.packageManager;

        const features = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'features',
                message: chalk.blue('✨ Select additional features:'),
                choices: [
                    { name: 'ESLint', value: 'eslint' },
                    { name: 'Prettier', value: 'prettier' },
                    { name: 'Jest', value: 'jest' },
                    { name: 'GitHub Actions', value: 'github-actions' },
                    { name: 'Docker', value: 'docker' },
                ],
            },
        ]);
        answers.features = features.features;

        return answers;
    } catch (error) {
        logger.error('An error occurred in promptInitOptions:', error);
        if (error instanceof Error) {
            logger.error(`Error message: ${error.message}`);
            logger.error(`Error stack: ${error.stack}`);
        }
        throw error;
    }
}
