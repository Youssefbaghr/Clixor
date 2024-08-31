import { templateUrls } from '../config/templates';

export interface ProjectConfig {
    name: string;
    template: string;
    branch: string;
    packageManager: 'npm' | 'yarn' | 'bun';
    features: string[];
    frontendName?: string;
    backendName?: string;
}

export interface ClixorConfig extends ProjectConfig {
    customTemplates?: Record<string, string>;
    nextjsType?: 'with-express-api' | 'with-server-actions';
    templateUri?: string;
    hooks?: {
        'post-init'?: string;
        [key: string]: string | undefined;
    };
    [key: string]: any;
}

export type TemplateType = keyof typeof templateUrls;

export interface Clixor {
    addCommand: (
        name: string,
        handler: (args: string[]) => Promise<void>
    ) => void;
}
