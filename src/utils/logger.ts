import chalk from 'chalk';

export const logger = {
    info: (message: string) => console.log(chalk.blue(message)),
    success: (message: string) => console.log(chalk.green(message)),
    warning: (message: string) => console.log(chalk.yellow(message)),
    error: (message: string, error?: any) => {
        console.error(chalk.red(message));
        if (error) console.error(error);
    },
};
