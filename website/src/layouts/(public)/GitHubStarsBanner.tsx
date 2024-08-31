'use client';

import React, { useState, useEffect } from 'react';
import { X, Star, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

const GitHubStarsBanner: React.FC = () => {
  const [stars, setStars] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/Youssefbaghr/Clixor`);
        const data = await response.json();
        setStars(data.stargazers_count);
      } catch (error) {
        console.error('Error fetching GitHub stars:', error);
      }
    };

    fetchStars();
    const interval = setInterval(fetchStars, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (!isVisible || stars === null) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className={`
            ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-purple-900 via-violet-950 to-purple-900'
                : 'bg-gradient-to-r from-purple-100 via-violet-200 to-purple-100'
            }
            ${theme === 'dark' ? 'text-white' : 'text-purple-900'}
            py-3 px-4 relative shadow-lg
          `}
        >
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center justify-center ${
                  theme === 'dark' ? 'bg-white' : 'bg-purple-900'
                } rounded-full p-2`}
              >
                <Github
                  className={`h-5 w-5 ${theme === 'dark' ? 'text-purple-900' : 'text-white'}`}
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                <span className="font-bold text-sm sm:text-base">{stars.toLocaleString()}</span>
                <span
                  className={`text-xs sm:text-sm ${
                    theme === 'dark' ? 'text-purple-200' : 'text-purple-700'
                  }`}
                >
                  GitHub stars
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="outline"
                size="sm"
                className={`
                  ${
                    theme === 'dark'
                      ? 'text-white border-white hover:bg-white hover:text-purple-900'
                      : 'text-purple-900 border-purple-900 hover:bg-purple-900 hover:text-white'
                  }
                  transition-colors duration-200
                `}
                onClick={() => window.open(`https://github.com/Youssefbaghr/Clixor`, '_blank')}
              >
                <Star className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Star on GitHub</span>
                <span className="sm:hidden">Star</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`
                  ${
                    theme === 'dark'
                      ? 'text-white hover:bg-white/20'
                      : 'text-purple-900 hover:bg-purple-900/20'
                  }
                  transition-colors duration-200
                `}
                onClick={() => setIsVisible(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GitHubStarsBanner;
