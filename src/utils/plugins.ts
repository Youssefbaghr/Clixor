import fs from 'fs-extra';
import path from 'path';
import { logger } from './logger';

export async function loadPlugins() {
    const projectRoot = path.resolve(__dirname, '../../');
    const pluginsDir = path.join(projectRoot, 'src', 'plugins');

    try {
        // Check if the plugins directory exists
        const exists = await fs.pathExists(pluginsDir);

        if (!exists) {
            logger.warning(
                'Plugins directory does not exist. Skipping plugin loading.'
            );
            return;
        }

        const plugins = await fs.readdir(pluginsDir);

        for (const plugin of plugins) {
            if (plugin.endsWith('.js')) {
                const pluginPath = path.join(pluginsDir, plugin);
                require(pluginPath);
            }
        }
    } catch (error) {
        logger.error('Error loading plugins:', error);
    }
}
