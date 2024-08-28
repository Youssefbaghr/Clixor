import chalk from 'chalk';
import figlet from 'figlet';

export function displayBanner() {
    console.log(
        chalk.cyan(
            figlet.textSync('Clizer', {
                font: 'Standard',
                horizontalLayout: 'full',
            })
        )
    );
    console.log(
        chalk.cyan(
            'A modern CLI for initializing and managing development projects\n'
        )
    );
}
