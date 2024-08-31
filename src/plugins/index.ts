import { PluginInterface } from './types';

class PluginManager {
  private plugins: Map<string, PluginInterface> = new Map();

  registerPlugin(plugin: PluginInterface): void {
    this.plugins.set(plugin.name, plugin);
    plugin.initialize();
  }

  async executePlugin(name: string, context: any): Promise<any> {
    const plugin = this.plugins.get(name);
    if (!plugin) {
      throw new Error(`Plugin "${name}" not found`);
    }
    return await plugin.execute(context);
  }

  getPlugins(): PluginInterface[] {
    return Array.from(this.plugins.values());
  }
}

export const pluginManager = new PluginManager();
