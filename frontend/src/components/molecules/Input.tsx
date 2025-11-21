import React from "react";
import { FieldValues, UseFormRegister, Path } from "react-hook-form";
import clsx from "clsx";

export type InputProps<T extends FieldValues = FieldValues> = {
  label: string;
  id: Path<T>;
  type?: string;
  placeholder?: string;
  register?: UseFormRegister<T>;
  error?: string | null;
  disabled?: boolean;
};

export function Input<T extends FieldValues = FieldValues>({
  label,
  id,
  type = "text",
  placeholder,
  register,
  error,
  disabled = false,
}: InputProps<T>) {
  const inputClass = clsx(
    "px-4 py-2 rounded-sm bg-gray-900 text-text-primary focus:outline-hidden focus:ring-2 placeholder:opacity-40",
    {
      "border border-error focus:ring-error": error,
      "border border-foreground focus:ring-foreground": !error,
      "opacity-50 cursor-not-allowed bg-gray-800 border-gray-600 text-text-secondary":
        disabled,
    },
  );

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={
          error
            ? "font-medium text-error-light"
            : disabled
              ? "font-medium text-text-secondary"
              : "font-medium"
        }
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={inputClass}
        placeholder={placeholder}
        disabled={disabled}
        {...(register ? register(id) : {})}
      />
      {error && (
        <span className="text-error-light text-xs mt-1 px-1 py-0.5 rounded-sm animate-fade-in">
          {error}
        </span>
      )}
    </div>
  );
}
