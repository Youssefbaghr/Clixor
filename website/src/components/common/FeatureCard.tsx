import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
  <Card className="bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 border-0">
    <CardHeader>
      <CardTitle className="flex items-center">
        {icon}
        {title}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
        <li>Interactive project setup wizards</li>
        <li>Custom command aliases for frequent tasks</li>
        <li>Real-time validation and error handling</li>
      </ul>
    </CardContent>
  </Card>
);
