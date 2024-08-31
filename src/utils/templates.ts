import { ClixorConfig } from '../types';
import { logger } from './logger';
import { cloneRepository } from './git';
import { cleanupProjectFiles } from './file-system';

export async function setupProjectFromTemplate(
    config: ClixorConfig
): Promise<void> {
    try {
        if (!config.templateUri) {
            throw new Error('Template URI is undefined');
        }

        if (!config.name) {
            throw new Error('Project name is undefined');
        }

        await cloneRepository(config.templateUri, config.name);

        await cleanupProjectFiles(config.name);

        logger.success(`Project setup from template: ${config.template}`);
    } catch (error) {
        logger.error('Failed to setup project from template', error);
        throw error;
    }
}
