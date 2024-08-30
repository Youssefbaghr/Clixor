#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { initCommand } from './commands/init';
import { configCommand } from './commands/config';
import { templateCommand } from './commands/template';
import { displayBanner } from './utils/ui';
import { version } from './config';

const program = new Command();

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
            console.error(chalk.red('Error initializing project:'), error);
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

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}

async function promptInitOptions() {
    const questions = [
        {
            type: 'input',
            name: 'name',
            message: chalk.blue('What is the name of your project?'),
            default: 'my-clixor-project',
        },
        {
            type: 'list',
            name: 'template',
            message: chalk.blue('Choose a project template:'),
            choices: ['React', 'Next-js'],
        },
    ];

    const answers = await inquirer.prompt(questions);

    if (answers.template === 'Next-js') {
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
        (answers.template === 'Next-js' &&
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

    return answers;
}
