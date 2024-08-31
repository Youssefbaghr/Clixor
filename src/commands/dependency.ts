import { exec } from 'child_process';
import { logger } from '../utils/logger';
import { loadConfig } from '../utils/config';

export async function dependencyCommand(options: {
    add?: string[];
    remove?: string;
    update?: boolean;
}) {
    const { packageManager } = await loadConfig();

    if (options.add) {
        const deps = options.add.join(' ');
        exec(`${packageManager} add ${deps}`, (error, stdout, stderr) => {
            if (error) {
                logger.error(`Failed to add dependencies: ${error.message}`);
                return;
            }
            logger.success(`Dependencies added: ${deps}`);
        });
    } else if (options.remove) {
        exec(
            `${packageManager} remove ${options.remove}`,
            (error, stdout, stderr) => {
                if (error) {
                    logger.error(
                        `Failed to remove dependency: ${error.message}`
                    );
                    return;
                }
                logger.success(`Dependency removed: ${options.remove}`);
            }
        );
    } else if (options.update) {
        exec(`${packageManager} update`, (error, stdout, stderr) => {
            if (error) {
                logger.error(`Failed to update dependencies: ${error.message}`);
                return;
            }
            logger.success('Dependencies updated successfully');
        });
    } else {
        logger.warning(
            'No valid option provided. Use --help for usage information.'
        );
    }
}
