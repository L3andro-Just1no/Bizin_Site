"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { GA_TRACKING_ID, hasConsent } from "@/lib/analytics";

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(hasConsent());

    const syncConsent = () => setEnabled(hasConsent());
    window.addEventListener("cookie-consent-changed", syncConsent);

    return () => {
      window.removeEventListener("cookie-consent-changed", syncConsent);
    };
  }, []);

  if (!GA_TRACKING_ID || !enabled) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}');
        `}
      </Script>
    </>
  );
}
