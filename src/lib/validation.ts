export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

export function validateContactForm(data: Partial<ContactFormData>): ValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  const firstName = data.firstName?.trim() || "";
  const lastName = data.lastName?.trim() || "";
  const email = data.email?.trim() || "";
  const message = data.message?.trim() || "";

  if (!firstName) {
    errors.firstName = "First name is required";
  } else if (firstName.length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }

  if (!lastName) {
    errors.lastName = "Last name is required";
  } else if (lastName.length < 1) {
    errors.lastName = "Last name cannot be empty";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = "Email address is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!message) {
    errors.message = "Message is required";
  } else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters long";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
