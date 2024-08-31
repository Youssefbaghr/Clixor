import { exec } from 'child_process';

export function cloneRepository(
    templateUri: string | undefined,
    projectName: string
): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!templateUri) {
            reject(new Error('Template URI is undefined'));
            return;
        }
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
