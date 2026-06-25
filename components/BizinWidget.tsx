"use client";

import { useCallback, useEffect, useRef } from "react";

const WIDGET_SCRIPT_URL = "https://bizin-assistant.vercel.app/widget.js";
const WIDGET_API_URL = "https://bizin-assistant.vercel.app";

declare global {
  interface Window {
    BizinAgent?: {
      init?: (config: Record<string, unknown>) => void;
      destroy?: () => void;
    };
    openBizinChat?: () => void;
  }
}

function detectLanguage(): string {
  if (typeof document === "undefined") {
    return "pt";
  }

  const htmlLang = document.documentElement.lang || "pt";
  const pathLocale = window.location.pathname.split("/")[1];
  return ["pt", "en", "es", "fr"].includes(pathLocale) ? pathLocale : htmlLang;
}

function getFloatingButton(): HTMLElement | null {
  return document.querySelector("#bizin-agent-container > button.rounded-full");
}

function hideFloatingButton(): void {
  const button = getFloatingButton();
  if (button) {
    button.style.display = "none";
  }
}

function showFloatingButton(): void {
  const button = getFloatingButton();
  if (button) {
    button.style.display = "";
  }
}

export function BizinWidget() {
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const initializedRef = useRef(false);
  const loadingRef = useRef(false);
  const localeRef = useRef("pt");
  const chatOpenedAtRef = useRef(0);
  const pendingOpenRef = useRef(false);

  const initWidget = useCallback((language: string) => {
    if (!window.BizinAgent?.init) {
      return;
    }

    window.BizinAgent.init({
      apiUrl: WIDGET_API_URL,
      language,
      theme: "light",
      primaryColor: "#87c76c",
      position: "bottom-center",
      allowLinks: true,
      renderMarkdown: true,
      sanitizeHtml: false,
    });

    initializedRef.current = true;
    localeRef.current = language;
  }, []);

  const openChat = useCallback(() => {
    const floatingButton = getFloatingButton();
    if (!floatingButton) {
      return;
    }

    chatOpenedAtRef.current = Date.now();
    floatingButton.click();
    requestAnimationFrame(hideFloatingButton);
  }, []);

  const loadWidget = useCallback(() => {
    if (initializedRef.current) {
      openChat();
      return;
    }

    if (loadingRef.current) {
      pendingOpenRef.current = true;
      return;
    }

    loadingRef.current = true;
    const language = detectLanguage();
    localeRef.current = language;

    const script = document.createElement("script");
    script.src = WIDGET_SCRIPT_URL;
    script.async = true;
    script.setAttribute("data-bizin-auto-init", "true");
    script.setAttribute("data-api-url", WIDGET_API_URL);
    script.setAttribute("data-language", language);
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-allow-links", "true");
    script.setAttribute("data-render-markdown", "true");
    script.setAttribute("data-sanitize", "false");

    script.onload = () => {
      initWidget(language);
      window.openBizinChat = () => {
        if (!initializedRef.current) {
          pendingOpenRef.current = true;
          loadWidget();
          return;
        }
        openChat();
      };

      if (pendingOpenRef.current) {
        pendingOpenRef.current = false;
        openChat();
      }
    };

    scriptRef.current = script;
    document.body.appendChild(script);
  }, [initWidget, openChat]);

  useEffect(() => {
    window.openBizinChat = () => {
      pendingOpenRef.current = true;
      loadWidget();
    };

    const scheduleLoad = () => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(() => loadWidget(), { timeout: 5000 });
      } else {
        setTimeout(() => loadWidget(), 4000);
      }
    };

    scheduleLoad();

    const onFirstInteraction = () => {
      loadWidget();
    };

    window.addEventListener("scroll", onFirstInteraction, { once: true, passive: true });
    window.addEventListener("pointerdown", onFirstInteraction, { once: true });

    const handleClickOutside = (event: MouseEvent) => {
      if (Date.now() - chatOpenedAtRef.current < 300) {
        return;
      }

      const chatPanel = document.querySelector(
        'div.fixed[class*="bottom-6"][class*="right-6"]:not(button)',
      ) as HTMLElement | null;
      const floatingButton = getFloatingButton();

      if (
        chatPanel &&
        !chatPanel.contains(event.target as Node) &&
        (!floatingButton || !floatingButton.contains(event.target as Node))
      ) {
        Array.from(chatPanel.querySelectorAll("button")).some((btn) => {
          const path = btn.querySelector("path")?.getAttribute("d") || "";
          if (path.includes("M18 6") && path.includes("6 18")) {
            btn.click();
            return true;
          }
          return false;
        });
      }
    };

    const chatObserver = new MutationObserver(() => {
      const chatPanel = document.querySelector(
        'div.fixed[class*="bottom-6"][class*="right-6"]:not(button)',
      );
      const floatingButton = getFloatingButton();

      if (chatPanel) {
        if (chatOpenedAtRef.current === 0) {
          chatOpenedAtRef.current = Date.now();
        }
        hideFloatingButton();
        return;
      }

      chatOpenedAtRef.current = 0;
      if (floatingButton?.style.display === "none") {
        showFloatingButton();
      }
    });

    chatObserver.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("click", handleClickOutside);

    const languageObserver = new MutationObserver(() => {
      const nextLocale = detectLanguage();
      if (nextLocale === localeRef.current || !initializedRef.current) {
        return;
      }

      window.BizinAgent?.destroy?.();
      initWidget(nextLocale);
    });

    languageObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    return () => {
      window.removeEventListener("scroll", onFirstInteraction);
      window.removeEventListener("pointerdown", onFirstInteraction);
      document.removeEventListener("click", handleClickOutside);
      chatObserver.disconnect();
      languageObserver.disconnect();

      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
      }

      delete window.openBizinChat;
    };
  }, [initWidget, loadWidget]);

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
      @keyframes bizin-bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0) scale(1); }
        40% { transform: translateY(-12px) scale(1.05); }
        60% { transform: translateY(-6px) scale(1.02); }
      }

      @keyframes bizin-pulse {
        0%, 100% {
          transform: scale(1);
          box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.3), 0 8px 10px -6px rgba(16, 185, 129, 0.2);
        }
        50% {
          transform: scale(1.08);
          box-shadow: 0 20px 40px -5px rgba(16, 185, 129, 0.5), 0 12px 20px -6px rgba(16, 185, 129, 0.4);
        }
      }

      #bizin-agent-container > button.rounded-full {
        animation: bizin-bounce 2s ease-in-out infinite, bizin-pulse 2s ease-in-out infinite;
      }

      #bizin-agent-container > button.rounded-full:hover {
        animation: bizin-pulse 1s ease-in-out infinite;
      }

      @media (max-width: 768px) {
        #bizin-agent-container > div[class*="fixed"] {
          left: 50% !important;
          right: auto !important;
          transform: translateX(-50%);
          max-width: calc(100vw - 2rem);
          width: 100% !important;
        }
      }

      @keyframes slideInUp {
        from { opacity: 0; transform: translateY(60px) scale(0.9); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }

      @media (max-width: 768px) {
        @keyframes slideInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(60px) scale(0.9); }
          to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
      }

      #bizin-agent-container > div[class*="fixed"]:not(button) {
        animation: slideInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      }
    `,
      }}
    />
  );
}
