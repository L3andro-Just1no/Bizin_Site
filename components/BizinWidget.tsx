'use client';

import { useEffect } from 'react';

export function BizinWidget() {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://bizin-assistant.vercel.app/widget.js';
    script.setAttribute('data-bizin-auto-init', 'true');
    script.setAttribute('data-api-url', 'https://bizin-assistant.vercel.app');
    script.setAttribute('data-language', 'pt');
    script.setAttribute('data-theme', 'light');
    script.async = true;
    
    // Append to body
    document.body.appendChild(script);
    
    // Cleanup function
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
}

