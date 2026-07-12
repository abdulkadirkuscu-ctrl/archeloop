type DividerProps = {
  className?: string;
  variant?: "default" | "accent";
};

export default function Divider({
  className = "",
  variant = "default",
}: DividerProps) {
  const dividerClass =
    variant === "accent"
      ? "al-accent-rule"
      : "border-t border-[var(--al-border)]";

  return (
    <div
      aria-hidden="true"
      className={`${dividerClass} ${className}`.trim()}
    />
  );
}