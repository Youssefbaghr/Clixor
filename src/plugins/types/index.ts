export interface PluginInterface {
  name: string;
  version: string;
  initialize: () => void;
  execute: (context: any) => Promise<any>;
}
