type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const buttonClass =
    variant === "primary"
      ? "al-button-primary"
      : "al-button-secondary";

  if (href) {
    return (
      <a href={href} className={`${buttonClass} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button className={`${buttonClass} ${className}`}>
      {children}
    </button>
  );
}