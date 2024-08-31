import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Clixor</h1>
        <p className="text-xl text-muted-foreground">
          Streamline your project setup with the modern CLI for effortless development
          initialization.
        </p>
      </header>

      <main>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <FeatureCard
            title="Quick Project Initialization"
            description="Bootstrap your projects in seconds using predefined or custom templates."
          />
          <FeatureCard
            title="Customizable Templates"
            description="Easily manage and use your own project templates for consistent setups."
          />
          <FeatureCard
            title="Multiple Package Managers"
            description="Seamless support for npm, Yarn, and Bun to fit your workflow."
          />
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
          <div className="space-x-4">
            <Button asChild>
              <Link href="/docs">Read the Docs</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://github.com/Youssefbaghr/Clixor">View on GitHub</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
