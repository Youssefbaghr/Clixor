import fs from 'fs-extra';
import path from 'path';
import { ClixorConfig } from '../types';
import { logger } from './logger';

export async function validateProject(config: ClixorConfig): Promise<boolean> {
  const projectPath = path.join(process.cwd(), config.name);

  if (!(await fs.pathExists(projectPath))) {
    logger.error(`Project directory ${config.name} does not exist.`);
    return false;
  }

  const requiredFiles = ['package.json', 'README.md'];
  for (const file of requiredFiles) {
    if (!(await fs.pathExists(path.join(projectPath, file)))) {
      logger.error(`Required file ${file} is missing.`);
      return false;
    }
  }

  logger.success('Project structure validation passed.');
  return true;
}
