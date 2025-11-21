import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to Portuguese locale
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(dateObj);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Portuguese phone number
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+351)?[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

