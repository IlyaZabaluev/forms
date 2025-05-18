import { type FormEvent, useState, useRef } from "react";
import { GENDER_OPTIONS } from "../constants/validations";
import { validateField, validateForm } from "../utils/validate.field";
import {
  type FormErrors,
  type FormField,
  type SignupData,
} from "../types/form";
import { Input } from "../../custom";
import { IconAt, IconLock } from "@tabler/icons-react";
import styles from "./signup.module.scss";

type SignupProps = {
  onSubmit: (data: SignupData) => void;
};

export function Signup({ onSubmit }: SignupProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<SignupData>({
    name: "",
    username: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const fieldName = name as FormField;
    const newValue = type === "radio" ? value : value;

    const updatedFormData = { ...formData, [fieldName]: newValue };
    setFormData(updatedFormData);

    setErrors((prev) => {
      const newErrors = { ...prev };

      newErrors[fieldName] = validateField(
        fieldName,
        newValue,
        updatedFormData
      );

      if (fieldName === "password") {
        newErrors.confirmPassword = validateField(
          "confirmPassword",
          updatedFormData.confirmPassword,
          updatedFormData
        );
      } else if (fieldName === "confirmPassword") {
        newErrors.password = validateField(
          "password",
          updatedFormData.password,
          updatedFormData
        );
      }

      return newErrors;
    });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      username: "",
      email: "",
      gender: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    formRef.current?.reset();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      onSubmit(formData);
    }
    handleReset();
  };

  return (
    <form
      className={styles.form}
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={styles.formGroup}>
        <Input
          type="text"
          name="name"
          label="Имя"
          placeholder="Ваше имя"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          withAsterisk
          size="md"
          radius="md"
          onBlur={(e) =>
            setErrors((prev) => ({
              ...prev,
              name: validateField("name", e.target.value, formData),
            }))
          }
        />
      </div>
      <div className={styles.formGroup}>
        <div className={styles.inputWithIcon}>
          <Input
            type="text"
            name="username"
            label="Никнейм"
            placeholder="Ваш никнейм"
            value={formData.username}
            onChange={(e) => {
              let value = e.target.value;
              if (value.startsWith("@")) value = value.slice(1);
              handleChange({
                ...e,
                target: {
                  ...e.target,
                  name: "username",
                  value,
                },
              });
            }}
            error={errors.username}
            icon={<IconAt size={16} />}
            withAsterisk
            size="md"
            radius="md"
            onBlur={() =>
              setErrors((prev) => ({
                ...prev,
                username: validateField(
                  "username",
                  formData.username,
                  formData
                ),
              }))
            }
          />
        </div>
      </div>
      <div className={styles.formGroup}>
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          withAsterisk
          size="md"
          radius="md"
          onBlur={(e) =>
            setErrors((prev) => ({
              ...prev,
              email: validateField("email", e.target.value),
            }))
          }
        />
      </div>
      <div className={styles.formGroup}>
        <span className={styles.label}>Пол</span>
        <div className={styles.radioGroup}>
          {GENDER_OPTIONS.map((option) => (
            <label key={option.value} className={styles.radioLabel}>
              <input
                type="radio"
                name="gender"
                value={option.value}
                checked={formData.gender === option.value}
                onChange={handleChange}
                className={styles.radioInput}
              />
              {option.label}
            </label>
          ))}
        </div>
        {errors.gender && <span className={styles.error}>{errors.gender}</span>}
      </div>
      <div className={styles.formGroup}>
        <Input
          type="password"
          name="password"
          label="Пароль"
          placeholder="Не менее 8 символов"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={<IconLock size={16} />}
          withAsterisk
          size="md"
          radius="md"
          onBlur={(e) =>
            setErrors((prev) => ({
              ...prev,
              password: validateField("password", e.target.value, formData),
              confirmPassword: validateField(
                "confirmPassword",
                formData.confirmPassword,
                formData
              ),
            }))
          }
        />
      </div>
      <div className={styles.formGroup}>
        <Input
          type="password"
          name="confirmPassword"
          label="Подтвердите пароль"
          placeholder="Повторите ваш пароль"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon={<IconLock size={16} />}
          withAsterisk
          size="md"
          radius="md"
          onBlur={(e) =>
            setErrors((prev) => ({
              ...prev,
              confirmPassword: validateField(
                "confirmPassword",
                e.target.value,
                formData
              ),
              password: validateField("password", formData.password, formData),
            }))
          }
        />
      </div>

      <button
        type="submit"
        className="button"
        disabled={
          Object.values(errors).some((error) => error) || !formData.gender
        }
      >
        Зарегистрироваться
      </button>
    </form>
  );
}
