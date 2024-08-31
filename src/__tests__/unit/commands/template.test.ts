import { templateCommand } from '../../../commands/template';
import { loadConfig, saveConfig } from '../../../utils/config';
import { logger } from '../../../utils/logger';

jest.mock('../../../utils/config');
jest.mock('../../../utils/logger');
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('Template Command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should list templates when --list option is provided', async () => {
    (loadConfig as jest.Mock).mockResolvedValue({
      customTemplates: { react: 'https://github.com/example/react-template.git' },
    });

    await templateCommand({ list: true });

    expect(loadConfig).toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith('Available templates:');
    expect(console.log).toHaveBeenCalledWith(
      'react: https://github.com/example/react-template.git',
    );
  });

  it('should add a new template when --add option is provided', async () => {
    (loadConfig as jest.Mock).mockResolvedValue({ customTemplates: {} });

    await templateCommand({ add: ['new-template', 'https://github.com/example/new-template.git'] });

    expect(loadConfig).toHaveBeenCalled();
    expect(saveConfig).toHaveBeenCalledWith(
      expect.objectContaining({
        customTemplates: { 'new-template': 'https://github.com/example/new-template.git' },
      }),
    );
    expect(logger.success).toHaveBeenCalledWith(
      'Template added: new-template (https://github.com/example/new-template.git)',
    );
  });

  it('should remove a template when --remove option is provided', async () => {
    (loadConfig as jest.Mock).mockResolvedValue({
      customTemplates: { 'old-template': 'https://github.com/example/old-template.git' },
    });

    await templateCommand({ remove: 'old-template' });

    expect(loadConfig).toHaveBeenCalled();
    expect(saveConfig).toHaveBeenCalledWith(expect.objectContaining({ customTemplates: {} }));
    expect(logger.success).toHaveBeenCalledWith('Template removed: old-template');
  });

  it('should handle errors', async () => {
    (loadConfig as jest.Mock).mockRejectedValue(new Error('Template error'));

    await templateCommand({ list: true });

    expect(logger.error).toHaveBeenCalledWith('Failed to manage templates', expect.any(Error));
  });
});
