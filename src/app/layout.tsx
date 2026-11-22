import type { Metadata } from "next";
import { Fraunces, Source_Sans_3, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/shared/Providers";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const siteUrl = "https://portofolio-rifqi-snowy.vercel.app";

export const metadata: Metadata = {
  title: "Rifqi Haikal Chairiansyah - Portfolio",
  description: "Software developer focused on C#, ASP.NET, .NET Core, and SQL Server. Portfolio of Rifqi Haikal Chairiansyah.",
  keywords: "Rifqi Haikal, Software Developer, .NET, C#, ASP.NET, SQL Server, Entity Framework, UI/UX, Indonesia",
  authors: [{ name: "Rifqi Haikal Chairiansyah" }],
  creator: "Rifqi Haikal Chairiansyah",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Rifqi Haikal Portfolio",
    locale: "en_US",
    alternateLocale: "id_ID",
    title: "Rifqi Haikal Chairiansyah - Portfolio",
    description: "Software developer focused on C#, ASP.NET, .NET Core, and SQL Server. Portfolio of Rifqi Haikal Chairiansyah.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Rifqi Haikal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rifqi Haikal Chairiansyah - Portfolio",
    description: "Software developer focused on C#, ASP.NET, .NET Core, and SQL Server. Portfolio of Rifqi Haikal Chairiansyah.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${sourceSans.variable} ${jetbrainsMono.variable} font-sans`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-overlay focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to main content
        </a>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}