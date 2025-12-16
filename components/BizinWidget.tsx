'use client';

import { useEffect } from 'react';

export function BizinWidget() {
  useEffect(() => {
    console.log('🤖 BizinWidget: Initializing...');
    
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://bizin-assistant.vercel.app/widget.js';
    script.setAttribute('data-bizin-auto-init', 'true');
    script.setAttribute('data-api-url', 'https://bizin-assistant.vercel.app');
    script.setAttribute('data-language', 'pt');
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
            language: 'pt',
            theme: 'light',
            primaryColor: '#87c76c', // Neomarca green color
            position: 'bottom-right'
          });
          console.log('🚀 BizinWidget: Manually initialized with custom styling');
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
  }, []);

  return null;
}

// TypeScript declaration for window.BizinAgent
declare global {
  interface Window {
    BizinAgent?: any;
  }
}
