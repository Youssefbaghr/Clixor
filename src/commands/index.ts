import chalk from 'chalk';
import { initCommand } from './init';
import { configCommand } from './config';
import { templateCommand } from './template';
import { dependencyCommand } from './dependency';
import { promptInitOptions } from '../prompts';
import { analyticsCommand } from './analytics';
import { trackCommandUsage } from '../utils/analytics';

export async function handleCommand(args: string[]) {
    const command = args[0];
    trackCommandUsage(command);
    switch (command) {
        case 'init':
            const options = await promptInitOptions();
            await initCommand(options);
            break;
        case 'config':
            await configCommand({});
            break;
        case 'template':
            await templateCommand({});
            break;
        case 'dependency':
            await dependencyCommand({
                add: args.includes('--add')
                    ? args.slice(args.indexOf('--add') + 1)
                    : undefined,
                remove: args.includes('--remove')
                    ? args[args.indexOf('--remove') + 1]
                    : undefined,
                update: args.includes('--update'),
            });
            break;
        case 'analytics':
            await analyticsCommand({
                export: args.includes('--export')
                    ? args[args.indexOf('--export') + 1]
                    : undefined,
                summary: args.includes('--summary'),
                setPassword: args.includes('--set-password'),
            });
            break;
        default:
            console.log(chalk.red(`Unknown command: ${command}`));
            displayHelp();
    }
}

function displayHelp() {
    console.log(chalk.cyan('\nAvailable commands:'));
    console.log('  init       Initialize a new project');
    console.log('  config     Manage Clixor configuration');
    console.log('  template   Manage project templates');
    console.log('  dependency Manage project dependencies');
    console.log('  analytics  Manage analytics (admin only)');
    console.log('    --export <file>    Export analytics data');
    console.log('    --summary          View analytics summary');
    console.log('    --set-password     Set admin password');
    console.log('\nRun without commands to use the interactive menu.');
}
