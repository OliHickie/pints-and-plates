import clsx from "clsx";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "normal" | "small" | "large";
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

const baseClasses =
  "inline-flex items-center justify-center rounded-md font-semibold text-sm transition-colors duration-200 focus:outline-none disabled:opacity-50 cursor-pointer";

const sizeClasses = {
  large: "px-8 py-4 text-lg",
  normal: "px-6 py-3 text-base",
  small: "px-4 py-2 text-lg",
};

const variantClasses = {
  primary: "bg-accent text-primary hover:bg-accent-muted hover:text-primary-muted",
  secondary: "bg-transparent border border-primary text-primary hover:text-accent hover:border-accent",
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

  const loaderClasses = `w-1 rounded-full animate-pulse [animation-duration:0.6s] 
                        ${variant === 'secondary' ? 'bg-accent' : 'bg-background'}`

  const content = loading ? (
    <span className="flex justify-center items-center gap-0.5 h-5">
      <span className={loaderClasses} style={{ height: '40%' }}></span>
      <span className={`${loaderClasses} [animation-delay:0.1s]`} style={{ height: '60%' }}></span>
      <span className={`${loaderClasses} [animation-delay:0.2s]`} style={{ height: '80%' }}></span>
      <span className={`${loaderClasses} [animation-delay:0.1s]`} style={{ height: '60%' }}></span>
      <span className={loaderClasses} style={{ height: '40%' }}></span>
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
