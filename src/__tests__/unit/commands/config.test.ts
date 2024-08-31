import { configCommand } from '../../../commands/config';
import { loadConfig } from '../../../utils/config';
import { logger } from '../../../utils/logger';

jest.mock('../../../utils/config');
jest.mock('../../../utils/logger');

describe('Config Command', () => {
  it('should display current configuration', async () => {
    const mockConfig = { key: 'value' };
    (loadConfig as jest.Mock).mockResolvedValue(mockConfig);

    await configCommand({});

    expect(loadConfig).toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith('Current configuration:');
    expect(logger.info).toHaveBeenCalledWith(JSON.stringify(mockConfig, null, 2));
  });
});
