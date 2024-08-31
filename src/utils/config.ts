import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { ClixorConfig } from '../types';

export function getConfigPath(): string {
    return path.join(os.homedir(), '.Clixor-config.json');
}

export async function loadConfig(): Promise<ClixorConfig> {
    try {
        const configPath = getConfigPath();

        if (await fs.pathExists(configPath)) {
            const config = await fs.readJson(configPath);

            return config as ClixorConfig;
        }
        console.log('No existing config found');
        return {} as ClixorConfig;
    } catch (error) {
        console.error('Error loading config:', error);
        return {} as ClixorConfig;
    }
}

export async function saveConfig(config: ClixorConfig): Promise<void> {
    try {
        const configPath = getConfigPath();
        await fs.writeJson(configPath, config, { spaces: 2 });
    } catch (error) {
        console.error('Error saving config:', error);
    }
}

export async function resetConfig(): Promise<void> {
    try {
        const configPath = getConfigPath();
        await fs.remove(configPath);
    } catch (error) {
        console.error('Error resetting config:', error);
    }
}
