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
    
    // Intercept console.log to catch widget restart events
    const originalConsoleLog = console.log;
    console.log = function(...args: any[]) {
      // Call original console.log
      originalConsoleLog.apply(console, args);
      
      // Check if the log is from the widget about restart/session
      const logMessage = args.join(' ');
      
      // Parse current state if available
      if (logMessage.includes('📊 Current state')) {
        try {
          // Extract the state object from the log
          const stateMatch = logMessage.match(/\{.*\}/);
          if (stateMatch) {
            const stateStr = stateMatch[0];
            originalConsoleLog('🔍 Captured session state:', stateStr);
          }
        } catch (e) {
          // Ignore parsing errors
        }
      }
      
      // Check for no session warning
      if (logMessage.includes('⚠️ No session ID to end')) {
        originalConsoleLog('⚠️ Widget tried to end session but no session ID exists');
      }
      
      // Detect session end/restart
      if (logMessage.includes('🔄 Restart clicked') || 
          logMessage.includes('🆕 Creating new session') ||
          logMessage.includes('🔚 Ending session')) {
        originalConsoleLog('✅ SESSION END DETECTED - Widget is restarting!', args);
        
        // Check localStorage for session data and send to admin panel
        (async () => {
          try {
            const bizinSession = localStorage.getItem('bizin-session');
            const bizinState = localStorage.getItem('bizin-state');
            const allBizinKeys = Object.keys(localStorage).filter(k => k.toLowerCase().includes('bizin'));
            
            const allData = Object.fromEntries(allBizinKeys.map(k => [k, localStorage.getItem(k)]));
            
            originalConsoleLog('💾 LocalStorage data:', {
              session: bizinSession,
              state: bizinState,
              allKeys: allBizinKeys,
              allData: allData
            });
            
            // Log each key individually for better visibility
            allBizinKeys.forEach(key => {
              const value = localStorage.getItem(key);
              originalConsoleLog(`  📦 localStorage["${key}"]:`, value);
            });
            
            // Extract session ID from localStorage
            let sessionId: string | null = null;
            try {
              if (bizinSession) {
                const parsed = JSON.parse(bizinSession);
                sessionId = parsed?.sessionId || parsed?.id || null;
                originalConsoleLog('  🔎 Checked bizin-session:', { parsed, sessionId });
              }
              // Also check in state
              if (!sessionId && bizinState) {
                const parsed = JSON.parse(bizinState);
                sessionId = parsed?.sessionId || parsed?.id || null;
                originalConsoleLog('  🔎 Checked bizin-state:', { parsed, sessionId });
              }
              // Check all bizin keys for session ID
              if (!sessionId) {
                for (const key of allBizinKeys) {
                  const value = localStorage.getItem(key);
                  if (value) {
                    try {
                      const parsed = JSON.parse(value);
                      originalConsoleLog(`  🔎 Checking ${key}:`, parsed);
                      if (parsed?.sessionId || parsed?.id) {
                        sessionId = parsed.sessionId || parsed.id;
                        originalConsoleLog(`  ✅ Found session ID in ${key}:`, sessionId);
                        break;
                      }
                    } catch (e) {
                      // Not JSON, might be a plain string session ID
                      if (value.length > 10 && value.length < 100) {
                        originalConsoleLog(`  🔎 ${key} might be session ID (plain string):`, value);
                        sessionId = value;
                        break;
                      }
                    }
                  }
                }
              }
            } catch (e) {
              originalConsoleLog('⚠️ Error extracting session ID:', e);
            }
            
            // Also check window/global scope for session ID
            if (!sessionId) {
              // @ts-ignore - check various possible global properties
              const possibleSessionIds = [
                window.bizinSessionId,
                window.BizinAgent?.sessionId,
                window.BizinAgent?.state?.sessionId,
                // @ts-ignore
                window.__BIZIN_SESSION_ID__,
                // @ts-ignore
                window.__bizin_state__?.sessionId
              ];
              
              for (const id of possibleSessionIds) {
                if (id) {
                  sessionId = id;
                  originalConsoleLog('  ✅ Found session ID in window:', sessionId);
                  break;
                }
              }
              
              // @ts-ignore
              originalConsoleLog('  🌐 Checked window properties:', {
                bizinSessionId: window.bizinSessionId,
                BizinAgentSessionId: window.BizinAgent?.sessionId,
                // @ts-ignore
                allBizinWindowProps: Object.keys(window).filter(k => k.toLowerCase().includes('bizin'))
              });
            }
            
            // If no session ID found, try the last known one
            if (!sessionId && lastKnownSessionId) {
              sessionId = lastKnownSessionId;
              originalConsoleLog('  ✅ Using last known session ID:', sessionId);
            }
            
            originalConsoleLog('🔍 Final extracted session ID:', sessionId);
            
            // If no session ID, log and skip
            if (!sessionId) {
              originalConsoleLog('⚠️ No session ID found, skipping session end API call');
              originalConsoleLog('💡 Tip: The widget might not have created a session yet, or session ID might be stored differently');
              return;
            }
            
            // Clear the last known session ID since we're ending this session
            lastKnownSessionId = null;
            
            // Prepare session data to send
            const sessionData = {
              event: 'session_end',
              timestamp: new Date().toISOString(),
              language: locale,
              userAgent: navigator.userAgent,
              pageUrl: window.location.href,
              storageData: bizinState ? JSON.parse(bizinState) : null,
              localStorage: Object.fromEntries(allBizinKeys.map(k => [k, localStorage.getItem(k)]))
            };
            
            originalConsoleLog('📤 Sending session end to API:', sessionData);
            
            // Call the correct endpoint with session ID
            const apiUrl = `https://bizin-assistant.vercel.app/api/sessions/${sessionId}/end`;
            originalConsoleLog('🎯 API URL:', apiUrl);
            
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(sessionData),
              mode: 'cors'
            });
            
            if (response.ok) {
              const result = await response.json().catch(() => ({}));
              originalConsoleLog('✅ Session end sent successfully', result);
            } else {
              const errorText = await response.text().catch(() => '');
              originalConsoleLog('⚠️ Failed to send session end:', response.status, response.statusText, errorText);
            }
          } catch (error) {
            originalConsoleLog('❌ Error sending session end to admin panel:', error);
          }
        })();
      }
    };
    
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
          
          // Log the BizinAgent object to see what methods/properties it has
          console.log('🔍 BizinAgent object:', window.BizinAgent);
          console.log('🔍 BizinAgent keys:', Object.keys(window.BizinAgent || {}));
          
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
    
    // Listen for messages from the widget
    const handleWidgetMessage = (event: MessageEvent) => {
      // Check if message is from the widget domain
      if (event.origin === 'https://bizin-assistant.vercel.app') {
        console.log('📨 Message from Bizin widget:', event.data);
        
        // Handle session end/reload events
        if (event.data?.type === 'sessionEnd' || 
            event.data?.type === 'conversationReset' ||
            event.data?.action === 'reload' ||
            event.data?.action === 'endSession' ||
            event.data?.event === 'restart' ||
            event.data?.event === 'sessionEnd') {
          console.log('🔄 Session restart detected:', event.data);
          
          // Handle the session end - you can add custom logic here
          // For example: clear local state, send analytics, etc.
        }
      }
    };
    
    // Also listen for custom events from the widget
    const handleCustomEvent = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        console.log('🎯 Custom event from widget:', customEvent.type, customEvent.detail);
        
        if (customEvent.type === 'bizin-session-end' || 
            customEvent.type === 'bizin-restart' ||
            customEvent.detail.sessionId !== undefined) {
          console.log('✅ Session end event captured:', customEvent.detail);
        }
      }
    };
    
    window.addEventListener('message', handleWidgetMessage);
    document.addEventListener('bizin-session-end', handleCustomEvent);
    document.addEventListener('bizin-restart', handleCustomEvent);
    document.addEventListener('bizin-state-change', handleCustomEvent);
    
    // Track when chat opens to prevent immediate close
    let chatOpenedAt = 0;
    
    // Track the last known session ID
    let lastKnownSessionId: string | null = null;
    
    // Monitor localStorage for session ID changes
    const monitorSessionId = () => {
      try {
        const allKeys = Object.keys(localStorage).filter(k => k.toLowerCase().includes('bizin'));
        
        for (const key of allKeys) {
          const value = localStorage.getItem(key);
          if (value) {
            try {
              const parsed = JSON.parse(value);
              if (parsed?.sessionId || parsed?.id) {
                const foundId = parsed.sessionId || parsed.id;
                if (foundId && foundId !== lastKnownSessionId) {
                  lastKnownSessionId = foundId;
                  console.log('🆔 Session ID updated:', lastKnownSessionId);
                }
              }
            } catch (e) {
              // Not JSON, might be plain string
              if (value.length > 10 && value.length < 100 && value !== lastKnownSessionId) {
                lastKnownSessionId = value;
                console.log('🆔 Session ID updated (plain):', lastKnownSessionId);
              }
            }
          }
        }
      } catch (e) {
        // Ignore errors
      }
    };
    
    // Monitor every 2 seconds
    const sessionMonitorInterval = setInterval(monitorSessionId, 2000);
    // Also monitor immediately
    monitorSessionId();
    
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
      window.removeEventListener('message', handleWidgetMessage);
      document.removeEventListener('bizin-session-end', handleCustomEvent);
      document.removeEventListener('bizin-restart', handleCustomEvent);
      document.removeEventListener('bizin-state-change', handleCustomEvent);
      clearInterval(sessionMonitorInterval);
      // Restore original console.log
      console.log = originalConsoleLog;
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
