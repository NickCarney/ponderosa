import React from "react";

interface FormInputProps {
  type?: "text" | "email" | "tel";
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  pattern?: string;
  accentColor?: "blue" | "burgundy";
}

interface FormTextareaProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  accentColor?: "blue" | "burgundy";
}

interface FormCheckboxProps {
  id: string;
  name?: string;
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  accentColor?: "blue" | "burgundy";
}

const fieldBase: React.CSSProperties = {
  width: "100%",
  padding: "13px 15px",
  borderRadius: "12px",
  fontFamily: "var(--font-body)",
  fontSize: "15px",
  border: "1px solid rgba(16, 42, 34, 0.2)",
  background: "var(--cream)",
  color: "var(--ink)",
  outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "var(--pine-900)",
  marginBottom: "6px",
  fontFamily: "var(--font-body)",
};

export function FormInput({
  type = "text",
  name,
  label,
  value,
  onChange,
  disabled = false,
  required = false,
  placeholder,
  pattern,
}: FormInputProps) {
  return (
    <div>
      <label style={labelStyle}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        pattern={pattern}
        style={{
          ...fieldBase,
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "text",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--moss)";
          e.target.style.boxShadow = "0 0 0 2px rgba(143, 166, 142, 0.3)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(16, 42, 34, 0.2)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

export function FormTextarea({
  name,
  label,
  value,
  onChange,
  disabled = false,
  required = false,
  placeholder,
  rows = 5,
}: FormTextareaProps) {
  return (
    <div>
      <label style={labelStyle}>
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        rows={rows}
        style={{
          ...fieldBase,
          resize: "none",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "text",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--moss)";
          e.target.style.boxShadow = "0 0 0 2px rgba(143, 166, 142, 0.3)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(16, 42, 34, 0.2)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

export function FormCheckbox({
  id,
  name,
  label,
  checked,
  onChange,
  disabled = false,
}: FormCheckboxProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        style={{
          width: "16px",
          height: "16px",
          accentColor: "var(--moss)",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      />
      <label
        htmlFor={id}
        style={{
          fontSize: "14px",
          color: "var(--ink-soft)",
          fontFamily: "var(--font-body)",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {label}
      </label>
    </div>
  );
}
