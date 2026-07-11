import type { Metadata } from 'next';
import { Instrument_Serif, Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';
import MiniNavbar from '@/components/ui/mini-navbar';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { CommandPalette } from '@/components/palette/CommandPalette';
import { ChaosListener } from '@/components/ChaosListener';
import {
  DEFAULT_DESCRIPTION,
  OG_IMAGE_PATH,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  websiteJsonLd,
} from '@/lib/seo';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/img/48x48logo.png',
    shortcut: '/img/48x48logo.png',
    apple: '/img/48x48logo.png',
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'Adam Pukaluk',
    'Full-Stack Developer',
    'Portfolio Developer',
    'React',
    'Next.js',
    'TypeScript',
    'AI Automation',
    'Cybersecurity',
    'Mobile Development',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: SITE_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: 'Adam Pukaluk full-stack developer portfolio preview.',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        <JsonLd data={websiteJsonLd} />

        {/* Faint vertical-rule overlay across the whole page */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(26,23,18,0.05) 1px, transparent 1px)',
            backgroundSize: '25% 100%',
          }}
        />

        <MotionProvider>
          <div className="relative z-[2] min-h-screen overflow-x-hidden">
            <MiniNavbar />
            {children}
            <Footer />
          </div>
          <CommandPalette />
          <ChaosListener />
        </MotionProvider>
      </body>
    </html>
  );
}
