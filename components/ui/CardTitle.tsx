type CardTitleProps = {
  children: React.ReactNode;
  className?: string;
  level?: "h2" | "h3";
  size?: "default" | "large";
};

export default function CardTitle({
  children,
  className = "",
  level = "h3",
  size = "default",
}: CardTitleProps) {
  const sizeClass =
    size === "large"
      ? "text-4xl font-bold"
      : "text-2xl font-bold";

  const classes =
    `${sizeClass} text-[var(--al-text)] ${className}`.trim();

  if (level === "h2") {
    return <h2 className={classes}>{children}</h2>;
  }

  return <h3 className={classes}>{children}</h3>;
}