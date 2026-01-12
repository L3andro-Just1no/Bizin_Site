'use client';

import { useEffect, useState } from 'react';

// Extend window interface
declare global {
  interface Window {
    BizinAgent?: {
      init?: (config: any) => void;
      destroy?: () => void;
      open?: () => void;
      openChat?: () => void;
    };
    openBizinChat?: () => void;
  }
}

export function BizinWidget() {
  const [locale, setLocale] = useState('pt'); // Default to Portuguese
  const [widgetInitialized, setWidgetInitialized] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Function to detect language
    const detectLanguage = () => {
      const htmlLang = document.documentElement.lang || 'pt';
      const pathLocale = window.location.pathname.split('/')[1];
      return ['pt', 'en', 'es', 'fr'].includes(pathLocale) ? pathLocale : htmlLang;
    };
    
    const initialLocale = detectLanguage();
    setLocale(initialLocale);
    
    // Create script element
    const script = document.createElement('script');
    // Add timestamp to bust cache
    script.src = `https://bizin-assistant.vercel.app/widget.js?v=${Date.now()}`;
    script.setAttribute('data-bizin-auto-init', 'true');
    script.setAttribute('data-api-url', 'https://bizin-assistant.vercel.app');
    script.setAttribute('data-language', locale);
    script.setAttribute('data-theme', 'light');
    script.async = true;
    
    // Add load event listener
    script.onload = () => {
      // Manually initialize if auto-init didn't work
      if (window.BizinAgent && typeof window.BizinAgent.init === 'function') {
        try {
          window.BizinAgent.init({
            apiUrl: 'https://bizin-assistant.vercel.app',
            language: locale,
            theme: 'light',
            primaryColor: '#87c76c', // Neomarca green color
            position: 'bottom-center'
          });
          setWidgetInitialized(true);
          
          // Expose a global function to open the chat
          window.openBizinChat = () => {
            // Find the floating circular widget button specifically (not chat UI buttons)
            const floatingButton = document.querySelector('#bizin-agent-container > button.rounded-full') as HTMLElement;
            
            if (floatingButton) {
              // Record when chat opens
              chatOpenedAt = Date.now();
              
              // Click to open chat
              floatingButton.click();
              
              // Widget doesn't hide button on programmatic clicks, so we do it manually
              // Use requestAnimationFrame to ensure it runs after the widget's click handler
              requestAnimationFrame(() => {
                const button = document.querySelector('#bizin-agent-container > button.rounded-full') as HTMLElement;
                if (button) {
                  button.style.display = 'none';
                }
              });
              
              // Watch for chat close to restore button
              const observer = new MutationObserver(() => {
                const container = document.getElementById('bizin-agent-container');
                if (container) {
                  const hasChat = container.querySelector('div[class*="rounded-2xl"]');
                  const button = container.querySelector('button.rounded-full') as HTMLElement;
                  
                  // If chat closed (no chat div) and button exists, restore it
                  if (!hasChat && button && button.style.display === 'none') {
                    button.style.display = '';
                    observer.disconnect();
                  }
                }
              });
              
              const container = document.getElementById('bizin-agent-container');
              if (container) {
                observer.observe(container, { childList: true, subtree: true });
              }
            }
          };
          
          // Auto-open chat on page load after a short delay
          setTimeout(() => {
            if (window.openBizinChat) {
              window.openBizinChat();
            }
          }, 1000);
        } catch (error) {
          // Silent error handling
        }
      }
    };
    
    // Append to body
    document.body.appendChild(script);
    
    // Track when chat opens to prevent immediate close
    let chatOpenedAt = 0;
    
    // Add click-outside-to-close functionality
    const handleClickOutside = (event: MouseEvent) => {
      // Ignore clicks within 300ms of chat opening
      if (Date.now() - chatOpenedAt < 300) {
        return;
      }
      
      // Look for chat panel anywhere in the DOM (widget might render it outside container)
      const chatPanel = document.querySelector('div.fixed[class*="bottom-6"][class*="right-6"]:not(button)') as HTMLElement;
      const floatingButton = document.querySelector('#bizin-agent-container > button.rounded-full') as HTMLElement;
      
      // If chat is open and click is outside both the chat panel and the floating button
      if (chatPanel && !chatPanel.contains(event.target as Node) && 
          (!floatingButton || !floatingButton.contains(event.target as Node))) {
        
        // Find and click the close button inside the chat
        const allButtons = chatPanel.querySelectorAll('button');
        
        // Try to find close button by looking for X icon path
        let closeButton: HTMLElement | null = null;
        
        for (let i = 0; i < allButtons.length; i++) {
          const btn = allButtons[i] as HTMLElement;
          const svg = btn.querySelector('svg');
          const path = svg?.querySelector('path')?.getAttribute('d') || '';
          
          // Look for X icon pattern (diagonal lines crossing)
          if (path.includes('M18 6') && path.includes('6 18')) {
            closeButton = btn;
            break;
          }
        }
        
        if (closeButton) {
          closeButton.click();
        }
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    // Watch for chat opening (by any method) to track the open time and hide button
    const chatObserver = new MutationObserver(() => {
      const chatPanel = document.querySelector('div.fixed[class*="bottom-6"][class*="right-6"]:not(button)');
      const floatingButton = document.querySelector('#bizin-agent-container > button.rounded-full') as HTMLElement;
      
      if (chatPanel && chatOpenedAt === 0) {
        chatOpenedAt = Date.now();
        
        // Hide the floating button whenever chat opens (by any method)
        if (floatingButton) {
          floatingButton.style.display = 'none';
        }
      } else if (!chatPanel) {
        chatOpenedAt = 0;
        
        // Restore the floating button when chat closes
        if (floatingButton && floatingButton.style.display === 'none') {
          floatingButton.style.display = '';
        }
      }
    });
    
    chatObserver.observe(document.body, { childList: true, subtree: true });
    
    // Watch for language changes
    const observer = new MutationObserver(() => {
      const newLocale = detectLanguage();
      if (newLocale !== initialLocale && widgetInitialized) {
        setLocale(newLocale);
        
        // Destroy and reinitialize widget with new language
        if (window.BizinAgent && typeof window.BizinAgent.destroy === 'function') {
          window.BizinAgent.destroy();
        }
        
        if (window.BizinAgent && typeof window.BizinAgent.init === 'function') {
          window.BizinAgent.init({
            apiUrl: 'https://bizin-assistant.vercel.app',
            language: newLocale,
            theme: 'light',
            primaryColor: '#87c76c',
            position: 'bottom-center'
          });
        }
      }
    });
    
    // Observe HTML lang attribute changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });
    
    // Cleanup function
    return () => {
      observer.disconnect();
      chatObserver.disconnect();
      document.removeEventListener('click', handleClickOutside);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []); // Only run once on mount

  // Add animation styles for the widget button
  return (
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes bizin-bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0) scale(1);
        }
        40% {
          transform: translateY(-12px) scale(1.05);
        }
        60% {
          transform: translateY(-6px) scale(1.02);
        }
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
      
      /* Center chat panel on mobile */
      @media (max-width: 768px) {
        #bizin-agent-container > div[class*="fixed"] {
          left: 50% !important;
          right: auto !important;
          transform: translateX(-50%);
          max-width: calc(100vw - 2rem);
          width: 100% !important;
        }
      }
      
      /* Smooth animation for chat panel - sliding from below */
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(60px) scale(0.9);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      
      @media (max-width: 768px) {
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(60px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }
      }
      
      #bizin-agent-container > div[class*="fixed"]:not(button) {
        animation: slideInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      }
    `}} />
  );
}
