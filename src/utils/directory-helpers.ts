import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { ClixorConfig } from '../types';
import { logger } from '../utils/logger';
import ora from 'ora';

export async function handleExistingDirectory(
  config: ClixorConfig,
  spinner: ora.Ora,
): Promise<void> {
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
      process.exit(0);
    }

    const { newName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'newName',
        message: 'Enter a new project name:',
        validate: (input) => input.trim() !== '' || 'Project name cannot be empty',
      },
    ]);

    config.name = newName.trim();
    spinner.start();
  }
}
