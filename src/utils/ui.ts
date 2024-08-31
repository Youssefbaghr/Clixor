import chalk from 'chalk';
import figlet from 'figlet';
import ora from 'ora';
import boxen from 'boxen';

export function displayBanner() {
    console.log(
        chalk.cyan(
            figlet.textSync('Clixor', {
                font: 'ANSI Shadow',
                horizontalLayout: 'full',
            })
        )
    );
    console.log(
        boxen(
            chalk.cyan(
                'A modern CLI for initializing and managing development projects'
            ) +
                '\n' +
                chalk.yellow('Version: 1.0.1'),
            { padding: 1, borderColor: 'cyan', borderStyle: 'round' }
        )
    );
    console.log(chalk.green("\nLet's create your project!\n"));
}

export function createSpinner(text: string) {
    return ora({
        text,
        spinner: 'dots12',
        color: 'cyan',
    });
}

export function displaySuccessMessage(message: string) {
    console.log(
        boxen(chalk.green(message), {
            padding: 1,
            borderColor: 'green',
            borderStyle: 'round',
        })
    );
}

export function displayErrorMessage(message: string) {
    console.log(
        boxen(chalk.red(message), {
            padding: 1,
            borderColor: 'red',
            borderStyle: 'round',
        })
    );
}
