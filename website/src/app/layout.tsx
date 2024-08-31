import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/providers/themeProvider';
import { Navbar } from '@/layouts/(public)/Navbar';
import { Footer } from '@/layouts/(public)/Footer';
import GitHubStarsBanner from '@/layouts/(public)/GitHubStarsBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Clixor - Modern CLI for Project Initialization',
  description: 'Streamline your project setup with Clixor',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GitHubStarsBanner />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
