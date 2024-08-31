<div align="center">

# 🚀 Clixor

<img src="https://path-to-your-logo.png" alt="Clixor Logo" width="200"/>

[![Version](https://img.shields.io/badge/version-1.0.1-blue.svg)](https://github.com/Youssefbaghr/Clixor)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

Streamline your project setup with Clixor - the modern CLI for effortless development
initialization.

[Installation](#installation) • [Usage](#usage) • [Features](#features) •
[Contributing](#contributing) • [Support](#support)

</div>

---

## 🌟 Features

- 🏗️ **Project Initialization**: Quickly bootstrap projects using predefined or custom templates
- 🎨 **Customizable Templates**: Easily manage and use your own project templates
- 🧭 **Interactive Setup**: User-friendly prompts guide you through project configuration
- 📦 **Multiple Package Managers**: Seamless support for npm, Yarn, and Bun
- 🛠️ **Optional Tooling**: Integrate popular tools like ESLint, Prettier, Jest, and Docker with ease
- ⚙️ **Flexible Configuration**: Persist and manage your preferences for future use

## 🚀 Quick Start

```bash
npx clixor init my-awesome-project
```

This command initializes a new project named "my-awesome-project" using Clixor's interactive setup.

## 📦 Installation

### Prerequisites

- Node.js (v14 or later)
- Git

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Youssefbaghr/Clixor.git
   cd Clixor
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Link the CLI globally:**

   ```bash
   npm link
   ```

## 🖥️ Usage

### Initialize a New Project

```bash
clixor init
```

Follow the interactive prompts to configure your project.

### Manage Configuration

```bash
clixor config --list
clixor config --set templateDir=/path/to/templates
clixor config --reset
```

### Manage Templates

```bash

clixor template --list
clixor template --add react-ts https://github.com/example/react-ts-template.git
clixor template --remove react-ts

```

## 🛠️ Configuration

Clixor uses a JSON configuration file stored at `~/.Clixor-config.json`. You can edit this file
directly or use the `clixor config` command.

Example configuration:

```json
{
  "defaultTemplate": "react",
  "packageManager": "npm",
  "features": ["eslint", "prettier"],
  "customTemplates": {
    "react-ts": "https://github.com/example/react-ts-template.git"
  }
}
```

## 🧩 Extending Clixor

### Creating Custom Templates

1. Create a Git repository with your project structure
2. Add a `clixor.json` file to specify template options:
   ```json
   {
     "variables": ["projectName", "author"],
     "scripts": {
       "post-init": "npm run setup"
     }
   }
   ```
3. Add the template using `clixor template --add`

### Creating Plugins

Clixor supports a plugin system that allows you to extend its functionality. Here's how to create a
plugin:

1. Create a new TypeScript file in the `src/plugins` directory.
2. Import the `PluginInterface` from `src/plugins/types/index.ts`.
3. Create a class that implements the `PluginInterface`.
4. Implement the required methods:
   - `name`: A string identifier for your plugin.
   - `version`: The version of your plugin.
   - `initialize`: A method called when the plugin is registered.
   - `execute`: The main functionality of your plugin.

Example plugin:

```typescript
import { PluginInterface } from '../types';
export class MyCustomPlugin implements PluginInterface {
name = 'MyCustomPlugin';
version = '1.0.0';
initialize(): void {
console.log('MyCustomPlugin initialized');
}
async execute(context: any): Promise<string> {
return MyCustomPlugin executed with context: ${JSON.stringify(context)};
}
}
```

To use your plugin, register it in the `src/utils/plugins.ts` file:

```typescript
import { MyCustomPlugin } from '../plugins/MyCustomPlugin';
// In the loadPlugins function
const myCustomPlugin = new MyCustomPlugin();
myCustomPlugin.initialize();
// Add logic to use the plugin as needed
```

Plugins allow you to add new commands, modify existing functionality, or integrate with external
services to enhance Clixor's capabilities.

## 🤝 Contributing

We love our contributors! ❤️ Check out the [CONTRIBUTORS.md](CONTRIBUTORS.md) file to see the
amazing people who have helped make Clixor awesome.

Want to join this list of amazing people? We'd love your help! Here's how you can contribute:

1. 🍴 Fork the repository
2. 🌿 Create a new branch
3. ✨ Make your changes
4. 🔧 Test your changes
5. 📤 Submit a pull request

For more detailed information, please read our [Contributing Guide](Docs/CONTRIBUTING.md).

Whether it's submitting a bug report, proposing a new feature, or improving documentation - every
contribution counts!

## 📜 Changelog

See [CHANGELOG.md](Docs/CHANGELOG.md) for a history of changes to this project.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Commander.js](https://github.com/tj/commander.js/) - CLI framework
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) - Interactive prompts
- [Chalk](https://github.com/chalk/chalk) - Terminal styling

---

<div align="center">
Made with ❤️ by the Clixor Team
</div>
