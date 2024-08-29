import { loadConfig, saveConfig, resetConfig } from '../utils/config';
import { logger } from '../utils/logger';
import { ClizerConfig } from '../types';

export async function configCommand(options: {
    list?: boolean;
    set?: string;
    reset?: boolean;
}) {
    try {
        if (options.list) {
            const config = await loadConfig();
            logger.info('Current Clizer configuration:');
            console.log(JSON.stringify(config, null, 2));
        } else if (options.set) {
            const [key, value] = options.set.split('=');
            if (!key || !value) {
                throw new Error('Invalid set option. Use format: key=value');
            }
            const config = await loadConfig();
            (config as any)[key] = value;
            await saveConfig(config);
            logger.success(`Configuration updated: ${key} = ${value}`);
        } else if (options.reset) {
            await resetConfig();
            logger.success('Configuration reset to defaults');
        } else {
            logger.warning(
                'No valid option provided. Use --help for usage information.'
            );
        }
    } catch (error) {
        logger.error('Failed to manage configuration', error);
    }
}
