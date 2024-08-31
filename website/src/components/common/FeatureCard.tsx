import React from 'react';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="border-0 bg-white/10 dark:bg-white/5 backdrop-blur-lg hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center space-x-2">
          {icon}
          <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
        </div>
        <CardDescription className="text-gray-700 dark:text-gray-300">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
