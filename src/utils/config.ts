import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { ClixorConfig } from '../types';

const CONFIG_FILE = path.join(os.homedir(), '.Clixor-config.json');

export async function loadConfig(): Promise<ClixorConfig> {
    try {
        const config = await fs.readJson(CONFIG_FILE);
        return config as ClixorConfig;
    } catch (error) {
        return {} as ClixorConfig;
    }
}

export async function saveConfig(config: ClixorConfig): Promise<void> {
    await fs.writeJson(CONFIG_FILE, config, { spaces: 2 });
}

export async function resetConfig(): Promise<void> {
    await fs.remove(CONFIG_FILE);
}
