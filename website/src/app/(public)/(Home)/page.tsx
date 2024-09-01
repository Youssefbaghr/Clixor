import React from 'react';
import { Button } from '@/components/ui/button';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { ArrowRight, GitBranch, Info } from 'lucide-react';
import { FeatureSection } from '@/Sections/FeatureSection';
import { FeatureCard } from '@/components/common/FeatureCard';

export default function Home() {
  return (
    <div className="relative ">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <header className="text-center mb-8 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Welcome to Clixor
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">
            Revolutionize your project setup with the most powerful CLI for effortless development
            initialization.
          </p>
        </header>
        <main>
          <FeatureSection />

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
              <a href="/docs" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full cursor-pointer sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                >
                  Get Started Now
                </Button>
              </a>
              <a href="https://github.com/Youssefbaghr/Clixor" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full cursor-pointer sm:w-auto">
                  <GitBranch className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
              </a>
            </div>
          </section>

          <section className="mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">
              Powerful Features for Modern Development
            </h2>
            <FeatureSection />
          </section>

          <section className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Get Started in Seconds</h2>

            <Button
              className="mt-4 sm:mt-6 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 w-full sm:w-auto"
              size="lg"
              asChild
            >
              <a href="/docs/quick-start">
                Quick Start Guide
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </section>

          <section className="mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">
              About Clixor
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              <FeatureCard
                title="About Us"
                description="Learn more about the team behind Clixor and our mission to simplify development."
                icon={<Info className="h-6 w-6 mr-2 text-blue-500" />}
              />
              <FeatureCard
                title="How It Works"
                description="Discover how Clixor works and how it can benefit your development workflow."
                icon={<Info className="h-6 w-6 mr-2 text-yellow-500" />}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
