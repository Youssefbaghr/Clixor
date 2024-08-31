import { loadConfig } from '../utils/config';
import { logger } from '../utils/logger';

export async function configCommand(options: any) {
  const config = await loadConfig();
  logger.info('Current configuration:');
  logger.info(JSON.stringify(config, null, 2));
}
