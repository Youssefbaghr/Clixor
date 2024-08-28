#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { initCommand } from './commands/init';
import { configCommand } from './commands/config';
import { templateCommand } from './commands/template';
import { displayBanner } from './utils/ui';
import { version } from '../package.json';
import { ProjectConfig } from './types';
import { getProjectTemplates } from './templates/project-templates';
import { loadConfig } from './utils/config';

const program = new Command();

displayBanner();

program
    .version(version)
    .description(
        'Clizer - A modern CLI for initializing and managing development projects'
    );

program
    .command('init')
    .description('Initialize a new project')
    .option('-t, --template <name>', 'Specify a template to use')
    .option('-n, --name <name>', 'Specify the project name')
    .action(initCommand);

program
    .command('config')
    .description('Manage Clizer configuration')
    .option('-l, --list', 'List current configuration')
    .option('-s, --set <key=value>', 'Set a configuration value')
    .option('-r, --reset', 'Reset configuration to defaults')
    .action(configCommand);

program
    .command('template')
    .description('Manage project templates')
    .option('-l, --list', 'List available templates')
    .option('-a, --add <name> <url>', 'Add a new template')
    .option('-r, --remove <name>', 'Remove a template')
    .action(templateCommand);

async function interactiveSetup() {
    const savedConfig = await loadConfig();
    const templates = await getProjectTemplates();

    const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            default: savedConfig.name || 'my-clizer-project',
        },
        {
            type: 'list',
            name: 'template',
            message: 'Choose a project template:',
            choices: Object.keys(templates),
            default: savedConfig.template || Object.keys(templates)[0],
        },
        {
            type: 'input',
            name: 'branch',
            message: 'Which branch would you like to use?',
            default: savedConfig.branch || 'main',
        },
        {
            type: 'list',
            name: 'packageManager',
            message: 'Which package manager would you like to use?',
            choices: ['npm', 'yarn', 'bun'],
            default: savedConfig.packageManager || 'npm',
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
            default: savedConfig.features || [],
        },
    ];

    const answers = await inquirer.prompt(questions);
    const config: ProjectConfig = {
        ...answers,
        customTemplates: savedConfig.customTemplates || {},
    };

    await initCommand({ ...config });
}

// Handle the case when no subcommand is provided
if (process.argv.length === 2) {
    interactiveSetup();
} else {
    program.parse(process.argv);
}
