"use client";

// Google Analytics configuration

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Check if analytics is enabled
export const isAnalyticsEnabled = () => {
  return typeof window !== "undefined" && GA_TRACKING_ID;
};

// Check if user has consented to cookies
export const hasConsent = () => {
  if (typeof window === "undefined") return false;
  try {
    const consent = localStorage.getItem("cookie_consent");
    return consent === "accepted";
  } catch {
    return false;
  }
};

// Initialize Google Analytics
export const initGA = () => {
  if (!isAnalyticsEnabled() || !hasConsent()) return;

  // Load gtag.js script
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag("js", new Date());
  gtag("config", GA_TRACKING_ID, {
    page_path: window.location.pathname,
  });
};

// Track page views
export const pageview = (url: string) => {
  if (!isAnalyticsEnabled() || !hasConsent()) return;

  if (typeof window.gtag !== "undefined") {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
interface EventParams {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const event = ({ action, category, label, value }: EventParams) => {
  if (!isAnalyticsEnabled() || !hasConsent()) return;

  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Type declaration for window.gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

