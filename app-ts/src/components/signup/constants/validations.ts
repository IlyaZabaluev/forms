export const VALIDATION_REGEX = {
  NAME: /^[a-zA-Zа-яА-ЯёЁ\s\-]{2,50}$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
} as const;

export const ERROR_MESSAGES = {
  NAME_REQUIRED: "Имя обязательно",
  NAME_INVALID: "От 2 до 50 букв и дефисов",
  USERNAME_REQUIRED: "Никнейм обязателен",
  USERNAME_INVALID: "3-20 символов (латиница, цифры, _)",
  EMAIL_REQUIRED: "Email обязателен",
  EMAIL_INVALID: "Введите корректный email",
  PASSWORD_REQUIRED: "Пароль обязателен",
  PASSWORD_WEAK: "Минимум 8 символов, буквы и цифры",
  GENDER_REQUIRED: "Укажите пол",
  PASSWORD_MISMATCH: "Пароли не совпадают",
} as const;

export const GENDER_OPTIONS = [
  { value: "male", label: "Мужской" },
  { value: "female", label: "Женский" },
  { value: "other", label: "Другой" },
] as const;
