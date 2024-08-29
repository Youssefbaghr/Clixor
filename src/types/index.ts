export interface ProjectConfig {
    name: string;
    template: string;
    branch: string;
    packageManager: 'npm' | 'yarn' | 'bun';
    features: string[];
}

export interface ClixorConfig extends ProjectConfig {
    customTemplates?: Record<string, string>;
    [key: string]: any;
}
