import { exec } from 'child_process';

export function cloneRepository(
    templateUri: string,
    projectName: string
): Promise<void> {
    return new Promise((resolve, reject) => {
        const command = `git clone ${templateUri} ${projectName}`;
        exec(command, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}
