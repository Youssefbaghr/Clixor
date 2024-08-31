#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { initCommand } from './commands/init';
import { configCommand } from './commands/config';
import { templateCommand } from './commands/template';
import {
    displayBanner,
    createSpinner,
    displaySuccessMessage,
    displayErrorMessage,
} from './utils/ui';
import { version } from './config';
import boxen from 'boxen';

const program = new Command();

// Function to run the CLI
async function runCLI() {
    try {
        displayBanner();

        program
            .version(version)
            .description(
                'Clixor - A modern CLI for initializing and managing development projects.'
            );

        program
            .command('init')
            .description('Initialize a new project')
            .action(async () => {
                try {
                    const options = await promptInitOptions();
                    await initCommand(options);
                } catch (error) {
                    console.error(
                        chalk.red('Error initializing project:'),
                        error
                    );
                }
            });

        program
            .command('config')
            .description('Manage Clixor configuration')
            .action(configCommand);

        program
            .command('template')
            .description('Manage project templates')
            .action(templateCommand);

        await program.parseAsync(process.argv);

        if (!process.argv.slice(2).length) {
            await showMainMenu();
        }
    } catch (error) {
        console.error('An error occurred:', error);
        process.exit(1);
    }
}

// Check if the script is being run directly
if (require.main === module) {
    runCLI().catch(console.error);
} else {
    module.exports = { runCLI };
}

async function showMainMenu() {
    console.clear();
    displayBanner();

    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: chalk.blue('What would you like to do?'),
            choices: [
                { name: 'Initialize a new project', value: 'init' },
                { name: 'Manage configuration', value: 'config' },
                { name: 'Manage templates', value: 'template' },
                { name: 'View documentation', value: 'docs' },
                { name: 'Exit', value: 'exit' },
            ],
        },
    ]);

    switch (action) {
        case 'init':
            const options = await promptInitOptions();
            await initCommand(options);
            break;
        case 'config':
            await configCommand({});
            break;
        case 'template':
            await templateCommand({});
            break;
        case 'docs':
            displayDocumentation();
            break;
        case 'exit':
            displaySuccessMessage('Thanks for using Clixor!');
            process.exit(0);
    }

    if (action !== 'exit') {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await showMainMenu();
    }
}

async function promptInitOptions() {
    const questions = [
        {
            type: 'input',
            name: 'name',
            message: chalk.blue('What is the name of your project?'),
            default: 'my-clixor-project',
            validate: (input: string) =>
                input.trim() !== '' || 'Project name cannot be empty',
        },
        {
            type: 'list',
            name: 'template',
            message: chalk.blue('Choose a project template:'),
            choices: ['React', 'Next.js', 'Custom'],
        },
    ];

    const answers = await inquirer.prompt(questions);

    if (answers.template === 'Custom') {
        const customTemplate = await inquirer.prompt([
            {
                type: 'input',
                name: 'customTemplateUrl',
                message: chalk.blue('Enter the URL of your custom template:'),
                validate: (input: string) =>
                    input.trim() !== '' || 'Template URL cannot be empty',
            },
        ]);
        answers.customTemplateUrl = customTemplate.customTemplateUrl;
    }

    if (answers.template === 'Next.js') {
        const nextjsType = await inquirer.prompt([
            {
                type: 'list',
                name: 'nextjsType',
                message: chalk.blue('Choose Next.js setup:'),
                choices: [
                    { name: 'With Express API', value: 'with-express-api' },
                    {
                        name: 'With Server Actions',
                        value: 'with-server-actions',
                    },
                ],
            },
        ]);
        answers.nextjsType = nextjsType.nextjsType;
    }

    if (
        answers.template === 'React' ||
        (answers.template === 'Next.js' &&
            answers.nextjsType === 'with-express-api')
    ) {
        const folderNames = await inquirer.prompt([
            {
                type: 'input',
                name: 'frontendName',
                message: chalk.blue('Enter the name for the frontend folder:'),
                default: answers.template === 'React' ? 'client' : 'frontend',
            },
            {
                type: 'input',
                name: 'backendName',
                message: chalk.blue('Enter the name for the backend folder:'),
                default: 'backend',
            },
        ]);
        Object.assign(answers, folderNames);
    }

    const packageManager = await inquirer.prompt([
        {
            type: 'list',
            name: 'packageManager',
            message: chalk.blue('Which package manager would you like to use?'),
            choices: ['npm', 'yarn', 'bun'],
        },
    ]);
    answers.packageManager = packageManager.packageManager;

    const features = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'features',
            message: chalk.blue('Select additional features:'),
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
}

function displayDocumentation() {
    console.clear();
    displayBanner();
    console.log(
        boxen(
            chalk.cyan('Clixor Documentation\n\n') +
                chalk.white('Commands:\n') +
                chalk.yellow('init') +
                ' - Initialize a new project\n' +
                chalk.yellow('config') +
                ' - Manage Clixor configuration\n' +
                chalk.yellow('template') +
                ' - Manage project templates\n\n' +
                chalk.white('For more information, visit: ') +
                chalk.cyan('https://github.com/Youssefbaghr/Clixor'),
            { padding: 1, borderColor: 'cyan', borderStyle: 'round' }
        )
    );
}
