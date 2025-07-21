import React from "react";
import { FieldValues, UseFormRegister, Path } from "react-hook-form";

export type InputProps<T extends FieldValues = FieldValues> = {
  label: string;
  id: Path<T>;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  register?: UseFormRegister<T>;
  error?: string | null;
  disabled?: boolean;
};

export function FormInput<T extends FieldValues = FieldValues>({
  label,
  id,
  type = "text",
  placeholder,
  autoComplete,
  register,
  error,
  disabled = false,
}: InputProps<T>) {
  const inputClass = error
    ? "px-4 py-2 rounded bg-black text-white border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:opacity-40"
    : "px-4 py-2 rounded bg-black text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:opacity-40";
  const disabledClass = disabled
    ? "opacity-50 cursor-not-allowed bg-gray-900 border-gray-700 text-gray-400"
    : "";
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={
          error
            ? "font-medium text-red-400"
            : disabled
              ? "font-medium text-gray-400"
              : "font-medium"
        }
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`${inputClass} ${disabledClass}`}
        autoComplete={autoComplete}
        placeholder={placeholder}
        disabled={disabled}
        {...(register ? register(id) : {})}
      />
      {error && (
        <span className="text-red-400 text-xs mt-1 px-1 py-0.5 rounded animate-fade-in">
          {error}
        </span>
      )}
    </div>
  );
}
