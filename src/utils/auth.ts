import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import bcrypt from 'bcrypt';
import inquirer from 'inquirer';

const AUTH_FILE = path.join(os.homedir(), '.clixor-auth.json');

interface AuthData {
    adminPasswordHash: string;
}

async function loadAuthData(): Promise<AuthData> {
    if (await fs.pathExists(AUTH_FILE)) {
        return await fs.readJson(AUTH_FILE);
    }
    return { adminPasswordHash: '' };
}

async function saveAuthData(data: AuthData): Promise<void> {
    await fs.writeJson(AUTH_FILE, data, { spaces: 2 });
}

export async function setAdminPassword(): Promise<void> {
    const { password } = await inquirer.prompt([
        {
            type: 'password',
            name: 'password',
            message: 'Enter new admin password:',
            validate: (input) =>
                input.length >= 8 ||
                'Password must be at least 8 characters long',
        },
    ]);

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await saveAuthData({ adminPasswordHash: hash });
    console.log('Admin password set successfully.');
}

export async function verifyAdminPassword(): Promise<boolean> {
    const authData = await loadAuthData();

    if (!authData.adminPasswordHash) {
        console.log('Admin password not set. Please set it first.');
        return false;
    }

    const { password } = await inquirer.prompt([
        {
            type: 'password',
            name: 'password',
            message: 'Enter admin password:',
        },
    ]);

    return bcrypt.compare(password, authData.adminPasswordHash);
}
