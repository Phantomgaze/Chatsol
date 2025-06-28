'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

export default function DarkModetoggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg border">
      <h2 className="text-lg font-semibold">Theme</h2>
      <div className="flex gap-4">
        <Button
          variant={theme === 'light' ? 'default' : 'outline'}
          onClick={() => setTheme('light')}
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </Button>
        <Button
          variant={theme === 'dark' ? 'default' : 'outline'}
          onClick={() => setTheme('dark')}
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </Button>
        <Button
          variant={theme === 'system' ? 'default' : 'outline'}
          onClick={() => setTheme('system')}
        >
          System
        </Button>
      </div>
    </div>
  );
}
