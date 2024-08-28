import { loadConfig, saveConfig } from '../utils/config';
import { logger } from '../utils/logger';
import { ClizerConfig } from '../types';

export async function templateCommand(options: {
    list?: boolean;
    add?: string[];
    remove?: string;
}) {
    try {
        const config = (await loadConfig()) as ClizerConfig;
        config.customTemplates = config.customTemplates || {};

        if (options.list) {
            logger.info('Available templates:');
            Object.entries(config.customTemplates).forEach(([name, url]) => {
                console.log(`${name}: ${url}`);
            });
        } else if (options.add && options.add.length === 2) {
            const [name, url] = options.add;
            config.customTemplates[name] = url;
            await saveConfig(config);
            logger.success(`Template added: ${name} (${url})`);
        } else if (options.remove) {
            if (config.customTemplates[options.remove]) {
                delete config.customTemplates[options.remove];
                await saveConfig(config);
                logger.success(`Template removed: ${options.remove}`);
            } else {
                logger.warning(`Template not found: ${options.remove}`);
            }
        } else {
            logger.warning(
                'No valid option provided. Use --help for usage information.'
            );
        }
    } catch (error) {
        logger.error('Failed to manage templates', error);
    }
}
