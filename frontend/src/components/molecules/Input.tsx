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
    "px-4 py-2 rounded bg-black text-white focus:outline-none focus:ring-2 placeholder:opacity-40",
    {
      "border border-red-500 focus:ring-red-500": error,
      "border border-green-500 focus:ring-green-500": !error,
      "opacity-50 cursor-not-allowed bg-gray-900 border-gray-700 text-gray-400":
        disabled,
    },
  );

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
        className={inputClass}
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
