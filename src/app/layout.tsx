import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "../styles/design-system.css";
import "../styles/role-themes.css";
import { Providers } from "../components/shared/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: '--font-poppins',
  display: 'swap',
  preload: true, // Preload for faster LCP
  adjustFontFallback: true, // Reduce layout shift
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Rifqi Haikal Chairiansyah - Portfolio",
  description: "Passionate Full-Stack Developer and Mobile App Developer from Indonesia, currently studying Informatics at Del Institute of Technology.",
  keywords: "Rifqi Haikal, Full-Stack Developer, Mobile Developer, Angular, React, Vue, Spring Boot, Laravel, Indonesia",
  authors: [{ name: "Rifqi Haikal Chairiansyah" }],
  creator: "Rifqi Haikal Chairiansyah",
  metadataBase: new URL("https://rifqihaikalch.netlify.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rifqihaikalch.netlify.app",
    title: "Rifqi Haikal Chairiansyah - Portfolio",
    description: "Portfolio of a passionate Full-Stack Developer and Mobile App Developer from Indonesia",
    siteName: "Rifqi Haikal Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Font Awesome CDN removed for performance - using lucide-react instead */}
        {/* Preconnect to optimize external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for faster resource loading */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={`${poppins.variable} ${jetbrainsMono.variable} font-poppins`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}