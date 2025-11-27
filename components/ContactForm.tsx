"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";
import { INTEREST_OPTIONS } from "@/lib/constants";
import { isValidEmail } from "@/lib/utils";
import { useI18n } from "@/components/I18nProvider";

export function ContactForm() {
  const searchParams = useSearchParams();
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    interest: "",
    message: "",
    consent: false,
  });

  // Pre-fill form from URL query parameters
  useEffect(() => {
    const interest = searchParams.get("interest");
    const event = searchParams.get("event");
    const curso = searchParams.get("curso");

    if (interest) {
      setFormData((prev) => ({
        ...prev,
        interest: interest,
      }));

      // Pre-fill message based on event or curso
      let prefillMessage = "";
      if (event === "workshop-portugal-2030") {
        prefillMessage = "Gostaria de me inscrever no Workshop: Como Aceder aos Fundos do Portugal 2030 (15 de Março, 2024).";
      } else if (event === "networking-investidores") {
        prefillMessage = "Gostaria de me inscrever no evento de Networking: Investidores Internacionais em Portugal (28 de Março, 2024).";
      } else if (curso === "gestao-candidaturas-fundos-europeus") {
        prefillMessage = "Gostaria de obter mais informações sobre o Curso Intensivo: Gestão de Candidaturas a Fundos Europeus (40 horas).";
      } else if (curso === "empreender-portugal") {
        prefillMessage = "Gostaria de obter mais informações sobre a Masterclass: Empreender em Portugal - Do Conceito ao Sucesso (16 horas).";
      }

      if (prefillMessage) {
        setFormData((prev) => ({
          ...prev,
          message: prefillMessage,
        }));
      }
    }
  }, [searchParams]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t("contactForm.errors.nameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("contactForm.errors.emailRequired");
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = t("contactForm.errors.emailInvalid");
    }

    if (!formData.interest) {
      newErrors.interest = t("contactForm.errors.interestRequired");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("contactForm.errors.messageRequired");
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t("contactForm.errors.messageTooShort");
    }

    if (!formData.consent) {
      newErrors.consent = t("contactForm.errors.consentRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Form submission error");
      }

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        interest: "",
        message: "",
        consent: false,
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-8 rounded-xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-6">
          {t("contactForm.title")}
        </h2>

        <div className="space-y-4">
          <Input
            label={t("contactForm.nameLabel")}
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
            placeholder={t("contactForm.namePlaceholder")}
          />

          <Input
            label={t("contactForm.emailLabel")}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            placeholder={t("contactForm.emailPlaceholder")}
          />

          <Input
            label={t("contactForm.companyLabel")}
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            placeholder={t("contactForm.companyPlaceholder")}
          />

          <Select
            label={t("contactForm.interestLabel")}
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            options={INTEREST_OPTIONS}
            error={errors.interest}
            required
          />

          <Textarea
            label={t("contactForm.messageLabel")}
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={errors.message}
            required
            placeholder={t("contactForm.messagePlaceholder")}
            rows={5}
          />

          <div className="flex items-start">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mt-1 mr-3 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="consent" className="text-sm text-gray-600">
              {t("contactForm.consent.textBeforeLink")}
              <a
                href="/politicas/privacidade"
                target="_blank"
                className="text-primary hover:underline"
              >
                {t("contactForm.consent.linkText")}
              </a>{" "}
              {t("contactForm.consent.textAfterLink")}
              <span className="text-red-500 ml-1">*</span>
            </label>
          </div>
          {errors.consent && (
            <p className="text-sm text-red-600">{errors.consent}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-6"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? t("contactForm.submit.sending")
            : t("contactForm.submit.label")}
        </Button>

        {submitStatus === "success" && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            <strong>{t("contactForm.status.success.title")}</strong>
            <p className="mt-1 text-sm">
              {t("contactForm.status.success.description")}
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            <strong>{t("contactForm.status.error.title")}</strong>
            <p className="mt-1 text-sm">
              {t("contactForm.status.error.description")}
            </p>
          </div>
        )}
      </div>
    </form>
  );
}

