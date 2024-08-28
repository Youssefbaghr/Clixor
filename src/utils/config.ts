import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { ClizerConfig } from '../types';

const CONFIG_FILE = path.join(os.homedir(), '.clizer-config.json');

export async function loadConfig(): Promise<ClizerConfig> {
    try {
        const config = await fs.readJson(CONFIG_FILE);
        return config as ClizerConfig;
    } catch (error) {
        return {} as ClizerConfig;
    }
}

export async function saveConfig(config: ClizerConfig): Promise<void> {
    await fs.writeJson(CONFIG_FILE, config, { spaces: 2 });
}

export async function resetConfig(): Promise<void> {
    await fs.remove(CONFIG_FILE);
}
