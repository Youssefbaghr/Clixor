import chalk from 'chalk';
import inquirer from 'inquirer';
import { initCommand } from './commands/init';
import { configCommand } from './commands/config';
import { templateCommand } from './commands/template';
import {
    displaySuccessMessage,
    displayDocumentation,
    displayErrorMessage,
} from './utils/ui';
import { promptInitOptions } from './prompts';
import { logger } from './utils/logger';

export async function showMainMenu() {
    let action: string = '';
    while (true) {
        try {
            ({ action } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: chalk.blue.bold('🔧 What would you like to do?'),
                    choices: [
                        {
                            name: '🚀   Initialize a new project',
                            value: 'init',
                        },
                        { name: '⚙️   Manage configuration', value: 'config' },
                        { name: '📁   Manage templates', value: 'template' },
                        { name: '📚   View documentation', value: 'docs' },
                        { name: '👋   Exit', value: 'exit' },
                    ],
                },
            ]));

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
                    return;
            }
        } catch (error) {
            logger.error('An error occurred in showMainMenu:', error);
            if (error instanceof Error) {
                displayErrorMessage(`An error occurred: ${error.message}`);
                logger.error(`Error stack: ${error.stack}`);
            } else {
                displayErrorMessage(`An unknown error occurred`);
            }
        }

        if (action !== 'exit') {
            await new Promise<void>((resolve) => {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'continue',
                            message: chalk.yellow('Press Enter to continue...'),
                        },
                    ])
                    .then(() => resolve());
            });
        }
    }
}
