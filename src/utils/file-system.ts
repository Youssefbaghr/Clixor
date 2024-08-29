import fs from 'fs-extra';
import path from 'path';
import { ProjectConfig } from '../types';

export async function createProjectStructure(
    config: ProjectConfig
): Promise<void> {
    const projectPath = path.join(process.cwd(), config.name);

    // Create basic folder structure
    await fs.ensureDir(path.join(projectPath, 'src'));
    await fs.ensureDir(path.join(projectPath, 'tests'));
    await fs.ensureDir(path.join(projectPath, 'docs'));

    // Add README.md
    await fs.writeFile(
        path.join(projectPath, 'README.md'),
        `# ${config.name}\n\nThis project was generated with Clixor.`
    );

    // Add additional files based on selected features
    if (config.features.includes('eslint')) {
        await fs.writeFile(
            path.join(projectPath, '.eslintrc.js'),
            '// ESLint configuration'
        );
    }

    if (config.features.includes('prettier')) {
        await fs.writeFile(
            path.join(projectPath, '.prettierrc'),
            '// Prettier configuration'
        );
    }

    if (config.features.includes('jest')) {
        await fs.writeFile(
            path.join(projectPath, 'jest.config.js'),
            '// Jest configuration'
        );
    }

    if (config.features.includes('github-actions')) {
        await fs.ensureDir(path.join(projectPath, '.github', 'workflows'));
        await fs.writeFile(
            path.join(projectPath, '.github', 'workflows', 'main.yml'),
            '# GitHub Actions workflow'
        );
    }
}
