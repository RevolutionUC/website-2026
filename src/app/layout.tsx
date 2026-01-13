import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import { ThemeProvider } from "@/app/components/theme-provider";
import ScrollSmootherWrapper from "@/app/components/ScrollSmoother";
import Plane from "@/app/components/Plane";
import "./globals.css";
import { NavigationBar } from "@/app/components/NavigationBar";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "RevolutionUC 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/website-background.webp" as="image" />
      </head>
      <body className={`${instrumentSans.className} ${ibmPlexMono.variable} antialiased`}>
        <NavigationBar />
        {/* Fixed background element for better performance */}
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: "url(/website-background.webp)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            willChange: "transform",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            zIndex: -1,
          }}
          aria-hidden="true"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Plane />
          <ScrollSmootherWrapper>
            <div className="relative flex min-h-screen flex-col">
              <main className="flex-1">{children}</main>
            </div>
          </ScrollSmootherWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
