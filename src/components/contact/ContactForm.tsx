"use client";

import { useState } from "react";
import { validateContactForm, ContactFormData } from "@/lib/validation";

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(null);
    setSubmitError(null);

    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setSubmitError("There has been some error while submitting the form. Please verify all form fields again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setSubmitError(data.message || "Failed to submit inquiry. Please try again or reach out to info@mandimanzil.com.");
        if (data.errors) {
          setErrors(data.errors);
        }
      } else {
        setSubmitSuccess("The form has been submitted successfully! Our team will respond to your inquiry promptly.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });
        setErrors({});
      }
    } catch (err) {
      setSubmitError("A connection error occurred. Please check your internet connection or email info@mandimanzil.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
      {submitSuccess && (
        <div
          role="alert"
          className="p-4 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs rounded-2xl"
        >
          {submitSuccess}
        </div>
      )}

      {submitError && (
        <div
          role="alert"
          className="p-4 bg-red-950/60 border border-red-500/30 text-red-300 text-xs rounded-2xl"
        >
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-[10px] uppercase tracking-wider text-zinc-300 font-medium mb-1.5 font-mono">
            First Name <span className="text-brand-yellow">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full bg-[#141314] border rounded-full px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
              errors.firstName
                ? "border-red-500/80 focus:border-red-500"
                : "border-white/10 focus:border-brand-yellow"
            }`}
          />
          {errors.firstName && (
            <p className="mt-1 text-[11px] text-red-400 font-mono">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-[10px] uppercase tracking-wider text-zinc-300 font-medium mb-1.5 font-mono">
            Last Name <span className="text-brand-yellow">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full bg-[#141314] border rounded-full px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
              errors.lastName
                ? "border-red-500/80 focus:border-red-500"
                : "border-white/10 focus:border-brand-yellow"
            }`}
          />
          {errors.lastName && (
            <p className="mt-1 text-[11px] text-red-400 font-mono">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-[10px] uppercase tracking-wider text-zinc-300 font-medium mb-1.5 font-mono">
          Email Address <span className="text-brand-yellow">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting}
          className={`w-full bg-[#141314] border rounded-full px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
            errors.email
              ? "border-red-500/80 focus:border-red-500"
              : "border-white/10 focus:border-brand-yellow"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-[11px] text-red-400 font-mono">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-[10px] uppercase tracking-wider text-zinc-300 font-medium mb-1.5 font-mono">
          Message <span className="text-brand-yellow">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
          placeholder="Share your catering requirements, guest numbers, or questions..."
          className={`w-full bg-[#141314] border rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors resize-none ${
            errors.message
              ? "border-red-500/80 focus:border-red-500"
              : "border-white/10 focus:border-brand-yellow"
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-[11px] text-red-400 font-mono">{errors.message}</p>
        )}
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full sm:w-auto text-xs py-2.5 px-6"
        >
          {isSubmitting ? "Submitting..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
