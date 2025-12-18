'use client';

import { useEffect, useState } from 'react';

export function BizinWidget() {
  const [locale, setLocale] = useState('pt'); // Default to Portuguese
  
  useEffect(() => {
    // Get locale from HTML lang attribute or pathname
    const htmlLang = document.documentElement.lang || 'pt';
    const pathLocale = window.location.pathname.split('/')[1];
    const detectedLocale = ['pt', 'en', 'es', 'fr'].includes(pathLocale) ? pathLocale : htmlLang;
    
    setLocale(detectedLocale);
    console.log('🤖 BizinWidget: Initializing...', 'Language:', detectedLocale);
    
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
      console.log('✅ BizinWidget: Script loaded successfully');
      console.log('🔍 BizinAgent object:', window.BizinAgent);
      
      // Manually initialize if auto-init didn't work
      if (window.BizinAgent && typeof window.BizinAgent.init === 'function') {
        try {
          window.BizinAgent.init({
            apiUrl: 'https://bizin-assistant.vercel.app',
            language: locale,
            theme: 'light',
            primaryColor: '#87c76c', // Neomarca green color
            position: 'bottom-right'
          });
          console.log(`🚀 BizinWidget: Initialized with language: ${locale}`);
        } catch (error) {
          console.error('❌ BizinWidget: Manual initialization failed', error);
        }
      }
    };
    
    // Add error event listener
    script.onerror = (error) => {
      console.error('❌ BizinWidget: Failed to load script', error);
    };
    
    // Append to body
    document.body.appendChild(script);
    console.log('📝 BizinWidget: Script tag added to body');
    
    // Cleanup function
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
        console.log('🧹 BizinWidget: Cleanup - script removed');
      }
    };
  }, []); // Only run once on mount

  return null;
}

// TypeScript declaration for window.BizinAgent
declare global {
  interface Window {
    BizinAgent?: any;
  }
}
