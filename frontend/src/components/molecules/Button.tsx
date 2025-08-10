import React from "react";

export type FormButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function Button({
  children,
  type = "button",
  disabled,
  className = "mt-4 py-2 rounded bg-green-500 text-black font-bold hover:bg-green-600 transition-colors",
  onClick,
}: FormButtonProps) {
  const disabledClass =
    "bg-green-500/60 hover:bg-green-400/60 opacity-80 cursor-not-allowed hover:bg-gray-500";
  const enabledClass = "bg-green-500 text-black hover:bg-green-600";
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${className} ${disabled ? disabledClass : enabledClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
