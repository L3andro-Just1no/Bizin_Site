"use client";

// Google Analytics configuration

export const GA_TRACKING_ID =
  process.env.NEXT_PUBLIC_GA_ID ?? "G-4171SGTLDX";

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

// Initialize Google Analytics (loads after cookie consent via GoogleAnalytics component)
export const initGA = () => {
  if (typeof window === "undefined" || !hasConsent()) return;
  window.dispatchEvent(new Event("cookie-consent-changed"));
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

