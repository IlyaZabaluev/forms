import { ERROR_MESSAGES, VALIDATION_REGEX } from "../constants/validations";
import {
  type FormField,
  type SignupData,
  type FormErrors,
} from "../types/form";

export const validateField = (
  name: FormField,
  value: string,
  allValues?: Partial<SignupData>
): string => {
  if (!value && name !== "gender") {
    return (
      ERROR_MESSAGES[
        `${name.toUpperCase()}_REQUIRED` as keyof typeof ERROR_MESSAGES
      ] || "Поле обязательно"
    );
  }

  switch (name) {
    case "name":
      return VALIDATION_REGEX.NAME.test(value)
        ? ""
        : ERROR_MESSAGES.NAME_INVALID;
    case "username":
      if (value.startsWith("@")) value = value.slice(1);
      return VALIDATION_REGEX.USERNAME.test(value)
        ? ""
        : ERROR_MESSAGES.USERNAME_INVALID;
    case "email":
      return VALIDATION_REGEX.EMAIL.test(value)
        ? ""
        : ERROR_MESSAGES.EMAIL_INVALID;
    case "password":
      return VALIDATION_REGEX.PASSWORD.test(value)
        ? ""
        : ERROR_MESSAGES.PASSWORD_WEAK;
    case "confirmPassword":
      if (!allValues) return "";
      return value === allValues.password
        ? ""
        : ERROR_MESSAGES.PASSWORD_MISMATCH;
    case "gender":
      return value ? "" : ERROR_MESSAGES.GENDER_REQUIRED;
    default:
      return "";
  }
};

export const validateForm = (values: Partial<SignupData>): FormErrors => {
  const errors: FormErrors = {};

  (Object.keys(values) as FormField[]).forEach((field) => {
    errors[field] = validateField(field, values[field] || "", values);
  });

  return errors;
};
