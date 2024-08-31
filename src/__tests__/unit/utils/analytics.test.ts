import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import {
  trackEvent,
  trackProjectCreation,
  trackCommandUsage,
  exportAnalytics,
  getAnalyticsSummary,
  getAnalyticsFilePath,
} from '../../../utils/analytics';
import { ClixorConfig } from '../../../types';

jest.mock('fs-extra');
jest.mock('path');
jest.mock('os');

describe('Analytics Utils', () => {
  const mockHomedir = '/mock/path';
  const mockAnalyticsPath = '/mock/path/.clixor-analytics.json';
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
    (fs.pathExists as jest.Mock).mockResolvedValue(true);
    (fs.readJson as jest.Mock).mockResolvedValue({
      events: [],
      projectCreations: 0,
      commandUsage: {},
    });
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2024-08-31T12:53:23.740Z'));
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  describe('getAnalyticsFilePath', () => {
    it('should return the correct analytics file path', () => {
      expect(getAnalyticsFilePath()).toBe(mockAnalyticsPath);
    });
  });

  describe('trackEvent', () => {
    it('should track an event', async () => {
      await trackEvent('test_event', { data: 'test' });
      expect(fs.writeJson).toHaveBeenCalledWith(
        mockAnalyticsPath,
        expect.objectContaining({
          events: expect.arrayContaining([
            expect.objectContaining({
              event: 'test_event',
              data: { data: 'test' },
              timestamp: '2024-08-31T12:53:23.740Z',
            }),
          ]),
        }),
        { spaces: 2 },
      );
    });
  });

  describe('trackProjectCreation', () => {
    it('should track project creation', async () => {
      await trackProjectCreation(mockConfig);
      expect(fs.writeJson).toHaveBeenCalledWith(
        mockAnalyticsPath,
        expect.objectContaining({
          events: expect.arrayContaining([
            expect.objectContaining({
              event: 'project_created',
              data: expect.objectContaining({
                name: 'test-project',
                template: 'React',
                packageManager: 'npm',
                features: ['eslint'],
              }),
            }),
          ]),
          projectCreations: 1,
        }),
        { spaces: 2 },
      );
    });
  });

  describe('trackCommandUsage', () => {
    it('should track command usage', async () => {
      await trackCommandUsage('init');
      expect(fs.writeJson).toHaveBeenCalledWith(
        mockAnalyticsPath,
        expect.objectContaining({
          events: expect.arrayContaining([
            expect.objectContaining({
              event: 'command_used',
              data: { command: 'init' },
            }),
          ]),
          commandUsage: { init: 1 },
        }),
        { spaces: 2 },
      );
    });
  });

  describe('exportAnalytics', () => {
    it('should export analytics data', async () => {
      const outputPath = '/mock/output/analytics.json';
      await exportAnalytics(outputPath);
      expect(fs.writeJson).toHaveBeenCalledWith(outputPath, expect.any(Object), { spaces: 2 });
    });
  });

  describe('getAnalyticsSummary', () => {
    it('should return analytics summary', async () => {
      const summary = await getAnalyticsSummary();
      expect(summary).toEqual({
        totalProjects: 0,
        recentProjects: [],
        commandUsage: {},
      });
    });
  });
});
