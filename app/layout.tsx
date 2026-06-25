import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter, Roboto, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { I18nProvider } from "@/components/I18nProvider";

const BizinWidget = dynamic(
  () => import("@/components/BizinWidget").then((mod) => mod.BizinWidget),
  { ssr: false },
);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
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
  metadataBase: new URL("https://bizin.pt"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${roboto.variable} ${manrope.variable} font-sans antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <I18nProvider>
          <Header />
          <main className="pt-[110px]">{children}</main>
          <Footer />
          <CookieBanner />
          <GoogleAnalytics />
          <AnalyticsProvider />
          <BizinWidget />
        </I18nProvider>
      </body>
    </html>
  );
}

