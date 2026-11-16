import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Inter, Sora } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CookieConsent } from "@/components/legal/CookieConsent";
import { Analytics } from "@/components/analytics/Analytics";
import { MotionProvider } from "@/components/analytics/MotionProvider";
import { getProjectFamilies } from "@/lib/content";
import { brand } from "@/config/brand";
import { site } from "@/config/site";
import { siteUrl } from "@/lib/seo/meta";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["500", "600", "700"], display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.shortDescription,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_NG",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: brand.colors.ink,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const families = (await getProjectFamilies()).map(({ slug, name, year, line }) => ({ slug, name, year, line }));
  return (
    <html lang="en-NG" className={`${sora.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Hide the server-rendered cookie banner before paint when a choice already exists. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("cc-consent"))document.documentElement.dataset.consent="1"}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <MotionProvider>
        <SiteHeader families={families} />
        <main id="main" className="flex-1">
          {/* Crossfades page content on every navigation (see globals.css). */}
          <ViewTransition update="page" enter="page" exit="page" default="none">
            <div>{children}</div>
          </ViewTransition>
        </main>
        <SiteFooter />
        <CookieConsent />
        <Analytics />
        </MotionProvider>
      </body>
    </html>
  );
}
