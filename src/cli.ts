import { displayBanner } from './utils/ui';
import { showMainMenu } from './menu';
import { handleCommand } from './commands';
import { loadPlugins } from './utils/plugins';
import { logger } from './utils/logger';

export async function runCLI() {
    try {
        displayBanner();

        // Load plugins
        await loadPlugins();

        const args = process.argv.slice(2);

        if (args.length === 0) {
            await showMainMenu();
        } else {
            await handleCommand(args);
        }
    } catch (error) {
        logger.error('An error occurred in runCLI:', error);
        if (error instanceof Error) {
            logger.error(`Error message: ${error.message}`);
            logger.error(`Error stack: ${error.stack}`);
        }
        process.exit(1);
    }
}
