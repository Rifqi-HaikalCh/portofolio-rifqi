import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/shared/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: '--font-poppins',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Rifqi Haikal Chairiansyah - Portfolio",
  description: "Passionate Full-Stack Developer and Mobile App Developer from Indonesia, currently studying Informatics at Del Institute of Technology.",
  keywords: "Rifqi Haikal, Full-Stack Developer, Mobile Developer, Angular, React, Vue, Spring Boot, Laravel, Indonesia",
  authors: [{ name: "Rifqi Haikal Chairiansyah" }],
  creator: "Rifqi Haikal Chairiansyah",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rifqi-portfolio.vercel.app",
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
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </head>
      <body className={`${poppins.variable} ${jetbrainsMono.variable} font-poppins`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}