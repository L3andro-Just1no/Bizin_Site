"use client";

import { useEffect, useRef } from "react";

interface VideoModalProps {
  src: string;
  onClose: () => void;
}

export function VideoModal({ src, onClose }: VideoModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Webinar vídeo"
    >
      <div className="relative w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
          aria-label="Fechar vídeo"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <video
          src={src}
          controls
          autoPlay
          className="w-full rounded-2xl shadow-2xl"
        >
          O teu browser não suporta vídeo HTML5.
        </video>
      </div>
    </div>
  );
}
