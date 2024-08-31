import { handleInitError, ClixorError } from '../../../utils/error-handling';
import { logger } from '../../../utils/logger';
import { Ora } from 'ora';

jest.mock('../../../utils/logger');
jest.mock('ora');

describe('Error Handling', () => {
  let mockSpinner: jest.Mocked<Ora>;

  beforeEach(() => {
    mockSpinner = {
      fail: jest.fn(),
    } as unknown as jest.Mocked<Ora>;
  });

  it('should handle ClixorError correctly', () => {
    const error = new ClixorError('Test error', 'TEST_ERROR');
    handleInitError(error, mockSpinner);

    expect(mockSpinner.fail).toHaveBeenCalledWith(
      expect.stringContaining('Failed to initialize project'),
    );
    expect(logger.error).toHaveBeenCalledWith('Project initialization failed');
    expect(logger.error).toHaveBeenCalledWith('Error code: TEST_ERROR');
    expect(logger.error).toHaveBeenCalledWith('Error details: Test error');
  });

  it('should handle standard Error correctly', () => {
    const error = new Error('Standard error');
    handleInitError(error, mockSpinner);

    expect(mockSpinner.fail).toHaveBeenCalledWith(
      expect.stringContaining('Failed to initialize project'),
    );
    expect(logger.error).toHaveBeenCalledWith('Project initialization failed');
    expect(logger.error).toHaveBeenCalledWith('Error details: Standard error');
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('Error stack:'));
  });

  it('should handle unknown errors', () => {
    const error = 'Unknown error';
    handleInitError(error, mockSpinner);

    expect(mockSpinner.fail).toHaveBeenCalledWith(
      expect.stringContaining('Failed to initialize project'),
    );
    expect(logger.error).toHaveBeenCalledWith('Project initialization failed');
    expect(logger.error).toHaveBeenCalledWith('Unexpected error: Unknown error');
  });
});
