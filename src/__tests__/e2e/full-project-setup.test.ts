import { exec } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

const CLI_PATH = path.resolve(__dirname, '../../../dist/index.js');
const TEST_PROJECT_NAME = 'test-project';

jest.setTimeout(60000);

describe('Full Project Setup E2E Test', () => {
  afterEach(async () => {
    await fs.remove(TEST_PROJECT_NAME);
  });

  it('should set up a complete project', (done) => {
    exec(`node ${CLI_PATH} init ${TEST_PROJECT_NAME} --template React`, (error, stdout, stderr) => {
      expect(error).toBeNull();
      expect(stderr).toBe('');
      expect(stdout).toContain('Project initialized successfully');

      // Check if project directory was created
      expect(fs.existsSync(TEST_PROJECT_NAME)).toBe(true);

      // Check if package.json exists
      expect(fs.existsSync(path.join(TEST_PROJECT_NAME, 'package.json'))).toBe(true);

      // Check if src directory exists
      expect(fs.existsSync(path.join(TEST_PROJECT_NAME, 'src'))).toBe(true);

      done();
    });
  });
});
