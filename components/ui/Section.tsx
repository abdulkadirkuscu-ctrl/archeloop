type SectionProps = {
  children: React.ReactNode;
  className?: string;
  spacing?: "default" | "tight" | "none";
};

export default function Section({
  children,
  className = "",
  spacing = "default",
}: SectionProps) {
  const spacingClass = {
    default: "al-section",
    tight: "al-section-tight",
    none: "",
  }[spacing];

  return (
    <section className={`${spacingClass} ${className}`.trim()}>
      {children}
    </section>
  );
}