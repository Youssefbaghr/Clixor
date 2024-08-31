import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { loadConfig, saveConfig, resetConfig, getConfigPath } from '../../../utils/config';
import { ClixorConfig } from '../../../types';

jest.mock('fs-extra');
jest.mock('path');
jest.mock('os');

describe('Config Utils', () => {
  const mockHomedir = '/mock/path';
  const mockConfigPath = '/mock/path/.Clixor-config.json';
  const mockConfig: ClixorConfig = {
    name: 'test-project',
    template: 'React',
    packageManager: 'npm',
    features: ['eslint'],
    branch: 'main',
  };

  beforeEach(() => {
    (os.homedir as jest.Mock).mockReturnValue(mockHomedir);
    (path.join as jest.Mock).mockImplementation((...args: string[]) => args.join('/'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getConfigPath', () => {
    it('should return the correct config path', () => {
      expect(getConfigPath()).toBe(mockConfigPath);
    });
  });

  describe('loadConfig', () => {
    it('should load existing config', async () => {
      (fs.pathExists as jest.Mock).mockResolvedValue(true);
      (fs.readJson as jest.Mock).mockResolvedValue(mockConfig);

      const result = await loadConfig();
      expect(result).toEqual(mockConfig);
      expect(fs.pathExists).toHaveBeenCalledWith(mockConfigPath);
      expect(fs.readJson).toHaveBeenCalledWith(mockConfigPath);
    });

    it('should return empty object if config does not exist', async () => {
      (fs.pathExists as jest.Mock).mockResolvedValue(false);

      const result = await loadConfig();
      expect(result).toEqual({});
      expect(fs.pathExists).toHaveBeenCalledWith(mockConfigPath);
      expect(fs.readJson).not.toHaveBeenCalled();
    });
  });

  describe('saveConfig', () => {
    it('should save config', async () => {
      await saveConfig(mockConfig);
      expect(fs.writeJson).toHaveBeenCalledWith(mockConfigPath, mockConfig, { spaces: 2 });
    });
  });

  describe('resetConfig', () => {
    it('should reset config', async () => {
      await resetConfig();
      expect(fs.remove).toHaveBeenCalledWith(mockConfigPath);
    });
  });
});
