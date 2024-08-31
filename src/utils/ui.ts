import chalk from 'chalk';
import figlet from 'figlet';
import ora from 'ora';
import boxen from 'boxen';
import { version } from '../config';

export function displayBanner() {
    const title = figlet.textSync('Clixor', {
        font: 'ANSI Shadow',
        horizontalLayout: 'full',
    });

    const tagline =
        'A modern CLI for initializing and managing development projects';
    const versionInfo = `v${version}`;

    const banner = boxen(
        chalk.cyan(title) +
            '\n\n' +
            chalk.bold.yellow(tagline) +
            '\n' +
            chalk.dim(versionInfo),
        {
            padding: 1,
            margin: 1,
            borderStyle: 'double',
            borderColor: 'cyan',
            float: 'center',
        }
    );

    const tips = [
        chalk.green('💡 Tip:') +
            ' Use ' +
            chalk.cyan('clixor init') +
            ' to start a new project',
        chalk.green('💡 Tip:') +
            ' Run ' +
            chalk.cyan('clixor --help') +
            ' for a list of commands',
        chalk.green('💡 Tip:') +
            ' Visit ' +
            chalk.underline.blue('https://github.com/Youssefbaghr/Clixor') +
            ' for documentation',
    ];

    console.log(banner);
    console.log(tips.join('\n'));
    console.log(
        '\n' +
            chalk.dim('=' + '='.repeat(process.stdout.columns - 2) + '=') +
            '\n'
    );
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
        boxen(chalk.green(`✅ ${message}`), {
            padding: 1,
            margin: 1,
            borderColor: 'green',
            borderStyle: 'round',
        })
    );
}

export function displayErrorMessage(message: string) {
    console.log(
        boxen(chalk.red(`❌ ${message}`), {
            padding: 1,
            margin: 1,
            borderColor: 'red',
            borderStyle: 'round',
        })
    );
}

export function displayDocumentation() {
    console.clear();
    displayBanner();
    console.log(
        boxen(
            chalk.cyan.bold('📚 Clixor Documentation\n\n') +
                chalk.white('Commands:\n') +
                chalk.yellow('init') +
                ' - Initialize a new project\n' +
                chalk.yellow('config') +
                ' - Manage Clixor configuration\n' +
                chalk.yellow('template') +
                ' - Manage project templates\n\n' +
                chalk.white('For more information, visit: ') +
                chalk.cyan('https://github.com/Youssefbaghr/Clixor'),
            {
                padding: 1,
                margin: 1,
                borderColor: 'cyan',
                borderStyle: 'round',
            }
        )
    );
}
