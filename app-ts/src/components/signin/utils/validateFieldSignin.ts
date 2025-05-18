import { VALIDATION_REGEX, ERROR_MESSAGES } from "../constants/constantsSignin";

export const validateFieldSignin = (name: string, value: string) => {
  switch (name) {
    case "email":
      if (!value) return ERROR_MESSAGES.EMAIL_REQUIRED;
      if (!VALIDATION_REGEX.EMAIL.test(value))
        return ERROR_MESSAGES.EMAIL_INVALID;
      return "";
    case "password":
      if (!value) return ERROR_MESSAGES.PASSWORD_REQUIRED;
      if (!VALIDATION_REGEX.PASSWORD.test(value))
        return ERROR_MESSAGES.PASSWORD_WEAK;
      return "";
    default:
      return "";
  }
};
