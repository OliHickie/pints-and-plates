import clsx from "clsx";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "normal" | "small" | "large";
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

const baseClasses =
  "inline-flex items-center justify-center rounded-md font-semibold text-sm transition-colors duration-200 focus:outline-none disabled:opacity-50";

const sizeClasses = {
  large: "px-8 py-4 text-lg",
  normal: "px-6 py-3 text-base",
  small: "px-4 py-2 text-lg",
};

const variantClasses = {
  primary: "bg-primary text-black hover:bg-primary-dark",
  secondary: "bg-secondary text-black hover:bg-secondary-dark",
  ghost: "bg-transparent border border-primary text-primary hover:bg-surface",
};

export const Button = ({
  children,
  variant = "primary",
  size = "normal",
  href,
  loading = false,
  disabled = false,
  className,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;
  const classes = clsx(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const content = loading ? (
    <span className="flex justify-center items-center">
      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
    </span>
  ) : (
    children
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={isDisabled} tabIndex={isDisabled ? -1 : 0}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={isDisabled} {...props}>
      {content}
    </button>
  );
};
