import { logger } from './logger';
import chalk from 'chalk';
import { Ora } from 'ora';

export class ClixorError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'ClixorError';
  }
}

export function handleInitError(error: unknown, spinner: Ora): void {
  spinner.fail(chalk.red('Failed to initialize project'));
  logger.error('Project initialization failed');

  if (error instanceof ClixorError) {
    logger.error(`Error code: ${error.code}`);
    logger.error(`Error details: ${error.message}`);
  } else if (error instanceof Error) {
    logger.error(`Error details: ${error.message}`);
    logger.error(`Error stack: ${error.stack}`);
  } else {
    logger.error(`Unexpected error: ${error}`);
  }

  logger.info(
    chalk.yellow('For more help, please visit: https://github.com/Youssefbaghr/Clixor/issues'),
  );
}
