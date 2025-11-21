"use client";

import React, { useState } from "react";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";
import { INTEREST_OPTIONS } from "@/lib/constants";
import { isValidEmail } from "@/lib/utils";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    interest: "",
    message: "",
    consent: false,
  });

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
      newErrors.name = "O nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "O email é obrigatório";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Por favor, insira um email válido";
    }

    if (!formData.interest) {
      newErrors.interest = "Por favor, selecione um interesse";
    }

    if (!formData.message.trim()) {
      newErrors.message = "A mensagem é obrigatória";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "A mensagem deve ter pelo menos 10 caracteres";
    }

    if (!formData.consent) {
      newErrors.consent = "Deve aceitar a política de privacidade";
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
        throw new Error("Erro ao enviar formulário");
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
        <h2 className="text-2xl font-bold mb-6">Envie a Sua Mensagem</h2>

        <div className="space-y-4">
          <Input
            label="Nome"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
            placeholder="O seu nome completo"
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            placeholder="exemplo@email.com"
          />

          <Input
            label="Empresa"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            placeholder="Nome da sua empresa (opcional)"
          />

          <Select
            label="Interesse"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            options={INTEREST_OPTIONS}
            error={errors.interest}
            required
          />

          <Textarea
            label="Mensagem"
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={errors.message}
            required
            placeholder="Descreva como podemos ajudar..."
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
              Li e aceito a{" "}
              <a
                href="/politicas/privacidade"
                target="_blank"
                className="text-primary hover:underline"
              >
                política de privacidade
              </a>{" "}
              e autorizo o tratamento dos meus dados pessoais.
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
          {isSubmitting ? "A enviar..." : "Enviar Mensagem"}
        </Button>

        {submitStatus === "success" && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            <strong>Mensagem enviada com sucesso!</strong>
            <p className="mt-1 text-sm">
              Entraremos em contacto consigo brevemente.
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            <strong>Erro ao enviar mensagem.</strong>
            <p className="mt-1 text-sm">
              Por favor, tente novamente ou contacte-nos diretamente por email.
            </p>
          </div>
        )}
      </div>
    </form>
  );
}

