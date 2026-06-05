"use client";

import { useState } from "react";
import { useContactForm } from "../hooks/useContactForm";
import { FormMessage } from "./FormMessage";
import { FormInput, FormTextarea, FormCheckbox } from "./FormInput";
import { Button } from "./Button";

export type FormType =
  | "homepage"
  | "contact"
  | "about"
  | "specialties"
  | "playbook"
  | "salary-guide";

interface ContactFormProps {
  formType: FormType;
  showNewsletter?: boolean;
  showPhone?: boolean;
  showCompany?: boolean;
  buttonVariant?: "primary" | "burgundy" | "burgundy-gradient" | "amber";
  buttonText?: string;
  successMessage?: string;
  messageRequired?: boolean;
  messageRows?: number;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  newsletter?: boolean;
}

export function ContactForm({
  formType,
  showNewsletter = false,
  showPhone = false,
  showCompany = false,
  buttonVariant = "amber",
  buttonText = "Submit",
  successMessage = "Thank you! We'll be in touch soon.",
  messageRequired = true,
  messageRows = 1,
}: ContactFormProps) {
  const { submitForm, isSubmitting, isSuccess, error, reset } =
    useContactForm();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    phone: "",
    company: "",
    newsletter: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await submitForm({ ...formData, formType });

    if (result.success) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        phone: "",
        company: "",
        newsletter: false,
      });
      setTimeout(reset, 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? target.checked : value,
    }));
  };

  return (
    <>
      {isSuccess && <FormMessage type="success" message={successMessage} />}
      {error && <FormMessage type="error" message={error} />}

      <form
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        onSubmit={handleSubmit}
      >
        {/* Name row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <FormInput
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
          <FormInput
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
        </div>

        <FormInput
          type="email"
          name="email"
          label="Work Email"
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />

        {showCompany && (
          <FormInput
            name="company"
            label="Company"
            value={formData.company || ""}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
        )}

        {showPhone && (
          <FormInput
            type="tel"
            name="phone"
            label="Phone"
            value={formData.phone || ""}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        )}

        <FormTextarea
          name="message"
          label="Message"
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
          required={messageRequired}
          rows={messageRows}
        />

        {showNewsletter && (
          <FormCheckbox
            id={`newsletter-${formType}`}
            name="newsletter"
            label="Sign up for news and updates"
            checked={formData.newsletter}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        )}

        <div style={{ marginTop: "4px" }}>
          <Button
            type="submit"
            variant={buttonVariant}
            size="large"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : buttonText}
          </Button>
        </div>
      </form>
    </>
  );
}
