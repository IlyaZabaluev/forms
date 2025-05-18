import React, { forwardRef, useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import styles from "./Input.module.scss";

type InputBaseProps = {
  label?: string;
  description?: string;
  error?: string;
  icon?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  radius?: "xs" | "sm" | "md" | "lg" | "xl";
  withAsterisk?: boolean;
};

type InputProps = InputBaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    description,
    error,
    icon,
    size = "md",
    radius = "sm",
    withAsterisk,
    type,
    className,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && (
        <label className={styles.label}>
          {label}
          {withAsterisk && <span className={styles.required}> *</span>}
        </label>
      )}

      <div
        className={`${styles.inputContainer} ${styles[size]} ${
          styles[radius]
        } ${error ? styles.error : ""}`}
      >
        {icon && <div className={styles.icon}>{icon}</div>}

        <input ref={ref} type={inputType} className={styles.input} {...rest} />

        {type === "password" && (
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
          </button>
        )}
      </div>

      {description && <div className={styles.description}>{description}</div>}
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
});

Input.displayName = "Input";
