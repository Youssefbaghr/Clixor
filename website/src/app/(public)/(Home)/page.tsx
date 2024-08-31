import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { ArrowRight, Code, Palette, Zap, Terminal, Package, GitBranch } from 'lucide-react';
import { FeatureCard } from '@/components/common/FeatureCard';

export default function Home() {
  return (
    <div className="relative">
      <BackgroundBeams />
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <header className="text-center mb-8 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Welcome to Clixor
          </h1>
          <TextGenerateEffect
            words="Revolutionize your project setup with the most powerful CLI for effortless development initialization."
            className="text-lg sm:text-xl text-gray-700 dark:text-gray-300"
          />
        </header>

        <main>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-16">
            <FeatureCard
              title="Lightning-Fast Setup"
              description="Initialize projects in seconds with our optimized templates and workflows."
              icon={<Zap className="h-8 w-8 text-yellow-500" />}
            />
            <FeatureCard
              title="Customizable to the Core"
              description="Tailor your development environment with flexible, customizable templates."
              icon={<Palette className="h-8 w-8 text-indigo-500" />}
            />
            <FeatureCard
              title="Multi-Package Support"
              description="Seamlessly work with npm, Yarn, or Bun - your choice, your workflow."
              icon={<Package className="h-8 w-8 text-green-500" />}
            />
          </section>

          <TracingBeam className="px-2 sm:px-6 mb-8 sm:mb-16">
            <div className="max-w-2xl mx-auto antialiased pt-4 relative">
              <h2 className="text-3xl font-bold mb-8 text-center">Why Developers Love Clixor</h2>
              {[
                {
                  title: 'Boost Productivity',
                  description:
                    'Clixor automates repetitive setup tasks, allowing you to focus on writing code that matters. Start new projects in minutes, not hours.',
                },
                {
                  title: 'Consistent Codebase',
                  description:
                    'Ensure all your projects follow best practices and maintain a consistent structure. Perfect for teams and maintaining standards across projects.',
                },
                {
                  title: 'Extensible Architecture',
                  description:
                    'Easily extend Clixor with plugins and custom scripts. Tailor the CLI to fit your unique development needs and workflows.',
                },
              ].map((feature, i) => (
                <div key={i} className="mb-10">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </TracingBeam>

          <section className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">
              Ready to Supercharge Your Development?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
              >
                <Link href="/docs">Get Started Now</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                <Link href="https://github.com/Youssefbaghr/Clixor">
                  <GitBranch className="mr-2 h-4 w-4" />
                  View on GitHub
                </Link>
              </Button>
            </div>
          </section>

          <section className="mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">
              Powerful Features for Modern Development
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              <Card className="bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Terminal className="h-6 w-6 mr-2 text-purple-500" />
                    Smart CLI
                  </CardTitle>
                  <CardDescription>
                    Intuitive command-line interface with intelligent prompts and auto-completion.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Interactive project setup wizards</li>
                    <li>Custom command aliases for frequent tasks</li>
                    <li>Real-time validation and error handling</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20 border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="h-6 w-6 mr-2 text-pink-500" />
                    Template Ecosystem
                  </CardTitle>
                  <CardDescription>
                    Access a rich library of project templates for various frameworks and stacks.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Pre-configured setups for popular frameworks</li>
                    <li>Custom template creation and sharing</li>
                    <li>Version-controlled template management</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Get Started in Seconds</h2>

            <Button
              className="mt-4 sm:mt-6 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 w-full sm:w-auto"
              size="lg"
              asChild
            >
              <Link href="/docs/quick-start">
                Quick Start Guide <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </section>
        </main>
      </div>
    </div>
  );
}
