import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "answer";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  innerRef?: React.Ref<HTMLButtonElement>;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-gradient-to-r from-[#d4a574] to-[#c49566] text-white hover:scale-105 shadow-lg",
  secondary: "bg-[#6b4423] text-white hover:scale-[1.02]",
  outline: "bg-transparent border-2 border-[#d4a574] text-[#6b4423] hover:scale-[1.02]",
  answer: "bg-gradient-to-r from-[#f4e4d4] to-[#ead5c3] text-[#5a3d2b] hover:from-[#d4a574] hover:to-[#c49566] hover:text-white hover:scale-[1.02] border-2 border-[#d4a574] focus:ring-4 focus:ring-offset-2 focus:ring-[#d4a574]/50"
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      children,
      isLoading = false,
      fullWidth = false,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "px-8 py-4 rounded-xl text-lg font-semibold transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
    const widthStyles = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? "⏳ Loading..." : children}
      </button>
    );
  }
);

export default Button;
