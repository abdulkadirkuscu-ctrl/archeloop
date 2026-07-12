type PageIntroProps = {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
  width?: "default" | "wide";
};

export default function PageIntro({
  children,
  className = "",
  align = "center",
  width = "default",
}: PageIntroProps) {
  const alignmentClass =
    align === "center" ? "mx-auto text-center" : "text-left";

  const widthClass =
    width === "wide" ? "max-w-4xl" : "max-w-3xl";

  return (
    <p
      className={`al-text-lg mt-8 ${widthClass} ${alignmentClass} ${className}`.trim()}
    >
      {children}
    </p>
  );
}