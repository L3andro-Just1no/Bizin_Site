import type { Metadata } from "next";
import { Inter, Roboto, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { I18nProvider } from "@/components/I18nProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Neomarca - Apoio a Fundos e Incentivos Europeus",
  description:
    "A Neomarca apoia empresas e empreendedores no acesso a fundos, incentivos e programas europeus.",
  keywords: "fundos europeus, incentivos, apoio empresarial, Portugal, Neomarca",
  authors: [{ name: "Neomarca" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Neomarca - Apoio a Fundos e Incentivos Europeus",
    description:
      "A Neomarca apoia empresas e empreendedores no acesso a fundos, incentivos e programas europeus.",
    type: "website",
    locale: "pt_PT",
    siteName: "Neomarca",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neomarca - Apoio a Fundos e Incentivos Europeus",
    description:
      "A Neomarca apoia empresas e empreendedores no acesso a fundos, incentivos e programas europeus.",
  },
  metadataBase: new URL("https://neomarca.pt"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body
        className={`${inter.variable} ${roboto.variable} ${manrope.variable} font-sans antialiased overflow-x-hidden`}
      >
        <I18nProvider>
          <Header />
          <main className="pt-[110px]">{children}</main>
          <Footer />
          <CookieBanner />
          <AnalyticsProvider />
        </I18nProvider>
        
        {/* Bizin AI Assistant Widget */}
        <Script
          src="https://bizin-assistant.vercel.app/widget.js"
          strategy="lazyOnload"
          data-bizin-auto-init="true"
          data-api-url="https://bizin-assistant.vercel.app"
          data-language="pt"
          data-theme="light"
        />
      </body>
    </html>
  );
}

