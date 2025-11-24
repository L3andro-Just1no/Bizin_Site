"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/Button";
import { initGA } from "@/lib/analytics";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    try {
      const consent = localStorage.getItem("cookie_consent");
      if (!consent) {
        // Show banner after a short delay for better UX
        setTimeout(() => setShowBanner(true), 1000);
      } else if (consent === "accepted") {
        // Initialize analytics if already accepted
        initGA();
      }
    } catch (error) {
      console.error("Error checking cookie consent:", error);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("cookie_consent", "accepted");
      setShowBanner(false);
      // Initialize Google Analytics
      initGA();
    } catch (error) {
      console.error("Error saving cookie consent:", error);
    }
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("cookie_consent", "declined");
      setShowBanner(false);
    } catch (error) {
      console.error("Error saving cookie consent:", error);
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-2xl">
      <div className="container mx-auto px-4 py-6 md:px-4 lg:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">
              Utilizamos cookies
            </h3>
            <p className="text-sm text-gray-300">
              Este website utiliza cookies para melhorar a sua experiência de
              navegação e para análise de tráfego. Ao clicar em &quot;Aceitar&quot;, está
              a consentir a utilização de cookies conforme descrito na nossa{" "}
              <Link href="/politicas/cookies" className="underline hover:text-white">
                Política de cookies
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button
              variant="secondary"
              size="md"
              onClick={handleDecline}
              className="bg-transparent text-white border border-gray-500 px-4"
            >
              Recusar
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleAccept}
              className="whitespace-nowrap"
            >
              Aceitar cookies
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

