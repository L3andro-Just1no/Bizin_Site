import type { Metadata } from "next";
import { Inter, Roboto, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { I18nProvider } from "@/components/I18nProvider";
import { BizinWidget } from "@/components/BizinWidget";

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
  title: "Bizin Portugal - Apoio a Incentivos ao Investimento",
  description:
    "A Bizin Portugal apoia empresas e empreendedores no acesso a incentivos ao investimento e programas europeus.",
  keywords: "incentivos ao investimento, apoio empresarial, Portugal, Bizin Portugal",
  authors: [{ name: "Bizin Portugal" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Bizin Portugal - Apoio a Incentivos ao Investimento",
    description:
      "A Bizin Portugal apoia empresas e empreendedores no acesso a incentivos ao investimento e programas europeus.",
    type: "website",
    locale: "pt_PT",
    siteName: "Bizin Portugal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bizin Portugal - Apoio a Incentivos ao Investimento",
    description:
      "A Bizin Portugal apoia empresas e empreendedores no acesso a incentivos ao investimento e programas europeus.",
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
          <BizinWidget />
        </I18nProvider>
      </body>
    </html>
  );
}

