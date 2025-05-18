export type FormField =
  | "name"
  | "username"
  | "email"
  | "gender"
  | "password"
  | "confirmPassword";

export type SignupData = {
  name: string;
  username: string;
  email: string;
  gender: string;
  password: string;
  confirmPassword: string;
};

export type FormErrors = Partial<Record<FormField, string>>;
