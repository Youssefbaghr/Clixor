import { exec } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

const CLI_PATH = path.resolve(__dirname, '../../../dist/index.js');
const TEST_PROJECT_NAME = 'test-project-creation';

jest.setTimeout(60000);

describe('Project Creation Integration Test', () => {
  afterEach(async () => {
    await fs.remove(TEST_PROJECT_NAME);
  });

  it('should create a new project with default settings', (done) => {
    exec(`node ${CLI_PATH} init ${TEST_PROJECT_NAME}`, (error, stdout, stderr) => {
      expect(error).toBeNull();
      expect(stderr).toBe('');
      expect(stdout).toContain('Project initialized successfully');

      // Check if project directory was created
      expect(fs.existsSync(TEST_PROJECT_NAME)).toBe(true);

      // Check if package.json exists
      expect(fs.existsSync(path.join(TEST_PROJECT_NAME, 'package.json'))).toBe(true);

      done();
    });
  });

  it('should create a new project with custom template', (done) => {
    exec(
      `node ${CLI_PATH} init ${TEST_PROJECT_NAME} --template Next.js`,
      (error, stdout, stderr) => {
        expect(error).toBeNull();
        expect(stderr).toBe('');
        expect(stdout).toContain('Project initialized successfully');

        // Check if project directory was created
        expect(fs.existsSync(TEST_PROJECT_NAME)).toBe(true);

        // Check if next.config.js exists (specific to Next.js template)
        expect(fs.existsSync(path.join(TEST_PROJECT_NAME, 'next.config.js'))).toBe(true);

        done();
      },
    );
  });
});
