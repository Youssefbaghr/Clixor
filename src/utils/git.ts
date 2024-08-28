import { exec } from 'child_process';
import { ProjectConfig } from '../types';

export function cloneRepository(config: ProjectConfig): Promise<void> {
    return new Promise((resolve, reject) => {
        const command = `git clone -b ${config.branch} ${config.template} ${config.name}`;
        exec(command, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}
