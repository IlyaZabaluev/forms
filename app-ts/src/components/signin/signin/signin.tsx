import { type FormEvent, useState, useRef } from "react";
import { validateFieldSignin } from "../utils/validateFieldSignin";
import styles from "./signin.module.scss";
import { Input } from "../../custom";
import { IconLock } from "@tabler/icons-react";

type SigninProps = {
  onSubmit: (data: { email: string; password: string }) => void;
};

export const Signin = ({ onSubmit }: SigninProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log({ name, value });

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateFieldSignin(name, value),
    }));
  };

  const handleReset = () => {
    setFormData({
      email: "",
      password: "",
    });
    setErrors({
      email: "",
      password: "",
    });
    formRef.current?.reset();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: validateFieldSignin("email", formData.email),
      password: validateFieldSignin("password", formData.password),
    };

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      onSubmit(formData);
    }
    handleReset();
  };

  return (
    <div className="container">
      <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          withAsterisk
          size="md"
          radius="md"
          onBlur={(e) =>
            setErrors((prev) => ({
              ...prev,
              email: validateFieldSignin("email", e.target.value),
            }))
          }
        />

        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
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
              password: validateFieldSignin("password", e.target.value),
            }))
          }
        />

        <button
          type="submit"
          className="button"
          disabled={!!errors.email || !!errors.password}
        >
          Войти
        </button>
      </form>
    </div>
  );
};
