'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GitHubStarsBanner: React.FC = () => {
  const [stars, setStars] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/repos/Youssefbaghr/Clixor`)
      .then((response) => response.json())
      .then((data) => setStars(data.stargazers_count))
      .catch((error) => console.error('Error fetching GitHub stars:', error));
  }, []);

  if (!isVisible || stars === null) return null;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl">⭐</span>
          <span className="font-semibold">
            Star us on GitHub! We have {stars.toLocaleString()} stars.
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </div>
  );
};

export default GitHubStarsBanner;
