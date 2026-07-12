type HeroProps = {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
};

export default function Hero({
  children,
  className = "",
  align = "center",
}: HeroProps) {
  const alignmentClass =
    align === "center" ? "text-center" : "text-left";

  return (
    <div
      className={`al-hero-card ${alignmentClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}