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
    [key: string]: any;
}
