#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import { initCommand } from './commands/init';
import { configCommand } from './commands/config';
import { templateCommand } from './commands/template';
import {
    displayBanner,
    displaySuccessMessage,
    displayErrorMessage,
} from './utils/ui';
import { version } from './config';
import { ClixorConfig } from './types';
import boxen from 'boxen';

async function runCLI() {
    try {
        displayBanner();

        const args = process.argv.slice(2);

        if (args.length === 0) {
            await showMainMenu();
        } else {
            await handleCommand(args);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        process.exit(1);
    }
}

async function showMainMenu() {
    while (true) {
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

        if (action === 'exit') {
            break;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
}

async function handleCommand(args: string[]) {
    const command = args[0];
    switch (command) {
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
        default:
            console.log(chalk.red(`Unknown command: ${command}`));
            displayHelp();
    }
}

function displayHelp() {
    console.log(chalk.cyan('\nAvailable commands:'));
    console.log('  init     Initialize a new project');
    console.log('  config   Manage Clixor configuration');
    console.log('  template Manage project templates');
    console.log('\nRun without commands to use the interactive menu.');
}

async function promptInitOptions(): Promise<Partial<ClixorConfig>> {
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
            choices: ['React', 'Next.js'],
        },
    ];

    const answers = await inquirer.prompt(questions);

    if (answers.template === 'Next.js') {
        const nextjsType = await inquirer.prompt([
            {
                type: 'list',
                name: 'nextjsType',
                message: chalk.blue('Choose Next.js setup:'),
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
                message: chalk.blue('Enter the name for the frontend folder:'),
                default: 'frontend',
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

if (require.main === module) {
    runCLI().catch(console.error);
} else {
    module.exports = { runCLI };
}
