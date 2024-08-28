import { exec } from 'child_process';
import { ProjectConfig } from '../types';

export function installDependencies(config: ProjectConfig): Promise<void> {
    return new Promise((resolve, reject) => {
        const command = `cd ${config.name} && ${config.packageManager} install`;
        exec(command, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}
