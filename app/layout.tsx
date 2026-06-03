import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Beams from '@/components/ui/Beams';
import MiniNavbar from '@/components/ui/mini-navbar';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import {
  DEFAULT_DESCRIPTION,
  OG_IMAGE_PATH,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  websiteJsonLd,
} from '@/lib/seo';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd data={websiteJsonLd} />
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        >
          <Beams
            beamWidth={3}
            beamHeight={15}
            beamNumber={12}
            lightColor="#ffffff"
            speed={4.75}
            noiseIntensity={3.15}
            scale={0.25}
            rotation={30}
          />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <MiniNavbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
