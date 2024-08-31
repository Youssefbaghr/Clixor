import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { Clixor } from '../types';

export const ComponentGeneratorPlugin = {
    name: 'ComponentGeneratorPlugin',
    description: 'Generates basic component structure for React or Next.js',
    init: (clixor: Clixor) => {
        clixor.addCommand('generate:component', async (args: string[]) => {
            if (args.length < 2) {
                console.log(
                    chalk.red(
                        'Error: Please provide a component name and type (react/next).'
                    )
                );
                console.log(
                    chalk.yellow(
                        'Usage: clixor generate:component <name> <react|next>'
                    )
                );
                return;
            }

            const [componentName, componentType] = args;
            const projectRoot = process.cwd();

            if (!['react', 'next'].includes(componentType.toLowerCase())) {
                console.log(
                    chalk.red(
                        'Error: Invalid component type. Use "react" or "next".'
                    )
                );
                return;
            }

            const componentDir = path.join(
                projectRoot,
                'src',
                'components',
                componentName
            );
            await fs.ensureDir(componentDir);

            if (componentType.toLowerCase() === 'react') {
                await generateReactComponent(componentDir, componentName);
            } else {
                await generateNextComponent(componentDir, componentName);
            }

            console.log(
                chalk.green(`Component ${componentName} created successfully!`)
            );
        });
    },
};

async function generateReactComponent(
    componentDir: string,
    componentName: string
): Promise<void> {
    const componentContent = `import React from 'react';
import styles from './${componentName}.module.css';

interface ${componentName}Props {
    // Define your props here
}

const ${componentName}: React.FC<${componentName}Props> = () => {
    return (
        <div className={styles.${componentName.toLowerCase()}}>
            <h2>${componentName} Component</h2>
        </div>
    );
};

export default ${componentName};
`;

    const cssContent = `.${componentName.toLowerCase()} {
    /* Add your styles here */
}
`;

    await fs.writeFile(
        path.join(componentDir, `${componentName}.tsx`),
        componentContent
    );
    await fs.writeFile(
        path.join(componentDir, `${componentName}.module.css`),
        cssContent
    );
}

async function generateNextComponent(
    componentDir: string,
    componentName: string
): Promise<void> {
    const componentContent = `import React from 'react';
import styles from './${componentName}.module.css';

interface ${componentName}Props {
    // Define your props here
}

const ${componentName}: React.FC<${componentName}Props> = () => {
    return (
        <div className={styles.${componentName.toLowerCase()}}>
            <h2>${componentName} Component</h2>
        </div>
    );
};

export default ${componentName};
`;

    const cssContent = `.${componentName.toLowerCase()} {
    /* Add your styles here */
}
`;

    await fs.writeFile(
        path.join(componentDir, `${componentName}.tsx`),
        componentContent
    );
    await fs.writeFile(
        path.join(componentDir, `${componentName}.module.css`),
        cssContent
    );
}
