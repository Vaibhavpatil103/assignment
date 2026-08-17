export interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

export function validateSignup(fields: {
  name: string;
  email: string;
  password: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!fields.name.trim()) {
    errors.name = "Name is required.";
  } else if (fields.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!fields.password) {
    errors.password = "Password is required.";
  } else if (fields.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  return errors;
}

export function validateLogin(fields: {
  email: string;
  password: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!fields.password) {
    errors.password = "Password is required.";
  }

  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
