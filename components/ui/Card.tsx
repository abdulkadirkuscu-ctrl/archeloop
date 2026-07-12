type CardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "premium" | "soft";
};

export default function Card({
  children,
  className = "",
  variant = "default",
}: CardProps) {
  const variantClass = {
    default: "al-card",
    premium: "al-premium-card",
    soft: "al-soft-card",
  }[variant];

  return (
    <div className={`${variantClass} ${className}`.trim()}>
      {children}
    </div>
  );
}