import React from 'react';
import { FeatureCard } from '@/components/common/FeatureCard';
import { Zap, Palette, Package } from 'lucide-react';

export const FeatureSection: React.FC = () => (
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
);
