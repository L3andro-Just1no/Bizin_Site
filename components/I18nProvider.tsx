"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import ptMessages from "@/messages/pt.json";
import enMessages from "@/messages/en.json";
import esMessages from "@/messages/es.json";
import frMessages from "@/messages/fr.json";

export type Locale = "pt" | "en" | "es" | "fr";

type Messages = typeof ptMessages;

const allMessages: Record<Locale, Messages> = {
  pt: ptMessages,
  en: enMessages as Messages,
  es: esMessages as Messages,
  fr: frMessages as Messages,
};

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getNestedValue(obj: any, key: string): string {
  return key
    .split(".")
    .reduce((acc, part) => (acc && acc[part] != null ? acc[part] : undefined), obj) ?? "";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt");

  const t = useCallback(
    (key: string) => {
      const messages = allMessages[locale];
      return getNestedValue(messages, key);
    },
    [locale]
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}


