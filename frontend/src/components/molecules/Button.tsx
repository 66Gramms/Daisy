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
  className,
  onClick,
}: FormButtonProps) {
  const disabledClass =
    "bg-primary-400/60 hover:bg-primary-300/60 opacity-80 cursor-not-allowed hover:bg-gray-500";
  const enabledClass = "bg-primary-400 text-text-inverted hover:bg-primary-500";
  return (
    <button
      type={type}
      disabled={disabled}
      className={`py-2 rounded-sm cursor-pointer ${className} ${disabled ? disabledClass : enabledClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
