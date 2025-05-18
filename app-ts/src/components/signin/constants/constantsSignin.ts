export const VALIDATION_REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  PHONE: /^\+?\d{10,15}$/,
  NAME: /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/,
} as const;

export const ERROR_MESSAGES = {
  EMAIL_REQUIRED: "Email обязателен",
  EMAIL_INVALID: "Введите корректный email",
  PASSWORD_REQUIRED: "Пароль обязателен",
  PASSWORD_WEAK: "Пароль должен содержать от 8 символов, включая буквы и цифры",
} as const;
