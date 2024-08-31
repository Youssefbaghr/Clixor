import { exec } from 'child_process';
import path from 'path';

const CLI_PATH = path.resolve(__dirname, '../../../dist/index.js');

jest.setTimeout(60000);

describe('CLI Integration Tests', () => {
  it('should display help information', (done) => {
    exec(`node ${CLI_PATH} --help`, (error, stdout, stderr) => {
      expect(error).toBeNull();
      expect(stderr).toBe('');
      expect(stdout).toContain('Usage:');
      expect(stdout).toContain('Options:');
      expect(stdout).toContain('Commands:');
      done();
    });
  });

  it('should display version information', (done) => {
    exec(`node ${CLI_PATH} --version`, (error, stdout, stderr) => {
      expect(error).toBeNull();
      expect(stderr).toBe('');
      expect(stdout).toMatch(/\d+\.\d+\.\d+/);
      done();
    });
  });

  it('should handle unknown commands', (done) => {
    exec(`node ${CLI_PATH} unknown-command`, (error, stdout, stderr) => {
      expect(error).not.toBeNull();
      expect(stderr).toContain('Unknown command: unknown-command');
      done();
    });
  });
});
