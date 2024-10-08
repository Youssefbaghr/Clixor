import fs from 'fs-extra';
import path from 'path';
import { ClixorConfig } from '../types';
import { logger } from './logger';

export async function createProjectStructure(
    config: ClixorConfig
): Promise<void> {
    try {
        const projectPath = path.join(process.cwd(), config.name);
        const frontendPath = config.frontendName
            ? path.join(projectPath, config.frontendName)
            : projectPath;
        const backendPath = config.backendName
            ? path.join(projectPath, config.backendName)
            : null;

        // Create basic folder structure
        await fs.ensureDir(path.join(frontendPath, 'src'));
        await fs.ensureDir(path.join(frontendPath, 'tests'));
        await fs.ensureDir(path.join(frontendPath, 'docs'));

        if (backendPath) {
            await fs.ensureDir(path.join(backendPath, 'src'));
            await fs.ensureDir(path.join(backendPath, 'tests'));
        }

        // Add README.md
        await fs.writeFile(
            path.join(projectPath, 'README.md'),
            `# ${config.name}\n\nThis project was generated with Clixor.`
        );

        // Add additional files based on selected features
        if (config.features.includes('eslint')) {
            await fs.writeFile(
                path.join(frontendPath, '.eslintrc.js'),
                '// ESLint configuration'
            );
        }

        if (config.features.includes('prettier')) {
            await fs.writeFile(
                path.join(frontendPath, '.prettierrc'),
                '// Prettier configuration'
            );
        }

        if (config.features.includes('jest')) {
            await fs.writeFile(
                path.join(frontendPath, 'jest.config.js'),
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

        if (config.features.includes('docker')) {
            await fs.writeFile(
                path.join(frontendPath, 'Dockerfile'),
                '# Dockerfile for frontend'
            );
            if (backendPath) {
                await fs.writeFile(
                    path.join(backendPath, 'Dockerfile'),
                    '# Dockerfile for backend'
                );
            }
        }

        logger.info('Project structure created successfully');
    } catch (error) {
        logger.error('Failed to create project structure', error);
        throw error;
    }
}

// Add a new function to clean up project files
export async function cleanupProjectFiles(projectPath: string): Promise<void> {
    try {
        const filesToRemove = ['.git', 'LICENSE', 'CONTRIBUTING.md'];
        for (const file of filesToRemove) {
            await fs.remove(path.join(projectPath, file));
        }
        logger.info('Cleaned up unnecessary project files');
    } catch (error) {
        logger.error('Failed to clean up project files', error);
        throw error;
    }
}
