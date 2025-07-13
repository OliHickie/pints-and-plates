import clsx from "clsx";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "normal" | "small" | "large";
  href?: string;
  disabled?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

const baseClasses =
  "inline-flex items-center justify-center rounded-md font-semibold text-sm transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

const sizeClasses = {
  large: "px-8 py-4 text-lg",
  normal: "px-6 py-3 text-base",
  small: "px-4 py-2 text-lg",
};

const variantClasses = {
  primary: "bg-primary text-black hover:bg-accent ",
  secondary: "bg-secondary text-black hover:bg-accent ",
  ghost:
    "bg-transparent border border-primary text-primary hover:bg-surface",
};

export const Button = ({
  children,
  variant = "primary",
  size = "normal",
  href,
  disabled = false,
  className,
  ...props
}: ButtonProps) => {
  const classes = clsx(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

