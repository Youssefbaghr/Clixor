import { exec, ExecException } from 'child_process';
import { ClixorConfig } from '../types';
import { logger } from './logger';

export async function executeHooks(config: ClixorConfig): Promise<void> {
    if (config.hooks?.['post-init']) {
        logger.info('Executing post-init hook...');
        const postInitHook = config.hooks['post-init'];
        if (typeof postInitHook === 'string') {
            return new Promise<void>((resolve, reject) => {
                exec(
                    postInitHook,
                    { cwd: config.name },
                    (
                        error: ExecException | null,
                        stdout: string,
                        stderr: string
                    ) => {
                        if (error) {
                            logger.error(
                                'Failed to execute post-init hook',
                                error
                            );
                            reject(error);
                        } else {
                            logger.success(
                                'Post-init hook executed successfully'
                            );
                            resolve();
                        }
                    }
                );
            });
        } else {
            logger.error('Post-init hook is not a string. Skipping...');
            return Promise.resolve();
        }
    } else {
        logger.info('No post-init hook found. Skipping...');
        return Promise.resolve();
    }
}
